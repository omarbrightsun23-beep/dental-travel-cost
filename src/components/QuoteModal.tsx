import React, { useState } from 'react';
import { CalculationResult } from '../types';
import { X, CheckCircle2, ShieldCheck, Send, Clock, Sparkles } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: CalculationResult | null;
  procedureHint?: string;
  destinationHint?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialData,
  procedureHint,
  destinationHint
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [hasScans, setHasScans] = useState('yes');
  const [travelTimeline, setTravelTimeline] = useState('within_3_months');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const targetProcedure = initialData?.procedureName || procedureHint || 'All-on-4 Dental Implants';
  const targetDestination = initialData?.destinationName || destinationHint || 'Mexico (Los Algodones)';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-lg w-full bg-white dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl relative my-8 animate-fade-in">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 dark:hover:text-white transition p-1 hover:rotate-90 duration-200 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
              <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4" />
                Verified JCI Clinic Consultation
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Request Free Personalized Treatment Plan
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Connect directly with top vetted surgical hospitals in <strong>{targetDestination}</strong>. Initial 3D case evaluation is 100% complimentary.
              </p>
            </div>

            {/* Estimated Procedure Banner with subtle hover effect */}
            {initialData && (
              <div className="p-3 mb-4 rounded-xl bg-slate-50 dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs hover:border-blue-200 dark:hover:border-blue-900 transition-colors">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Configured Treatment:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{initialData.procedureName}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Estimated Savings:</span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                    {initialData.symbol}{initialData.netSavings.toLocaleString()} (-{initialData.savingsPercent}%)
                  </span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs text-slate-700 dark:text-slate-300">
              
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Full Legal Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Michael Vance"
                  className="w-full bg-white dark:bg-[#0B132B] border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 hover:border-slate-400 transition-all text-sm shadow-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-white dark:bg-[#0B132B] border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 hover:border-slate-400 transition-all text-sm shadow-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 019-2834"
                    className="w-full bg-white dark:bg-[#0B132B] border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 hover:border-slate-400 transition-all text-sm shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Do you have existing X-rays / CT Scans?</label>
                  <select
                    value={hasScans}
                    onChange={(e) => setHasScans(e.target.value)}
                    className="w-full bg-white dark:bg-[#0B132B] border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition shadow-xs"
                  >
                    <option value="yes">Yes, I have dental X-rays / CBCT</option>
                    <option value="planning">I need a referral / will get one</option>
                    <option value="no">No scans yet, need preliminary consult</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Desired Travel Window</label>
                  <select
                    value={travelTimeline}
                    onChange={(e) => setTravelTimeline(e.target.value)}
                    className="w-full bg-white dark:bg-[#0B132B] border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition shadow-xs"
                  >
                    <option value="urgent">As soon as possible (1-3 weeks)</option>
                    <option value="within_3_months">Within next 1-3 months</option>
                    <option value="3_to_6_months">In 3-6 months</option>
                    <option value="exploring">Just researching and comparing costs</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Specific Clinical Concerns or Questions (Optional)</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. I was told I need bone grafting; interested in Straumann implants."
                  className="w-full bg-white dark:bg-[#0B132B] border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 hover:border-slate-400 transition-all text-xs shadow-xs"
                />
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                🔒 Your privacy is strictly protected. We only share clinical notes with JCI-accredited partner hospitals adhering to HIPAA and international patient privacy directives.
              </p>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold rounded-xl transition-all duration-200 shadow-sm shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm mt-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Submit Consultation Request
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4 animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800 shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Inquiry Received Successfully</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{fullName}</strong>. A dedicated medical travel patient coordinator and the surgical director in <strong>{targetDestination}</strong> will review your inquiry.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 text-left text-xs space-y-1.5 shadow-xs">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                <Sparkles className="w-4 h-4" />
                What happens next:
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                1. You will receive a secure upload link via email (<strong>{email}</strong>) to submit your panoramic X-rays if available.
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                2. Within 24 hours, you will receive a comprehensive treatment plan outlining exact surgical stages, implant brand certifications, and guaranteed pricing.
              </p>
            </div>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="py-2.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-white transition-all hover:shadow-md cursor-pointer"
            >
              Return to Calculator
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
