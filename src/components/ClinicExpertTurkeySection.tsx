import React from 'react';
import {
  CLINIC_EXPERT_HOTEL_EUR_PER_NIGHT,
  CLINIC_EXPERT_SOURCE,
  CLINIC_EXPERT_TRANSFERS_EUR_FLAT,
  CLINIC_EXPERT_TREATMENTS,
  CLINIC_EXPERT_UNIT_PRICES,
} from '../data/clinicExpert';

interface ClinicExpertTurkeySectionProps {
  onSelectRoute?: (destinationId: string, procedureId: string) => void;
}

export const ClinicExpertTurkeySection: React.FC<ClinicExpertTurkeySectionProps> = ({ onSelectRoute }) => {
  return (
    <section className="scroll-mt-20" id="clinic-expert-turkey-prices">
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-1">
          Turkey · Clinic Expert direct prices
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Dental Treatment Prices in Turkey (Clinic Expert)
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
          Direct treatment costs in euros, as shared by {CLINIC_EXPERT_SOURCE}. These are treatment
          prices only — recovery hotel stays and VIP transfers are listed separately below, so they
          can be added to a calculator estimate. Final scope requires an in-person assessment and
          CBCT scan.
        </p>
      </div>

      <div className="space-y-6">
        {CLINIC_EXPERT_TREATMENTS.map((treatment) => (
          <div
            key={treatment.id}
            className="bg-white dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">{treatment.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {treatment.composition} · {treatment.inclusions}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{treatment.range}</span>
                <a
                  href={`/${treatment.pageSlug}`}
                  className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition"
                >
                  Full price guide
                </a>
                {onSelectRoute && (
                  <button
                    type="button"
                    onClick={() => onSelectRoute('Turkey', treatment.id)}
                    className="px-3 py-2 rounded-lg bg-white dark:bg-[#0B132B] hover:bg-slate-50 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition cursor-pointer"
                  >
                    Load in calculator
                  </button>
                )}
              </div>
            </div>
            {treatment.brands && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead className="bg-slate-50 dark:bg-[#0B132B] text-slate-600 dark:text-slate-400 text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4 font-bold">Implant brand</th>
                      <th className="py-3 px-4 font-bold">Price breakdown</th>
                      <th className="py-3 px-4 font-bold">Total (EUR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
                    {treatment.brands.map((brand) => (
                      <tr key={brand.brand}>
                        <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                          {brand.brand} ({brand.origin})
                        </td>
                        <td className="py-3 px-4">{brand.breakdown}</td>
                        <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                          €{brand.totalEur.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {!treatment.brands && (
              <p className="px-5 py-4 text-sm text-slate-700 dark:text-slate-200">
                <strong className="text-emerald-600 dark:text-emerald-400">€3,040 total</strong> — 16 veneers at
                €190 per unit. See the full guide for what is included.
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2">Unit prices (EUR)</h3>
          <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-1">
            {CLINIC_EXPERT_UNIT_PRICES.map((unit) => (
              <li key={unit.item} className="flex justify-between gap-4">
                <span>{unit.item}</span>
                <strong className="text-slate-900 dark:text-white">{unit.price}</strong>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-2">Travel add-ons (separate)</h3>
          <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-1">
            <li className="flex justify-between gap-4">
              <span>Recovery hotel stay</span>
              <strong className="text-slate-900 dark:text-white">€{CLINIC_EXPERT_HOTEL_EUR_PER_NIGHT} / night</strong>
            </li>
            <li className="flex justify-between gap-4">
              <span>VIP airport &amp; clinic transfers</span>
              <strong className="text-slate-900 dark:text-white">€{CLINIC_EXPERT_TRANSFERS_EUR_FLAT} flat</strong>
            </li>
          </ul>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-3 leading-relaxed">
            Disclaimer: prices are direct treatment costs as shared by {CLINIC_EXPERT_SOURCE}. Final
            treatment scope and total cost require an in-person assessment and CBCT scan. Prices may
            change; confirm before booking.
          </p>
        </div>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
        Related guides:{' '}
        <a href="/dental-implants-abroad-cost" className="text-blue-600 dark:text-blue-400 underline">Dental implants abroad cost</a>
        {' · '}
        <a href="/all-on-4-turkey-cost" className="text-blue-600 dark:text-blue-400 underline">All-on-4 Turkey cost</a>
        {' · '}
        <a href="/all-on-6-turkey-cost" className="text-blue-600 dark:text-blue-400 underline">All-on-6 Turkey cost</a>
        {' · '}
        <a href="/porcelain-veneers-turkey-cost" className="text-blue-600 dark:text-blue-400 underline">Porcelain veneers Turkey cost</a>
      </p>
    </section>
  );
};
