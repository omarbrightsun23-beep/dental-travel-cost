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
  ExternalLink,
  Lock
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

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

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
                  Official Legal &amp; Compliance Center
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
            Terms &amp; Conditions
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
          {activeTab === 'privacy' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 p-4 rounded-2xl">
                <div className="flex items-center gap-2 font-bold text-blue-900 dark:text-blue-200 text-sm mb-1">
                  <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  Google Advertising &amp; GDPR / CCPA Compliance Disclosure
                </div>
                <p className="text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
                  DentalTravelCost ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy details our data practices across our dental travel cost calculator, comparison matrices, and consultation services in strict compliance with Google Publisher Policies, General Data Protection Regulation (GDPR), and California Consumer Privacy Act (CCPA/CPRA).
                </p>
              </div>
              <section className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">1. Information We Collect</h3>
                <p>We collect voluntary inquiries, procedural parameters, and anonymized diagnostic data to deliver transparent calculations. We never sell your personal data.</p>
              </section>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 p-4 rounded-2xl">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm mb-1">
                  <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  Terms of Service &amp; Platform Agreement
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  DentalTravelCost provides computational benchmark data and informational travel models. We are not a dental hospital or licensed clinic. All procedures are contracted directly with independent licensed facilities.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'disclaimer' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 sm:p-5 rounded-2xl">
                <div className="flex items-center gap-2.5 font-extrabold text-amber-900 dark:text-amber-300 text-base mb-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                  Mandatory Medical &amp; Financial Disclaimer
                </div>
                <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed font-medium">
                  Estimates are provided for budgeting and educational planning purposes only. Nothing on this website constitutes clinical dental advice or diagnosis. Always consult a licensed oral surgeon.
                </p>
              </div>
            </div>
          )}

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
                  Founded by a consortium of healthcare economists and patient advocates, DentalTravelCost was built to solve the trust issue in overseas dental care by providing true all-in pricing.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
                  <Mail className="w-4 h-4" />
                  Direct Patient Coordination Desk
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Get in Touch with our Care Team
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Phone: (555) 567-8901 • Email: coordination@dentaltravelcost.com • 1000 Brickell Ave, Suite 710, Miami, FL 33131
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Bar */}
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
              Terms &amp; Conditions
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setActiveTab('disclaimer')}
              className={`hover:underline cursor-pointer ${activeTab === 'disclaimer' ? 'font-bold text-blue-600 dark:text-blue-400' : ''}`}
            >
              Medical Disclaimer
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
