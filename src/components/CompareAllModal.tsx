import React from 'react';
import { CurrencyCode } from '../types';
import { PROCEDURES, DESTINATIONS, CURRENCIES } from '../data/procedures';
import { X } from 'lucide-react';

interface CompareAllModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCurrency: CurrencyCode;
  fxRates: Record<CurrencyCode, number>;
  onSelectDestination: (destId: string) => void;
}

export const CompareAllModal: React.FC<CompareAllModalProps> = ({
  isOpen,
  onClose,
  currentCurrency,
  fxRates,
  onSelectDestination
}) => {
  if (!isOpen) return null;

  const rate = fxRates[currentCurrency] || CURRENCIES[currentCurrency].defaultRate;
  const symbol = CURRENCIES[currentCurrency].symbol;
  const sampleProc = PROCEDURES[0];
  const domesticPrice = Math.round((sampleProc.domesticUSD[currentCurrency] || 28000) * rate);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-4xl w-full bg-white dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative my-8 max-h-[90vh] flex flex-col animate-fade-in">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4 shrink-0">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Global Comparison: {sampleProc.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Domestic Benchmark in {currentCurrency}: <strong className="text-rose-600">{symbol}{domesticPrice.toLocaleString()}</strong>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 hover:rotate-90 duration-200 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable table container */}
        <div className="overflow-x-auto flex-1 scrollbar-thin">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                <th className="py-3 px-3 font-bold">Destination Hub</th>
                <th className="py-3 px-3 font-bold">Surgery Fee</th>
                <th className="py-3 px-3 font-bold">Airfare</th>
                <th className="py-3 px-3 font-bold">6-Night 4★ Hotel</th>
                <th className="py-3 px-3 font-bold">All-In Out-Of-Pocket</th>
                <th className="py-3 px-3 font-bold text-emerald-600 dark:text-emerald-400">Net Savings</th>
                <th className="py-3 px-3 font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {DESTINATIONS.map((dest) => {
                const surgeryUSD = sampleProc.abroadUSD[dest.id] || 5000;
                const surgeryPrice = Math.round(surgeryUSD * rate);
                const flightUSD = dest.flightCostUSD[currentCurrency] || dest.flightCostUSD.USD || 700;
                const flightPrice = Math.round(flightUSD * rate);
                const hotelPrice = Math.round(dest.hotelRatesUSD.premium * 6 * rate);
                const miscPrice = Math.round(250 * rate);
                const allIn = surgeryPrice + flightPrice + hotelPrice + miscPrice;
                const savings = Math.max(0, domesticPrice - allIn);
                const savingsPct = Math.round((savings / domesticPrice) * 100);

                return (
                  <tr key={dest.id} className="hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{dest.flag}</span>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{dest.name}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">{dest.cities[0].name.split('(')[0]}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900 dark:text-white tabular-nums">
                      {symbol}{surgeryPrice.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300 tabular-nums">
                      {symbol}{flightPrice.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300 tabular-nums">
                      {symbol}{hotelPrice.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 font-extrabold text-blue-700 dark:text-blue-400 tabular-nums">
                      {symbol}{allIn.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                      Save {symbol}{savings.toLocaleString()} (-{savingsPct}%)
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          onSelectDestination(dest.id);
                          onClose();
                        }}
                        className="py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] transition-all duration-200 shadow-xs hover:shadow-md hover:shadow-blue-500/20 active:scale-95 whitespace-nowrap cursor-pointer"
                      >
                        Select Destination
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-right shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:shadow-xs transition cursor-pointer"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
