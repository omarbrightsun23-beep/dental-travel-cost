import React, { useState, useEffect } from 'react';
import { CurrencyCode, CalculationResult } from './types';
import { CURRENCIES, DEFAULT_DESTINATION_FOR_ORIGIN, DESTINATIONS, PROCEDURES } from './data/procedures';
import { Header } from './components/Header';
import { Calculator } from './components/Calculator';
import { DestinationMatrix } from './components/DestinationMatrix';
import { BenchmarkTableSection } from './components/BenchmarkTableSection';
import { CorridorsSection } from './components/CorridorsSection';
import { SemanticClinicalGuide } from './components/SemanticClinicalGuide';
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

  // Auto-detect visitor currency or parse pSEO URL parameters on initial load
  useEffect(() => {
    try {
      // 1. Programmatic SEO (pSEO) Query Parameter Deep-Linking
      // Supports external links like /?dest=Turkey&proc=all_on_4&curr=GBP or /?corridor=mexico
      const params = new URLSearchParams(window.location.search);
      const pDest = params.get('dest') || params.get('destination');
      const pProc = params.get('proc') || params.get('procedure');
      const pCurr = params.get('curr') || params.get('currency');
      const pCorridor = params.get('corridor');

      let customLoaded = false;

      if (pCurr && CURRENCIES[pCurr.toUpperCase() as CurrencyCode]) {
        setCurrentCurrency(pCurr.toUpperCase() as CurrencyCode);
        customLoaded = true;
      }

      if (pCorridor) {
        const corr = pCorridor.toLowerCase();
        if (corr.includes('mexico')) {
          setCurrentCurrency('USD');
          setSelectedDestinationId('Mexico');
          setSelectedProcedureId('all_on_4');
          customLoaded = true;
        } else if (corr.includes('turkey')) {
          setCurrentCurrency('GBP');
          setSelectedDestinationId('Turkey');
          setSelectedProcedureId('all_on_4');
          customLoaded = true;
        } else if (corr.includes('thailand')) {
          setCurrentCurrency('AUD');
          setSelectedDestinationId('Thailand');
          setSelectedProcedureId('all_on_4');
          customLoaded = true;
        }
      }

      if (pDest) {
        const matchedDest = Object.keys(DESTINATIONS).find(
          (d) => d.toLowerCase() === pDest.toLowerCase()
        );
        if (matchedDest) {
          setSelectedDestinationId(matchedDest);
          customLoaded = true;
        }
      }

      if (pProc) {
        const matchedProc = PROCEDURES.find(
          (p) =>
            p.id.toLowerCase() === pProc.toLowerCase() ||
            p.id.replace(/_/g, '').toLowerCase() === pProc.replace(/[-_]/g, '').toLowerCase()
        );
        if (matchedProc) {
          setSelectedProcedureId(matchedProc.id);
          customLoaded = true;
        }
      }

      if (customLoaded) return;

      // 2. Fallback to LocalStorage or Geo/Language Detection
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
    
    // Smooth scroll to calculator
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
      
      {/* Semantic Skip Link for Accessibility & Web Crawlers */}
      <a
        href="#calculator"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-none text-xs font-bold"
      >
        Skip to Calculator & Main Content
      </a>

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

      {/* Hero Section: Tailored to exact niche keywords & rotating trust words */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F0F6FF] via-[#F8FAFC] to-[#F8FAFC] dark:from-[#0E1A38] dark:via-[#0B132B] dark:to-[#0B132B] pt-16 pb-20 sm:pt-24 sm:pb-28 text-center transition-colors">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Centered Pill Badge highlighting the primary tool keyword */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200/80 dark:border-blue-800/50 text-xs font-semibold text-blue-700 dark:text-blue-300 shadow-xs hover:shadow-sm hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 cursor-default animate-fade-in">
            <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>#1 Dental Travel Cost Calculator · Trusted by 50,000+ Patients</span>
          </div>

          {/* Main Headline with dynamic rotating trust words */}
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

          {/* Subtitle integrating the primary domain, tool, and high-ticket procedure keywords */}
          <p className="max-w-3xl mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            The verified <strong>all in dental cost calculator</strong> and <strong>dental tourism cost calculator with flights</strong>. Determine the <strong>true cost of dental implants abroad</strong>—accurately benchmarking <strong>All on 4 Turkey cost with flights and hotel</strong>, <strong>dental implants Mexico price breakdown</strong>, and Thailand restorations against domestic private dental quotes.
          </p>

          {/* Dual Action CTA Buttons */}
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

          {/* High-Ticket Procedure Keyword Quick-Filter Chips */}
          <div className="pt-2">
            <p className="text-[11px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-2 flex items-center justify-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              Popular High-Volume Searches (Click to Auto-Calculate):
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handleLoadDestinationInCalc('Turkey', 'all_on_4')}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#111C38] hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                🇹🇷 All on 4 Turkey Cost
              </button>
              <button
                type="button"
                onClick={() => handleLoadDestinationInCalc('Mexico', 'single_implant')}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#111C38] hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                🇲🇽 Dental Implants Mexico Cost
              </button>
              <button
                type="button"
                onClick={() => handleLoadDestinationInCalc('CostaRica', 'all_on_4')}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#111C38] hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                🇨🇷 All on 4 Costa Rica Cost
              </button>
              <button
                type="button"
                onClick={() => handleLoadDestinationInCalc('Hungary', 'single_implant')}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#111C38] hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                🇭🇺 Dental Implants Hungary Cost
              </button>
              <button
                type="button"
                onClick={() => handleLoadDestinationInCalc('Thailand', 'all_on_4')}
                className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#111C38] hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                🇹🇭 All on 4 Thailand Cost
              </button>
            </div>
          </div>

          {/* Live Exchange Rate & JCI Badge */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{isFxLive ? 'Live Exchange Rates Active' : 'Exchange Rate Benchmark Active'}</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>JCI & ISO 9001 Hospital Verification</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Straumann & Nobel Biocare Passports</span>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Area - All Pages & Sections Connected */}
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-24">
        
        {/* Coverage: Interactive Calculator Engine */}
        <section id="calculator" className="scroll-mt-24">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Coverage & Calculation Engine
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

        {/* 2026 Global Dental Travel Cost Comparison Benchmarks Table */}
        <BenchmarkTableSection
          onSelectRoute={(destId, procId) => handleLoadDestinationInCalc(destId, procId)}
        />

        {/* Popular Medical Travel Corridors (pSEO Hub Blocks) */}
        <CorridorsSection
          onSelectCorridor={(curr, dest, proc) => {
            setCurrentCurrency(curr);
            handleLoadDestinationInCalc(dest, proc);
          }}
        />

        {/* Semantic Clinical & Material Reference Guide (Entities & Biomaterials) */}
        <SemanticClinicalGuide />

        {/* Process: 4-Stage Treatment & Claims Timeline */}
        <section id="process" className="scroll-mt-24">
          <TreatmentTimeline />
        </section>

        {/* Why Us: Comparison vs DIY Solo Travel */}
        <section id="why-us" className="scroll-mt-24">
          <WhyUsSection
            onOpenQuoteModal={() => {
              setProcedureHint(selectedProcedureId);
              setDestinationHint(selectedDestinationId);
              setQuoteModalOpen(true);
            }}
          />
        </section>

        {/* Services / Safety: 7-Point Patient Protection & Safety Standards */}
        <section id="services" className="scroll-mt-24">
          <div id="safety" className="scroll-mt-24">
            <SafetyChecklist />
          </div>
        </section>

        {/* Testimonials: Real Patient Case Studies */}
        <section id="testimonials" className="scroll-mt-24">
          <TestimonialsSection />
        </section>

        {/* About: Independent Healthcare Benchmark */}
        <section id="about" className="scroll-mt-24">
          <AboutSection onOpenPolicy={handleOpenPolicy} />
        </section>

        {/* Blog: Patient & Insurance Knowledge Hub */}
        <section id="blog" className="scroll-mt-24">
          <BlogSection />
        </section>

        {/* Contact: Dedicated Patient Coordination Desk */}
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

      {/* Cookie Banner matching screenshot & Google Policy guidelines */}
      <CookieBanner onOpenPrivacy={() => handleOpenPolicy('privacy')} />

      {/* Google Policies & Legal Modal (Privacy, Terms, Disclaimer, About, Contact) */}
      <PolicyModal
        isOpen={policyModalOpen}
        onClose={() => setPolicyModalOpen(false)}
        initialTab={policyModalTab}
      />

      {/* Lead Capture Quote Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialData={activeCalculationResult}
        procedureHint={procedureHint}
        destinationHint={destinationHint}
      />

      {/* Printable Estimate Modal with Direct Print, HTML Download, and Clipboard Copy */}
      <PrintEstimateModal
        isOpen={printModalOpen}
        onClose={() => setPrintModalOpen(false)}
        result={activeCalculationResult}
      />

      {/* Data Methodology Modal */}
      <MethodologyModal
        isOpen={methodologyModalOpen}
        onClose={() => setMethodologyModalOpen(false)}
      />

      {/* Safety Checklist Modal */}
      <SafetyChecklistModal
        isOpen={checklistModalOpen}
        onClose={() => setChecklistModalOpen(false)}
      />

      {/* Compare All Destinations Modal */}
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
