import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageSquare, Clock, Lock } from 'lucide-react';
import { PolicyTab } from './PolicyModal';

interface ContactSectionProps {
  onOpenPolicy?: (tab: PolicyTab) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenPolicy }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div className="scroll-mt-20">
      <div className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xs hover:shadow-md transition-shadow">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Info Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
                <MessageSquare className="w-4 h-4" />
                Patient Desk & Direct Lines
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Talk to a Patient Coordinator
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Have questions about border crossings, surgeon credentials, or sending your panoramic CT scan? Our medical travel desk is on call 7 days a week.
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300">
              <a
                href="tel:15555678901"
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 flex items-center gap-3 hover:border-blue-500 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-200 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105 transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Direct North American Toll-Free</span>
                  <span className="font-extrabold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">(555) 567-8901</span>
                </div>
              </a>

              <a
                href="mailto:contact@dentaltravelcost.com"
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 flex items-center gap-3 hover:border-emerald-500 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-200 group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-105 transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Direct Email & Records Review</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-xs group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">contact@dentaltravelcost.com</span>
                </div>
              </a>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 flex items-center gap-3 hover:shadow-xs transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">Response Guarantee</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-xs">Within 2 business hours (Mon–Sun)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Column (7 cols) with hover elevation */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-[#0B132B] p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-center shadow-xs">
            {!isSent ? (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Request an Immediate Callback or Case Evaluation
                </h3>
                
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-white dark:bg-[#111C38] border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 hover:border-slate-400 transition-all text-sm shadow-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Phone Number or WhatsApp (with Country Code)</label>
                  <input
                    type="tel"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-white dark:bg-[#111C38] border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 hover:border-slate-400 transition-all text-sm shadow-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">How Can We Help You?</label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. Inquiring about All-on-4 in Los Algodones vs Cancun; can send CT scans tonight."
                    className="w-full bg-white dark:bg-[#111C38] border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 hover:border-slate-400 transition-all text-xs shadow-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold rounded-xl transition-all duration-200 shadow-sm shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Submit Callback Request
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 pt-1 text-center">
                  <Lock className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>Your medical inquiry is 100% confidential. Protected under our </span>
                  <button
                    type="button"
                    onClick={() => onOpenPolicy?.('privacy')}
                    className="text-blue-600 dark:text-blue-400 underline font-semibold hover:text-blue-700 cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                  <span> and </span>
                  <button
                    type="button"
                    onClick={() => onOpenPolicy?.('terms')}
                    className="text-blue-600 dark:text-blue-400 underline font-semibold hover:text-blue-700 cursor-pointer"
                  >
                    Terms
                  </button>
                  <span>.</span>
                </div>
              </form>
            ) : (
              <div className="text-center py-8 space-y-3 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-sm">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-lg">Message Delivered</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
                  Thank you, <strong>{name}</strong>. A patient coordinator will phone or WhatsApp you at <strong>{contact}</strong> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSent(false)}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline pt-2 font-medium cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
