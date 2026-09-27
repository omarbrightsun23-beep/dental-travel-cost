import React, { useState } from 'react';
import { CalculationResult } from '../types';
import { X, Printer, Download, Copy, Check, FileText, ShieldCheck } from 'lucide-react';

interface PrintEstimateModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: CalculationResult | null;
}

export const PrintEstimateModal: React.FC<PrintEstimateModalProps> = ({
  isOpen,
  onClose,
  result
}) => {
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [printError, setPrintError] = useState<string | null>(null);

  if (!isOpen || !result) return null;

  const todayStr = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Safe window.print with iframe exception handling
  const handlePrint = () => {
    setPrintError(null);
    try {
      if (typeof window !== 'undefined') {
        window.print();
      }
    } catch (err) {
      console.warn('Direct print blocked by iframe sandbox:', err);
      setPrintError('Browser print dialog is restricted inside preview. Please use "Download HTML Document" or "Copy Summary" below.');
    }
  };

  // Formatted Text Summary for Clipboard
  const generateTextSummary = () => {
    return `=====================================================
DENTALTRAVELCOST ESTIMATE
Generated: ${todayStr}
=====================================================
PROCEDURE: ${result.procedureName}
DESTINATION: ${result.destinationName}
TREATMENT PLAN: ${result.tripsCount} ${result.tripsCount === 1 ? 'Trip' : 'Trips (Osseointegration)'}
CURRENCY: ${result.currency}

-----------------------------------------------------
ITEMIZED ALL-IN COST BREAKDOWN:
-----------------------------------------------------
• Base Procedure Fee:           ${result.symbol}${result.abroadProcedure.toLocaleString()}
• Return Flights (Airfare):     ${result.symbol}${result.flightsTotal.toLocaleString()}
• Recovery Hotel Stay:          ${result.symbol}${result.hotelTotal.toLocaleString()}
• Local Transfers & Meds:       ${result.symbol}${result.transfersAndMeds.toLocaleString()}
• 3D CBCT Imaging & Consult:    ${result.symbol}${result.ctScanAndConsult.toLocaleString()}
• Contingency Reserve Fund:     ${result.symbol}${result.contingencyBuffer.toLocaleString()}
-----------------------------------------------------
TOTAL ALL-IN OUT-OF-POCKET:     ${result.symbol}${result.abroadTotal.toLocaleString()} ${result.currency}
DOMESTIC HOME CLINIC BENCHMARK: ${result.symbol}${result.domesticTotal.toLocaleString()} ${result.currency}
-----------------------------------------------------
GUARANTEED NET SAVINGS:         ${result.symbol}${result.netSavings.toLocaleString()} (Save ${result.savingsPercent}%)
=====================================================
QUALITY STANDARDS: JCI Accredited · ISO 9001:2015 · Genuine Straumann / Nobel Biocare Passports.
DentalTravelCost Patient Desk: (555) 567-8901 | contact@dentaltravelcost.com
`;
  };

  const handleCopy = async () => {
    try {
      const text = generateTextSummary();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = generateTextSummary();
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  // Download standalone printable HTML file (Works 100% in all iframes and browsers!)
  const handleDownloadHTML = () => {
    try {
      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DentalTravelCost Estimate - ${result.procedureName}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 40px; color: #1e293b; line-height: 1.5; }
    .header { border-bottom: 2px solid #2563eb; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: flex-start; }
    h1 { margin: 0; color: #0f172a; font-size: 24px; }
    .badge { background: #dbeafe; color: #1d4ed8; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: bold; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; background: #f8fafc; padding: 16px; border-radius: 10px; margin-bottom: 24px; border: 1px solid #e2e8f0; }
    .grid-label { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: bold; }
    .grid-val { font-size: 15px; font-weight: bold; color: #0f172a; margin-top: 4px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    th { text-align: left; padding: 10px; border-bottom: 2px solid #cbd5e1; font-size: 13px; color: #475569; }
    td { padding: 10px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .text-right { text-align: right; }
    .total-row { font-size: 16px; font-weight: bold; border-top: 2px solid #0f172a; border-bottom: 2px solid #0f172a; }
    .savings-row { color: #059669; font-size: 18px; font-weight: bold; }
    .footer { font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 16px; margin-top: 32px; }
    @media print { .no-print { display: none; } }
  </style>
</head>
<body>
  <div class="no-print" style="margin-bottom: 20px;">
    <button onclick="window.print()" style="background: #2563eb; color: white; border: none; padding: 10px 20px; font-weight: bold; border-radius: 6px; cursor: pointer;">Print / Save as PDF</button>
  </div>
  <div class="header">
    <div>
      <h1>DentalTravelCost Estimate</h1>
      <p style="margin: 4px 0 0 0; color: #64748b; font-size: 13px;">Comparative Out-of-Pocket Procedure & Travel Calculator</p>
    </div>
    <div style="text-align: right;">
      <span class="badge">Verified Estimate</span>
      <p style="margin: 6px 0 0 0; font-size: 12px; color: #64748b;">Date: ${todayStr}</p>
    </div>
  </div>

  <div class="grid">
    <div>
      <div class="grid-label">Procedure</div>
      <div class="grid-val">${result.procedureName}</div>
    </div>
    <div>
      <div class="grid-label">Destination Hub</div>
      <div class="grid-val">${result.destinationName}</div>
    </div>
    <div>
      <div class="grid-label">Journey Plan</div>
      <div class="grid-val">${result.tripsCount} ${result.tripsCount === 1 ? 'Trip' : 'Trips (Osseointegration)'}</div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Line Item Description</th>
        <th class="text-right">Estimated Investment (${result.currency})</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Base Procedure / Surgical Fee</td>
        <td class="text-right" style="font-weight: bold; color: #059669;">${result.symbol}${result.abroadProcedure.toLocaleString()}</td>
      </tr>
      <tr>
        <td>Return Flights (Round-trip airfare)</td>
        <td class="text-right">${result.symbol}${result.flightsTotal.toLocaleString()}</td>
      </tr>
      <tr>
        <td>Recovery Hotel Accommodation</td>
        <td class="text-right">${result.symbol}${result.hotelTotal.toLocaleString()}</td>
      </tr>
      <tr>
        <td>VIP Airport Transfers & Prescription Care Pack</td>
        <td class="text-right">${result.symbol}${result.transfersAndMeds.toLocaleString()}</td>
      </tr>
      <tr>
        <td>3D CBCT Imaging & Clinical Consultation</td>
        <td class="text-right">${result.symbol}${result.ctScanAndConsult.toLocaleString()}</td>
      </tr>
      <tr>
        <td>Contingency Buffer & Follow-Up Reserve</td>
        <td class="text-right">${result.symbol}${result.contingencyBuffer.toLocaleString()}</td>
      </tr>
      <tr class="total-row">
        <td>Total Expected All-In Investment Abroad:</td>
        <td class="text-right" style="color: #2563eb;">${result.symbol}${result.abroadTotal.toLocaleString()}</td>
      </tr>
      <tr>
        <td style="color: #64748b;">Domestic Hometown Benchmark:</td>
        <td class="text-right" style="color: #e11d48; text-decoration: line-through;">${result.symbol}${result.domesticTotal.toLocaleString()}</td>
      </tr>
      <tr class="savings-row">
        <td>Net Guaranteed Patient Savings:</td>
        <td class="text-right">Save ${result.symbol}${result.netSavings.toLocaleString()} (${result.savingsPercent}%)</td>
      </tr>
    </tbody>
  </table>

  <div class="footer">
    <p><strong>Clinical Standards:</strong> Verified against JCI-accredited surgical hospitals deploying genuine Straumann / Nobel Biocare titanium fixtures with international warranty passports.</p>
    <p>DentalTravelCost Coordination: (555) 567-8901 | contact@dentaltravelcost.com</p>
  </div>
</body>
</html>`;

      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `DentalTravelEstimate_${result.procedureName.replace(/[^a-zA-Z0-9]/g, '_')}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    } catch (err) {
      console.error('Download failed:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-2xl w-full bg-white dark:bg-[#111C38] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative my-8 print:border-none print:shadow-none print:bg-white print:text-black">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 dark:hover:text-white transition p-1 print:hidden"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Action Header with 3 Real Working Actions */}
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4 mb-6 print:hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Itemized Treatment Travel Estimate</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Save, download, or copy your personalized calculation.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              {/* Copy Button */}
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-xl transition shadow-sm"
                title="Copy formatted summary to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
              </button>

              {/* Download File Button */}
              <button
                type="button"
                onClick={handleDownloadHTML}
                className="flex items-center gap-1 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs rounded-xl transition shadow-sm"
                title="Download self-contained printable document file"
              >
                {downloadSuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Download className="w-3.5 h-3.5 text-blue-600" />}
                <span>{downloadSuccess ? 'Downloaded!' : 'Save Document (.html)'}</span>
              </button>

              {/* Direct Print Button */}
              <button
                type="button"
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs rounded-xl transition shadow-sm shadow-blue-500/20"
                title="Open browser print dialog"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save as PDF</span>
              </button>
            </div>
          </div>

          {/* Feedback alerts */}
          {copied && (
            <div className="mt-3 p-2.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 rounded-xl flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Full itemized estimate copied to your clipboard. You can paste it into an email or document!</span>
            </div>
          )}

          {downloadSuccess && (
            <div className="mt-3 p-2.5 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs text-blue-800 dark:text-blue-300 rounded-xl flex items-center gap-2">
              <Download className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Estimate downloaded as a printable HTML document. Open it in any browser to print or save directly as PDF!</span>
            </div>
          )}

          {printError && (
            <div className="mt-3 p-2.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 rounded-xl">
              {printError}
            </div>
          )}
        </div>

        {/* Printable Document Body */}
        <div className="space-y-6 text-slate-800 dark:text-slate-200 print:text-slate-900">
          
          {/* Header of sheet */}
          <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white print:text-black">
                  DentalTravel<span className="text-blue-600">Cost Index</span>
                </span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  Verified Audit
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Comparative Out-of-Pocket Medical Travel Estimation
              </p>
            </div>
            <div className="text-right text-xs text-slate-500 dark:text-slate-400">
              <p>Generated: <strong>{todayStr}</strong></p>
              <p>Currency: <strong>{result.currency}</strong></p>
            </div>
          </div>

          {/* Core Summary Grid */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 text-xs">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Procedure</span>
              <span className="font-bold text-slate-900 dark:text-white print:text-black">{result.procedureName}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Destination Hub</span>
              <span className="font-bold text-slate-900 dark:text-white print:text-black">{result.destinationName}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Treatment Stages</span>
              <span className="font-bold text-blue-700 dark:text-blue-400">
                {result.tripsCount} {result.tripsCount === 1 ? 'Trip' : 'Trips (Osseointegration)'}
              </span>
            </div>
          </div>

          {/* Itemized Table */}
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                <th className="py-2.5 font-bold">Line Item Description</th>
                <th className="py-2.5 font-bold text-right">Estimated Investment ({result.currency})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="py-2.5">Base Surgical / Clinical Treatment Fee</td>
                <td className="py-2.5 text-right font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                  {result.symbol}{result.abroadProcedure.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="py-2.5">Round-trip Return Flights (All travel legs)</td>
                <td className="py-2.5 text-right tabular-nums">
                  {result.symbol}{result.flightsTotal.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="py-2.5">Recovery Hotel Accommodation</td>
                <td className="py-2.5 text-right tabular-nums">
                  {result.symbol}{result.hotelTotal.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="py-2.5">Local VIP Airport Transfers & Prescription Recovery Pack</td>
                <td className="py-2.5 text-right tabular-nums">
                  {result.symbol}{result.transfersAndMeds.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="py-2.5">3D CBCT Radiographic Imaging & Specialist Clinical Consult</td>
                <td className="py-2.5 text-right tabular-nums">
                  {result.symbol}{result.ctScanAndConsult.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="py-2.5">Safety Contingency Reserve & Pharmacy Incidentals</td>
                <td className="py-2.5 text-right tabular-nums">
                  {result.symbol}{result.contingencyBuffer.toLocaleString()}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-200 dark:border-slate-700 font-bold text-sm">
                <td className="py-3 text-slate-900 dark:text-white">Total All-In Overseas Investment:</td>
                <td className="py-3 text-right text-blue-700 dark:text-blue-400 tabular-nums">
                  {result.symbol}{result.abroadTotal.toLocaleString()}
                </td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-xs">
                <td className="py-2 text-slate-500">Domestic Clinic Benchmark:</td>
                <td className="py-2 text-right text-rose-500 line-through tabular-nums">
                  {result.symbol}{result.domesticTotal.toLocaleString()}
                </td>
              </tr>
              <tr className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400">
                <td className="py-2.5">Net Realized Patient Savings:</td>
                <td className="py-2.5 text-right tabular-nums">
                  Save {result.symbol}{result.netSavings.toLocaleString()} ({result.savingsPercent}%)
                </td>
              </tr>
            </tfoot>
          </table>

          {/* Quality & Legal Disclaimers */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0B132B] border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
            <p className="font-semibold text-slate-700 dark:text-slate-300">
              Clinical Quality Verification Notice:
            </p>
            <p>
              Estimates are benchmarked against JCI-accredited or ISO 9001:2015 certified dental centers using genuine global implant systems (Straumann, Nobel Biocare, Zimmer). This document is for budgeting and planning purposes and does not constitute a formal doctor-patient surgical agreement.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
