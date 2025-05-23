import { Listing } from '@prisma/client';

export interface DealMetrics {
  listing: Listing;
  profitability: number;
  roi: number;
  cashFlow: number;
  reasoning: string;
}

export interface NWMLSListing {
  ListingId: string;
  ListPrice: number;
  PropertyType: string;
  Area: string;
  Address: string;
  City: string;
  Zip: string;
  Bedrooms: number;
  YearBuilt: number;
  Status: string;
  EntryDate: string;
} 