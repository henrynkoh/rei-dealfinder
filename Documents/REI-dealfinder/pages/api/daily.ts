import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import sgMail from '@sendgrid/mail';
import { calculateMetrics, rankDeals } from '../../utils/metrics';
import { DealMetrics } from '../../types';

const prisma = new PrismaClient();
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Triggering /api/listings to fetch and save new data...');
    await axios.get('http://localhost:3000/api/listings');

    const allListings = await prisma.listing.findMany();
    const uniqueZipCodes = Array.from(new Set(allListings.map(l => l.zipCode)));
    const appreciationRates = await prisma.marketAppreciation.findMany({ where: { zipCode: { in: uniqueZipCodes } } });
    const appreciationMap = new Map<string, number>();
    appreciationRates.forEach(rate => appreciationMap.set(rate.zipCode, rate.appreciationRate));

    const allDealsWithMetrics: DealMetrics[] = allListings.map(listing =>
      calculateMetrics(listing, appreciationMap.get(listing.zipCode) || 0)
    );
    const topDeals = rankDeals(allDealsWithMetrics);

    let emailContent = `<h1>Daily Real Estate DealFinder Report</h1>`;
    if (topDeals.length > 0) {
      emailContent += `<p>Here are your top ${topDeals.length} real estate deals for today:</p>`;
      emailContent += `<table border="1" cellpadding="5" cellspacing="0" style="width:100%; border-collapse: collapse;">`;
      emailContent += `<thead><tr><th>Address</th><th>Price</th><th>Bedrooms</th><th>ROI (%)</th><th>Cash Flow ($/month)</th><th>Reasoning</th></tr></thead><tbody>`;
      topDeals.forEach(deal => {
        emailContent += `<tr>
          <td>${deal.listing.address}</td>
          <td>$${deal.listing.price.toLocaleString()}</td>
          <td>${deal.listing.bedrooms}</td>
          <td>${deal.roi.toFixed(2)}%</td>
          <td>$${deal.cashFlow.toFixed(2)}</td>
          <td>${deal.reasoning}</td>
        </tr>`;
      });
      emailContent += `</tbody></table>`;
    } else {
      emailContent += `<p>No qualifying deals found today.</p>`;
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    if (process.env.SENDGRID_API_KEY && adminEmail) {
      const msg = {
        to: adminEmail,
        from: 'noreply@yourdomain.com',
        subject: 'Daily DealFinder Report',
        html: emailContent,
      };

      try {
        await sgMail.send(msg);
        console.log('Daily report email sent successfully.');
      } catch (sendGridError: any) {
        console.error('Error sending email via SendGrid:', sendGridError.response?.body || sendGridError);
      }
    } else {
      console.warn('SendGrid API Key or Admin Email not configured. Email not sent.');
    }

    return res.status(200).json({ message: 'Daily process completed', topDeals });
  } catch (error) {
    console.error('Error in daily process:', error);
    return res.status(500).json({ message: 'Error processing daily listings', error: (error as Error).message });
  } finally {
    await prisma.$disconnect();
  }
} 