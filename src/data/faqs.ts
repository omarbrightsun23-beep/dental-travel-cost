export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'cost' | 'safety' | 'logistics';
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'cost',
    question: 'How much does a full mouth of dental implants cost in Turkey including flights and hotel?',
    answer: 'A full mouth of dental implants (All-on-4 or All-on-6 per arch) in Turkey typically costs £4,800–£8,500 ($6,000–$11,000 USD) including surgery, premium titanium implants, 4-star hotel accommodation, and VIP clinic transfers. Adding round-trip airfare from London (£250–£350) brings the total all-in investment to roughly £5,100–£8,850, saving patients between 65% and 75% compared to private UK (£24,000+) or US ($50,000+) costs.'
  },
  {
    id: 'faq-2',
    category: 'cost',
    question: 'Why is dental work in Mexico so much cheaper than the US?',
    answer: 'Dental care in Mexico is 60% to 75% cheaper due to structural macroeconomic differences, not lower clinical quality. Mexican dentists benefit from significantly lower real estate rents, lower payroll overhead, and pay a fraction of the high malpractice insurance premiums required in the US. In border dental hubs like Los Algodones and Tijuana, high surgical volumes allow clinics to purchase identical FDA-approved implants (Straumann, Nobel Biocare) directly from manufacturers at wholesale discounts.'
  },
  {
    id: 'faq-3',
    category: 'logistics',
    question: 'Do you need two separate trips abroad for All-on-4 implants?',
    answer: 'Yes, true full-arch restorations require two separate visits spaced 3 to 6 months apart. Trip 1 (5–7 days) covers extractions, titanium implant placement, and immediate temporary fixed prosthetics (you never leave without teeth). Trip 2 (5–7 days) takes place after full osseointegration (bone fusion) to permanently screw in your final custom-milled monolithic zirconia bridge. Our calculator includes airfare and lodging for both trips to ensure complete budget accuracy.'
  },
  {
    id: 'faq-4',
    category: 'safety',
    question: 'What happens if a dental implant done abroad fails when I return home?',
    answer: 'Accredited international clinics provide multi-year or lifetime structural warranties on genuine implant hardware. If an implant fails to integrate (which occurs in roughly 2–4% of cases globally), partner clinics replace the post at zero additional surgical cost. Furthermore, because international centers use worldwide standards (Straumann, Nobel Biocare, Zimmer), replacement abutments and screws can be serviced by domestic oral surgeons in your home country.'
  },
  {
    id: 'faq-5',
    category: 'logistics',
    question: 'How many days do I need to stay in the country after dental implant surgery?',
    answer: 'Oral and maxillofacial surgeons enforce remaining in your destination city for at least 48 to 72 hours following surgical placement or bone grafting before boarding a pressurized commercial aircraft. Cabin pressure changes within 24 hours of bone grafting risk sinus barotrauma and acute edema. A standard dental vacation itinerary spans 5 to 7 nights to allow proper post-op healing and an in-person follow-up examination.'
  },
  {
    id: 'faq-6',
    category: 'safety',
    question: 'Can domestic dentists in the US/UK service or repair dental implants placed overseas?',
    answer: 'Yes, provided your international clinic issues you an official Implant Passport documenting the exact brand, platform diameter, and torque specifications. Because top international clinics use universal systems (Nobel Biocare, Straumann, Zimmer Biomet, Hiossen), any licensed prosthodontist in your home country can access matching drivers and replacement components.'
  },
  {
    id: 'faq-7',
    category: 'cost',
    question: 'Is it really cheaper to get dental implants abroad when factoring flights and hotels?',
    answer: 'Yes. Even after budgeting for round-trip international flights ($400–$1,100), 5 to 7 nights in a 4-star recovery hotel ($450–$650), private medical transfers ($160), and 3D CBCT diagnostic imaging ($150), patients restoring a full arch save between $15,000 and $22,000 (65% to 75% net savings) compared to domestic out-of-pocket fees.'
  },
  {
    id: 'faq-8',
    category: 'cost',
    question: 'What is the cheapest country for All-on-4 dental implants with safe standards?',
    answer: 'Turkey and Mexico offer the lowest all-in pricing with verified JCI and ISO clinical standards. Turkey packages start around £4,800 ($6,000 USD) for full-arch All-on-4 including luxury hotel lodging. Mexico offers All-on-4 starting at $6,200 USD, with the added benefit of drive-across border access for North American patients via Yuma, Arizona (Los Algodones) and San Diego, California (Tijuana).'
  },
  {
    id: 'faq-9',
    category: 'cost',
    question: 'Can I use my domestic dental insurance or HSA / FSA funds for overseas treatment?',
    answer: 'Yes. In the United States, Health Savings Accounts (HSA) and Flexible Spending Accounts (FSA) can legally reimburse overseas dental surgery under IRS Publication 502, provided the procedure is medically necessary. Additionally, many private PPO dental plans offer out-of-network benefits: request an itemized superbill with standard American Dental Association (ADA) CDT procedure codes upon clinic checkout.'
  },
  {
    id: 'faq-10',
    category: 'safety',
    question: 'How does DentalTravelCost verify clinic sterility and safety standards?',
    answer: 'We only index hospital facilities holding verified Joint Commission International (JCI), ISO 9001:2015, or national health ministry surgical accreditations. Verified clinics must use Class B vacuum autoclaves with third-party biological spore testing and exclusively deploy genuine titanium fixtures from tier-1 manufacturers.'
  }
];

export interface SafetyChecklistItem {
  id: string;
  title: string;
  description: string;
  crucialDetail: string;
}

export const SAFETY_CHECKLIST_ITEMS: SafetyChecklistItem[] = [
  {
    id: 'check-1',
    title: 'International Hospital Accreditation',
    description: 'Clinic holds active JCI (Joint Commission International), ISO 9001:2015, or GCR accreditation with documented sterilization protocols.',
    crucialDetail: 'Ensure sterilization rooms use Class B autoclaves with vacuum biological spore testing.'
  },
  {
    id: 'check-2',
    title: 'Recognized Worldwide Implant Brand & Passport',
    description: 'Demand Tier-1 global implant brands (Straumann, Nobel Biocare, Zimmer, Hiossen) with official manufacturer warranty passports.',
    crucialDetail: 'Avoid off-brand white-label implants that domestic dentists will lack driver tools to service.'
  },
  {
    id: 'check-3',
    title: 'Surgeon Credentials & Oral Specialty',
    description: 'The operator is a dedicated Maxillofacial Surgeon or Prosthodontist, not a general dentist performing complex surgery.',
    crucialDetail: 'Verify registration with national dental boards (e.g. ADM Mexico, TDB Turkey, MOK Hungary).'
  },
  {
    id: 'check-4',
    title: '3D CBCT Digital Planning & Surgical Guides',
    description: 'Clinic uses in-house 3D Cone Beam Computed Tomography (CBCT) rather than standard 2D panoramic films.',
    crucialDetail: 'Allows 3D millimeter-accurate nerve canal mapping and computer-guided implant placement.'
  },
  {
    id: 'check-5',
    title: 'Written Warranty & Revision Terms',
    description: 'Clear written policy guaranteeing free lab replacement or re-implantation if osseointegration fails.',
    crucialDetail: 'Request the exact written guarantee document in English before paying surgical deposits.'
  },
  {
    id: 'check-6',
    title: 'Mandatory 48–72h Post-Op Rest Prior to Flying',
    description: 'Schedule sufficient recovery buffer before boarding pressurized commercial aircraft.',
    crucialDetail: 'Cabin pressure changes within 24 hours of bone grafting can cause acute sinus membrane pain.'
  },
  {
    id: 'check-7',
    title: 'Pre-Approved Travel Insurance with Medical Complication Cover',
    description: 'Specialized medical travel policy covering unexpected flight rescheduling or hospital stays.',
    crucialDetail: 'Standard vacation travel insurance usually excludes elective dental and surgical procedures.'
  }
];
