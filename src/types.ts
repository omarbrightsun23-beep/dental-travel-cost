export type CurrencyCode = 'USD' | 'GBP' | 'EUR' | 'AUD' | 'CAD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  flag: string;
  defaultRate: number; // vs USD
}

export type HotelTier = 'standard' | 'premium' | 'luxury';

export interface Procedure {
  id: string;
  name: string;
  category: 'implant' | 'cosmetic' | 'medical';
  description: string;
  recommendedNights: number;
  typicalTrips: 1 | 2;
  domesticUSD: Record<CurrencyCode, number>;
  abroadUSD: Record<string, number>;
}

export interface DestinationCity {
  name: string;
  tagline: string;
  specialty: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  flag: string;
  tagline: string;
  cities: DestinationCity[];
  flightCostUSD: Record<CurrencyCode, number>;
  hotelRatesUSD: {
    standard: number;
    premium: number;
    luxury: number;
  };
  dailyMiscUSD: number; // transfers, meds, food
  accreditations: string[];
  implantBrands: string[];
  travelDistanceNote: string;
}

export interface CalculationResult {
  currency: CurrencyCode;
  symbol: string;
  rate: number;
  procedureName: string;
  destinationName: string;
  domesticTotal: number;
  abroadProcedure: number;
  flightsTotal: number;
  hotelTotal: number;
  transfersAndMeds: number;
  ctScanAndConsult: number;
  contingencyBuffer: number;
  abroadTotal: number;
  netSavings: number;
  savingsPercent: number;
  tripsCount: number;
}
