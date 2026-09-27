import React, { useState } from 'react';
import { Microscope, ShieldCheck, Layers, Cpu, Award, FileSpreadsheet, ChevronRight, CheckCircle2 } from 'lucide-react';

interface EntityTopic {
  id: string;
  category: string;
  title: string;
  shortDesc: string;
  keyMetric: string;
  details: {
    clinicalDefinition: string;
    patientImpact: string;
    accreditedStandard: string;
    domesticEquivalent: string;
  };
}

export const ENTITY_TOPICS: EntityTopic[] = [
  {
    id: 'osseointegration',
    category: 'Biocompatibility & Surgery',
    title: 'Titanium Osseointegration Dynamics',
    shortDesc: 'The direct structural and functional connection between living bone and the surface of a load-bearing artificial titanium implant fixture.',
    keyMetric: '96.8%–98.5% Global 10-Yr Success Rate',
    details: {
      clinicalDefinition: 'Discovered by Prof. P.I. Brånemark, osseointegration occurs when bone osteoblasts migrate onto the microscopically roughened titanium dioxide layer, rigidly locking the fixture without fibrous tissue intervention.',
      patientImpact: 'Requires a critical 12 to 24-week biological healing phase before attaching permanent heavy-load bridges. This is why legitimate All-on-4 protocols necessitate two separate trips.',
      accreditedStandard: 'Grade 4 or Grade 5 medical-grade titanium with Sandblasted Large-grit Acid-etched (SLA) or porous anodized surfaces (Straumann SLActive, Nobel Biocare TiUnite).',
      domesticEquivalent: 'Identical biological process and surgical hardware used in US/UK university dental hospitals.'
    }
  },
  {
    id: 'all-on-4-biomechanics',
    category: 'Full-Arch Prosthetics',
    title: 'All-on-4 Biomechanics & Angulation',
    shortDesc: 'Engineered rehabilitation protocol using four strategically positioned implants to support a full-arch fixed prosthesis in edentulous or failing dentitions.',
    keyMetric: 'Eliminates Sinus Lifts in 85%+ of Cases',
    details: {
      clinicalDefinition: 'Two anterior implants are placed axially, while two posterior implants are tilted up to 45 degrees to maximize cortical bone contact, lengthen the anterior-posterior (A-P) spread, and safely bypass the maxillary sinus and mandibular mental foramen.',
      patientImpact: 'Eliminates the agonizing 6-month wait time and $3,000–$6,000 extra cost of invasive bilateral sinus bone grafting, allowing immediate same-day provisional teeth.',
      accreditedStandard: 'Requires 3D CBCT digital guided surgical stents and multi-unit angled abutments (17° and 30°) torqued to 35 Ncm.',
      domesticEquivalent: 'Exact clinical protocol developed by Nobel Biocare and Dr. Paulo Maló, identical to ClearChoice or private oral surgery centers.'
    }
  },
  {
    id: 'monolithic-zirconia',
    category: 'Prosthetic Materials',
    title: 'Monolithic Zirconia vs. PFM Hybrid Bridges',
    shortDesc: 'Milled polycrystalline zirconium dioxide restorations engineered to withstand excessive occlusal forces without chipping.',
    keyMetric: '1,200+ MPa Flexural Strength',
    details: {
      clinicalDefinition: 'Unlike obsolete Porcelain-Fused-to-Metal (PFM) or acrylic hybrid dentures with pink plastic teeth that wear down and fracture, monolithic zirconia is computer-milled from a single solid puck of multi-translucent zirconium oxide.',
      patientImpact: 'Virtually unbreakable under heavy human bite forces (up to 800 N), stain-resistant, plaque-resistant, and biologically inert with zero gray metal lines at the gumline.',
      accreditedStandard: '5-Axis CAD/CAM in-house dental milling centers utilizing genuine German or Japanese dental discs (Kuraray Noritake, Ivoclar Vivadent).',
      domesticEquivalent: 'Domestic US laboratories routinely charge $12,000–$18,000 per arch for this exact monolithic zirconia bridge.'
    }
  },
  {
    id: 'cbct-diagnostics',
    category: 'Digital Radiology',
    title: '3D Cone Beam CT (CBCT) Diagnostics',
    shortDesc: 'Volumetric tomographic imaging producing sub-millimeter 3D reconstructions of maxilla and mandibular anatomy.',
    keyMetric: '0.075 mm Voxel Resolution',
    details: {
      clinicalDefinition: 'CBCT technology rotates a cone-shaped X-ray beam around the patient, capturing high-contrast 3D cross-sectional slices that reveal exact bone density (Hounsfield units), bone width, and the exact spatial trajectory of the inferior alveolar nerve canal.',
      patientImpact: 'Eliminates surgical guesswork and prevents catastrophic nerve paresthesia (facial numbness) or sinus perforation during implant placement.',
      accreditedStandard: 'In-house digital CBCT scanners calibrated under international radiation protection guidelines (ICRP).',
      domesticEquivalent: 'Identical 3D digital planning workflow required by American Board of Oral and Maxillofacial Surgery.'
    }
  },
  {
    id: 'implant-passport',
    category: 'Traceability & Continuity',
    title: 'The Official Implant Passport & Traceability',
    shortDesc: 'Mandatory patient medical documentation containing manufacturer serial barcodes, torque metrics, and component specs.',
    keyMetric: 'Universal Hex Standard for US/UK Dentists',
    details: {
      clinicalDefinition: 'An official hardcopy and cryptographic document issued post-surgery detailing implant brand (e.g. Straumann BLX, NobelActive), connection geometry (conical hex), platform diameter (3.5mm, 4.3mm), and surgical torque values.',
      patientImpact: 'Guarantees that your local domestic dentist in the US, UK, Canada, or Australia can instantly identify the screw driver size and order compatible prosthetic parts if adjustments are needed years later.',
      accreditedStandard: 'FDA 510(k) and CE-marked tier-1 implant systems with manufacturer-backed structural warranties.',
      domesticEquivalent: 'Enforces the exact medical device traceability standards required by hospital surgical registries.'
    }
  },
  {
    id: 'jci-sterilization',
    category: 'Clinical Safety & Sterility',
    title: 'JCI Hospital Sterilization & Spore Monitoring',
    shortDesc: 'Strict vacuum autoclave standards and hospital hygiene governance ensuring zero cross-contamination risk.',
    keyMetric: 'Class B Fractionated Vacuum Autoclaves',
    details: {
      clinicalDefinition: 'Class B autoclaves use deep multi-stage vacuum pulses to exhaust air from hollow surgical handpieces and lumens before high-temperature saturated steam sterilization at 134°C (273°F).',
      patientImpact: 'Ensures 100% surgical pathogen elimination, protecting traveling patients from bacterial infections, hepatitis, and postoperative complications.',
      accreditedStandard: 'Weekly biological spore indicator test logs (Geobacillus stearothermophilus) verified by accredited third-party sanitary inspectors.',
      domesticEquivalent: 'Meets or exceeds CDC, OSHA, and UK CQC infection prevention and control standards.'
    }
  }
];

export const SemanticClinicalGuide: React.FC = () => {
  const [activeTopicId, setActiveTopicId] = useState<string>(ENTITY_TOPICS[0].id);

  const activeTopic = ENTITY_TOPICS.find((t) => t.id === activeTopicId) || ENTITY_TOPICS[0];

  return (
    <section
      id="clinical-guide"
      aria-labelledby="clinical-guide-heading"
      className="scroll-mt-24 bg-white dark:bg-[#111C38] border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xs hover:shadow-md transition-shadow"
    >
      {/* Section Header */}
      <header className="mb-8">
        <div className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
          <Microscope className="w-4 h-4" />
          Clinical & Procedural Reference Guide
        </div>
        <h2
          id="clinical-guide-heading"
          className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
        >
          Biomaterials, Biomechanics & International Quality Standards
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-base mt-2 max-w-3xl leading-relaxed">
          Explore the exact dental medical terminology, surgical methodologies, and engineering standards utilized by accredited international hospital centers to achieve domestic-equivalent outcomes.
        </p>
      </header>

      {/* Grid: Topic Selector Tabs + Detailed Content Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Entity Navigation List */}
        <nav
          aria-label="Clinical topics"
          className="lg:col-span-5 flex flex-col space-y-2"
        >
          {ENTITY_TOPICS.map((topic) => {
            const isActive = topic.id === activeTopicId;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => setActiveTopicId(topic.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${
                  isActive
                    ? 'bg-blue-50/80 dark:bg-blue-950/60 border-blue-400 dark:border-blue-600 shadow-sm'
                    : 'bg-slate-50/60 dark:bg-[#0B132B]/50 border-slate-200/70 dark:border-slate-800/80 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                      {topic.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {topic.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {topic.shortDesc}
                  </p>
                </div>
                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-transform ${
                    isActive ? 'text-blue-600 dark:text-blue-400 translate-x-1' : 'text-slate-400'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Right Column: Semantic Deep-Dive Content Display */}
        <article className="lg:col-span-7 bg-slate-50 dark:bg-[#0B132B] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          
          {/* Active Entity Header */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60">
                {activeTopic.category}
              </span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {activeTopic.keyMetric}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              {activeTopic.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              {activeTopic.shortDesc}
            </p>
          </div>

          {/* Semantic Definition List */}
          <dl className="space-y-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-white dark:bg-[#111C38] border border-slate-200/70 dark:border-slate-800/80 shadow-xs">
              <dt className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1.5">
                <Microscope className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Clinical Mechanism & Science
              </dt>
              <dd className="text-slate-600 dark:text-slate-300 leading-relaxed pl-6">
                {activeTopic.details.clinicalDefinition}
              </dd>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-[#111C38] border border-slate-200/70 dark:border-slate-800/80 shadow-xs">
              <dt className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1.5">
                <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Direct Impact on Patient Outcome
              </dt>
              <dd className="text-slate-600 dark:text-slate-300 leading-relaxed pl-6">
                {activeTopic.details.patientImpact}
              </dd>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-[#111C38] border border-slate-200/70 dark:border-slate-800/80 shadow-xs">
                <dt className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1.5">
                  <Award className="w-4 h-4 text-amber-500" />
                  International Standard
                </dt>
                <dd className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed pl-6">
                  {activeTopic.details.accreditedStandard}
                </dd>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#111C38] border border-slate-200/70 dark:border-slate-800/80 shadow-xs">
                <dt className="font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Domestic Comparison
                </dt>
                <dd className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed pl-6">
                  {activeTopic.details.domesticEquivalent}
                </dd>
              </div>
            </div>
          </dl>

        </article>

      </div>
    </section>
  );
};
