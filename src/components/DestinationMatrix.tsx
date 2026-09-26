import React, { useState } from 'react';
import { CurrencyCode } from '../types';
import { PROCEDURES, DESTINATIONS, CURRENCIES } from '../data/procedures';
import { Plane, Building, ShieldCheck } from 'lucide-react';

interface DestinationMatrixProps {
  currentCurrency: CurrencyCode;
  fxRates: Record<CurrencyCode, number>;
  onSelectDestination: (destId: string, procId?: string) => void;
  onOpenQuoteModal: (procName: string, destName: string) => void;
}

export const DestinationMatrix: React.FC<DestinationMatrixProps> = ({
  currentCurrency,
  fxRates,
  onSelectDestination,
  onOpenQuoteModal
}) => {
  const [selectedProcId, setSelectedProcId] = useState<string>('all_on_4');
  const [filterRegion, setFilterRegion] = useState<'all' | 'americas' | 'europe' | 'asia'>('all');

  const procedure = PROCEDURES.find((p) => p.id === selectedProcId) || PROCEDURES[0];
  const rate = fxRates[currentCurrency] || CURRENCIES[currentCurrency].defaultRate;
  const symbol = CURRENCIES[currentCurrency].symbol;
  const domesticPrice = Math.round((procedure.domesticUSD[currentCurrency] || 25000) * rate);

  const filteredDestinations = DESTINATIONS.filter((dest) => {
    if (filterRegion === 'all') return true;
    if (filterRegion === 'americas') return ['Mexico', 'CostaRica', 'Colombia'].includes(dest.id);
    if (filterRegion === 'europe') return ['Turkey', 'Hungary', 'Poland', 'Spain'].includes(dest.id);
    if (filterRegion === 'asia') return ['Thailand'].includes(dest.id);
    return true;
  });

  return (
    <div className="scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            Global Hospital Benchmark
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Destination Comparison Matrix
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-2xl">
            Compare verified surgical fees, round-trip flight averages, 6-night recovery hotels, and net out-of-pocket savings across premier healthcare destinations.
          </p>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs">
          {(['all', 'americas', 'europe', 'asia'] as const).map((region) => (
            <button
              key={region}
              type="button"
              onClick={() => setFilterRegion(region)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                filterRegion === region
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-800'
              }`}
            >
              {region === 'all' ? 'All Hubs' : region.charAt(0).toUpperCase() + region.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Procedure Tab Switcher */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none mb-4">
        {PROCEDURES.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setSelectedProcId(p.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 border cursor-pointer ${
              selectedProcId === p.id
                ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-600 text-blue-700 dark:text-blue-300 shadow-sm'
                : 'bg-white dark:bg-[#111C38] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xs'
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredDestinations.map((dest) => {
          const abroadUSD = procedure.abroadUSD[dest.id] || 5000;
          const abroadPrice = Math.round(abroadUSD * rate);
          const flightUSD = dest.flightCostUSD[currentCurrency] || dest.flightCostUSD.USD || 700;
          const flightPrice = Math.round(flightUSD * rate);
          const hotelPrice = Math.round(dest.hotelRatesUSD.premium * 6 * rate);
          const miscPrice = Math.round(250 * rate);
          const allInTotal = abroadPrice + flightPrice + hotelPrice + miscPrice;
          const savings = Math.max(0, domesticPrice - allInTotal);
          const savingsPercent = domesticPrice > 0 ? Math.round((savings / domesticPrice) * 100) : 0;

          return (
            <div
              key={dest.id}
              className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-400 dark:hover:border-blue-500 hover:-translate-y-1 group relative overflow-hidden"
            >
              <div className="space-y-3">
                {/* Header: Flag and Country */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{dest.flag}</span>
                    <div>
                      <h3 className="font-extrabold text-slate-900 dark:text-white text-base leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {dest.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {dest.cities[0]?.name.split('(')[0].trim()}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 shadow-xs">
                    -{savingsPercent}%
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {dest.tagline}
                </p>

                {/* Pricing Metrics */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 dark:text-slate-400">Base Surgery Fee:</span>
                    <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                      {symbol}{abroadPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Plane className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                      Flight ({currentCurrency} → {dest.name}):
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 tabular-nums">
                      {symbol}{flightPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Building className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                      6 Nights 4★ Hotel:
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 tabular-nums">
                      {symbol}{hotelPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* All In Abroad Highlight */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 space-y-0.5 group-hover:border-blue-200 dark:group-hover:border-blue-900/50 transition-colors">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Total All-In Cost:</span>
                    <span className="font-extrabold text-blue-700 dark:text-blue-400 text-sm tabular-nums">
                      {symbol}{allInTotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-500 dark:text-slate-400">vs Domestic ({symbol}{domesticPrice.toLocaleString()}):</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                      Save {symbol}{savings.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Accreditations tags */}
                <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 pt-1">
                  <ShieldCheck className="w-3 h-3 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span className="truncate">{dest.accreditations[0]}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onSelectDestination(dest.id, selectedProcId)}
                  className="py-2 px-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold text-center transition-all duration-200 hover:shadow-xs active:scale-95 cursor-pointer"
                  title="Load this destination into the calculator above"
                >
                  Load in Calc
                </button>
                <button
                  type="button"
                  onClick={() => onOpenQuoteModal(procedure.name, dest.name)}
                  className="py-2 px-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold text-center transition-all duration-200 shadow-xs hover:shadow-md hover:shadow-blue-500/20 cursor-pointer"
                >
                  Get Quote
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
