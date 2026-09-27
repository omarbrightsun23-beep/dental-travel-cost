import React, { useState } from 'react';
import { Calendar, CheckCircle2, Clock, Sparkles, Shield, AlertCircle, ShieldCheck } from 'lucide-react';

export const TreatmentTimeline: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'implant' | 'veneer'>('implant');

  return (
    <div className="scroll-mt-20">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4" />
          Clinical Pathway & Underwriting
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          How Dental Travel Works: Step-by-Step Clinical Journey
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
          Clear, predictable, and medically engineered. Understand exactly what happens at each stage of your overseas dental restoration.
        </p>

        {/* Tab switch with hover & active transitions */}
        <div className="inline-flex p-1 bg-slate-100 dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 rounded-xl mt-6 shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab('implant')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
              activeTab === 'implant'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-800'
            }`}
          >
            All-on-4 & Implants (2-Trip Osseointegration)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('veneer')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
              activeTab === 'veneer'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-800'
            }`}
          >
            Veneers & Cosmetic Crowns (Single Trip)
          </button>
        </div>
      </div>

      {activeTab === 'implant' ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Step 1 */}
          <div className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 relative space-y-3 flex flex-col justify-between shadow-xs hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-400 dark:hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Phase 1 · At Home</span>
                <span className="text-[10px] text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-medium">1–2 Weeks Prior</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Virtual 3D Consultation
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Send your local X-ray or CT scan. The overseas oral maxillofacial surgeon maps bone density, calculates nerve canal clearance, and provides a guaranteed written price quote.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-[#0B132B] rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] text-blue-700 dark:text-blue-400 flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-blue-600 dark:text-blue-400" />
              <span>Zero travel cost incurred yet</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white dark:bg-[#111C38] border border-blue-300 dark:border-blue-700 rounded-2xl p-5 relative space-y-3 flex flex-col justify-between shadow-xs hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 ring-1 ring-blue-500/20 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Phase 2 · Trip 1</span>
                <span className="text-[10px] text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800 font-semibold">5–7 Days Stay</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Surgical Placement & Immediate Teeth
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Implant posts are placed under IV sedation or local anesthesia. By Day 2 or 3, your fixed temporary bridge is attached. <strong>You never walk around without teeth.</strong>
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-[#0B132B] rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 flex items-center gap-2 font-medium">
              <Clock className="w-3.5 h-3.5 shrink-0 text-amber-500" />
              <span>Mandatory 48h rest before flying home</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 relative space-y-3 flex flex-col justify-between shadow-xs hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-400 dark:hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Phase 3 · At Home</span>
                <span className="text-[10px] text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-medium">3–6 Months</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Osseointegration Healing
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Back home living your normal life. The biocompatible titanium screws permanently fuse with your living jawbone while you eat comfortably with your provisional teeth.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-[#0B132B] rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 flex items-center gap-2 font-medium">
              <Shield className="w-3.5 h-3.5 shrink-0 text-blue-600 dark:text-blue-400" />
              <span>Full bite functionality maintained</span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white dark:bg-[#111C38] border border-emerald-300 dark:border-emerald-700 rounded-2xl p-5 relative space-y-3 flex flex-col justify-between shadow-xs hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300 ring-1 ring-emerald-500/20 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Phase 4 · Trip 2</span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 font-semibold">5–7 Days Stay</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Permanent Zirconia Delivery
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Your custom CAD/CAM milled monolithic Zirconia permanent bridge is secured with titanium screws. Final bite alignment, shade verification, and warranty passport issuance.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-[#0B132B] rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] text-emerald-700 dark:text-emerald-400 flex items-center gap-2 font-semibold">
              <Sparkles className="w-3.5 h-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>Completed permanent restoration</span>
            </div>
          </div>

        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Veneers Step 1 */}
          <div className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 relative space-y-3 flex flex-col justify-between shadow-xs hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-400 dark:hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Days 1–2</span>
                <span className="text-[10px] text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-medium">In Clinic</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Smile Design & Micro-Prep
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                3D intra-oral scanning, shade selection, and conservative enamel preparation. Temporary cosmetic veneers are placed while master ceramists mill your permanent porcelain units.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-[#0B132B] rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] text-blue-700 dark:text-blue-400 flex items-center gap-2 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-blue-600 dark:text-blue-400" />
              <span>Digital Mockup Try-in</span>
            </div>
          </div>

          {/* Veneers Step 2 */}
          <div className="bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 relative space-y-3 flex flex-col justify-between shadow-xs hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-400 dark:hover:border-blue-500 hover:-translate-y-1 transition-all duration-300 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Days 3–4</span>
                <span className="text-[10px] text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800 font-semibold">Recovery & Lab Milled</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Laboratory Milling & Try-In
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                In-house digital CAD/CAM milling of your E.max or multilayered Zirconia veneers. You visit the clinic for biscuit try-in to adjust tooth shape, translucency, and margin fit.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-[#0B132B] rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 flex items-center gap-2 font-medium">
              <Sparkles className="w-3.5 h-3.5 shrink-0 text-amber-500" />
              <span>Customized to your facial geometry</span>
            </div>
          </div>

          {/* Veneers Step 3 */}
          <div className="bg-white dark:bg-[#111C38] border border-emerald-300 dark:border-emerald-700 rounded-2xl p-5 relative space-y-3 flex flex-col justify-between shadow-xs hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300 ring-1 ring-emerald-500/20 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Days 5–6</span>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 font-semibold">Final Day</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Permanent Bonding & Fly Home
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Resin bonding under dental dam isolation. Laser curing, bite polish, and issuance of nightguard protection plus warranty certificate. You fly home with a brand-new Hollywood smile!
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-[#0B132B] rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] text-emerald-700 dark:text-emerald-400 flex items-center gap-2 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
              <span>Full makeover completed in 6 days</span>
            </div>
          </div>

        </div>
      )}

      {/* Safety Note banner with subtle hover effect */}
      <div className="mt-6 p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300 shadow-xs hover:shadow-sm transition-all">
        <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
        <span>
          <strong>Pro-Tip:</strong> Never book non-refundable same-day return flights for major oral surgery. Reputable surgeons require a mandatory 48-hour post-operative ground evaluation before issuing your flight clearance certificate.
        </span>
      </div>
    </div>
  );
};
