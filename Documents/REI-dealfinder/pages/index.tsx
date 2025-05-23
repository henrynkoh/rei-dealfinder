import { useState, useEffect } from 'react';
import Head from 'next/head';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { DealMetrics } from '../types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface HomeProps {
  initialDeals: DealMetrics[];
}

export default function Home({ initialDeals }: HomeProps) {
  const [topDeals, setTopDeals] = useState<DealMetrics[]>(initialDeals);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedReasoning, setExpandedReasoning] = useState<number | null>(null);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        await axios.get('/api/listings');
        const response = await axios.get('/api/daily');
        setTopDeals(response.data.topDeals);
      } catch (err) {
        console.error('Error fetching deals:', err);
        setError('Failed to fetch deals. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  const data = {
    labels: topDeals.map(deal => deal.listing.address),
    datasets: [
      { label: 'ROI (%)', data: topDeals.map(deal => deal.roi), backgroundColor: 'rgba(75, 192, 192, 0.6)', borderColor: 'rgba(75, 192, 192, 1)', borderWidth: 1 },
      { label: 'Cash Flow ($/month)', data: topDeals.map(deal => deal.cashFlow), backgroundColor: 'rgba(153, 102, 255, 0.6)', borderColor: 'rgba(153, 102, 255, 1)', borderWidth: 1 },
    ],
  };

  const options = {
    responsive: true,
    plugins: { title: { display: true, text: 'Top Real Estate Deals by ROI and Cash Flow' } },
    scales: { y: { beginAtZero: true } },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-700">Loading deals...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 text-red-700 p-4 rounded-md">
        <p className="text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <Head>
        <title>DealFinder - Real Estate Deals</title>
        <meta name="description" content="Analyze NWMLS listings for real estate deals" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">
          Top Real Estate Deals
        </h1>

        {topDeals.length === 0 ? (
          <p className="text-center text-xl text-gray-600">No qualifying deals found for today. Check back later!</p>
        ) : (
          <>
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Deal Metrics Overview</h2>
              <div className="relative h-64 sm:h-96">
                <Bar data={data} options={options} />
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Top Deals Table</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-md">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Address</th>
                    <th className="py-3 px-6 text-left">Price</th>
                    <th className="py-3 px-6 text-left">Bedrooms</th>
                    <th className="py-3 px-6 text-left">ROI (%)</th>
                    <th className="py-3 px-6 text-left">Cash Flow ($/month)</th>
                    <th className="py-3 px-6 text-left">Reasoning</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {topDeals.map((deal, index) => (
                    <tr key={deal.listing.id} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">{deal.listing.address}</td>
                      <td className="py-3 px-6 text-left">${deal.listing.price.toLocaleString()}</td>
                      <td className="py-3 px-6 text-left">{deal.listing.bedrooms}</td>
                      <td className="py-3 px-6 text-left font-medium text-green-600">{deal.roi.toFixed(2)}%</td>
                      <td className="py-3 px-6 text-left font-medium text-blue-600">${deal.cashFlow.toFixed(2)}</td>
                      <td className="py-3 px-6 text-left">
                        <button
                          onClick={() => setExpandedReasoning(expandedReasoning === index ? null : index)}
                          className="text-blue-500 hover:text-blue-700 focus:outline-none"
                        >
                          {expandedReasoning === index ? 'Hide Reasoning' : 'Show Reasoning'}
                        </button>
                        {expandedReasoning === index && (
                          <div className="mt-2 p-3 bg-gray-50 rounded-md text-gray-700 text-xs">
                            {deal.reasoning}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
} 