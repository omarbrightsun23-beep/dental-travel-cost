import React, { useState } from 'react';
import { SAFETY_CHECKLIST_ITEMS } from '../data/faqs';
import { ShieldCheck, CheckCircle2, Circle, AlertTriangle } from 'lucide-react';

export const SafetyChecklist: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({
    'check-1': true,
    'check-2': true
  });

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const checkedCount = Object.values(checkedIds).filter(Boolean).length;
  const totalCount = SAFETY_CHECKLIST_ITEMS.length;
  const progressPercent = Math.round((checkedCount / totalCount) * 100);

  return (
    <div className="scroll-mt-20">
      <div className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md transition-shadow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              Patient Protection Standard
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              7-Point International Dental Safety Checklist
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Demand these seven non-negotiable verification points from any overseas hospital before transferring surgical deposits.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="bg-slate-50 dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 p-3.5 rounded-2xl min-w-[220px] space-y-2 shadow-inner">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Readiness Score</span>
              <span className="font-black text-blue-600 dark:text-blue-400">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden shadow-inner">
              <div
                className="bg-blue-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-0.5">
              <span>{checkedCount} of {totalCount} verified</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const all: Record<string, boolean> = {};
                    SAFETY_CHECKLIST_ITEMS.forEach((i) => (all[i.id] = true));
                    setCheckedIds(all);
                  }}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer"
                >
                  Verify All
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => setCheckedIds({})}
                  className="text-slate-500 hover:underline cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive List with hover elevations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {SAFETY_CHECKLIST_ITEMS.map((item, idx) => {
            const isChecked = !!checkedIds[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-3.5 select-none hover:-translate-y-0.5 active:scale-[0.99] ${
                  isChecked
                    ? 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-300 dark:border-blue-700 text-slate-900 dark:text-white shadow-xs hover:shadow-md'
                    : 'bg-slate-50/70 dark:bg-[#0B132B]/70 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-xs'
                }`}
              >
                <button
                  type="button"
                  className="mt-0.5 text-blue-600 dark:text-blue-400 shrink-0 cursor-pointer"
                  aria-label={isChecked ? `Mark ${item.title} unverified` : `Mark ${item.title} verified`}
                >
                  {isChecked ? (
                    <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 fill-blue-600/10" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400 hover:text-slate-600 transition-colors" />
                  )}
                </button>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      0{idx + 1}. {item.title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                  <p className="text-[11px] text-blue-800 dark:text-blue-300 pt-0.5 font-medium">
                    <strong>Critical Note:</strong> {item.crucialDetail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info box */}
        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Never accept off-brand unbranded implants without official manufacturer warranty cards.</span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Compliant with JCI & ISO 9001:2015 International Health Directives
          </span>
        </div>
      </div>
    </div>
  );
};
