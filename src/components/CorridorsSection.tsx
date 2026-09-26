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
            Global Corridors &amp; Logistical Hubs
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Major International Dental Travel Corridors (2026 Price Index)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            In-depth logistical breakdowns and verified price lists for the world&apos;s most trusted medical travel routes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Corridor 1: USA & Canada to Mexico */}
        <article className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800/40">
                Top Route for North America
              </span>
              <span className="text-2xl group-hover:scale-110 transition-transform">🇲🇽</span>
            </div>
            
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mt-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              USA &amp; Canada → Mexico (Algodones &amp; Tijuana)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Complete <strong>dental implants mexico price breakdown</strong> and <strong>los algodones dental implants price list 2026</strong>. Serving 250,000+ US cross-border patients annually in Molar City, Tijuana, and Cancun with drive-across convenience and zero jet lag.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Flight / Drive Time: 1–4 Hours (Drive across border)</span>
              </div>
              <div className="flex items-center gap-2">
                <Plane className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>All-on-4 Package: $6,200 vs $28,000 domestic</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Verified Brands: Straumann, Zimmer Biomet, Nobel</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onSelectCorridor('USD', 'Mexico', 'all_on_4')}
            className="mt-6 w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-blue-700 dark:text-blue-300 font-bold text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 shadow-xs hover:shadow-md cursor-pointer"
          >
            <span>View Mexico All-on-4 Price Breakdown</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </article>

        {/* Corridor 2: UK & Ireland to Turkey & Hungary */}
        <article className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800/40">
                Top Route for UK &amp; Europe
              </span>
              <span className="text-2xl group-hover:scale-110 transition-transform">🇹🇷</span>
            </div>
            
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mt-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              UK &amp; Ireland → Turkey &amp; Hungary
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Accurate <strong>all on 4 turkey cost with flights and hotel</strong> (£5,100 all-in) and <strong>cost of full mouth veneers in turkey vs uk</strong> (£3,800 vs £16,000). The primary NHS waiting-list solution in Istanbul, Antalya, and Budapest.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Flight Time: 3.5 Hours (£200–£300 Return Airfare)</span>
              </div>
              <div className="flex items-center gap-2">
                <Plane className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Full Mouth Implants: Save £14,000–£20,000 net</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Perks: 4-Star Recovery Hotel &amp; VIP Mercedes Shuttles</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onSelectCorridor('GBP', 'Turkey', 'all_on_4')}
            className="mt-6 w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-blue-700 dark:text-blue-300 font-bold text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 shadow-xs hover:shadow-md cursor-pointer"
          >
            <span>View Turkey All-in Package Costs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </article>

        {/* Corridor 3: Australia & NZ to Thailand */}
        <article className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800/40">
                Top Route for Australasia
              </span>
              <span className="text-2xl group-hover:scale-110 transition-transform">🇹🇭</span>
            </div>
            
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mt-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Australia &amp; NZ → Thailand (Bangkok &amp; Phuket)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Transparent <strong>all on 4 cost australia vs thailand</strong> benchmark. Australians combine restorative oral surgery with tropical recuperation in JCI-accredited medical institutions with 60% savings.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Flight Time: 7–9 Hours (Direct from Sydney/Perth)</span>
              </div>
              <div className="flex items-center gap-2">
                <Plane className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>All-on-4: A$8,900 vs A$26,000 domestic Australian fee</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Standards: JCI Bangkok International Dental Center</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onSelectCorridor('AUD', 'Thailand', 'all_on_4')}
            className="mt-6 w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-blue-700 dark:text-blue-300 font-bold text-xs rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 shadow-xs hover:shadow-md cursor-pointer"
          >
            <span>View Australia vs Thailand Cost</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </article>
      </div>
    </section>
  );
};
