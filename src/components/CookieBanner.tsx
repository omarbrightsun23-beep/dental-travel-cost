import React, { useState, useEffect } from 'react';

interface CookieBannerProps {
  onOpenPrivacy?: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenPrivacy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('sg_cookie_consent');
      if (!consent) {
        setIsVisible(true);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('sg_cookie_consent', 'accepted');
    } catch {}
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('sg_cookie_consent', 'declined');
    } catch {}
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0B132B]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-3.5 px-4 sm:px-8 shadow-xl transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-700 dark:text-slate-300">
        <p className="text-center sm:text-left leading-relaxed">
          We use essential cookies and Google analytical technologies to optimize our procedural calculations and ensure data accuracy. Learn more in our{' '}
          <button
            type="button"
            onClick={onOpenPrivacy}
            className="text-blue-600 dark:text-blue-400 font-bold underline hover:text-blue-700 cursor-pointer"
          >
            Privacy & Cookie Policy
          </button>
          .
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#111C38] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition font-medium shadow-sm cursor-pointer"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition font-medium shadow-sm shadow-blue-500/20 cursor-pointer"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

