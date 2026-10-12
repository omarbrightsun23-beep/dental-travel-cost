import React from 'react';
import { ShieldCheck, ExternalLink, Plane } from 'lucide-react';
/**
 * Travel medical insurance widget for dental travelers.
 *
 * SafetyWing Ambassador affiliate link (approved 2026-10-12).
 * referenceID=26616182 — commission-tracked.
 */
const SAFETYWING_AFFILIATE_URL =
  'https://safetywing.com/?referenceID=26616182&utm_source=26616182&utm_medium=Ambassador';

export const TravelInsuranceSection: React.FC = () => {
  return (
    <section id="travel-insurance" className="scroll-mt-24">
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Travel Protection
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 flex items-center gap-2">
          <ShieldCheck className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
          Travel Medical Insurance for Your Trip
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
          A dental trip abroad means international flights, hotel nights, and recovery
          days away from home. Travel medical insurance covers unexpected medical
          emergencies while you travel — so one surprise doesn&apos;t wreck your budget.
        </p>
      </div>

      <a
        href={SAFETYWING_AFFILIATE_URL}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111C38] p-5 sm:p-6 hover:border-emerald-300 dark:hover:border-emerald-700 hover:shadow-lg transition-all"
      >
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
          <Plane className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-lg font-extrabold text-slate-900 dark:text-white">
            SafetyWing Nomad Insurance
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            Travel medical insurance built for people traveling outside their home
            country. Get a quote in under a minute and travel with one less thing
            to worry about.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 flex-shrink-0 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-colors">
          Get covered
          <ExternalLink className="w-4 h-4" />
        </span>
      </a>

      <p className="text-[11px] text-slate-500 dark:text-slate-500 mt-4">
        Disclosure: insurance links may earn us a commission at no extra cost to you,
        which keeps this calculator free.
      </p>
    </section>
  );
};
