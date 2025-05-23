import { Listing } from '@prisma/client';
import { DealMetrics } from '../types';

const REPAIR_COST = 20000;
const MONTHLY_RENT = 2500;
const PITI = 2000;

export function calculateMetrics(listing: Listing, annualAppreciationRate: number = 0): DealMetrics {
  const { price, arv } = listing;
  const profitability = arv - price - REPAIR_COST;
  const roi = ((arv - price - REPAIR_COST) / (price + REPAIR_COST)) * 100;
  const cashFlow = MONTHLY_RENT - PITI;

  let reasoning = `This deal at ${listing.address} offers strong potential.`;
  if (roi > 25) {
    reasoning += ` Its high ROI of ${roi.toFixed(2)}% suggests excellent capital gains.`;
  } else if (roi > 15) {
    reasoning += ` Its solid ROI of ${roi.toFixed(2)}% indicates good investment return.`;
  }

  if (cashFlow > 800) {
    reasoning += ` The substantial cash flow of $${cashFlow.toFixed(2)}/month provides strong passive income.`;
  } else if (cashFlow > 400) {
    reasoning += ` The positive cash flow of $${cashFlow.toFixed(2)}/month contributes to regular income.`;
  } else if (cashFlow <= 0) {
    reasoning += ` The cash flow of $${cashFlow.toFixed(2)}/month is negative or breakeven, requiring careful consideration of operating expenses.`;
  }

  if (annualAppreciationRate > 0) {
    reasoning += ` The zip code ${listing.zipCode} has an historical annual appreciation rate of ${annualAppreciationRate * 100}%, adding to long-term value.`;
  } else {
    reasoning += ` Market appreciation data for ${listing.zipCode} is not available, which could impact long-term gains.`;
  }

  return { listing, profitability, roi, cashFlow, reasoning };
}

export function rankDeals(deals: DealMetrics[]): DealMetrics[] {
  const qualifyingDeals = deals.filter(deal => deal.roi > 20 && deal.cashFlow > 500);
  return qualifyingDeals.sort((a, b) => {
    if (b.roi !== a.roi) {
      return b.roi - a.roi;
    }
    return b.cashFlow - a.cashFlow;
  }).slice(0, 3);
} 