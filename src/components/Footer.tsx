import React from 'react';
import { Shield, ShieldCheck, Lock, FileText, AlertTriangle, Info, Mail, ExternalLink } from 'lucide-react';
import { PolicyTab } from './PolicyModal';

interface FooterProps {
  onOpenMethodology: () => void;
  onOpenChecklist: () => void;
  onOpenPolicy: (tab: PolicyTab) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenMethodology,
  onOpenChecklist,
  onOpenPolicy
}) => {
  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-[#0B132B] mt-24 py-14 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand & mission (2 cols on lg) */}
          <div className="space-y-3 lg:col-span-2">
            <a
              href="/"
              onClick={(e) => {
                if (window.location.pathname === '/' || window.location.pathname === '') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex items-center gap-2.5 group cursor-pointer"
              aria-label="DentalTravelCost Home"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-sm group-hover:scale-105 transition-transform">
                <Shield className="w-4 h-4 fill-blue-500/20 text-blue-400" />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                DentalTravel<span className="text-blue-500">Cost</span>
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-600/15 text-blue-300 border border-blue-500/20">
                All-In Index
              </span>
            </a>
            <p className="text-slate-400 max-w-md leading-relaxed text-xs">
              The independent international procedure cost benchmark and patient protection registry. We provide unbiased, all-in cost transparency factoring clinic fees, return flights, recovery accommodations, and verified JCI/ISO clinical accreditations.
            </p>
            <div className="pt-2 text-[11px] text-slate-500">
              <p>📍 1000 Brickell Ave, Suite 710, Miami, FL 33131</p>
              <p>📞 Patient Desk: (555) 567-8901 · Daily 7am–9pm EST</p>
            </div>
          </div>

          {/* Platform & Procedures (Coverage, Why Us, Process, Testimonials) */}
          <div className="space-y-2.5">
            <p className="font-bold text-white uppercase tracking-wider text-[11px]">Platform &amp; Care</p>
            <ul className="space-y-2">
              <li>
                <a
                  href="#calculator"
                  onClick={(e) => handleScrollTo(e, 'calculator')}
                  className="hover:text-blue-400 hover:translate-x-0.5 transition-all text-left cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>Coverage Calculator</span>
                </a>
              </li>
              <li>
                <a
                  href="#why-us"
                  onClick={(e) => handleScrollTo(e, 'why-us')}
                  className="hover:text-blue-400 hover:translate-x-0.5 transition-all text-left cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>Why Us (Accreditation)</span>
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  onClick={(e) => handleScrollTo(e, 'process')}
                  className="hover:text-blue-400 hover:translate-x-0.5 transition-all text-left cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>Treatment Process</span>
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  onClick={(e) => handleScrollTo(e, 'testimonials')}
                  className="hover:text-blue-400 hover:translate-x-0.5 transition-all text-left cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>Patient Testimonials</span>
                </a>
              </li>
              <li>
                <a
                  href="#destinations"
                  onClick={(e) => handleScrollTo(e, 'destinations')}
                  className="hover:text-blue-400 hover:translate-x-0.5 transition-all inline-block"
                >
                  Global Destinations
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={(e) => handleScrollTo(e, 'faq')}
                  className="hover:text-blue-400 hover:translate-x-0.5 transition-all inline-block"
                >
                  Patient Questions &amp; FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Google Policies & Legal Compliance */}
          <div className="space-y-2.5">
            <p className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-blue-400" />
              Legal &amp; Policies
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="/privacy-policy"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenPolicy('privacy');
                  }}
                  className="hover:text-blue-400 hover:translate-x-0.5 transition-all text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>Privacy Policy (GDPR/CCPA)</span>
                </a>
              </li>
              <li>
                <a
                  href="/terms-and-conditions"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenPolicy('terms');
                  }}
                  className="hover:text-blue-400 hover:translate-x-0.5 transition-all text-left cursor-pointer flex items-center gap-1.5"
                >
                  <span>Terms &amp; Conditions</span>
                </a>
              </li>
              <li>
                <a
                  href="/disclaimer"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenPolicy('disclaimer');
                  }}
                  className="hover:text-amber-400 hover:translate-x-0.5 transition-all text-left cursor-pointer flex items-center gap-1.5 text-amber-400/90"
                >
                  <span>Medical &amp; Financial Disclaimer</span>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenMethodology}
                  className="hover:text-blue-400 hover:translate-x-0.5 transition-all text-left cursor-pointer"
                >
                  Data Methodology &amp; Index
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenChecklist}
                  className="hover:text-blue-400 hover:translate-x-0.5 transition-all text-left cursor-pointer"
                >
                  7-Point Patient Safety Guide
                </button>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenPolicy('about');
                  }}
                  className="hover:text-blue-400 hover:translate-x-0.5 transition-all text-left cursor-pointer"
                >
                  About Our Mission
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenPolicy('contact');
                  }}
                  className="hover:text-blue-400 hover:translate-x-0.5 transition-all text-left cursor-pointer"
                >
                  Contact Coordination Desk
                </a>
              </li>
            </ul>
          </div>

          {/* Clinical Benchmark Sources */}
          <div className="space-y-2.5">
            <p className="font-bold text-white uppercase tracking-wider text-[11px]">Clinical Standards</p>
            <ul className="space-y-2 text-[11px] text-slate-400">
              <li>
                <a
                  href="https://www.jointcommissioninternational.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 hover:translate-x-0.5 transition-all flex items-center gap-1.5 group"
                  title="Joint Commission International (JCI) - Official Healthcare Accreditation"
                >
                  <span className="text-slate-500 group-hover:text-blue-400">•</span>
                  <span className="group-hover:underline underline-offset-2 decoration-blue-500/50">
                    Joint Commission International (JCI)
                  </span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-50 group-hover:opacity-100 group-hover:text-blue-400 shrink-0 transition-opacity" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.iso.org/iso-9001-quality-management.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 hover:translate-x-0.5 transition-all flex items-center gap-1.5 group"
                  title="ISO 9001 Quality Management & Sterilization Directives"
                >
                  <span className="text-slate-500 group-hover:text-blue-400">•</span>
                  <span className="group-hover:underline underline-offset-2 decoration-blue-500/50">
                    ISO 9001:2015 Sterilization Directives
                  </span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-50 group-hover:opacity-100 group-hover:text-blue-400 shrink-0 transition-opacity" />
                </a>
              </li>
              <li className="flex items-center gap-1.5 group">
                <span className="text-slate-500">•</span>
                <span className="flex items-center gap-1 flex-wrap">
                  <a
                    href="https://www.straumann.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 hover:underline underline-offset-2 decoration-blue-500/50 transition-colors"
                    title="Straumann Official Implant Warranty & Passports"
                  >
                    Straumann
                  </a>
                  <span>&amp;</span>
                  <a
                    href="https://www.nobelbiocare.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 hover:underline underline-offset-2 decoration-blue-500/50 transition-colors"
                    title="Nobel Biocare Authenticity & Passports"
                  >
                    Nobel Biocare Passports
                  </a>
                  <ExternalLink className="w-2.5 h-2.5 opacity-50 group-hover:opacity-100 text-slate-400 group-hover:text-blue-400 shrink-0 transition-opacity" />
                </span>
              </li>
              <li>
                <a
                  href="https://www.ada.org/resources/research/health-policy-institute/dental-fees"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 hover:translate-x-0.5 transition-all flex items-center gap-1.5 group"
                  title="American Dental Association (ADA) Survey of Dental Fees Benchmark"
                >
                  <span className="text-slate-500 group-hover:text-blue-400">•</span>
                  <span className="group-hover:underline underline-offset-2 decoration-blue-500/50">
                    ADA Survey of Dental Fees Benchmark
                  </span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-50 group-hover:opacity-100 group-hover:text-blue-400 shrink-0 transition-opacity" />
                </a>
              </li>
              <li className="flex items-center gap-1.5 group">
                <span className="text-slate-500">•</span>
                <span className="flex items-center gap-1 flex-wrap">
                  <a
                    href="https://www.bda.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 hover:underline underline-offset-2 decoration-blue-500/50 transition-colors"
                    title="British Dental Association (BDA) Clinical Standards"
                  >
                    British
                  </a>
                  <span>&amp;</span>
                  <a
                    href="https://www.ada.org.au"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 hover:underline underline-offset-2 decoration-blue-500/50 transition-colors"
                    title="Australian Dental Association (ADA) Clinical Standards"
                  >
                    Australian Dental Standards
                  </a>
                  <ExternalLink className="w-2.5 h-2.5 opacity-50 group-hover:opacity-100 text-slate-400 group-hover:text-blue-400 shrink-0 transition-opacity" />
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & disclaimers with explicit policy links */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p className="text-center lg:text-left max-w-2xl leading-relaxed">
            © 2026 DentalTravelCost Procedure Index. All Rights Reserved. Financial estimations and procedural averages are provided for educational and planning purposes only and do not constitute formal medical or dental advice.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-medium text-slate-400">
            <a
              href="/privacy-policy"
              onClick={(e) => {
                e.preventDefault();
                onOpenPolicy('privacy');
              }}
              className="hover:text-white hover:underline transition-colors cursor-pointer"
            >
              Privacy Policy
            </a>
            <span>•</span>
            <a
              href="/terms-and-conditions"
              onClick={(e) => {
                e.preventDefault();
                onOpenPolicy('terms');
              }}
              className="hover:text-white hover:underline transition-colors cursor-pointer"
            >
              Terms & Conditions
            </a>
            <span>•</span>
            <a
              href="/disclaimer"
              onClick={(e) => {
                e.preventDefault();
                onOpenPolicy('disclaimer');
              }}
              className="hover:text-amber-400 hover:underline transition-colors cursor-pointer text-amber-400/90"
            >
              Disclaimer
            </a>
            <span>•</span>
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                onOpenPolicy('about');
              }}
              className="hover:text-white hover:underline transition-colors cursor-pointer"
            >
              About
            </a>
            <span>•</span>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                onOpenPolicy('contact');
              }}
              className="hover:text-white hover:underline transition-colors cursor-pointer"
            >
              Contact
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
