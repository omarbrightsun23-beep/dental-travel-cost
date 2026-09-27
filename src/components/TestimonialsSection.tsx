import React from 'react';
import { TESTIMONIALS } from '../data/content';
import { Star, ShieldCheck, MapPin, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <div className="scroll-mt-20">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          Real Verified Patient Journeys
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Read Real Patient Stories & True Savings
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
          Every story is backed by documented hospital receipts and verified Straumann / Nobel Biocare warranty passports.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-xl hover:shadow-slate-200/60 dark:hover:shadow-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 hover:-translate-y-1.5 transition-all duration-300 group"
          >
            <div className="space-y-3">
              {/* Star Rating */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 group-hover:scale-105 transition-transform" />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800/40 shadow-2xs">
                  {t.verificationBadge}
                </span>
              </div>

              {/* Quote text */}
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                "{t.quote}"
              </p>
            </div>

            {/* Savings Scorebox with subtle hover glow */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#0B132B] border border-slate-200/80 dark:border-slate-800 flex justify-between items-center text-xs group-hover:border-blue-200 dark:group-hover:border-blue-900/50 transition-colors">
                <div>
                  <span className="text-[10px] text-slate-500 block">Home Quote:</span>
                  <span className="font-bold text-rose-600 line-through">${t.domesticQuote.toLocaleString()}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">Net Kept in Bank:</span>
                  <span className="font-extrabold text-emerald-600 text-sm">Save ${t.savings.toLocaleString()}</span>
                </div>
              </div>

              {/* Patient info */}
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{t.name}</h4>
                <p className="text-[11px] text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{t.location} → <strong>{t.destination}</strong></span>
                </p>
                <p className="text-[11px] text-blue-600 dark:text-blue-400 font-medium mt-0.5">
                  Procedure: {t.procedure}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
