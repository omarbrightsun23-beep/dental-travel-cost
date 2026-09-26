import React, { useState, useEffect, useId } from 'react';
import { CurrencyCode, HotelTier, CalculationResult } from '../types';
import { PROCEDURES, DESTINATIONS, CURRENCIES, DEFAULT_DESTINATION_FOR_ORIGIN } from '../data/procedures';
import {
  Plane,
  Building,
  HeartPulse,
  Sparkles,
  RotateCcw,
  Check,
  Shield,
  ShieldCheck,
  FileSpreadsheet,
  Globe,
  ArrowRight
} from 'lucide-react';
import { PolicyTab } from './PolicyModal';

interface CalculatorProps {
  currentCurrency: CurrencyCode;
  fxRates: Record<CurrencyCode, number>;
  selectedDestinationId?: string;
  onDestinationChange?: (destId: string) => void;
  selectedProcedureId?: string;
  onProcedureChange?: (procId: string) => void;
  onCurrencyChange: (curr: CurrencyCode) => void;
  onOpenQuoteModal: (result: CalculationResult) => void;
  onOpenPrintModal: (result: CalculationResult) => void;
  onOpenCompareModal: () => void;
  onOpenPolicy?: (tab: PolicyTab) => void;
}

export const Calculator: React.FC<CalculatorProps> = ({
  currentCurrency,
  fxRates,
  selectedDestinationId: controlledDestId,
  onDestinationChange: setControlledDestId,
  selectedProcedureId: controlledProcId,
  onProcedureChange: setControlledProcId,
  onCurrencyChange,
  onOpenQuoteModal,
  onOpenPrintModal,
  onOpenCompareModal,
  onOpenPolicy
}) => {
  // Input states
  const [internalProcId, setInternalProcId] = useState<string>('all_on_4');
  const [internalDestId, setInternalDestId] = useState<string>(
    DEFAULT_DESTINATION_FOR_ORIGIN[currentCurrency]?.[0] || 'Mexico'
  );

  const selectedProcedureId = controlledProcId || internalProcId;
  const selectedDestinationId = controlledDestId || internalDestId;

  const [selectedCityIndex, setSelectedCityIndex] = useState<number>(0);
  const [hotelNights, setHotelNights] = useState<number>(6);
  const [hotelTier, setHotelTier] = useState<HotelTier>('premium');
  const [hasCompanion, setHasCompanion] = useState<boolean>(false);
  const [tripsMode, setTripsMode] = useState<1 | 2>(2);
  const [customDomesticQuote, setCustomDomesticQuote] = useState<string>('');
  const [toothUnits, setToothUnits] = useState<number>(1);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);

  const nightsInputId = useId();
  const procedureSelectId = useId();
  const homeCountrySelectId = useId();
  const destinationSelectId = useId();
  const citySelectId = useId();
  const hotelTierSelectId = useId();
  const companionSelectId = useId();
  const customDomesticQuoteId = useId();
  const singleImplantUnitsId = useId();

  // Find active entities
  // Auto-sync nights and trip stages when procedure changes (e.g. from outside quick-filter chips)
  useEffect(() => {
    const proc = PROCEDURES.find((p) => p.id === selectedProcedureId);
    if (proc) {
      setHotelNights(proc.recommendedNights);
      setTripsMode(proc.typicalTrips);
    }
  }, [selectedProcedureId]);

  const procedure = PROCEDURES.find((p) => p.id === selectedProcedureId) || PROCEDURES[0];
  const destination = DESTINATIONS.find((d) => d.id === selectedDestinationId) || DESTINATIONS[0];
  const activeCity = destination.cities[selectedCityIndex] || destination.cities[0];

  const rate = fxRates[currentCurrency] || CURRENCIES[currentCurrency].defaultRate;
  const symbol = CURRENCIES[currentCurrency].symbol;

  const handleOriginSelect = (newCurr: CurrencyCode) => {
    onCurrencyChange(newCurr);
    const recommended = DEFAULT_DESTINATION_FOR_ORIGIN[newCurr];
    if (recommended && !recommended.includes(selectedDestinationId)) {
      handleDestinationChange(recommended[0]);
    }
  };

  const handleDestinationChange = (destId: string) => {
    if (setControlledDestId) {
      setControlledDestId(destId);
    } else {
      setInternalDestId(destId);
    }
    setSelectedCityIndex(0);
  };

  const handleProcedureChange = (procId: string) => {
    if (setControlledProcId) {
      setControlledProcId(procId);
    } else {
      setInternalProcId(procId);
    }
    const proc = PROCEDURES.find((p) => p.id === procId);
    if (proc) {
      setHotelNights(proc.recommendedNights);
      setTripsMode(proc.typicalTrips);
    }
  };

  const handleReset = () => {
    setCustomDomesticQuote('');
    setToothUnits(1);
    setHotelNights(procedure.recommendedNights);
    setHotelTier('premium');
    setHasCompanion(false);
    setTripsMode(procedure.typicalTrips);
    setFeedbackToast('Reset to defaults');
    setTimeout(() => setFeedbackToast(null), 2500);
  };

  // Numerical Calculations
  const unitsMultiplier = selectedProcedureId === 'single_implant' ? toothUnits : 1;

  // Base Domestic
  let domesticPrice = Math.round((procedure.domesticUSD[currentCurrency] || 25000) * unitsMultiplier * rate);
  const customVal = parseFloat(customDomesticQuote);
  const isCustomQuoteActive = !isNaN(customVal) && customVal > 0;
  if (isCustomQuoteActive) {
    domesticPrice = Math.round(customVal);
  }

  // Base Abroad Surgery Fee
  const abroadBaseUSD = (procedure.abroadUSD[destination.id] || 5000) * unitsMultiplier;
  const abroadSurgeryFee = Math.round(abroadBaseUSD * rate);

  // Flights
  const singleTripFlightUSD = destination.flightCostUSD[currentCurrency] || destination.flightCostUSD.USD || 700;
  const passengerCount = hasCompanion ? 2 : 1;
  const totalFlights = Math.round(singleTripFlightUSD * passengerCount * tripsMode * rate);

  // Accommodation
  const nightlyUSD = destination.hotelRatesUSD[hotelTier] || 85;
  const companionHotelFactor = hasCompanion ? 1.15 : 1.0;
  const totalHotel = Math.round(nightlyUSD * hotelNights * companionHotelFactor * tripsMode * rate);

  // Local transfers, airport shuttles, medications
  const dailyMiscUSD = destination.dailyMiscUSD || 30;
  const baseTransfersUSD = 160;
  const totalTransfersAndMeds = Math.round((baseTransfersUSD + (dailyMiscUSD * hotelNights)) * tripsMode * rate);

  // 3D CBCT diagnostic scan + specialist clinical consult
  const ctScanUSD = 120;
  const totalCTAndConsult = Math.round(ctScanUSD * rate);

  // Contingency Buffer
  const bufferUSD = 250;
  const totalBuffer = Math.round(bufferUSD * tripsMode * rate);

  // Total Out-Of-Pocket Abroad
  const totalAbroad = abroadSurgeryFee + totalFlights + totalHotel + totalTransfersAndMeds + totalCTAndConsult + totalBuffer;

  // Net Savings
  const netSavings = Math.max(0, domesticPrice - totalAbroad);
  const savingsPercent = domesticPrice > 0 ? Math.round((netSavings / domesticPrice) * 100) : 0;

  // Package calculation result for modals
  const calculationResult: CalculationResult = {
    currency: currentCurrency,
    symbol,
    rate,
    procedureName: procedure.name,
    destinationName: `${destination.name} (${activeCity.name})`,
    domesticTotal: domesticPrice,
    abroadProcedure: abroadSurgeryFee,
    flightsTotal: totalFlights,
    hotelTotal: totalHotel,
    transfersAndMeds: totalTransfersAndMeds,
    ctScanAndConsult: totalCTAndConsult,
    contingencyBuffer: totalBuffer,
    abroadTotal: totalAbroad,
    netSavings,
    savingsPercent,
    tripsCount: tripsMode
  };

  // Percentage shares for visual breakdown bar
  const pctSurgery = Math.round((abroadSurgeryFee / totalAbroad) * 100);
  const pctFlights = Math.round((totalFlights / totalAbroad) * 100);
  const pctHotel = Math.round((totalHotel / totalAbroad) * 100);
  const pctMisc = Math.max(1, 100 - pctSurgery - pctFlights - pctHotel);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Left Column: Input Form (5 cols) */}
      <div className="lg:col-span-5 bg-white dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 p-6 sm:p-7 rounded-3xl shadow-sm space-y-5">
        
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold border border-blue-200 dark:border-blue-800">
              1
            </span>
            Configure Treatment &amp; Journey
          </h2>
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-semibold text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>

        {feedbackToast && (
          <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-700 dark:text-blue-300 rounded-xl flex items-center gap-1.5 animate-fade-in">
            <Check className="w-3.5 h-3.5 text-blue-600" />
            <span>{feedbackToast}</span>
          </div>
        )}

        {/* Procedure Selection */}
        <div>
          <label htmlFor={procedureSelectId} className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Procedure or Surgery
          </label>
          <select
            id={procedureSelectId}
            value={selectedProcedureId}
            onChange={(e) => handleProcedureChange(e.target.value)}
            className="w-full bg-white dark:bg-[#0B132B] border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 hover:border-slate-400 transition font-medium shadow-xs"
          >
            {PROCEDURES.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tooth / Unit Count (If single implant) */}
        {selectedProcedureId === 'single_implant' && (
          <div className="p-3 bg-slate-50 dark:bg-[#0B132B] rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <label htmlFor={singleImplantUnitsId} className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Number of Teeth / Implants
            </label>
            <div className="flex items-center gap-2">
              <input
                id={singleImplantUnitsId}
                type="number"
                min={1}
                max={12}
                value={toothUnits}
                onChange={(e) => setToothUnits(Math.max(1, Math.min(12, parseInt(e.target.value) || 1)))}
                className="w-16 bg-white dark:bg-[#111C38] border border-slate-300 dark:border-slate-700 rounded-lg px-2 py-1 text-sm text-center text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 font-bold shadow-xs"
              />
              <span className="text-xs text-slate-500">units</span>
            </div>
          </div>
        )}

        {/* Origin and Destination Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label htmlFor={homeCountrySelectId} className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Home Country
            </label>
            <select
              id={homeCountrySelectId}
              value={currentCurrency}
              onChange={(e) => handleOriginSelect(e.target.value as CurrencyCode)}
              className="w-full bg-white dark:bg-[#0B132B] border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 hover:border-slate-400 transition font-medium shadow-xs"
            >
              {Object.values(CURRENCIES).map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name} ({c.symbol})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={destinationSelectId} className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Destination Country
            </label>
            <select
              id={destinationSelectId}
              value={selectedDestinationId}
              onChange={(e) => handleDestinationChange(e.target.value)}
              className="w-full bg-white dark:bg-[#0B132B] border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 hover:border-slate-400 transition font-medium shadow-xs"
            >
              {DESTINATIONS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.flag} {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Destination City / Clinic Hub */}
        <div>
          <label htmlFor={citySelectId} className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Clinic City / Region
          </label>
          <select
            id={citySelectId}
            value={selectedCityIndex}
            onChange={(e) => setSelectedCityIndex(parseInt(e.target.value))}
            className="w-full bg-white dark:bg-[#0B132B] border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 hover:border-slate-400 transition shadow-xs"
          >
            {destination.cities.map((city, idx) => (
              <option key={idx} value={idx}>
                {city.name} ({city.specialty})
              </option>
            ))}
          </select>
        </div>

        {/* Travel Parameters: Nights, Tier, Companion */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-4">
          
          {/* Recovery Hotel Nights Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              <span>Recovery Hotel Stay</span>
              <span className="text-blue-600 dark:text-blue-400 font-extrabold text-sm">
                {hotelNights} Nights
              </span>
            </div>
            <input
              id={nightsInputId}
              type="range"
              min="3"
              max="14"
              value={hotelNights}
              onChange={(e) => setHotelNights(parseInt(e.target.value, 10))}
              aria-label="Recovery Hotel Nights"
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Hotel Tier and Companion Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label htmlFor={hotelTierSelectId} className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Hotel Comfort
              </label>
              <select
                id={hotelTierSelectId}
                value={hotelTier}
                onChange={(e) => setHotelTier(e.target.value as HotelTier)}
                className="w-full bg-white dark:bg-[#0B132B] border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 hover:border-slate-400 transition font-medium shadow-xs"
              >
                <option value="standard">3★ Comfort ({symbol}{Math.round(destination.hotelRatesUSD.standard * rate)}/nt)</option>
                <option value="premium">4★ Recovery ({symbol}{Math.round(destination.hotelRatesUSD.premium * rate)}/nt)</option>
                <option value="luxury">5★ Executive ({symbol}{Math.round(destination.hotelRatesUSD.luxury * rate)}/nt)</option>
              </select>
            </div>
            <div>
              <label htmlFor={companionSelectId} className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Travelers
              </label>
              <select
                id={companionSelectId}
                value={hasCompanion ? '1' : '0'}
                onChange={(e) => setHasCompanion(e.target.value === '1')}
                className="w-full bg-white dark:bg-[#0B132B] border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 hover:border-slate-400 transition font-medium shadow-xs"
              >
                <option value="0">Solo Traveler</option>
                <option value="1">With 1 Companion (+Flight)</option>
              </select>
            </div>
          </div>

          {/* Treatment Trips Mode: 1 Trip vs 2 Trips */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Trip Stages
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-[#0B132B] rounded-xl border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setTripsMode(1)}
                className={`py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  tripsMode === 1
                    ? 'bg-white dark:bg-[#111C38] text-blue-700 dark:text-blue-400 shadow-xs border border-slate-200 dark:border-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                1 Trip (Immediate / Prep)
              </button>
              <button
                type="button"
                onClick={() => setTripsMode(2)}
                className={`py-2 px-3 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  tripsMode === 2
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                2 Trips (Full All-In)
              </button>
            </div>
          </div>
        </div>

        {/* Custom Domestic Quote Override */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor={customDomesticQuoteId} className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Have a Local Dentist Quote? (Optional)
            </label>
            {isCustomQuoteActive && (
              <button
                type="button"
                onClick={() => {
                  setCustomDomesticQuote('');
                  setFeedbackToast('Reverted to national average');
                  setTimeout(() => setFeedbackToast(null), 2500);
                }}
                className="text-[10px] text-rose-600 hover:underline font-semibold cursor-pointer"
              >
                Reset to Average
              </button>
            )}
          </div>
          <div className="relative">
            <span className="absolute left-3.5 top-2.5 text-slate-400 text-sm font-semibold">{symbol}</span>
            <input
              id={customDomesticQuoteId}
              type="number"
              value={customDomesticQuote}
              onChange={(e) => setCustomDomesticQuote(e.target.value)}
              placeholder={`National average is ${symbol}${domesticPrice.toLocaleString()}`}
              className="w-full bg-white dark:bg-[#0B132B] border border-slate-300 dark:border-slate-700 rounded-xl pl-8 pr-3.5 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-600 hover:border-slate-400 transition font-medium shadow-xs"
            />
          </div>
        </div>

        {/* Compact Trust Guarantee */}
        <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-800/60 text-xs text-blue-900 dark:text-blue-300 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="text-[11px] font-medium">
            Benchmarked against verified JCI &amp; ISO accredited hospitals with Straumann &amp; Nobel passports.
          </span>
        </div>
      </div>

      {/* Right Column: Clean Results & Itemized Breakdown (7 cols) */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* Top KPI Scorecards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Total Domestic Card */}
          <div className="bg-gradient-to-br from-rose-500 via-rose-600 to-red-600 text-white p-5 rounded-2xl shadow-md shadow-rose-500/20 hover:shadow-lg hover:-translate-y-0.5 transition duration-200">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-extrabold text-rose-100">
                Total Domestic
              </span>
              <span className="text-[11px] font-bold bg-white/20 px-2 py-0.5 rounded-full text-white">
                Home Clinic
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white mt-1 tabular-nums">
              {symbol}{domesticPrice.toLocaleString()}
            </p>
            <span className="text-[11px] text-rose-100 font-medium">
              Average national clinic fee
            </span>
          </div>

          {/* Total All-In Abroad Card */}
          <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 text-white p-5 rounded-2xl shadow-md shadow-emerald-500/20 hover:shadow-lg hover:-translate-y-0.5 transition duration-200">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-100">
                Total All-In Abroad
              </span>
              <span className="text-[11px] font-bold bg-white/20 px-2 py-0.5 rounded-full text-white truncate max-w-[110px]">
                {destination.name}
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white mt-1 tabular-nums">
              {symbol}{totalAbroad.toLocaleString()}
            </p>
            <span className="text-[11px] text-emerald-100 font-medium">
              Surgery + Flights + Hotel
            </span>
          </div>

          {/* Net Savings Card */}
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white p-5 rounded-2xl shadow-md shadow-blue-500/20 hover:shadow-lg hover:-translate-y-0.5 transition duration-200">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider font-extrabold text-blue-100">
                Net Savings
              </span>
              <span className="text-[11px] font-black bg-white/20 px-2 py-0.5 rounded-full text-white tabular-nums">
                Save {savingsPercent}%
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white mt-1 tabular-nums">
              {symbol}{netSavings.toLocaleString()}
            </p>
            <span className="text-[11px] text-blue-100 font-medium">
              Kept in your bank account
            </span>
          </div>
        </div>

        {/* Visual Expense Share Bar */}
        <div className="bg-white dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 p-4 rounded-2xl space-y-2.5 shadow-xs">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-900 dark:text-white">
              Where Your Budget Goes Abroad:
            </span>
            <span className="text-slate-500 dark:text-slate-400 text-xs font-medium">
              Surgery: <strong className="text-emerald-600 dark:text-emerald-400">{pctSurgery}%</strong> • Flights: <strong className="text-blue-600 dark:text-blue-400">{pctFlights}%</strong> • Hotel: <strong className="text-sky-600 dark:text-sky-400">{pctHotel}%</strong>
            </span>
          </div>
          <div className="h-2.5 w-full bg-slate-100 dark:bg-[#0B132B] rounded-full overflow-hidden flex shadow-inner">
            <div style={{ width: `${pctSurgery}%` }} className="bg-emerald-500" />
            <div style={{ width: `${pctFlights}%` }} className="bg-blue-600" />
            <div style={{ width: `${pctHotel}%` }} className="bg-sky-500" />
            <div style={{ width: `${pctMisc}%` }} className="bg-amber-400" />
          </div>
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 dark:text-slate-400 pt-0.5">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Surgery ({symbol}{abroadSurgeryFee.toLocaleString()})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              Flights ({symbol}{totalFlights.toLocaleString()})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              Hotel ({symbol}{totalHotel.toLocaleString()})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Transfers &amp; Buffer ({symbol}{(totalTransfersAndMeds + totalCTAndConsult + totalBuffer).toLocaleString()})
            </span>
          </div>
        </div>

        {/* Clean Itemized Breakdown Table */}
        <div className="bg-white dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
          <div className="px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-[#0B132B]">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Itemized All-In Cost Breakdown
            </h3>
            <span className="text-xs font-semibold text-slate-500">
              {currentCurrency} vs {destination.name}
            </span>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
            
            {/* Surgery */}
            <div className="px-5 py-3.5 flex justify-between items-center hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white">
                  Base Procedure &amp; Surgical Fee
                </span>
                <span className="block text-[11px] text-slate-500">
                  {procedure.name}
                </span>
              </div>
              <div className="text-right">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                  {symbol}{abroadSurgeryFee.toLocaleString()}
                </span>
                <span className="block text-[11px] text-rose-500 line-through tabular-nums">
                  {symbol}{domesticPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Flights */}
            <div className="px-5 py-3.5 flex justify-between items-center hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <div className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="font-semibold text-slate-900 dark:text-white">
                  Round-Trip Airfare ({tripsMode} {tripsMode === 1 ? 'Trip' : 'Trips'})
                </span>
              </div>
              <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                {symbol}{totalFlights.toLocaleString()}
              </span>
            </div>

            {/* Hotel */}
            <div className="px-5 py-3.5 flex justify-between items-center hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span className="font-semibold text-slate-900 dark:text-white">
                  Recovery Hotel ({hotelNights * tripsMode} Nights Total)
                </span>
              </div>
              <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                {symbol}{totalHotel.toLocaleString()}
              </span>
            </div>

            {/* Transfers & Meds */}
            <div className="px-5 py-3.5 flex justify-between items-center hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <div className="flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="font-semibold text-slate-900 dark:text-white">
                  Clinic Transfers &amp; Prescription Pack
                </span>
              </div>
              <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                {symbol}{totalTransfersAndMeds.toLocaleString()}
              </span>
            </div>

            {/* 3D CBCT Scan */}
            <div className="px-5 py-3.5 flex justify-between items-center hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span className="font-semibold text-slate-900 dark:text-white">
                  3D CBCT Scan &amp; Specialist Planning
                </span>
              </div>
              <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                {symbol}{totalCTAndConsult.toLocaleString()}
              </span>
            </div>

            {/* Contingency Buffer */}
            <div className="px-5 py-3.5 flex justify-between items-center hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-slate-400" />
                <span className="font-semibold text-slate-900 dark:text-white">
                  Contingency Incidentals Buffer
                </span>
              </div>
              <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                {symbol}{totalBuffer.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Total Row */}
          <div className="px-5 py-4 bg-slate-50 dark:bg-[#0B132B] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between font-bold">
            <span className="text-slate-900 dark:text-white text-sm">
              Total Out-Of-Pocket Expense Abroad:
            </span>
            <span className="text-xl font-black text-blue-700 dark:text-blue-400 tabular-nums">
              {symbol}{totalAbroad.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => onOpenPrintModal(calculationResult)}
            className="py-3 px-4 rounded-xl bg-white dark:bg-[#111C38] hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition flex items-center justify-center gap-2 shadow-xs hover:shadow-sm cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Print / Save</span>
          </button>
          <button
            type="button"
            onClick={onOpenCompareModal}
            className="py-3 px-4 rounded-xl bg-white dark:bg-[#111C38] hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition flex items-center justify-center gap-2 shadow-xs hover:shadow-sm cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Compare Countries</span>
          </button>
          <button
            type="button"
            onClick={() => onOpenQuoteModal(calculationResult)}
            className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-black transition flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/25 hover:shadow-lg cursor-pointer"
          >
            <span>Get Free Clinic Quotes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Informational Disclaimer */}
        <div className="text-center sm:text-left text-[11px] text-slate-400 dark:text-slate-500 pt-1 leading-relaxed">
          <span>* Estimations reflect regional fee medians &amp; live FX rates. Final surgical scope requires an in-person CBCT scan by an accredited oral surgeon. Review our </span>
          <button
            type="button"
            onClick={() => onOpenPolicy?.('disclaimer')}
            className="text-blue-600 dark:text-blue-400 underline font-medium hover:text-blue-700 cursor-pointer"
          >
            Medical &amp; Financial Disclaimer
          </button>
          <span>.</span>
        </div>
      </div>
    </div>
  );
};
