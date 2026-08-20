import React, { useState } from 'react';
import { PageType, ProductTier } from '../../types';
import { PRODUCT_TIERS, CURRENT_EA_VERSION, MT4_BUILD_SUPPORT } from '../../data/mockData';
import { 
  Terminal, 
  Check, 
  Sparkles, 
  Download, 
  ShieldCheck, 
  Cpu, 
  HardDrive, 
  Layers, 
  AlertCircle, 
  FileText, 
  Zap, 
  X, 
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

interface ProductPageProps {
  setCurrentPage: (page: PageType) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ setCurrentPage }) => {
  const [selectedTierForCheckout, setSelectedTierForCheckout] = useState<ProductTier | null>(null);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'changelog' | 'presets'>('specs');

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/70 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            MetaTrader 4 Quantitative Product Suite
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Titan Grid EA <span className="text-cyan-400 font-mono">{CURRENT_EA_VERSION}</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            The complete automated trading package engineered for MetaTrader 4. Includes the compiled <code className="text-cyan-300 font-mono text-xs bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">.ex4</code> binary, 
            optimized pair presets, news calendar WebRequest bridge, and lifetime technical support.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
              Platform: MetaTrader 4 ({MT4_BUILD_SUPPORT})
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              Prop-Firm Compatible (FTMO Safe)
            </span>
          </div>
        </div>

        {/* Quick Action Banner: Buy or Download Demo */}
        <div className="mb-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0d1424] to-cyan-950/50 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl glow-cyan">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
              <h2 className="text-xl font-bold text-white">Ready to deploy Titan Grid EA on your MT4?</h2>
            </div>
            <p className="text-sm text-slate-400 max-w-xl">
              Choose a lifetime license package below, or download the evaluation package (.SET presets and user manual) to inspect the strategy rules.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              id="product-download-demo-btn"
              onClick={() => setDownloadModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-sm font-semibold transition-all"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download Demo / Manual (Placeholder)</span>
            </button>
            <a
              href="#pricing-tiers"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-bold shadow-lg shadow-cyan-950 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>View Pricing & Licenses</span>
            </a>
          </div>
        </div>

        {/* Technical Specs & Changelog Tabs */}
        <div className="mb-20">
          <div className="flex border-b border-slate-800 mb-8 overflow-x-auto gap-2">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-4 px-4 text-sm font-bold font-mono transition-all border-b-2 flex items-center gap-2 ${
                activeTab === 'specs'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-4 h-4" />
              Technical Specifications
            </button>

            <button
              onClick={() => setActiveTab('changelog')}
              className={`pb-4 px-4 text-sm font-bold font-mono transition-all border-b-2 flex items-center gap-2 ${
                activeTab === 'changelog'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              Version Changelog ({CURRENT_EA_VERSION})
            </button>

            <button
              onClick={() => setActiveTab('presets')}
              className={`pb-4 px-4 text-sm font-bold font-mono transition-all border-b-2 flex items-center gap-2 ${
                activeTab === 'presets'
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              Included .SET Presets
            </button>
          </div>

          {/* Tab 1: Specs */}
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  MetaTrader Environment & Requirements
                </h3>
                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400">Supported Terminal</span>
                    <span className="font-semibold text-white font-mono">MetaTrader 4 (MT4 Build 1420+)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400">Recommended Chart Timeframe</span>
                    <span className="font-semibold text-cyan-300 font-mono">M15 (15 Minutes) or H1 (1 Hour)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400">Optimized Pairs</span>
                    <span className="font-semibold text-white font-mono">GBPUSD, EURUSD, AUDCAD, NZDCAD</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400">Minimum Recommended Deposit</span>
                    <span className="font-semibold text-emerald-400 font-mono">$500 (Standard) or $50 (Cent Account)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400">Recommended Account Leverage</span>
                    <span className="font-semibold text-white font-mono">1:100 to 1:500</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400">Broker Account Type</span>
                    <span className="font-semibold text-white font-mono">ECN / Raw Spread / Low Commission</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Algorithmic Protections & Permissions
                </h3>
                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400">WebRequest URL Permission</span>
                    <span className="font-semibold text-cyan-300 font-mono">https://api.titangrid-ea.com</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400">Allow Live Trading</span>
                    <span className="font-semibold text-emerald-400 font-mono">Required in MT4 Options</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400">Allow DLL Imports</span>
                    <span className="font-semibold text-slate-300 font-mono">Optional (Not strictly required)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400">Execution Model</span>
                    <span className="font-semibold text-white font-mono">Dynamic ATR Volatility Spaced Grid</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-800">
                    <span className="text-slate-400">Prop Firm Hard Stop Limiter</span>
                    <span className="font-semibold text-emerald-400 font-mono">Enabled (User configurable 3-5%)</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-slate-400">VPS Latency Requirement</span>
                    <span className="font-semibold text-white font-mono">&lt; 15ms to Broker Data Center</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Changelog */}
          {activeTab === 'changelog' && (
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
              <div className="border-l-2 border-cyan-400 pl-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white font-mono">Version 3.4.2 Pro (Current Production Release)</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">LATEST</span>
                </div>
                <div className="text-xs text-slate-400 font-mono">Released: July 28, 2026 • MT4 Build 1420+ Certified</div>
                <ul className="text-sm text-slate-300 space-y-1 list-disc list-inside pt-1">
                  <li>Upgraded ATR volatility step multiplier algorithm with dynamic spread dampener.</li>
                  <li>Added dedicated <strong className="text-white">Prop-Firm Challenge Safe-Mode</strong> with strict daily loss liquidation.</li>
                  <li>Optimized WebRequest news calendar parser to handle sudden central bank emergency announcements.</li>
                  <li>Reduced tick execution loop overhead to under 4.2ms.</li>
                </ul>
              </div>

              <div className="border-l-2 border-slate-700 pl-4 space-y-2 opacity-80">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white font-mono">Version 3.3.0</span>
                </div>
                <div className="text-xs text-slate-400 font-mono">Released: March 14, 2026</div>
                <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside pt-1">
                  <li>Introduced correlated multi-pair hedging mode between GBPUSD and EURUSD.</li>
                  <li>Enhanced Friday market close automation with slippage protection.</li>
                </ul>
              </div>
            </div>
          )}

          {/* Tab 3: Presets */}
          {activeTab === 'presets' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Low Drawdown
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Conservative.set</span>
                </div>
                <h4 className="text-base font-bold text-white">TitanGrid_Conservative_EURUSD.set</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Engineered for capital preservation. 0.01 lot per $2,000 equity with wide ATR spacing and 6.0% maximum equity hard stop.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/40 bg-gradient-to-b from-slate-900 to-cyan-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                    Prop-Firm Ready
                  </span>
                  <span className="text-xs text-slate-400 font-mono">FTMO_Safe.set</span>
                </div>
                <h4 className="text-base font-bold text-white">TitanGrid_FTMO_PropChallenge.set</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Strict 4.5% daily drawdown circuit breaker, zero weekend positions, and 30-minute news lockout. Passes verification phases safely.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                    High Yield
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Aggressive.set</span>
                </div>
                <h4 className="text-base font-bold text-white">TitanGrid_Aggressive_GBPUSD.set</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Tighter grid distances and accelerated partial trailing take-profit levels for rapid compound growth on cent or test accounts.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Pricing Tiers Section (Placeholders for Payment Processing) */}
        <div id="pricing-tiers" className="pt-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Transparent Lifetime Pricing
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Select Your License Tier
            </h2>
            <p className="text-sm text-slate-400">
              One-time payment for lifetime software access. No recurring subscription lock-ins.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {PRODUCT_TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`relative rounded-2xl p-7 flex flex-col justify-between transition-all duration-200 ${
                  tier.recommended
                    ? 'bg-gradient-to-b from-slate-900 via-[#0d1527] to-[#090D16] border-2 border-cyan-400 shadow-2xl shadow-cyan-950/60 glow-cyan lg:-translate-y-2'
                    : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 text-[11px] font-extrabold uppercase tracking-wider shadow-lg font-mono">
                    {tier.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                    <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-cyan-300">
                      {tier.maxMt4Accounts} {tier.maxMt4Accounts === 1 ? 'MT4 Account' : 'MT4 Accounts'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  <div className="mb-6 pb-6 border-b border-slate-800 flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold text-white font-mono">${tier.price}</span>
                    <span className="text-xs text-slate-400 font-mono">/ {tier.period}</span>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                      Included in this license:
                    </div>
                    {tier.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-800/80">
                  <button
                    id={`buy-tier-${tier.id}-btn`}
                    onClick={() => setSelectedTierForCheckout(tier)}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                      tier.recommended
                        ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-950/60'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Buy License (${tier.price})</span>
                  </button>
                  <div className="text-center text-[10px] text-slate-500 font-mono">
                    Instant MT4 License Activation Placeholder
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Checkout Placeholder Modal */}
      {selectedTierForCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-cyan-500/40 p-6 sm:p-8 shadow-2xl shadow-black space-y-6">
            <button
              onClick={() => setSelectedTierForCheckout(null)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">
                <Info className="w-3.5 h-3.5" />
                Payment Gateway Placeholder
              </div>
              <h3 className="text-2xl font-bold text-white">
                Purchase {selectedTierForCheckout.name}
              </h3>
              <p className="text-sm text-slate-400">
                Payment processing is intentionally disabled in this stage per architecture guidelines.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-sm">
              <div className="flex justify-between text-slate-300">
                <span>Product Edition:</span>
                <span className="font-bold text-white">{selectedTierForCheckout.name}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>License Quota:</span>
                <span className="font-mono text-cyan-300">{selectedTierForCheckout.maxMt4Accounts} Live MT4 Terminal(s)</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Total Amount:</span>
                <span className="font-mono font-bold text-emerald-400 text-base">${selectedTierForCheckout.price}.00 USD</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700 text-xs text-slate-300 leading-relaxed">
              <strong className="text-cyan-300">Next Step Integration:</strong> Stripe / Crypto checkout webhook will automatically create user records in Supabase and generate cryptographically signed MT4 license keys.
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedTierForCheckout(null);
                  setCurrentPage('dashboard');
                }}
                className="flex-1 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all"
              >
                Preview Client Dashboard with Sample License &rarr;
              </button>
              <button
                onClick={() => setSelectedTierForCheckout(null)}
                className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Download Demo Modal */}
      {downloadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 p-6 sm:p-8 shadow-2xl space-y-6">
            <button
              onClick={() => setDownloadModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800">
                <Download className="w-3.5 h-3.5" />
                Download Package Placeholder
              </div>
              <h3 className="text-2xl font-bold text-white">
                Download Titan Grid EA Package
              </h3>
              <p className="text-sm text-slate-400">
                The download center in the User Dashboard contains compiled binaries and preset packs.
              </p>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-white">TitanGrid_EA_v3.4.2.ex4</div>
                  <div className="text-[11px] text-slate-400">Compiled MetaTrader 4 Binary (1.84 MB)</div>
                </div>
                <span className="text-xs font-mono text-cyan-400 px-2 py-1 rounded bg-slate-900 border border-slate-800">
                  Protected Build
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-white">Official_SET_Presets_2026.zip</div>
                  <div className="text-[11px] text-slate-400">FTMO Safe, Conservative & Balanced Presets</div>
                </div>
                <span className="text-xs font-mono text-emerald-400 px-2 py-1 rounded bg-slate-900 border border-slate-800">
                  Ready
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-white">TitanGrid_Installation_Manual.pdf</div>
                  <div className="text-[11px] text-slate-400">Step-by-step MT4 setup & WebRequest guide</div>
                </div>
                <span className="text-xs font-mono text-slate-300 px-2 py-1 rounded bg-slate-900 border border-slate-800">
                  PDF Guide
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setDownloadModalOpen(false);
                  setCurrentPage('dashboard');
                }}
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-all"
              >
                Go to Client Download Center &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
