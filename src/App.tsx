import React, { useState, useEffect } from 'react';
import { CurrencyCode, CalculationResult } from './types';
import { CURRENCIES, DEFAULT_DESTINATION_FOR_ORIGIN } from './data/procedures';
import { Header } from './components/Header';
import { Calculator } from './components/Calculator';
import { DestinationMatrix } from './components/DestinationMatrix';
import { BenchmarkTableSection } from './components/BenchmarkTableSection';
import { CorridorsSection } from './components/CorridorsSection';
import { TreatmentTimeline } from './components/TreatmentTimeline';
import { SafetyChecklist } from './components/SafetyChecklist';
import { AboutSection } from './components/AboutSection';
import { WhyUsSection } from './components/WhyUsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { StickyMobileBar } from './components/StickyMobileBar';
import { QuoteModal } from './components/QuoteModal';
import { PrintEstimateModal } from './components/PrintEstimateModal';
import { MethodologyModal } from './components/MethodologyModal';
import { SafetyChecklistModal } from './components/SafetyChecklistModal';
import { CompareAllModal } from './components/CompareAllModal';
import { PolicyModal, PolicyTab } from './components/PolicyModal';
import { Shield, Phone, ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react';

const ROTATING_WORDS = ['Count On', 'Rely On', 'Trust In', 'Depend On', 'Verify'];

export default function App() {
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyCode>('USD');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [rotatingWordIndex, setRotatingWordIndex] = useState<number>(0);
  const [wordFade, setWordFade] = useState<boolean>(true);

  // Shared interactive calculator state for cross-component buttons
  const [selectedDestinationId, setSelectedDestinationId] = useState<string>('Mexico');
  const [selectedProcedureId, setSelectedProcedureId] = useState<string>('all_on_4');
  const [fxRates, setFxRates] = useState<Record<CurrencyCode, number>>({
    USD: 1.0,
    GBP: 0.78,
    EUR: 0.92,
    AUD: 1.52,
    CAD: 1.38
  });
  const [isFxLive, setIsFxLive] = useState<boolean>(false);

  // Modals state
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [methodologyModalOpen, setMethodologyModalOpen] = useState(false);
  const [checklistModalOpen, setChecklistModalOpen] = useState(false);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [policyModalTab, setPolicyModalTab] = useState<PolicyTab>('privacy');

  const handleOpenPolicy = (tab: PolicyTab) => {
    setPolicyModalTab(tab);
    setPolicyModalOpen(true);
  };

  const [activeCalculationResult, setActiveCalculationResult] = useState<CalculationResult | null>(null);
  const [procedureHint, setProcedureHint] = useState<string>('');
  const [destinationHint, setDestinationHint] = useState<string>('');

  // Smooth rotating word timer
  useEffect(() => {
    const timer = setInterval(() => {
      setWordFade(false);
      setTimeout(() => {
        setRotatingWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        setWordFade(true);
      }, 250);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Listen for policy hash URLs (#privacy, #terms, #disclaimer, #about-us, #contact-us)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase().replace('#', '');
      if (['privacy', 'privacy-policy', 'cookies', 'gdpr'].includes(hash)) {
        setPolicyModalTab('privacy');
        setPolicyModalOpen(true);
      } else if (['terms', 'terms-and-conditions', 'terms-of-service', 'tos'].includes(hash)) {
        setPolicyModalTab('terms');
        setPolicyModalOpen(true);
      } else if (['disclaimer', 'medical-disclaimer', 'financial-disclaimer'].includes(hash)) {
        setPolicyModalTab('disclaimer');
        setPolicyModalOpen(true);
      } else if (['about-us', 'about-desk'].includes(hash)) {
        setPolicyModalTab('about');
        setPolicyModalOpen(true);
      } else if (['contact-us', 'contact-desk'].includes(hash)) {
        setPolicyModalTab('contact');
        setPolicyModalOpen(true);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Dark mode initialization
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('sg_theme');
      if (savedTheme === 'dark') {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
      } else {
        setIsDarkMode(false);
        document.documentElement.classList.remove('dark');
      }
    } catch {
      setIsDarkMode(false);
    }
  }, []);

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      try {
        if (next) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('sg_theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('sg_theme', 'light');
        }
      } catch {}
      return next;
    });
  };

  // Auto-detect visitor currency on first load
  useEffect(() => {
    try {
      const saved = localStorage.getItem('dtc_currency') as CurrencyCode;
      if (saved && CURRENCIES[saved]) {
        setCurrentCurrency(saved);
        const defaultDest = DEFAULT_DESTINATION_FOR_ORIGIN[saved]?.[0];
        if (defaultDest) setSelectedDestinationId(defaultDest);
        return;
      }
      const lang = (navigator.language || '').toLowerCase();
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (lang.includes('gb') || tz.includes('London')) setCurrentCurrency('GBP');
      else if (lang.includes('au') || tz.includes('Sydney') || tz.includes('Melbourne')) setCurrentCurrency('AUD');
      else if (lang.includes('ca') || tz.includes('Toronto') || tz.includes('Vancouver')) setCurrentCurrency('CAD');
      else if (tz.includes('Europe') || lang.includes('fr') || lang.includes('de') || lang.includes('es')) setCurrentCurrency('EUR');
      else setCurrentCurrency('USD');
    } catch {
      setCurrentCurrency('USD');
    }
  }, []);

  // Fetch live exchange rates in background
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await fetch('https://open.er-api.com/v6/latest/USD');
        if (res.ok) {
          const data = await res.json();
          if (data && data.rates) {
            setFxRates({
              USD: 1.0,
              GBP: data.rates.GBP || 0.78,
              EUR: data.rates.EUR || 0.92,
              AUD: data.rates.AUD || 1.52,
              CAD: data.rates.CAD || 1.38
            });
            setIsFxLive(true);
          }
        }
      } catch {}
    };
    fetchRates();
  }, []);

  const handleCurrencyChange = (newCurrency: CurrencyCode) => {
    setCurrentCurrency(newCurrency);
    try {
      localStorage.setItem('dtc_currency', newCurrency);
    } catch {}
    const defaultDest = DEFAULT_DESTINATION_FOR_ORIGIN[newCurrency]?.[0];
    if (defaultDest) {
      setSelectedDestinationId(defaultDest);
    }
  };

  // When user clicks "Load in Calc" or high-ticket search chips
  const handleLoadDestinationInCalc = (destId: string, procId?: string) => {
    setSelectedDestinationId(destId);
    if (procId) setSelectedProcedureId(procId);
    
    const calcEl = document.getElementById('calculator');
    if (calcEl) {
      calcEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenQuoteFromCalc = (result: CalculationResult) => {
    setActiveCalculationResult(result);
    setProcedureHint(result.procedureName);
    setDestinationHint(result.destinationName);
    setQuoteModalOpen(true);
  };

  const handleOpenQuoteFromMatrix = (procName: string, destName: string) => {
    setProcedureHint(procName);
    setDestinationHint(destName);
    setQuoteModalOpen(true);
  };

  const handleOpenPrintModal = (result: CalculationResult) => {
    setActiveCalculationResult(result);
    setPrintModalOpen(true);
  };

  const handlePhoneClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    window.location.href = 'tel:15555678901';
  };

  return (
    <div className="bg-[#F8FAFC] dark:bg-[#0B132B] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-sans selection:bg-blue-600 selection:text-white transition-colors duration-200">
      
      {/* Top Header */}
      <Header
        currentCurrency={currentCurrency}
        onCurrencyChange={handleCurrencyChange}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenPolicy={handleOpenPolicy}
        onOpenQuoteModal={() => {
          setProcedureHint(selectedProcedureId);
          setDestinationHint(selectedDestinationId);
          setQuoteModalOpen(true);
        }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F0F6FF] via-[#F8FAFC] to-[#F8FAFC] dark:from-[#0E1A38] dark:via-[#0B132B] dark:to-[#0B132B] pt-16 pb-20 sm:pt-24 sm:pb-28 text-center transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200/80 dark:border-blue-800/50 text-xs font-semibold text-blue-700 dark:text-blue-300 shadow-xs hover:shadow-sm transition-all duration-200 cursor-default animate-fade-in">
            <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>#1 Dental Travel Cost Calculator • Trusted by 50,000+ Patients</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight sm:leading-none">
            Dental Travel Cost You Can{' '}
            <span
              className={`inline-block transition-all duration-300 transform text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-sky-400 to-teal-400 drop-shadow-xs ${
                wordFade ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
              }`}
            >
              {ROTATING_WORDS[rotatingWordIndex]}
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            The #1 <strong>all in dental cost calculator</strong> calculating the <strong>true cost of dental implants abroad</strong>. Accurately benchmark <strong>all on 4 turkey cost with flights and hotel</strong>, <strong>dental implants mexico price breakdown</strong>, <strong>los algodones dental implants price list 2026</strong>, and <strong>all on 4 cost australia vs thailand</strong> with return airfare, 4-star recovery hotels, and verified JCI safety guidelines.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => {
                setProcedureHint('all_on_4');
                setDestinationHint(selectedDestinationId);
                setQuoteModalOpen(true);
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-semibold text-sm sm:text-base transition-all duration-200 shadow-md shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Get Free Clinic Quote</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              type="button"
              onClick={handlePhoneClick}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white dark:bg-[#111C38] hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-sm sm:text-base transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 cursor-pointer group"
            >
              <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
              <span>Call (555) 567-8901</span>
            </button>
          </div>

          {/* High-Ticket Procedure Quick-Filter Chips */}
          <div className="pt-2">
            <p className="text-[11px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-2 flex items-center justify-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              Popular High-Volume Searches (Click to Auto-Calculate):
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handleLoadDestinationInCalc('Turkey', 'all_on_4')}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#111C38] hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200 dark:border-slate-800 hover:border-blue-400 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 shadow-xs transition-all cursor-pointer"
              >
                All on 4 Turkey Cost with Flights &amp; Hotel
              </button>
              <button
                type="button"
                onClick={() => handleLoadDestinationInCalc('Mexico', 'all_on_4')}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#111C38] hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200 dark:border-slate-800 hover:border-blue-400 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 shadow-xs transition-all cursor-pointer"
              >
                Dental Implants Mexico Price Breakdown
              </button>
              <button
                type="button"
                onClick={() => handleLoadDestinationInCalc('Mexico', 'all_on_4')}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#111C38] hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200 dark:border-slate-800 hover:border-blue-400 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 shadow-xs transition-all cursor-pointer"
              >
                Los Algodones Dental Implants 2026 Price List
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentCurrency('AUD');
                  handleLoadDestinationInCalc('Thailand', 'all_on_4');
                }}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#111C38] hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200 dark:border-slate-800 hover:border-blue-400 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 shadow-xs transition-all cursor-pointer"
              >
                All on 4 Cost Australia vs Thailand
              </button>
              <button
                type="button"
                onClick={() => {
                  setCurrentCurrency('GBP');
                  handleLoadDestinationInCalc('Turkey', 'full_veneers');
                }}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#111C38] hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200 dark:border-slate-800 hover:border-blue-400 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 shadow-xs transition-all cursor-pointer"
              >
                Cost of Full Mouth Veneers in Turkey vs UK
              </button>
              <button
                type="button"
                onClick={() => handleLoadDestinationInCalc('CostaRica', 'all_on_4')}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#111C38] hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200 dark:border-slate-800 hover:border-blue-400 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 shadow-xs transition-all cursor-pointer"
              >
                All on 4 Costa Rica Cost
              </button>
              <button
                type="button"
                onClick={() => handleLoadDestinationInCalc('Hungary', 'single_implant')}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#111C38] hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200 dark:border-slate-800 hover:border-blue-400 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 shadow-xs transition-all cursor-pointer"
              >
                Dental Implants Hungary Cost
              </button>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{isFxLive ? 'Live Exchange Rates Active' : 'Exchange Rate Benchmark Active'}</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>JCI &amp; ISO 9001 Hospital Verification</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Straumann &amp; Nobel Biocare Passports</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-24">
        
        {/* Coverage: Interactive Calculator Engine */}
        <section id="calculator" className="scroll-mt-24">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Coverage &amp; Calculation Engine
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Dental Travel Cost Calculator
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Calculate your complete out-of-pocket investment for overseas dental implants, All-on-4, and cosmetic crowns with airfare and recovery hotels.
            </p>
          </div>
          <Calculator
            currentCurrency={currentCurrency}
            fxRates={fxRates}
            selectedDestinationId={selectedDestinationId}
            onDestinationChange={setSelectedDestinationId}
            selectedProcedureId={selectedProcedureId}
            onProcedureChange={setSelectedProcedureId}
            onCurrencyChange={handleCurrencyChange}
            onOpenQuoteModal={handleOpenQuoteFromCalc}
            onOpenPrintModal={handleOpenPrintModal}
            onOpenCompareModal={() => setCompareModalOpen(true)}
            onOpenPolicy={handleOpenPolicy}
          />
        </section>

        {/* Pricing: Global Destination Comparison Matrix */}
        <section id="pricing" className="scroll-mt-24">
          <div id="destinations" className="scroll-mt-24">
            <DestinationMatrix
              currentCurrency={currentCurrency}
              fxRates={fxRates}
              onSelectDestination={(destId, procId) => handleLoadDestinationInCalc(destId, procId)}
              onOpenQuoteModal={handleOpenQuoteFromMatrix}
            />
          </div>
        </section>

        {/* 2026 Global Benchmarks Table */}
        <BenchmarkTableSection
          onSelectRoute={(destId, procId) => handleLoadDestinationInCalc(destId, procId)}
        />

        {/* Corridors Section */}
        <CorridorsSection
          onSelectCorridor={(curr, dest, proc) => {
            setCurrentCurrency(curr);
            handleLoadDestinationInCalc(dest, proc);
          }}
        />

        {/* Process: Treatment Timeline */}
        <section id="process" className="scroll-mt-24">
          <TreatmentTimeline />
        </section>

        {/* Why Us Section */}
        <section id="why-us" className="scroll-mt-24">
          <WhyUsSection
            onOpenQuoteModal={() => {
              setProcedureHint(selectedProcedureId);
              setDestinationHint(selectedDestinationId);
              setQuoteModalOpen(true);
            }}
          />
        </section>

        {/* Services & Safety Checklist */}
        <section id="services" className="scroll-mt-24">
          <div id="safety" className="scroll-mt-24">
            <SafetyChecklist />
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="scroll-mt-24">
          <TestimonialsSection />
        </section>

        {/* About Section */}
        <section id="about" className="scroll-mt-24">
          <AboutSection onOpenPolicy={handleOpenPolicy} />
        </section>

        {/* Blog Hub */}
        <section id="blog" className="scroll-mt-24">
          <BlogSection />
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-24">
          <ContactSection onOpenPolicy={handleOpenPolicy} />
        </section>

        {/* FAQ Section */}
        <section id="faq" className="scroll-mt-24">
          <FAQSection />
        </section>
      </main>

      {/* Footer */}
      <Footer
        onOpenMethodology={() => setMethodologyModalOpen(true)}
        onOpenChecklist={() => setChecklistModalOpen(true)}
        onOpenPolicy={handleOpenPolicy}
      />

      {/* Cookie Banner */}
      <CookieBanner onOpenPrivacy={() => handleOpenPolicy('privacy')} />

      {/* Modals */}
      <PolicyModal
        isOpen={policyModalOpen}
        onClose={() => setPolicyModalOpen(false)}
        initialTab={policyModalTab}
      />
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialData={activeCalculationResult}
        procedureHint={procedureHint}
        destinationHint={destinationHint}
      />
      <PrintEstimateModal
        isOpen={printModalOpen}
        onClose={() => setPrintModalOpen(false)}
        result={activeCalculationResult}
      />
      <MethodologyModal
        isOpen={methodologyModalOpen}
        onClose={() => setMethodologyModalOpen(false)}
      />
      <SafetyChecklistModal
        isOpen={checklistModalOpen}
        onClose={() => setChecklistModalOpen(false)}
      />
      <CompareAllModal
        isOpen={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
        currentCurrency={currentCurrency}
        fxRates={fxRates}
        onSelectDestination={(destId) => {
          handleLoadDestinationInCalc(destId);
          setCompareModalOpen(false);
        }}
      />
    </div>
  );
}
