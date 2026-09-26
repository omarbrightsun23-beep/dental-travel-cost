import { CurrencyCode, CurrencyConfig, Destination, Procedure } from '../types';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', name: 'United States Dollar', flag: '🇺🇸', defaultRate: 1.0 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', flag: '🇬🇧', defaultRate: 0.78 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', flag: '🇪🇺', defaultRate: 0.92 },
  AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺', defaultRate: 1.52 },
  CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦', defaultRate: 1.38 }
};

export const PROCEDURES: Procedure[] = [
  {
    id: 'all_on_4',
    name: 'All-on-4 Dental Implants (Full Arch)',
    category: 'implant',
    description: 'Permanent full-arch fixed restoration on 4 titanium or zirconia implants with immediate provisional teeth.',
    recommendedNights: 6,
    typicalTrips: 2,
    domesticUSD: { USD: 28000, GBP: 20000, EUR: 17500, AUD: 21000, CAD: 21500 },
    abroadUSD: {
      Mexico: 6200,
      Turkey: 4800,
      Hungary: 6500,
      Thailand: 5900,
      CostaRica: 6800,
      Poland: 5400,
      Colombia: 5300,
      Spain: 7800
    }
  },
  {
    id: 'all_on_6',
    name: 'All-on-6 Dental Implants (Full Mouth / Dual Arch)',
    category: 'implant',
    description: 'High-stability full mouth reconstruction with 6 implants per arch, recommended for higher bite forces.',
    recommendedNights: 7,
    typicalTrips: 2,
    domesticUSD: { USD: 52000, GBP: 36000, EUR: 32000, AUD: 38000, CAD: 39000 },
    abroadUSD: {
      Mexico: 12500,
      Turkey: 9200,
      Hungary: 12800,
      Thailand: 11500,
      CostaRica: 13200,
      Poland: 10500,
      Colombia: 10200,
      Spain: 14500
    }
  },
  {
    id: 'single_implant',
    name: 'Single Dental Implant + Abutment & Crown',
    category: 'implant',
    description: 'Complete replacement of one missing tooth including titanium post, custom abutment, and porcelain/zirconia crown.',
    recommendedNights: 4,
    typicalTrips: 2,
    domesticUSD: { USD: 4200, GBP: 3300, EUR: 2700, AUD: 3100, CAD: 3200 },
    abroadUSD: {
      Mexico: 950,
      Turkey: 750,
      Hungary: 980,
      Thailand: 890,
      CostaRica: 1100,
      Poland: 820,
      Colombia: 800,
      Spain: 1200
    }
  },
  {
    id: 'full_veneers',
    name: 'Full Porcelain/Zirconia Veneers (16-20 Teeth)',
    category: 'cosmetic',
    description: 'Custom laboratory-milled E.max or layered Zirconia veneers for upper & lower smile zone rejuvenation.',
    recommendedNights: 6,
    typicalTrips: 1,
    domesticUSD: { USD: 24000, GBP: 16000, EUR: 14000, AUD: 17000, CAD: 18000 },
    abroadUSD: {
      Mexico: 5500,
      Turkey: 3800,
      Hungary: 5200,
      Thailand: 4900,
      CostaRica: 5800,
      Poland: 4400,
      Colombia: 4200,
      Spain: 6600
    }
  },
  {
    id: 'hair_transplant',
    name: 'FUE Hair Transplant (3,500 - 4,500 Grafts)',
    category: 'medical',
    description: 'Micro-motor Sapphire FUE follicle extraction & DHI direct implantation with PRP therapy included.',
    recommendedNights: 4,
    typicalTrips: 1,
    domesticUSD: { USD: 12000, GBP: 9500, EUR: 8500, AUD: 9200, CAD: 9400 },
    abroadUSD: {
      Mexico: 3800,
      Turkey: 2300,
      Hungary: 2900,
      Thailand: 2800,
      CostaRica: 3900,
      Poland: 2600,
      Colombia: 2700,
      Spain: 4200
    }
  },
  {
    id: 'knee_replacement',
    name: 'Total Knee Replacement (Single Joint)',
    category: 'medical',
    description: 'Minimally invasive knee arthroplasty with Stryker/Zimmer prosthetic joint, 3 hospital nights, and rehab.',
    recommendedNights: 10,
    typicalTrips: 1,
    domesticUSD: { USD: 38000, GBP: 18500, EUR: 18000, AUD: 18500, CAD: 19000 },
    abroadUSD: {
      Mexico: 11500,
      Turkey: 8500,
      Hungary: 9800,
      Thailand: 10200,
      CostaRica: 12500,
      Poland: 8900,
      Colombia: 9200,
      Spain: 13500
    }
  }
];

export const DESTINATIONS: Destination[] = [
  {
    id: 'Mexico',
    name: 'Mexico',
    country: 'Mexico',
    flag: '🇲🇽',
    tagline: 'Leading choice for North American patients with drive-across border access.',
    cities: [
      { name: 'Los Algodones (Molar City)', tagline: '350+ dental clinics in a 4-block border zone', specialty: 'Full-Arch Implants & Same-Day Restorations' },
      { name: 'Tijuana', tagline: 'Direct border crossing from San Diego International Airport', specialty: 'Oral Surgery & Bone Grafting' },
      { name: 'Cancun', tagline: 'Luxury dental resort clinics combined with tropical Caribbean recuperation', specialty: 'Full Smile Makeovers & Veneers' }
    ],
    flightCostUSD: { USD: 400, GBP: 750, EUR: 800, AUD: 1600, CAD: 480 },
    hotelRatesUSD: { standard: 50, premium: 90, luxury: 165 },
    dailyMiscUSD: 35,
    accreditations: ['ADA Affiliate Member', 'JCI Accredited Centers', 'ISO 9001:2015'],
    implantBrands: ['Straumann (Switzerland)', 'Nobel Biocare (Sweden)', 'Hiossen (USA)'],
    travelDistanceNote: '1–4 hr direct flights from USA/Canada. Walk across border at Yuma or San Diego.'
  },
  {
    id: 'Turkey',
    name: 'Turkey',
    country: 'Turkey',
    flag: '🇹🇷',
    tagline: 'Global medical hub known for cutting-edge technology and all-inclusive packages.',
    cities: [
      { name: 'Istanbul', tagline: 'Europe and Asia crossway with JCI-accredited dental hospital centers', specialty: 'All-on-4 & Advanced Bone Augmentation' },
      { name: 'Antalya', tagline: 'Mediterranean coast clinics with beachfront recovery resorts', specialty: 'Cosmetic Veneers & Hair Restoration' }
    ],
    flightCostUSD: { USD: 850, GBP: 280, EUR: 220, AUD: 1400, CAD: 920 },
    hotelRatesUSD: { standard: 45, premium: 85, luxury: 150 },
    dailyMiscUSD: 30,
    accreditations: ['JCI Accredited Hospitals', 'Turkish Ministry of Health Certificate', 'ISO 9001'],
    implantBrands: ['Straumann', 'Bego (Germany)', 'Medentika', 'Nobel Biocare'],
    travelDistanceNote: '3–4 hr flight from UK/Europe. Direct flights from major US East Coast hubs.'
  },
  {
    id: 'Hungary',
    name: 'Hungary',
    country: 'Hungary',
    flag: '🇭🇺',
    tagline: 'The historic dental capital of Europe with renowned academic dental universities.',
    cities: [
      { name: 'Budapest', tagline: 'Century-old oral surgery prestige and strict EU dental medical directives', specialty: 'Full Mouth Reconstructions & Zirconia Milled Bridges' }
    ],
    flightCostUSD: { USD: 800, GBP: 140, EUR: 90, AUD: 1500, CAD: 850 },
    hotelRatesUSD: { standard: 55, premium: 95, luxury: 170 },
    dailyMiscUSD: 35,
    accreditations: ['EU CE Conformity Mark', 'Hungarian Medical Chamber', 'ISO 9001'],
    implantBrands: ['Straumann Roxolid', 'Nobel Biocare', 'Ankylos (Germany)'],
    travelDistanceNote: 'Under 2.5 hours from London, Paris, Frankfurt. Strict EU patient safety directives.'
  },
  {
    id: 'Thailand',
    name: 'Thailand',
    country: 'Thailand',
    flag: '🇹🇭',
    tagline: 'Gold-standard international hospitality and world-famous mega-hospital complexes.',
    cities: [
      { name: 'Bangkok', tagline: 'Home to multiple JCI multi-specialty dental centers', specialty: 'Prosthodontics & Laser Implant Surgery' },
      { name: 'Phuket', tagline: 'Island recuperation with tropical resort post-op dental suites', specialty: 'Cosmetic Veneers & Dental Crowns' }
    ],
    flightCostUSD: { USD: 1100, GBP: 680, EUR: 650, AUD: 550, CAD: 1250 },
    hotelRatesUSD: { standard: 40, premium: 80, luxury: 160 },
    dailyMiscUSD: 28,
    accreditations: ['JCI (Joint Commission International)', 'HA Thailand Hospital Accreditation', 'TEMOS Certified'],
    implantBrands: ['Straumann SLActive', 'Nobel Active', 'Zimmer TSV'],
    travelDistanceNote: 'Prime destination for Australia & NZ (6–8 hr direct). High English fluency.'
  },
  {
    id: 'CostaRica',
    name: 'Costa Rica',
    country: 'Costa Rica',
    flag: '🇨🇷',
    tagline: 'US-trained specialists with pristine eco-tourism recovery in the Central Valley.',
    cities: [
      { name: 'San José & Escazú', tagline: 'Modern medical district with bilingual prosthodontists and CT surgical suites', specialty: 'Full Arch Implants & Sedation Dentistry' }
    ],
    flightCostUSD: { USD: 450, GBP: 700, EUR: 780, AUD: 1800, CAD: 520 },
    hotelRatesUSD: { standard: 60, premium: 105, luxury: 185 },
    dailyMiscUSD: 40,
    accreditations: ['PROMED Costa Rica Seal', 'AAAASF Accredited Surgical Suites', 'ISO 9001'],
    implantBrands: ['Nobel Biocare', 'BioHorizons (USA)', 'Straumann'],
    travelDistanceNote: '3–5 hour non-stop flight from Miami, Houston, Atlanta, and Toronto.'
  },
  {
    id: 'Poland',
    name: 'Poland',
    country: 'Poland',
    flag: '🇵🇱',
    tagline: 'Top-tier European clinical standards with ultra-competitive pricing for UK and EU patients.',
    cities: [
      { name: 'Kraków', tagline: 'Charming historic destination with high-tech dental labs', specialty: 'Computer-Guided Implantology' },
      { name: 'Warsaw', tagline: 'Metropolitan academic clinical centers with digital impression scanners', specialty: 'Porcelain Veneers & Orthodontics' }
    ],
    flightCostUSD: { USD: 750, GBP: 120, EUR: 80, AUD: 1450, CAD: 800 },
    hotelRatesUSD: { standard: 48, premium: 88, luxury: 155 },
    dailyMiscUSD: 30,
    accreditations: ['EU CE Certified', 'Polish Dental Association (PTS)', 'ISO 9001'],
    implantBrands: ['Straumann', 'Nobel Biocare', 'Dentsply Sirona'],
    travelDistanceNote: '2 hours from London & Scandinavian hubs with frequent budget carrier connections.'
  },
  {
    id: 'Colombia',
    name: 'Colombia',
    country: 'Colombia',
    flag: '🇨🇴',
    tagline: 'Renowned for cosmetic aesthetics, high-tech digital laboratories, and exceptional value.',
    cities: [
      { name: 'Medellín', tagline: 'City of Eternal Spring with internationally renowned cosmetic dental designers', specialty: 'Composite & Porcelain Veneers' },
      { name: 'Bogotá', tagline: 'Capital medical center with advanced university teaching clinics', specialty: 'Maxillofacial Surgery & Implants' }
    ],
    flightCostUSD: { USD: 480, GBP: 750, EUR: 790, AUD: 1750, CAD: 560 },
    hotelRatesUSD: { standard: 45, premium: 85, luxury: 150 },
    dailyMiscUSD: 30,
    accreditations: ['ICONTEC Certified', 'Colombian Dental College', 'ISO 9001'],
    implantBrands: ['Straumann', 'Nobel Biocare', 'MIS Implants'],
    travelDistanceNote: '3.5–5 hours from Florida & Texas hubs. Modern metro transport.'
  },
  {
    id: 'Spain',
    name: 'Spain',
    country: 'Spain',
    flag: '🇪🇸',
    tagline: 'Premier Western European healthcare system with stringent clinical oversight.',
    cities: [
      { name: 'Barcelona', tagline: 'World-renowned medical research centers with Mediterranean lifestyle', specialty: 'Zirconia Monolithic Restorations' },
      { name: 'Madrid', tagline: 'Top university dental hospital faculties', specialty: 'Advanced Oral Surgery & Sinus Lifts' }
    ],
    flightCostUSD: { USD: 750, GBP: 150, EUR: 100, AUD: 1500, CAD: 820 },
    hotelRatesUSD: { standard: 75, premium: 125, luxury: 220 },
    dailyMiscUSD: 45,
    accreditations: ['Spanish General Dental Council (CGCOE)', 'JCI Accredited Hospitals', 'EU CE Marked'],
    implantBrands: ['Straumann', 'Nobel Biocare', 'Zimmer Biomet'],
    travelDistanceNote: '2 hours from UK/Northern Europe. Top-tier clinical malpractice protections.'
  }
];

export const DEFAULT_DESTINATION_FOR_ORIGIN: Record<CurrencyCode, string[]> = {
  USD: ['Mexico', 'CostaRica', 'Colombia', 'Turkey', 'Hungary', 'Thailand'],
  GBP: ['Turkey', 'Hungary', 'Poland', 'Spain', 'Thailand'],
  EUR: ['Hungary', 'Turkey', 'Poland', 'Spain', 'Thailand'],
  AUD: ['Thailand', 'Turkey', 'Hungary', 'Mexico'],
  CAD: ['Mexico', 'CostaRica', 'Colombia', 'Turkey', 'Hungary']
};
