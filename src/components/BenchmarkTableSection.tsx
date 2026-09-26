import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface BenchmarkTableSectionProps {
  onSelectRoute?: (destinationId: string, procedureId: string) => void;
}

export const BenchmarkTableSection: React.FC<BenchmarkTableSectionProps> = ({ onSelectRoute }) => {
  const rows = [
    {
      name: 'Single Tooth Implant + Crown',
      procId: 'single_implant',
      us: '$3,500 – $5,500',
      uk: '£2,200 – £3,500',
      mexico: '$750 – $1,250',
      turkey: '$600 – $950',
      thailand: '$850 – $1,300',
      savings: 'Save 70% – 80%'
    },
    {
      name: 'All-on-4 Implants (Full Arch)',
      procId: 'all_on_4',
      us: '$25,000 – $40,000',
      uk: '£12,000 – £18,000',
      mexico: '$6,500 – $11,000',
      turkey: '$4,500 – $7,500',
      thailand: '$5,800 – $9,200',
      savings: 'Save 65% – 75%'
    },
    {
      name: 'All-on-6 Implants (Full Mouth)',
      procId: 'all_on_6',
      us: '$50,000 – $75,000',
      uk: '£24,000 – £35,000',
      mexico: '$12,000 – $18,000',
      turkey: '$8,500 – $14,000',
      thailand: '$11,000 – $16,500',
      savings: 'Save 70% – 78%'
    },
    {
      name: 'Porcelain Veneers (Full Set of 16)',
      procId: 'full_veneers',
      us: '$20,000 – $35,000',
      uk: '£10,000 – £16,000',
      mexico: '$5,000 – $7,500',
      turkey: '$3,200 – $5,500',
      thailand: '$4,500 – $6,800',
      savings: 'Save 68% – 75%'
    }
  ];

  return (
    <section className="scroll-mt-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            Comparative Clinical Cost Benchmarks
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            2026 Global Dental Travel Cost Comparison Benchmarks
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Direct procedure fee comparisons across the world&apos;s most popular medical corridors (compiled from ADA, BDA, and international hospital records).
          </p>
        </div>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead className="bg-slate-50 dark:bg-[#0B132B] text-slate-600 dark:text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="py-3.5 px-4 font-bold">Procedure</th>
              <th className="py-3.5 px-4 font-bold text-rose-600 dark:text-rose-400">USA Average</th>
              <th className="py-3.5 px-4 font-bold text-rose-600 dark:text-rose-400">UK Private</th>
              <th className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">Mexico (Tijuana / Algodones)</th>
              <th className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">Turkey (Istanbul / Antalya)</th>
              <th className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">Thailand (Bangkok)</th>
              <th className="py-3.5 px-4 font-extrabold text-blue-700 dark:text-blue-400">Average Savings</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                  {row.name}
                </td>
                <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 font-medium">
                  {row.us}
                </td>
                <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 font-medium">
                  {row.uk}
                </td>
                <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                  {row.mexico}
                </td>
                <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                  {row.turkey}
                </td>
                <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                  {row.thailand}
                </td>
                <td className="py-3.5 px-4 font-extrabold text-blue-700 dark:text-blue-400">
                  {row.savings}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
