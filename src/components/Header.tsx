import React, { useState } from 'react';
import { CurrencyCode } from '../types';
import { CURRENCIES } from '../data/procedures';
import { Moon, Sun, Globe, Menu, X } from 'lucide-react';
import { PolicyTab } from './PolicyModal';

interface HeaderProps {
  currentCurrency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenQuoteModal: () => void;
  onOpenPolicy?: (tab: PolicyTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCurrency,
  onCurrencyChange,
  isDarkMode,
  onToggleDarkMode,
  onOpenQuoteModal,
  onOpenPolicy
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Blog', href: '#blog' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#0B132B]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Wordmark matching exact dentaltravelcost.com domain with verified icon */}
        <div className="flex items-center gap-2.5">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 group-hover:shadow-md group-hover:shadow-teal-500/20 transition-all duration-200">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              DentalTravel<span className="text-blue-600 dark:text-blue-400">Cost</span>
            </span>
          </a>
        </div>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={(e) => handleNavClick(e, link.href)}
              className="transition-all duration-200 py-1.5 px-3 rounded-lg cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Controls: Currency, Dark Mode Toggle, and Get a Quote */}
        <div className="flex items-center gap-3">
          
          {/* Currency Switcher */}
          <div className="relative hidden sm:flex items-center">
            <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
            <select
              value={currentCurrency}
              onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
              aria-label="Select display currency"
              className="bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 pl-8 pr-7 py-2 rounded-lg focus:outline-none focus:border-blue-600 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-xs transition-all cursor-pointer appearance-none shadow-xs"
            >
              {Object.values(CURRENCIES).map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.flag} {curr.code} ({curr.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Dark Mode Moon/Sun Toggle */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            aria-label="Toggle dark mode"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105 active:scale-95 hover:shadow-xs transition-all cursor-pointer"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-amber-400 hover:rotate-45 transition-transform duration-300" />
            ) : (
              <Moon className="w-5 h-5 text-slate-700 hover:-rotate-12 transition-transform duration-300" />
            )}
          </button>

          {/* Primary CTA Button */}
          <button
            type="button"
            onClick={onOpenQuoteModal}
            className="hidden sm:inline-flex items-center justify-center text-sm font-semibold px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white transition-all duration-200 whitespace-nowrap shadow-sm shadow-blue-500/20 hover:shadow-md hover:shadow-blue-500/30 hover:-translate-y-0.5 cursor-pointer"
          >
            Get a Quote
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            aria-label="Open navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#0B132B] border-b border-slate-200 dark:border-slate-800 px-5 pt-3 pb-6 space-y-4 shadow-xl animate-fade-in">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            {navLinks.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={(e) => handleNavClick(e, link.href)}
                className="py-2 px-3 rounded-lg text-left transition-all hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
            <select
              value={currentCurrency}
              onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
              className="bg-slate-50 dark:bg-[#111C38] border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 px-3 py-2 rounded-lg hover:border-slate-300"
            >
              {Object.values(CURRENCIES).map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.flag} {curr.code} ({curr.symbol})
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full text-sm font-bold py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-center shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              Get a Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
