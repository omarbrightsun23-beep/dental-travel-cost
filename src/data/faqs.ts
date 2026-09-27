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
    answer: 'A full mouth of dental implants (All-on-4 or All-on-6 per arch) in Turkey typically costs £4,800–£8,500 ($6,000–$11,000 USD) including surgery, premium titanium implants, 4-star recovery hotel accommodation, and VIP clinic transfers. Adding round-trip airfare from London (£150–£300) or New York ($600–$900) brings the total all-in cost to roughly £5,100–£8,800 ($6,600–$11,900 USD). Patients save between 65% and 75% compared to private UK or US quotes.'
  },
  {
    id: 'faq-2',
    category: 'cost',
    question: 'Why is dental work in Mexico so much cheaper than the US?',
    answer: 'Dental care in Mexico is 60% to 75% cheaper due to structural macroeconomic differences, not lower clinical quality. Mexican dental clinics operate with substantially lower commercial rents, lower staff overhead, and pay a fraction of the astronomical malpractice insurance premiums required in the United States. In border dental hubs like Los Algodones (Molar City) and Tijuana, high surgical volumes enable clinics to purchase authentic FDA-approved titanium implants (Straumann, Nobel Biocare) in bulk directly from manufacturers at wholesale rates.'
  },
  {
    id: 'faq-3',
    category: 'logistics',
    question: 'Do you need two separate trips abroad for All-on-4 implants?',
    answer: 'Yes, clinical protocol for full-arch permanent restorations requires two separate trips spaced 3 to 6 months apart. Trip 1 (5–7 days) covers 3D CBCT scans, extractions, titanium implant fixture placement, and immediate high-density provisional teeth. Trip 2 (5–7 days) occurs once the implants have fully fused to your jawbone (osseointegration), during which your permanent, custom-milled monolithic zirconia bridge is secured. Our calculator automatically models flights and lodging for both trips.'
  },
  {
    id: 'faq-4',
    category: 'safety',
    question: 'What happens if a dental implant done abroad fails when I return home?',
    answer: 'Accredited international clinics provide multi-year or lifetime structural manufacturer warranties. While implant osseointegration failure is rare (occurring in only 2% to 4% of cases globally), accredited clinics replace the failed implant fixture and perform revision surgery at zero clinic charge. Furthermore, because partner facilities use worldwide tier-1 brands (Straumann, Nobel Biocare, Zimmer, Hiossen), any licensed oral surgeon in the US or UK can access matching drivers and components.'
  },
  {
    id: 'faq-5',
    category: 'logistics',
    question: 'How many days do I need to stay in the country after dental implant surgery?',
    answer: 'Maxillofacial surgeons recommend remaining in your destination city for at least 48 to 72 hours following surgical fixture placement or sinus bone grafting before boarding a pressurized commercial airplane. This stabilizes blood pressure, prevents sinus barotrauma, and enables an in-person 48-hour follow-up examination. Most patients book a 5-to-7-night itinerary for comprehensive post-op care.'
  },
  {
    id: 'faq-6',
    category: 'safety',
    question: 'Can domestic dentists in the US/UK service or repair dental implants placed overseas?',
    answer: 'Yes, provided your international clinic provides you with an official Implant Passport documenting the exact brand, platform connection, diameter, and screw torque values. Because reputable international hospitals utilize universal implant systems (Straumann, Nobel Biocare, Zimmer Biomet, Hiossen), domestic dentists and prosthodontists have standard restorative driver kits to service, adjust, or clean them.'
  },
  {
    id: 'faq-7',
    category: 'cost',
    question: 'Is it really cheaper to get dental implants abroad and how much do you actually save on dental tourism?',
    answer: 'Yes. Even after budgeting for return international flights, 5 to 7 nights in 4-star hotels, daily food, and local transfers, patients having major dental work (All-on-4 full arch, full mouth restorations, or multiple single implants) net real savings of $12,000 to $35,000 (£8,000 to £22,000 / $18,000 to $45,000 AUD). For minor treatments under $1,000, travel costs can offset savings; for full-arch or multi-unit cases, the net savings are massive.'
  },
  {
    id: 'faq-8',
    category: 'safety',
    question: 'What is the cheapest country for All-on-4 dental implants with safe standards?',
    answer: 'Turkey and Mexico offer the lowest all-in prices for All-on-4 dental implants while maintaining rigorous international hospital standards (JCI and ISO 9001:2015 certifications). In Turkey, all-inclusive packages range from $4,500 to $7,500 per arch with luxury accommodation included. In Mexico (Los Algodones, Tijuana, Cancun), All-on-4 ranges from $6,500 to $10,500 per arch with zero transatlantic flight fatigue for North American patients.'
  },
  {
    id: 'faq-9',
    category: 'cost',
    question: 'Can I use my domestic dental insurance or HSA / FSA funds for dental travel?',
    answer: 'Yes. US patients can use Health Savings Accounts (HSA) and Flexible Spending Accounts (FSA) for qualified dental care received abroad. In addition, many private PPO dental insurance providers provide out-of-network reimbursement: simply ask the international clinic for an itemized ADA-coded claim form (superbill) before departure.'
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
