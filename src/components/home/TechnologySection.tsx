import React, { useState } from 'react';
import { 
  Cpu, 
  Binary, 
  Network, 
  Terminal, 
  FileCode, 
  Check, 
  Copy, 
  Zap, 
  HardDrive,
  Activity
} from 'lucide-react';

export const TechnologySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mql4' | 'webrequest' | 'license' | 'parameters'>('mql4');
  const [copied, setCopied] = useState(false);

  const codeSnippets = {
    mql4: `//+------------------------------------------------------------------+
//| TITAN GRID EA - Dynamic ATR Order Dispatcher (MQL4 C++)          |
//+------------------------------------------------------------------+
void ExecuteDynamicGridTranche(int magicNumber, double currentAtr) {
    double dynamicStepPips = CalculateAtrSpacing(currentAtr, InpGridMultiplier);
    double calculatedLot   = ComputeDynamicEquityLot(InpRiskPercent, InpAccountType);
    
    // Check Spread & Execution Guards
    if (MarketInfo(Symbol(), MODE_SPREAD) > InpMaxSpreadPips * 10) {
        Print("[TITAN_GUARD] Spread spike detected. Order execution deferred.");
        return;
    }
    
    // Dispatch Non-Martingale Basket Entry
    int ticket = OrderSend(Symbol(), OP_BUYSTOP, calculatedLot, 
                           Ask + dynamicStepPips * Point, 3, 0, 0, 
                           "TitanGrid_Basket", magicNumber, 0, clrCyan);
}`,
    webrequest: `//+------------------------------------------------------------------+
//| TITAN GRID EA - Low Latency News Calendar WebRequest Bridge     |
//+------------------------------------------------------------------+
bool CheckMacroEconomicEventWindow() {
    char postData[], resultData[];
    string resultHeaders;
    string url = "https://api.titangrid-ea.com/v1/news/calendar?currency=" + Symbol();
    
    int res = WebRequest("GET", url, "", NULL, 3000, postData, 0, resultData, resultHeaders);
    if (res == 200) {
        bool highImpactUpcoming = ParseNewsResponse(resultData);
        if (highImpactUpcoming) {
            Print("[TITAN_NEWS] High Impact news within 30m. Grid auto-paused.");
            return true;
        }
    }
    return false;
}`,
    license: `//+------------------------------------------------------------------+
//| TITAN GRID EA - Hardware Bound MT4 Terminal Validator           |
//+------------------------------------------------------------------+
bool ValidateTerminalLicense(string licenseKey, long accountNumber) {
    string payload = "{\\"license\\":\\"" + licenseKey + "\\",\\"account\\":" + IntegerToString(accountNumber) + "}";
    // Encrypted TLS Handshake with Titan Licensing Server
    int authCode = RemoteLicenseHandshake(payload);
    if (authCode == 1001) {
        g_IsAuthorized = true;
        Print("[TITAN_AUTH] License Validated for MT4 Account: ", accountNumber);
        return true;
    }
    Alert("[TITAN_AUTH_FAIL] Invalid license or account mismatch.");
    return false;
}`,
    parameters: `//+------------------------------------------------------------------+
//| TITAN GRID EA - Standard Production Input Parameters            |
//+------------------------------------------------------------------+
input string   InpLicenseKey          = "TITAN-PRO-XXXX-XXXX"; // Client License
input double   InpBaseLotSize         = 0.01;                  // Base Order Lot
input bool     InpAutoLotEquity       = true;                  // Dynamic Balance Sizing
input int      InpAtrPeriod           = 14;                    // ATR Volatility Period
input double   InpGridStepAtrMult     = 1.65;                  // Grid Distance Multiplier
input int      InpMaxTranches         = 6;                     // Max Order Levels
input double   InpHardStopDrawdown    = 5.0;                   // % Equity Hard Circuit
input bool     InpCloseOnFriday       = true;                  // Weekend Gap Guard`
  };

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="technology" className="py-20 lg:py-28 bg-[#0B0F1A] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-800/60 text-xs font-mono text-indigo-300 uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            High-Performance MQL4 Codebase
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Under the Hood of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-teal-300">Titan Grid Engine</span>
          </h2>
          <p className="text-base text-slate-400 leading-relaxed">
            Written in highly optimized MQL4 / C++ to ensure sub-5ms tick processing, zero terminal lag, 
            and bulletproof execution across standard, raw spread, and ECN broker environments.
          </p>
        </div>

        {/* 3 Tech Architecture Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800/70 flex items-center justify-center text-cyan-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Sub-5ms Execution Latency</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Compiled to native machine instructions for zero memory leaks. Processes every tick event with instant order modification and pending stop recalculations.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-800/70 flex items-center justify-center text-indigo-400">
              <Network className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Encrypted WebRequest Bridge</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Direct TLS-encrypted API synchronization for real-time macro calendar updates, remote license heartbeat verification, and server-side tick validation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800/70 flex items-center justify-center text-emerald-400">
              <HardDrive className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Universal MT4 Compatibility</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Fully supports all MetaTrader 4 broker builds (1420+). Operates flawlessly on Windows Server VPS, MacOS Wine wrappers, and multi-terminal instances.
            </p>
          </div>
        </div>

        {/* Code & Logic Architecture Inspector */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
          {/* Tabs Bar */}
          <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800 gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <button
                onClick={() => setActiveTab('mql4')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeTab === 'mql4'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                OrderDispatcher.mq4
              </button>
              <button
                onClick={() => setActiveTab('webrequest')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeTab === 'webrequest'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                NewsCalendarBridge.mq4
              </button>
              <button
                onClick={() => setActiveTab('license')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeTab === 'license'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                LicenseAuth.mq4
              </button>
              <button
                onClick={() => setActiveTab('parameters')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeTab === 'parameters'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                EA_Parameters.set
              </button>
            </div>

            <button
              onClick={copyCode}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Snippet</span>
                </>
              )}
            </button>
          </div>

          {/* Code Viewer Body */}
          <div className="p-4 sm:p-6 overflow-x-auto bg-[#070b12] font-mono text-xs sm:text-sm text-cyan-100/90 leading-relaxed">
            <pre className="selection:bg-cyan-500 selection:text-black">
              <code>{codeSnippets[activeTab]}</code>
            </pre>
          </div>

          {/* Footer of code viewer */}
          <div className="px-6 py-3 bg-slate-900/60 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Compiled with MQL4 Strict Compiler 2026
            </span>
            <span>Zero Unprotected Martingale Loops</span>
          </div>
        </div>

      </div>
    </section>
  );
};
