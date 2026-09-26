import React from 'react';
import { SAFETY_CHECKLIST_ITEMS } from '../data/faqs';
import { X, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SafetyChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafetyChecklistModal: React.FC<SafetyChecklistModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-xl w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl relative my-8 max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 transition p-1 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b border-slate-100 pb-4 mb-5">
          <div className="flex items-center gap-1.5 text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            Patient Protection Guide
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">
            7-Point Patient Safety Checklist Before Traveling
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Always verify these essentials before committing to treatment abroad.
          </p>
        </div>

        <div className="space-y-3.5 text-xs text-slate-600 leading-relaxed">
          {SAFETY_CHECKLIST_ITEMS.map((item, idx) => (
            <div key={item.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>0{idx + 1}. {item.title}</span>
              </div>
              <p className="text-slate-500 text-[11px] pl-6">{item.description}</p>
              <p className="text-blue-700 text-[11px] pl-6 font-medium">Key test: {item.crucialDetail}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <button
            onClick={onClose}
            className="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-sm shadow-blue-500/20 cursor-pointer"
          >
            I Understand • Close Checklist
          </button>
        </div>
      </div>
    </div>
  );
};
