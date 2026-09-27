import React, { useState, useEffect } from 'react';
import {
  X,
  Shield,
  FileText,
  AlertTriangle,
  Info,
  Mail,
  Phone,
  MapPin,
  Clock,
  Printer,
  CheckCircle2,
  ExternalLink,
  Lock,
  Search
} from 'lucide-react';

export type PolicyTab = 'privacy' | 'terms' | 'disclaimer' | 'about' | 'contact';

const TAB_URLS: Record<PolicyTab, string> = {
  privacy: '/privacy-policy',
  terms: '/terms-and-conditions',
  disclaimer: '/disclaimer',
  about: '/about',
  contact: '/contact'
};

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: PolicyTab;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy'
}) => {
  const [activeTab, setActiveTab] = useState<PolicyTab>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync initial tab when opening
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setSearchQuery('');
    }
  }, [isOpen, initialTab]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="border-b border-slate-200 dark:border-slate-800 p-4 sm:p-6 bg-slate-50/80 dark:bg-[#111C38]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold text-blue-600 dark:text-blue-400 tracking-wider">
                  Official Legal & Compliance Center
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
                  Updated Sept 2026
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                DentalTravelCost Policies
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <a
              href={TAB_URLS[activeTab]}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B132B] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold items-center gap-1.5 transition-colors"
              title="Open full standalone page in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Dedicated Page</span>
            </a>
            <button
              onClick={handlePrint}
              type="button"
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B132B] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Print document"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={onClose}
              type="button"
              className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B132B] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selection Bar */}
        <div className="border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-2.5 bg-white dark:bg-[#0B132B] flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeTab === 'privacy'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            Privacy Policy
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeTab === 'terms'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Terms & Conditions
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('disclaimer')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeTab === 'disclaimer'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Medical Disclaimer
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('about')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeTab === 'about'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            About Us
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('contact')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
              activeTab === 'contact'
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            Contact Us
          </button>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-6">
          
          {/* TAB 1: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 p-4 rounded-2xl">
                <div className="flex items-center gap-2 font-bold text-blue-900 dark:text-blue-200 text-sm mb-1">
                  <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  Google Advertising & GDPR / CCPA Compliance Disclosure
                </div>
                <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
                  DentalTravelCost (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy details our data practices across our dental travel cost calculator, comparison matrices, and consultation services in strict compliance with Google Publisher Policies, General Data Protection Regulation (GDPR), and California Consumer Privacy Act (CCPA/CPRA).
                </p>
              </div>

              <section className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-black flex items-center justify-center">1</span>
                  Information We Collect
                </h3>
                <p>We collect information in three ways to deliver our transparent procedural calculations:</p>
                <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  <li>
                    <strong className="text-slate-900 dark:text-white">Voluntary User Input:</strong> When you request an itemized cost estimate, schedule a doctor callback, or request clinic verification, you may submit your name, email address, telephone/WhatsApp number, current dental situation, and radiographic records (e.g., panoramic CT or X-rays).
                  </li>
                  <li>
                    <strong className="text-slate-900 dark:text-white">Calculator Parameters:</strong> Anonymous computational data including chosen procedures (e.g., All-on-4, single titanium implant, porcelain crown), target destination (e.g., Mexico, Turkey, Costa Rica), selected hotel tier, and base domestic currency.
                  </li>
                  <li>
                    <strong className="text-slate-900 dark:text-white">Automated Technical & Device Data:</strong> IP address (anonymized), browser user-agent, operating system, language preferences, referring URLs, and interaction timestamps collected via cookies and server logs.
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-black flex items-center justify-center">2</span>
                  Cookies & Third-Party Advertising Technologies (Google AdSense)
                </h3>
                <p className="text-xs sm:text-sm">
                  We use essential, analytical, and functional cookies. In adherence to Google Publisher Policies:
                </p>
                <div className="bg-slate-50 dark:bg-[#111C38] p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                  <p>
                    • <strong>Third-Party Vendors:</strong> Google and third-party vendors use cookies (such as the Google DoubleClick cookie) to serve relevant advertisements based on a user&apos;s prior visits to this website or other websites on the internet.
                  </p>
                  <p>
                    • <strong>Opting Out of Personalized Advertising:</strong> Users may opt out of personalized advertising by visiting{' '}
                    <a
                      href="https://adssettings.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 underline font-semibold"
                    >
                      Google Ads Settings
                    </a>
                    . Alternatively, you may opt out of third-party vendor use of cookies for personalized advertising by visiting{' '}
                    <a
                      href="https://www.aboutads.info/choices/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 underline font-semibold"
                    >
                      www.aboutads.info
                    </a>
                    .
                  </p>
                  <p>
                    • <strong>Google Analytics:</strong> We use Google Analytics with IP anonymization enabled to understand aggregate calculator usage patterns. You can opt out via the{' '}
                    <a
                      href="https://tools.google.com/dlpage/gaoptout"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 underline font-semibold"
                    >
                      Google Analytics Opt-out Browser Add-on
                    </a>
                    .
                  </p>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-black flex items-center justify-center">3</span>
                  How We Use Your Data
                </h3>
                <p className="text-xs sm:text-sm">Your data is strictly utilized to:</p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  <li>Generate accurate cross-border procedural, airfare, and lodging price estimates.</li>
                  <li>Connect you with certified JCI / ISO accredited hospital coordinators upon your explicit request.</li>
                  <li>Detect fraudulent automated bot scraping and preserve data integrity across price matrices.</li>
                  <li>Comply with applicable legal mandates and health data privacy standards.</li>
                </ul>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  We NEVER sell, rent, or trade your personal medical records or contact details to third-party telemarketers or non-affiliated brokers.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-black flex items-center justify-center">4</span>
                  Your GDPR & CCPA/CPRA Privacy Rights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800">
                    <strong className="block text-slate-900 dark:text-white font-bold mb-1">European Union / UK (GDPR)</strong>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                      You have the right to access, rectify, or erase personal data, restrict or object to processing, data portability, and the right to lodge a complaint with your local data protection authority.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800">
                    <strong className="block text-slate-900 dark:text-white font-bold mb-1">California Residents (CCPA/CPRA)</strong>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                      You have the right to request disclosure of personal categories collected, request deletion, opt out of any hypothetical sale or sharing, and receive equal service without discrimination.
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-black flex items-center justify-center">5</span>
                  Data Security & Retention
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  All transmissions over DentalTravelCost are encrypted via 256-bit TLS/SSL protocols. Clinical inquiries and submitted scans are retained only for the duration necessary to formulate your procedural quote and follow-up consultation, typically not exceeding 24 months unless required by healthcare records preservation statutes.
                </p>
              </section>

              <section className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="font-bold text-slate-900 dark:text-white">Data Protection Officer & Privacy Inquiries:</div>
                <p className="text-slate-600 dark:text-slate-400">
                  Email: <a href="mailto:privacy@dentaltravelcost.com" className="text-blue-600 dark:text-blue-400 font-semibold underline">privacy@dentaltravelcost.com</a>
                </p>
                <p className="text-slate-500">Mailing Address: DentalTravelCost Global Compliance Desk, 1000 Brickell Ave, Suite 710, Miami, FL 33131, United States.</p>
              </section>
            </div>
          )}

          {/* TAB 2: TERMS & CONDITIONS */}
          {activeTab === 'terms' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 p-4 rounded-2xl">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm mb-1">
                  <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  Terms of Service & Platform Agreement
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Please review these Terms and Conditions carefully before using DentalTravelCost (&quot;the Platform&quot;). By accessing or using the calculator, destination matrices, or consultation booking mechanisms, you agree to be bound by these Terms.
                </p>
              </div>

              <section className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-black flex items-center justify-center">1</span>
                  Platform Purpose & Scope of Services
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  DentalTravelCost is an independent healthcare procedural cost benchmark, educational directory, and logistics calculator. We provide comparative statistical indexes evaluating out-of-pocket costs for elective dental procedures across international corridors (e.g., Mexico, Turkey, Costa Rica, Thailand, Hungary) compared with domestic national averages (e.g., USA, UK, Canada, Australia).
                </p>
                <p className="text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200 dark:border-amber-800 font-medium">
                  DentalTravelCost is NOT a dental clinic, licensed hospital, or healthcare provider. We do not practice medicine, provide diagnosis, or perform surgeries. Any dental treatment you undergo is contracted directly between you and the independent licensed clinic or surgeon you choose.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-black flex items-center justify-center">2</span>
                  User Conduct & Responsibilities
                </h3>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  <li>
                    <strong>Medical Due Diligence:</strong> You acknowledge that you are solely responsible for verifying the credentials, licensing, sterilization protocols, and suitability of any dental clinic, surgeon, or facility prior to booking or undergoing treatment.
                  </li>
                  <li>
                    <strong>Travel & Passport Documentation:</strong> You are solely responsible for obtaining valid passports, medical visas, international travel clearances, immunization certificates, and insurance coverage.
                  </li>
                  <li>
                    <strong>Accurate Health Declarations:</strong> When requesting clinic evaluations, you agree to provide truthful, accurate, and non-misleading clinical history and radiographic records.
                  </li>
                  <li>
                    <strong>No Unlawful Use:</strong> You agree not to reverse engineer, systematically scrape, copy, or distribute our proprietary cost models, algorithm parameters, or design without written authorization.
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-black flex items-center justify-center">3</span>
                  Intellectual Property
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  All procedural cost calculations, code, graphics, brand marks, corridor matrix layouts, osseointegration timelines, and editorial content are the exclusive intellectual property of DentalTravelCost, protected by copyright, trademark, and international treaties.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-black flex items-center justify-center">4</span>
                  Limitation of Liability & Warranty Disclaimers
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  TO THE FULLEST EXTENT PERMITTED BY LAW, DENTALTRAVELCOST DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. WE DO NOT GUARANTEE SPECIFIC CLINICAL OUTCOMES, HEALING TIMES, OSSEOINTEGRATION SUCCESS RATES, OR EXACT FIXED PRICING FROM THIRD-PARTY CLINICS.
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  IN NO EVENT SHALL DENTALTRAVELCOST, ITS DIRECTORS, EMPLOYEES, OR PARTNERS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES ARISING OUT OF YOUR USE OF THE WEBSITE, TRAVEL DECISIONS, CLINICAL TREATMENT, OR CLINIC DISPUTES.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-black flex items-center justify-center">5</span>
                  Governing Law & Jurisdiction
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  These Terms shall be governed by and construed in accordance with the laws of the State of Florida, United States, without regard to its conflict of law principles. Any dispute arising under these Terms shall be resolved in the state or federal courts located in Miami-Dade County, Florida.
                </p>
              </section>
            </div>
          )}

          {/* TAB 3: MEDICAL DISCLAIMER (CRITICAL FOR GOOGLE HEALTH / YMYL POLICIES) */}
          {activeTab === 'disclaimer' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 sm:p-5 rounded-2xl">
                <div className="flex items-center gap-2.5 font-extrabold text-amber-900 dark:text-amber-300 text-base mb-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                  Mandatory Medical & Financial Disclaimer (Google YMYL Compliance)
                </div>
                <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed font-medium">
                  THE INFORMATION PROVIDED ON DENTALTRAVELCOST IS FOR GENERAL INFORMATIONAL AND EDUCATIONAL PLANNING PURPOSES ONLY. IT IS NOT INTENDED AS MEDICAL, DENTAL, SURGICAL, OR LEGAL ADVICE AND MUST NEVER SUBSTITUTE FOR DIRECT PROFESSIONAL CLINICAL EVALUATION.
                </p>
              </div>

              <section className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 text-xs font-black flex items-center justify-center">1</span>
                  No Doctor-Patient Relationship
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Accessing this website, utilizing our cost calculator, reviewing procedure timelines, or communicating with our coordination desk does NOT establish a doctor-patient, dentist-patient, or confidential medical relationship between you and DentalTravelCost.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 text-xs font-black flex items-center justify-center">2</span>
                  Anatomical Variability & Clinical Nuance
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Every patient&apos;s oral anatomy, alveolar bone volume, periodontal health, and medical history are unique. Base calculator estimates (e.g. All-on-4 or dental implants) presume standard bone architecture. A certified oral surgeon must perform an in-person physical clinical examination, periodontal charting, and a high-resolution 3D Cone Beam Computed Tomography (CBCT) scan.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white block">Potential Unplanned Clinical Additions:</span>
                  <p>
                    Depending on your clinical presentation, your final on-site surgeon may prescribe supplementary treatments not captured in base quotes, including bilateral sinus lifts, autogenous bone grafting, PRF (Platelet-Rich Fibrin) membranes, periodontal debridement, or extended multi-stage osseointegration healing periods requiring an additional trip.
                  </p>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 text-xs font-black flex items-center justify-center">3</span>
                  Financial & Currency Volatility Disclaimer
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Cost estimates are benchmarked against historical fee surveys (ADA, BDA) and accredited international hospital price lists. While exchange rates are refreshed continuously, local currencies (e.g., Mexican Peso MXN, Turkish Lira TRY, Euro EUR) fluctuate. Airfare and hotel lodging rates fluctuate based on seasonality, lead time, and geopolitical conditions. Final invoices are set exclusively by the treating clinic and respective travel providers.
                </p>
              </section>

              <section className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 space-y-2">
                <div className="font-bold text-red-900 dark:text-red-200 text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                  Medical Emergency Notice
                </div>
                <p className="text-xs text-red-800 dark:text-red-300 leading-relaxed">
                  If you are experiencing an acute medical or dental emergency, such as uncontrolled post-operative bleeding, rapid facial swelling affecting airway patency, high fever, or severe infection, DO NOT DELAY BY SENDING A MESSAGE. Immediately call your local emergency service (<strong>911 in USA/Canada</strong>, <strong>999 in UK</strong>, <strong>112 in Europe</strong>) or go to the nearest emergency hospital.
                </p>
              </section>
            </div>
          )}

          {/* TAB 4: ABOUT US (E-E-A-T EDITORIAL STANDARDS) */}
          {activeTab === 'about' && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
                  <Info className="w-4 h-4" />
                  About DentalTravelCost Index
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Democratizing Global Dental Pricing with Full Cost Transparency
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Founded in 2021 by a consortium of healthcare economists, patient advocates, and international medical travelers, DentalTravelCost was built to solve the single largest trust issue in overseas dental care: deceptive partial quotes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                    1
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">True All-In Calculations</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Single-clinic websites market misleading base surgery costs while concealing required titanium abutments, multi-night recovery stays, return airfare, and domestic flight connections. Our index factors 100% of out-of-pocket expenses.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                    2
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Zero Unbranded Implants</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    We strictly monitor implant authenticity. Clinics featured in our benchmark must exclusively place verified medical-grade titanium fixtures from tier-1 global manufacturers (Straumann Group, Nobel Biocare, Zimmer Biomet).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                    3
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">JCI & ISO Accreditation Audits</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Our safety registry requires hospitals and dental surgical centers to maintain active international accreditations (Joint Commission International, ISO 9001:2015, or national health ministry surgical licenses).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                    4
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">Editorial & Data Independence</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Our fee index is compiled from real patient invoices, clinic fee schedules, and public dental association statistics (ADA, BDA, ADAU). We do not accept undisclosed sponsored rankings.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 space-y-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Our Research & Editorial Board</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Our calculations and guides are continually reviewed by healthcare economists and consulting prosthodontists to ensure procedural accuracy, osseointegration clinical timelines, and realistic patient expectations.
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: CONTACT US (GOOGLE TRANSPARENCY STANDARDS) */}
          {activeTab === 'contact' && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
                  <Mail className="w-4 h-4" />
                  Direct Patient Coordination & Global Desks
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Get in Touch with our Care Team
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Whether you have questions regarding our procedural calculations, wish to verify hospital accreditations, or need assistance connecting with a certified coordinator, our team is available 7 days a week.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white text-sm">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                    North American Toll-Free
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Patient Intake & Corridor Guidance:
                  </p>
                  <a
                    href="tel:15555678901"
                    className="text-base font-extrabold text-blue-600 dark:text-blue-400 hover:underline block"
                  >
                    (555) 567-8901
                  </a>
                  <span className="text-[11px] text-slate-400 block">Mon–Fri: 7:00 AM – 9:00 PM EST · Sat–Sun: 9:00 AM – 6:00 PM EST</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white text-sm">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    Dedicated Email Desks
                  </div>
                  <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
                    <li>
                      • <strong>Clinical Cases:</strong>{' '}
                      <a href="mailto:coordination@dentaltravelcost.com" className="text-blue-600 dark:text-blue-400 underline font-medium">
                        coordination@dentaltravelcost.com
                      </a>
                    </li>
                    <li>
                      • <strong>General & Press:</strong>{' '}
                      <a href="mailto:contact@dentaltravelcost.com" className="text-blue-600 dark:text-blue-400 underline font-medium">
                        contact@dentaltravelcost.com
                      </a>
                    </li>
                    <li>
                      • <strong>Privacy & Legal:</strong>{' '}
                      <a href="mailto:compliance@dentaltravelcost.com" className="text-blue-600 dark:text-blue-400 underline font-medium">
                        compliance@dentaltravelcost.com
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white text-sm">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                      <MapPin className="w-4 h-4" />
                    </div>
                    Corporate & Administrative Office
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    DentalTravelCost Benchmark Index<br />
                    1000 Brickell Avenue, Suite 710<br />
                    Miami, Florida 33131, United States
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white text-sm">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                      <Clock className="w-4 h-4" />
                    </div>
                    Regional Field Hubs
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    On-the-ground patient assistance liaison points located in:
                  </p>
                  <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                    • Los Algodones & Cancun, Mexico<br />
                    • Antalya & Istanbul, Turkey<br />
                    • San José, Costa Rica<br />
                    • Budapest, Hungary · Bangkok, Thailand
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 flex items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-blue-900 dark:text-blue-200 text-xs sm:text-sm">
                    Need an immediate itemized surgical quote?
                  </div>
                  <p className="text-[11px] text-blue-800 dark:text-blue-300">
                    Use our interactive on-page calculator or request a custom callback.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    const calc = document.getElementById('calculator');
                    if (calc) calc.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition shadow-sm cursor-pointer shrink-0"
                >
                  Open Calculator
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Bar with Quick Policy Switchers */}
        <div className="border-t border-slate-200 dark:border-slate-800 p-4 bg-slate-50/80 dark:bg-[#111C38]/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 shrink-0">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Quick Policies:</span>
            <button
              type="button"
              onClick={() => setActiveTab('privacy')}
              className={`hover:underline cursor-pointer ${activeTab === 'privacy' ? 'font-bold text-blue-600 dark:text-blue-400' : ''}`}
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setActiveTab('terms')}
              className={`hover:underline cursor-pointer ${activeTab === 'terms' ? 'font-bold text-blue-600 dark:text-blue-400' : ''}`}
            >
              Terms & Conditions
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setActiveTab('disclaimer')}
              className={`hover:underline cursor-pointer ${activeTab === 'disclaimer' ? 'font-bold text-blue-600 dark:text-blue-400' : ''}`}
            >
              Medical Disclaimer
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setActiveTab('about')}
              className={`hover:underline cursor-pointer ${activeTab === 'about' ? 'font-bold text-blue-600 dark:text-blue-400' : ''}`}
            >
              About
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setActiveTab('contact')}
              className={`hover:underline cursor-pointer ${activeTab === 'contact' ? 'font-bold text-blue-600 dark:text-blue-400' : ''}`}
            >
              Contact
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs transition cursor-pointer"
          >
            Close Policy
          </button>
        </div>

      </div>
    </div>
  );
};
