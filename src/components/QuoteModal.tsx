import React, { useState } from 'react';
import { CalculationResult } from '../types';
import { X, CheckCircle2, ShieldCheck, Send, Sparkles, MessageCircle, Phone, Clock, Lock } from 'lucide-react';

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
  const [preferredContact, setPreferredContact] = useState<'whatsapp' | 'email' | 'phone'>('whatsapp');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const targetProcedure = initialData?.procedureName || procedureHint || 'All-on-4 Dental Implants';
  const targetDestination = initialData?.destinationName || destinationHint || 'Mexico (Los Algodones)';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const leadData = {
        fullName,
        email,
        phone,
        hasScans,
        travelTimeline,
        preferredContact,
        notes,
        targetProcedure,
        targetDestination,
        timestamp: new Date().toISOString(),
        savingsEstimate: initialData ? `${initialData.symbol}${initialData.netSavings.toLocaleString()} (-${initialData.savingsPercent}%)` : 'Standard Benchmark'
      };
      const existingLeads = JSON.parse(localStorage.getItem('dtc_leads') || '[]');
      existingLeads.push(leadData);
      localStorage.setItem('dtc_leads', JSON.stringify(existingLeads));
    } catch {}
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello! I just configured my treatment estimate on DentalTravelCost.\n\n` +
    `• Patient Name: ${fullName || 'New Patient'}\n` +
    `• Procedure: ${targetProcedure}\n` +
    `• Destination Hub: ${targetDestination}\n` +
    `• X-rays / CT Scans: ${hasScans === 'yes' ? 'Available' : 'Needs preliminary consult'}\n` +
    `• Desired Timeline: ${travelTimeline.replace(/_/g, ' ')}\n\n` +
    `I would like to receive an official JCI hospital evaluation and verified clinic quote.`
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-lg w-full bg-white dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative my-8 animate-fade-in">
        
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
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Verified JCI Clinic Consultation • Free Case Evaluation
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Request Free Verified Treatment Plan
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Connect directly with certified oral surgery centers in <strong>{targetDestination}</strong>. Initial 3D case evaluation is 100% complimentary with zero booking obligation.
              </p>
            </div>

            {/* Estimated Procedure Banner */}
            {initialData && (
              <div className="p-3 mb-4 rounded-xl bg-slate-50 dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Treatment Configured:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{initialData.procedureName}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold">Estimated Savings:</span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
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
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Phone / WhatsApp Number</label>
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
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Existing X-rays / CT Scans?</label>
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
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Preferred Contact Method</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPreferredContact('whatsapp')}
                    className={`py-2 px-2.5 rounded-xl border text-center font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5 ${
                      preferredContact === 'whatsapp'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreferredContact('email')}
                    className={`py-2 px-2.5 rounded-xl border text-center font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5 ${
                      preferredContact === 'email'
                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-700 dark:text-blue-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    <span>Email</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreferredContact('phone')}
                    className={`py-2 px-2.5 rounded-xl border text-center font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5 ${
                      preferredContact === 'phone'
                        ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-500 text-purple-700 dark:text-purple-300'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    <Phone className="w-3.5 h-3.5 text-purple-600" />
                    <span>Phone Call</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Specific Clinical Questions or Notes (Optional)</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Interested in All-on-4 with Straumann implants; need quotes including 4-star recovery hotel."
                  className="w-full bg-white dark:bg-[#0B132B] border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 hover:border-slate-400 transition-all text-xs shadow-xs"
                />
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>100% Confidential. We only share clinical details with verified JCI hospital centers.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-black rounded-xl transition-all duration-200 shadow-md shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm mt-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Treatment Plan Request →</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4 animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800 shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">Inquiry Received Successfully</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{fullName}</strong>. A dedicated medical travel patient coordinator and the surgical director in <strong>{targetDestination}</strong> have received your inquiry.
              </p>
            </div>

            {/* Instant WhatsApp Priority Connect Button */}
            <div className="p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-left space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                Want immediate priority review?
              </div>
              <p className="text-[11px] text-emerald-900 dark:text-emerald-200">
                You can start a direct WhatsApp chat right now with our patient desk to send your dental X-rays or ask urgent travel questions.
              </p>
              <a
                href={`https://wa.me/15555678901?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer mt-1"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Coordinator on WhatsApp Now</span>
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 text-left text-xs space-y-1.5 shadow-xs">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                <Sparkles className="w-4 h-4" />
                Next Steps for Your Treatment Plan:
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                1. Check your email (<strong>{email}</strong>) for a secure portal link to upload your panoramic X-rays if available.
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                2. Within 2 business hours, you will receive a comprehensive treatment plan outlining exact surgical stages, implant brand certifications, and guaranteed pricing.
              </p>
            </div>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="py-2.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-white transition-all hover:shadow-md cursor-pointer"
            >
              Return to Calculator
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
