import React from 'react';
import { Calculator, Plane, FileCheck2, ArrowRight } from 'lucide-react';

interface TrustSectionProps {
  onOpenMethodology: () => void;
}

const PILLARS = [
  {
    icon: Calculator,
    title: 'All-in math',
    text: 'Every estimate adds procedure fees, return flights, recovery hotels, and a contingency buffer — the number you see is the number you plan around.',
  },
  {
    icon: Plane,
    title: 'Real corridors',
    text: 'Prices track the five busiest dental-travel routes — Mexico, Turkey, Thailand, Costa Rica, Hungary — updated against 2026 clinic fee schedules.',
  },
  {
    icon: FileCheck2,
    title: 'Open methodology',
    text: 'No black box. Every assumption, exchange rate, and data source is documented and inspectable before you trust a figure.',
  },
];

/**
 * Honest trust section. This site has no patient reviews to show yet —
 * instead of fabricating testimonials, we show exactly how the numbers work.
 */
export const TrustSection: React.FC<TrustSectionProps> = ({ onOpenMethodology }) => {
  return (
    <div className="scroll-mt-20">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
          <FileCheck2 className="w-4 h-4" />
          Why trust these numbers
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          No hype. Just the math.
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
          We don't publish patient stories we can't verify. What we can show you is
          exactly how every estimate on this page is built.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PILLARS.map((p) => (
          <div
            key={p.title}
            className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 shadow-xs hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
              <p.icon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base mb-1.5">{p.title}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{p.text}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          type="button"
          onClick={onOpenMethodology}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white text-sm font-bold transition-all hover:shadow-lg hover:-translate-y-0.5 active:scale-95 cursor-pointer"
        >
          Read the full methodology
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
