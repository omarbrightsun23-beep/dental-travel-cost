import React, { useState } from 'react';
import { Clock, Shield, Sparkles, ShieldCheck } from 'lucide-react';

export const TreatmentTimeline: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'implant' | 'veneer'>('implant');

  return (
    <div className="scroll-mt-20">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4" />
          Clinical Pathway &amp; Underwriting
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          How Dental Travel Works: Step-by-Step Clinical Journey
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
          Clear, predictable, and medically engineered. Understand exactly what happens at each stage of your overseas dental restoration.
        </p>

        <div className="inline-flex p-1 bg-slate-100 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 rounded-xl mt-6 shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab('implant')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
              activeTab === 'implant'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All-on-4 &amp; Implants (2-Trip Osseointegration)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('veneer')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
              activeTab === 'veneer'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Veneers &amp; Cosmetic Crowns (Single Trip)
          </button>
        </div>
      </div>

      {activeTab === 'implant' ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 relative space-y-3 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-blue-400 transition-all duration-300">
            <div className="space-y-3">
              <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">Phase 1 • At Home</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Virtual 3D Consultation</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Send your local X-ray or CT scan. The oral surgeon maps bone density and provides a guaranteed written price quote.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-[#111C38] border border-blue-300 dark:border-blue-700 rounded-2xl p-5 relative space-y-3 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300">
            <div className="space-y-3">
              <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">Phase 2 • Trip 1</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Placement &amp; Immediate Teeth</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Implant posts placed under anesthesia. By Day 2 or 3, your fixed temporary bridge is attached. You never leave without teeth.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 relative space-y-3 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300">
            <div className="space-y-3">
              <span className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Phase 3 • At Home</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Osseointegration (3–6 Mo)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Back home living normally. The biocompatible titanium screws permanently fuse with your jawbone.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-[#111C38] border border-emerald-300 dark:border-emerald-700 rounded-2xl p-5 relative space-y-3 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300">
            <div className="space-y-3">
              <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">Phase 4 • Trip 2</span>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Permanent Zirconia Delivery</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Your custom CAD/CAM milled monolithic Zirconia permanent bridge is secured with titanium screws and warranty passports issued.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 space-y-3">
            <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">Days 1–2</span>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Smile Design &amp; Prep</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              3D intra-oral scanning, shade selection, and conservative enamel preparation with provisional cosmetic units.
            </p>
          </div>
          <div className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 space-y-3">
            <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">Days 3–4</span>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Laboratory Milling &amp; Try-In</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              In-house digital CAD/CAM milling of your E.max veneers. Precision biscuit try-in for exact contour and translucency.
            </p>
          </div>
          <div className="bg-white dark:bg-[#111C38] border border-emerald-300 dark:border-emerald-700 rounded-2xl p-5 space-y-3">
            <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">Days 5–6</span>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Permanent Bonding &amp; Fly Home</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Resin bonding under dental dam isolation. Laser curing, bite polish, and warranty certificate issuance.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
