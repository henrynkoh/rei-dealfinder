import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { NWMLSListing } from '../../types';

const prisma = new PrismaClient();

async function getMarketAppreciationRate(zipCode: string): Promise<number | null> {
  const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
  const cx = process.env.GOOGLE_SEARCH_CX;
  const query = `annual real estate appreciation rate ${zipCode} Washington`;

  if (!apiKey || !cx) {
    console.error('Google Search API keys not configured.');
    return null;
  }

  try {
    const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`;
    const response = await axios.get(searchUrl);

    const items = response.data.items;
    if (items && items.length > 0) {
      for (const item of items) {
        const snippet = item.snippet || '';
        const title = item.title || '';
        const percentageMatch = (snippet + ' ' + title).match(/(\d+(\.\d+)?)\%/);
        if (percentageMatch && percentageMatch[1]) {
          const rate = parseFloat(percentageMatch[1]) / 100;
          if (rate > 0 && rate < 0.5) {
            console.log(`Found appreciation rate for ${zipCode}: ${rate * 100}%`);
            return rate;
          }
        }
      }
    }
    console.warn(`No clear appreciation rate found for ${zipCode} from Google Search.`);
    return null;
  } catch (error) {
    console.error(`Error fetching market appreciation for ${zipCode}:`, error);
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const nwmlsListings: NWMLSListing[] = [
    { ListingId: 'NWMLS-001', ListPrice: 420000, PropertyType: 'Single Family Residential', Area: 'Washington', Address: '123 Elm St', City: 'Seattle', Zip: '98105', Bedrooms: 3, YearBuilt: 1980, Status: 'Active', EntryDate: '2025-05-21T10:00:00Z' },
    { ListingId: 'NWMLS-002', ListPrice: 380000, PropertyType: 'Single Family Residential', Area: 'Washington', Address: '456 Birch Ave', City: 'Tacoma', Zip: '98407', Bedrooms: 4, YearBuilt: 1995, Status: 'Active', EntryDate: '2025-05-22T09:30:00Z' },
    { ListingId: 'NWMLS-003', ListPrice: 500000, PropertyType: 'Condo', Area: 'Washington', Address: '789 Condo Blvd', City: 'Bellevue', Zip: '98004', Bedrooms: 2, YearBuilt: 2000, Status: 'Active', EntryDate: '2025-05-22T11:00:00Z' },
    { ListingId: 'NWMLS-004', ListPrice: 300000, PropertyType: 'Single Family Residential', Area: 'Washington', Address: '101 Pine St', City: 'Olympia', Zip: '98501', Bedrooms: 3, YearBuilt: 1975, Status: 'Active', EntryDate: '2025-05-22T08:00:00Z' },
  ];

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const newSingleFamilyHomes = nwmlsListings.filter(listing => {
    const entryDate = new Date(listing.EntryDate);
    entryDate.setHours(0, 0, 0, 0);
    return listing.PropertyType === 'Single Family Residential' && listing.Area === 'Washington' && entryDate.getTime() >= today.getTime();
  });

  const savedListings = [];
  for (const listing of newSingleFamilyHomes) {
    try {
      const estimatedARV = listing.ListPrice * 1.3;
      let marketAppreciation = await prisma.marketAppreciation.findUnique({ where: { zipCode: listing.Zip } });
      let appreciationRate: number | null = null;
      if (!marketAppreciation || new Date().getTime() - marketAppreciation.lastUpdated.getTime() > 7 * 24 * 60 * 60 * 1000) {
        appreciationRate = await getMarketAppreciationRate(listing.Zip);
        if (appreciationRate !== null) {
          marketAppreciation = await prisma.marketAppreciation.upsert({
            where: { zipCode: listing.Zip },
            update: { appreciationRate },
            create: { zipCode: listing.Zip, appreciationRate },
          });
        }
      } else {
        appreciationRate = marketAppreciation.appreciationRate;
      }

      const createdListing = await prisma.listing.upsert({
        where: { nwmlsId: listing.ListingId },
        update: { price: listing.ListPrice, arv: estimatedARV, bedrooms: listing.Bedrooms, address: `${listing.Address}, ${listing.City}`, zipCode: listing.Zip },
        create: { nwmlsId: listing.ListingId, price: listing.ListPrice, arv: estimatedARV, bedrooms: listing.Bedrooms, address: `${listing.Address}, ${listing.City}`, zipCode: listing.Zip },
      });
      savedListings.push({ ...createdListing, appreciationRate });
    } catch (error) {
      console.error(`Error processing listing ${listing.ListingId}:`, error);
    }
  }

  return res.status(200).json({ message: 'Listings processed successfully', count: savedListings.length, listings: savedListings });
} 