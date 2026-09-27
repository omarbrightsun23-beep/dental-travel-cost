import React from 'react';
import { X, BookOpen, Layers, DollarSign, Database, ShieldCheck } from 'lucide-react';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-xl w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl relative my-8">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 transition p-1"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b border-slate-100 pb-4 mb-5">
          <div className="flex items-center gap-1.5 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            Index Transparency
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">Data Methodology & Price Indexes</h3>
          <p className="text-xs text-slate-500 mt-1">
            How we calculate all-in procedural, flight, hotel, and domestic benchmark costs.
          </p>
        </div>

        <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
          
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Database className="w-4 h-4 text-blue-600" />
              1. Domestic Benchmark Fee Collection
            </div>
            <p className="text-slate-500 text-[11px]">
              Domestic prices reflect national median out-of-pocket private fees sourced from the <strong>American Dental Association (ADA) Survey of Dental Fees</strong>, <strong>British Private Dental Fee National Surveys</strong>, and <strong>Australian Dental Association Dental Fee Statistics</strong>.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              2. Overseas Surgical & Clinic Fee Audits
            </div>
            <p className="text-slate-500 text-[11px]">
              International procedural fees are gathered directly from verified fee schedules across <strong>JCI (Joint Commission International)</strong> and ISO 9001 accredited surgical centers in Mexico, Turkey, Hungary, Thailand, Costa Rica, and Poland. We only track clinics using tier-1 implant brands (Straumann, Nobel Biocare).
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <Layers className="w-4 h-4 text-sky-600" />
              3. Dynamic Airfare & Hotel Indexes
            </div>
            <p className="text-slate-500 text-[11px]">
              Airfares represent rolling 12-month economy round-trip estimates between capital origin airports and medical destination airports. Hotel rates reflect real double-occupancy prices in verified clinic-partner recovery hotels offering soft-food catering and airport shuttles.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <DollarSign className="w-4 h-4 text-amber-500" />
              4. Real-Time Foreign Exchange (FX) Conversion
            </div>
            <p className="text-slate-500 text-[11px]">
              Currency conversions are dynamically refreshed daily using institutional exchange rate APIs with automatic offline fallback caches to ensure precision budgeting.
            </p>
          </div>

        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <button
            onClick={onClose}
            className="py-2.5 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800 transition"
          >
            Close Methodology
          </button>
        </div>

      </div>
    </div>
  );
};
