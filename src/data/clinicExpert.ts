// Clinic Expert / CE Dental Clinic direct treatment prices, as shared Oct 2026.
// EUR only. These are DIRECT TREATMENT COSTS — accommodation and transfers are
// separate add-ons. Do not feed these values into the calculator's abroadUSD
// fields: the calculator treats abroadUSD as a USD base and converts it by FX
// rate, which would double-convert EUR prices.
export interface ClinicExpertBrandPrice {
  brand: string;
  origin: string;
  implantEur?: number;
  totalEur: number;
  breakdown: string;
}

export interface ClinicExpertTreatment {
  id: string;
  name: string;
  range: string;
  composition: string;
  inclusions: string;
  pageSlug: string;
  brands?: ClinicExpertBrandPrice[];
}

export const CLINIC_EXPERT_SOURCE = 'Clinic Expert / CE Dental Clinic, prices shared Oct 2026';
export const CLINIC_EXPERT_HOTEL_EUR_PER_NIGHT = 80;
export const CLINIC_EXPERT_TRANSFERS_EUR_FLAT = 270;
export const CLINIC_EXPERT_CROWN_EUR = 169;
export const CLINIC_EXPERT_VENEER_EUR = 190;

export const CLINIC_EXPERT_TREATMENTS: ClinicExpertTreatment[] = [
  {
    id: 'single_implant',
    name: 'Single Tooth Implant + Crown',
    range: '€359–€859',
    composition: '1 implant + 1 zirconium crown',
    inclusions: 'Free consultation & X-ray analysis',
    pageSlug: 'dental-implants-abroad-cost',
    brands: [
      { brand: 'NucleOSS', origin: 'Turkish', implantEur: 190, totalEur: 359, breakdown: '€190 implant + €169 zirconium crown' },
      { brand: 'SLH', origin: 'German', implantEur: 290, totalEur: 459, breakdown: '€290 implant + €169 zirconium crown' },
      { brand: 'Straumann', origin: 'Swiss', implantEur: 690, totalEur: 859, breakdown: '€690 implant + €169 zirconium crown' },
    ],
  },
  {
    id: 'all_on_4',
    name: 'All-on-4 Implants (per arch)',
    range: '€2,788–€4,788',
    composition: '4 implants + 12 zirconium crowns',
    inclusions: 'Free consultation, panoramic scans & X-rays',
    pageSlug: 'all-on-4-turkey-cost',
    brands: [
      { brand: 'NucleOSS', origin: 'Turkish', totalEur: 2788, breakdown: '4 × €190 implants + 12 × €169 crowns' },
      { brand: 'SLH', origin: 'German', totalEur: 3188, breakdown: '4 × €290 implants + 12 × €169 crowns' },
      { brand: 'Straumann', origin: 'Swiss', totalEur: 4788, breakdown: '4 × €690 implants + 12 × €169 crowns' },
    ],
  },
  {
    id: 'all_on_6',
    name: 'All-on-6 Implants (full mouth / both arches)',
    range: '€6,336–€12,336',
    composition: '12 implants + 24 zirconium crowns total',
    inclusions: 'Free consultation, full dental scans & X-rays',
    pageSlug: 'all-on-6-turkey-cost',
    brands: [
      { brand: 'NucleOSS', origin: 'Turkish', totalEur: 6336, breakdown: '12 × €190 implants + 24 × €169 crowns' },
      { brand: 'SLH', origin: 'German', totalEur: 7536, breakdown: '12 × €290 implants + 24 × €169 crowns' },
      { brand: 'Straumann', origin: 'Swiss', totalEur: 12336, breakdown: '12 × €690 implants + 24 × €169 crowns' },
    ],
  },
  {
    id: 'full_veneers',
    name: 'Porcelain Veneers (full set of 16)',
    range: '€3,040',
    composition: '16 porcelain / E.max veneers',
    inclusions: 'Free consultation, X-rays & digital smile design analysis',
    pageSlug: 'porcelain-veneers-turkey-cost',
  },
];

export const CLINIC_EXPERT_UNIT_PRICES = [
  { item: 'NucleOSS implant (Turkish)', price: '€190' },
  { item: 'SLH implant (German)', price: '€290' },
  { item: 'Straumann implant (Swiss)', price: '€690' },
  { item: 'Zirconium crown', price: '€169' },
  { item: 'Porcelain / E.max veneer', price: '€190' },
];
