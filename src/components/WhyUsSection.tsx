import React from 'react';
import { WHY_US_POINTS } from '../data/content';
import { Shield, XCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface WhyUsSectionProps {
  onOpenQuoteModal: () => void;
}

export const WhyUsSection: React.FC<WhyUsSectionProps> = ({ onOpenQuoteModal }) => {
  return (
    <div className="scroll-mt-20">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
          <Shield className="w-4 h-4" />
          The DentalTravelCost Difference
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Why Book Through DentalTravelCost vs. Traveling Alone?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
          Traveling for major oral surgery shouldn't be a gamble on social media ads. See how our clinical guarantees protect your health and bank account.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {WHY_US_POINTS.map((point, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300 dark:hover:border-blue-700 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4 group"
          >
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {point.title}
              </h3>
              
              <div className="mt-3.5 space-y-2.5 text-xs">
                {/* DIY problem */}
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 flex items-start gap-2 text-rose-900 dark:text-rose-300 hover:border-rose-200 transition-colors">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">DIY Unverified Travel:</span>
                    <span>{point.diyProblem}</span>
                  </div>
                </div>

                {/* DentalTravelCost solution */}
                <div className="p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-800/40 flex items-start gap-2 text-blue-950 dark:text-blue-200 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">DentalTravelCost Guarantee:</span>
                    <span>{point.dentalTravelCostSolution}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action banner with hover glow */}
      <div className="mt-6 p-4 rounded-2xl bg-white dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs hover:shadow-md transition-all">
        <span className="text-xs text-slate-600 dark:text-slate-300 text-center sm:text-left">
          Over <strong>$32,000,000</strong> in verified patient savings coordinated since 2021.
        </span>
        <button
          type="button"
          onClick={onOpenQuoteModal}
          className="text-xs font-bold px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl transition-all duration-200 flex items-center gap-1.5 shadow-sm shadow-blue-500/20 hover:shadow-md hover:shadow-blue-500/30 hover:-translate-y-0.5 shrink-0 cursor-pointer"
        >
          <span>Get Free Verified Quote</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
