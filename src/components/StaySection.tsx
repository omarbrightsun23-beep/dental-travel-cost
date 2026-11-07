import React from 'react';
import { BedDouble, ArrowRight, MapPin } from 'lucide-react';

/**
 * Where-to-stay section for dental travelers.
 *
 * Links to our own recovery-hotel guides (one per destination in the price
 * index). Price bands are copied exactly from the guides — no new numbers.
 * No Booking.com links are used until the CJ / Booking.com publisher
 * application is re-approved.
 */
interface StayDestination {
  city: string;
  country: string;
  guidePath: string;
  image: string;
  imageAlt: string;
  band: string;
  blurb: string;
}

const DESTINATIONS: StayDestination[] = [
  {
    city: 'Istanbul — Şişli & Nişantaşı',
    country: 'Turkey',
    guidePath: '/hotels/istanbul',
    image: '/images/hotels/istanbul-hero.webp',
    imageAlt: 'Recovery hotels in Şişli Istanbul near dental clinics',
    band: 'from £55–£80 / night · checked Nov 2026',
    blurb: 'Stay in the clinic district itself: lift, room service and a pharmacy within a short walk.',
  },
  {
    city: 'Antalya — Lara (Şirinyalı–Çağlayan)',
    country: 'Turkey',
    guidePath: '/hotels/antalya',
    image: '/images/hotels/antalya-hero.webp',
    imageAlt: 'Recovery hotels in Lara Antalya near dental clinics',
    band: 'from €32–€54 / night · checked Nov 2026',
    blurb: 'The residential clinic district, with its own pharmacy street — not the Kundu resort strip.',
  },
  {
    city: 'Mexico — Tijuana & Los Algodones',
    country: 'Mexico',
    guidePath: '/hotels/mexico',
    image: '/images/hotels/mexico-hero.webp',
    imageAlt: 'Recovery hotels in Zona Río Tijuana and Los Algodones near dental clinics',
    band: 'from $47–$65 / night · checked Nov 2026',
    blurb: "Zona Río's clinic corridor, or the walk-in town where everything is a few blocks apart.",
  },
  {
    city: 'Bangkok — Ratchada & Sukhumvit',
    country: 'Thailand',
    guidePath: '/hotels/bangkok',
    image: '/images/hotels/bangkok-hero.webp',
    imageAlt: 'Recovery hotels in Sukhumvit and Ratchada Bangkok near dental clinics',
    band: 'from US$41–54 / night · checked Nov 2026',
    blurb: 'Walk to BIDC in Ratchada, or a kitchenette serviced apartment at Asok for soft food at 2 a.m.',
  },
];

export const StaySection: React.FC = () => {
  return (
    <section id="where-to-stay" className="scroll-mt-24">
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Recovery Accommodation
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 flex items-center gap-2">
          <BedDouble className="w-7 h-7 text-blue-600 dark:text-blue-400" />
          Where to Stay During Treatment
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
          Most procedures need 5–10 nights near your clinic. These guides cover the clinic
          districts — not the tourist strips — with recovery-friendly hotels and price bands
          checked in November 2026.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {DESTINATIONS.map((d) => (
          <a
            key={d.guidePath}
            href={d.guidePath}
            className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111C38] overflow-hidden hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all flex flex-col"
          >
            <img src={d.image} alt={d.imageAlt} width={1200} height={675} className="w-full h-auto" loading="lazy" />
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <MapPin className="w-3.5 h-3.5" />
                {d.country}
              </div>
              <div className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">
                {d.city}
              </div>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-200 mt-1">
                {d.band}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                {d.blurb}
              </p>
              <span className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:gap-2.5 transition-all">
                Read the hotel guide
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </a>
        ))}
      </div>

      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-4">
        Our calculator budgets a 6-night recovery stay as standard —{' '}
        <a href="#calculator" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
          run your own all-in estimate →
        </a>
      </p>

      <p className="text-[11px] text-slate-500 dark:text-slate-500 mt-4">
        Disclosure: hotel links may earn us a commission at no extra cost to you, which
        keeps this calculator free.
      </p>
    </section>
  );
};
