
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'How to Use US HSA & FSA Funds for Overseas Medical & Dental Procedures',
    excerpt: 'Step-by-step IRS compliance rules, how to request an ADA-coded superbill, and tax deduction thresholds for international medical travel.',
    category: 'Finance & Insurance',
    readTime: '4 min read',
    date: 'September 2026',
    content: 'Under IRS Publication 502, medical expenses incurred outside the United States are legally eligible for reimbursement through Health Savings Accounts (HSA), Flexible Spending Accounts (FSA), and as itemized medical deductions, provided the treatment is legally permissible in the destination jurisdiction and medically necessary. To ensure seamless reimbursement: 1. Request an ADA Superbill from the international clinic formatted with standard American Dental Association CDT procedure codes. 2. Retain itemized flight and hotel receipts for the patient and one medically necessary companion. 3. Submit directly through your HSA custodian portal without tax penalties.'
  },
  {
    id: 'blog-2',
    title: 'Osseointegration & Air Travel: Why You Must Wait 48 Hours Before Boarding',
    excerpt: 'Clinical explanation of cabin barometric pressure changes, sinus membrane healing, and the mandatory post-operative recovery rest period.',
    category: 'Patient Safety',
    readTime: '5 min read',
    date: 'August 2026',
    content: 'Commercial aircraft cabins are typically pressurized to an equivalent altitude of 6,000 to 8,000 feet above sea level. In the immediate 24 to 48 hours following bone grafting, sinus lifts, or full-arch implant placement, the micro-vascular capillary bed is in acute inflammatory stabilization. Flying prematurely risks sinus barotrauma, secondary hemorrhage, and localized edema. Board-certified maxillofacial surgeons enforce a mandatory 48-to-72 hour ground recovery period before clearing patients for commercial aviation.'
  },
  {
    id: 'blog-3',
    title: 'Straumann vs Nobel Biocare: Why International Implant Brand Passports Matter',
    excerpt: 'Why choosing globally distributed implant brands guarantees that any domestic hometown dentist can service your replacement parts.',
    category: 'Technology',
    readTime: '3 min read',
    date: 'July 2026',
    content: 'The most dangerous mistake a dental traveler can make is accepting unbranded, white-label implants. If an unbranded titanium screw ever requires an abutment change or crown replacement 5 years later, domestic dentists will lack the proprietary screwdriver tools or screw threads to service it. Leading international hospitals exclusively use tier-1 manufacturers (Straumann, Nobel Biocare, Zimmer, Hiossen) and provide an official Implant Passport with traceable lot numbers and international warranty certificates.'
  }
];

export interface WhyUsPoint {
  title: string;
  diyProblem: string;
  dentalTravelCostSolution: string;
}

export const WHY_US_POINTS: WhyUsPoint[] = [
  {
    title: 'Verified JCI & ISO Sterilization Oversight',
    diyProblem: 'Booking directly on social media exposes patients to uninspected, unaccredited street storefronts.',
    dentalTravelCostSolution: 'We only index hospital facilities holding verified Joint Commission International or ISO 9001:2015 biological spore sterilization audits.'
  },
  {
    title: 'All-In Price Lock Guarantee',
    diyProblem: 'Clinics advertise "$3,000 implants" that balloon to $10,000 once you arrive in the dental chair due to hidden bone graft fees.',
    dentalTravelCostSolution: 'Guaranteed comprehensive itemization including 3D CBCT imaging, temporary provisonals, surgeon fees, medications, and abutments.'
  },
  {
    title: 'Worldwide Manufacturer Passport',
    diyProblem: 'Low-cost clinics often use off-brand implants that domestic dentists in the US, UK, or Canada cannot service.',
    dentalTravelCostSolution: '100% genuine Straumann or Nobel Biocare titanium fixtures with international serial passports that any dentist worldwide can adjust.'
  },
  {
    title: 'VIP Airport Escort & Dedicated Medical Van',
    diyProblem: 'Navigating foreign border crossings, public taxis, or unsafe neighborhoods right after oral surgery.',
    dentalTravelCostSolution: 'Private English-speaking medical driver coordinates your border crossing, airport pickup, and hotel-to-clinic shuttles.'
  }
];
