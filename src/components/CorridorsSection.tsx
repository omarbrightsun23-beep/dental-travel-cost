import React from 'react';
import { CurrencyCode } from '../types';
import { Compass, ArrowRight, Plane, Clock, ShieldCheck } from 'lucide-react';

interface CorridorsSectionProps {
  onSelectCorridor: (currency: CurrencyCode, destinationId: string, procedureId?: string) => void;
}

export const CorridorsSection: React.FC<CorridorsSectionProps> = ({ onSelectCorridor }) => {
  return (
    <section className="scroll-mt-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4" />
            Global Corridors & True Cost Breakdown
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Explore Major International Dental Corridors
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Corridor-specific procedural price breakdowns for the world's most trusted medical travel routes. Verified hospital fees, flight estimates, and hotel accommodations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Corridor 1: USA & Canada to Mexico */}
        <article className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800/40">
                Dental Implants Mexico Price Breakdown
              </span>
              <span className="text-2xl group-hover:scale-110 transition-transform">🇲🇽</span>
            </div>
            
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mt-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              USA & Canada ➔ Mexico
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Serving hundreds of thousands of US cross-border patients annually. Review our <strong>Los Algodones dental implants price list 2026</strong>, <strong>Tijuana</strong>, and <strong>Cancun</strong> surgical fees. Convenient drive-in or direct short-haul flights with zero jet lag.
            </p>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Flight / Drive Time: 1–4 Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Plane className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Primary: All-on-4 Implants, Crowns</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Brands: Straumann, Zimmer, Nobel</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectCorridor('USD', 'Mexico', 'all_on_4')}
            className="mt-6 w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-blue-700 dark:text-blue-300 font-bold text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 shadow-xs hover:shadow-md cursor-pointer"
          >
            <span>Calculate Mexico Trip Costs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </article>

        {/* Corridor 2: UK & Ireland to Turkey & Hungary */}
        <article className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800/40">
                All on 4 Turkey Cost with Flights & Hotel
              </span>
              <span className="text-2xl group-hover:scale-110 transition-transform">🇹🇷</span>
            </div>
            
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mt-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              UK & Ireland ➔ Turkey & Hungary
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              The primary relief valve for NHS dental waiting lists. Compare the <strong>cost of full mouth veneers in Turkey vs UK</strong> and <strong>All-on-4 Turkey packages with hotel</strong> in Istanbul/Antalya, alongside <strong>Budapest (Hungary)</strong> oral surgery clinics.
            </p>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Flight Time: 2.5–4 Hours (£100–£250 Return)</span>
              </div>
              <div className="flex items-center gap-2">
                <Plane className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Primary: Full Mouth All-on-4, Veneers</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Perks: 4-Star Hotel & VIP Transfers</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectCorridor('GBP', 'Turkey', 'all_on_4')}
            className="mt-6 w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-blue-700 dark:text-blue-300 font-bold text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 shadow-xs hover:shadow-md cursor-pointer"
          >
            <span>Calculate Turkey Trip Costs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </article>

        {/* Corridor 3: Australia & NZ to Thailand & Bali */}
        <article className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800/40">
                All on 4 Cost Australia vs Thailand
              </span>
              <span className="text-2xl group-hover:scale-110 transition-transform">🇹🇭</span>
            </div>
            
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mt-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Australia & NZ ➔ Thailand & Bali
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Use our <strong>dental tourism cost calculator with flights</strong> to benchmark <strong>All on 4 cost Australia vs Thailand</strong>. Facilities like Bangkok International Dental Center (BIDC) are multi-accredited medical institutions with English-speaking specialists.
            </p>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Flight Time: 7–9 Hours (Direct from Perth/Sydney)</span>
              </div>
              <div className="flex items-center gap-2">
                <Plane className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Primary: Zirconia Crowns, Full Arch</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Advantage: 55%–65% below Australian fees</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectCorridor('AUD', 'Thailand', 'all_on_4')}
            className="mt-6 w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-blue-700 dark:text-blue-300 font-bold text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 shadow-xs hover:shadow-md cursor-pointer"
          >
            <span>Calculate Thailand Trip Costs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </article>

      </div>
    </section>
  );
};
