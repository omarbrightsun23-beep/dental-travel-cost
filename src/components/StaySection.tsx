import React from 'react';
import { BedDouble, ExternalLink, MapPin } from 'lucide-react';

/**
 * Where-to-stay widget for dental travelers.
 *
 * Paste your Booking.com affiliate ID below once your CJ publisher account is
 * approved and you have joined the Booking.com programme. Until then the
 * buttons open plain Booking.com destination searches (still useful, just not
 * commission-tracked).
 */
const BOOKING_AFFILIATE_ID = '';

interface StayDestination {
  city: string;
  country: string;
  query: string;
  blurb: string;
}

const DESTINATIONS: StayDestination[] = [
  {
    city: 'Istanbul',
    country: 'Turkey',
    query: 'Istanbul',
    blurb: 'Recovery-friendly hotels near Sisli & Atasehir clinic districts.',
  },
  {
    city: 'Cancun',
    country: 'Mexico',
    query: 'Cancun',
    blurb: 'Beach resorts with quiet recovery rooms near dental corridors.',
  },
  {
    city: 'Bangkok',
    country: 'Thailand',
    query: 'Bangkok',
    blurb: 'Serviced apartments near Sukhumvit dental centers.',
  },
  {
    city: 'Budapest',
    country: 'Hungary',
    query: 'Budapest',
    blurb: 'Central hotels close to Mosonmagyarovar partner clinics.',
  },
];

function bookingUrl(query: string): string {
  const base = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(query)}`;
  return BOOKING_AFFILIATE_ID ? `${base}&aid=${BOOKING_AFFILIATE_ID}` : base;
}

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
          Most procedures need 5–10 nights near your clinic. Search recovery-friendly
          hotels in each destination — free cancellation on most stays.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {DESTINATIONS.map((d) => (
          <a
            key={d.city}
            href={bookingUrl(d.query)}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111C38] p-5 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <MapPin className="w-3.5 h-3.5" />
              {d.country}
            </div>
            <div className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">
              {d.city}
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
              {d.blurb}
            </p>
            <span className="inline-flex items-center gap-1.5 mt-3 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:gap-2.5 transition-all">
              Search hotels on Booking.com
              <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </a>
        ))}
      </div>

      <p className="text-[11px] text-slate-500 dark:text-slate-500 mt-4">
        Disclosure: hotel links may earn us a commission at no extra cost to you, which
        keeps this calculator free.
      </p>
    </section>
  );
};
