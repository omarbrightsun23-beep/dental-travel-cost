import React from 'react';
import { ShieldCheck, Award, Building2, Users, FileText, ArrowRight } from 'lucide-react';
import { PolicyTab } from './PolicyModal';

interface AboutSectionProps {
  onOpenPolicy?: (tab: PolicyTab) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenPolicy }) => {
  return (
    <div className="scroll-mt-20">
      <div className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xs hover:shadow-md transition-shadow">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              Independent Healthcare Benchmark
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              About DentalTravelCost Index
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
              DentalTravelCost was founded to solve the single biggest problem in global healthcare travel: misleading pricing. Single-clinic websites routinely market misleading base surgery rates while omitting required bone graft fees, return airfare, 7 nights of recovery lodging, local medical transfers, and follow-up checks.
            </p>
          </div>

          {onOpenPolicy && (
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => onOpenPolicy('about')}
                className="px-4 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Read Full About & E-E-A-T Standards</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onOpenPolicy('disclaimer')}
                className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-[#0B132B] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Medical & Financial Disclaimer</span>
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
          <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-[#0B132B]/60 border border-slate-200/60 dark:border-slate-800/80 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <Building2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              JCI & ADA Benchmarking
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We audit fee schedules from 50+ JCI-accredited dental hospital centers against the American Dental Association (ADA) national fee surveys to maintain the most rigorous procedural index in the industry.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-[#0B132B]/60 border border-slate-200/60 dark:border-slate-800/80 hover:border-emerald-200 dark:hover:border-emerald-800 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              Implant Brand Purity
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We strictly disqualify clinics that utilize unbranded or proprietary white-label implants. Our network partners exclusively deploy Swiss Straumann and Nobel Biocare titanium fixtures with international warranty passports.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-[#0B132B]/60 border border-slate-200/60 dark:border-slate-800/80 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group space-y-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Patient Advocacy Team
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Our bilingual patient coordination desk assists over 5,000 North American and European travelers annually with border logistics, virtual CBCT reviews, and private clinic shuttles.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
