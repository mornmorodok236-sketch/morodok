import React, { useState, useEffect } from 'react';
import { PageType } from '../../types';
import { 
  Terminal, 
  Sparkles, 
  ArrowRight, 
  Activity, 
  ShieldCheck, 
  TrendingUp, 
  Cpu, 
  CheckCircle2, 
  Play, 
  Pause, 
  RefreshCw,
  Zap,
  BarChart3
} from 'lucide-react';
import { CURRENT_EA_VERSION, MT4_BUILD_SUPPORT } from '../../data/mockData';

interface HeroSectionProps {
  setCurrentPage: (page: PageType) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ setCurrentPage }) => {
  const [selectedPair, setSelectedPair] = useState<'GBPUSD' | 'EURUSD' | 'AUDCAD'>('GBPUSD');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [tickCount, setTickCount] = useState<number>(0);

  // Simulated live prices for grid visualization
  const pairData = {
    GBPUSD: { price: 1.2942, pnl: '+384.20 USD', activeOrders: 4, gridStep: '22 pips', drawdown: '2.1%' },
    EURUSD: { price: 1.0876, pnl: '+241.50 USD', activeOrders: 3, gridStep: '18 pips', drawdown: '1.4%' },
    AUDCAD: { price: 0.9124, pnl: '+512.80 USD', activeOrders: 5, gridStep: '25 pips', drawdown: '3.2%' },
  };

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTickCount((prev) => prev + 1);
    }, 1800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800/60 bg-[#090D16] bg-grid-pattern">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[250px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Version & Platform Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-lg shadow-cyan-950/50">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-semibold text-white">Titan Grid EA {CURRENT_EA_VERSION}</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">MetaTrader 4 Compatible ({MT4_BUILD_SUPPORT})</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Institutional <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">Quantitative Grid</span> Algorithm for MT4
            </h1>

            {/* Short Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              Titan Grid EA combines dynamic volatility-based grid distribution with correlated multi-pair hedging 
              and hard equity circuit breakers. Engineered to eliminate dangerous martingale drawdowns while capturing 
              consistent yield in both trending and ranging markets.
            </p>

            {/* Key feature pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Zero Martingale Doubling</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dynamic ATR Spacing</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Prop Firm Safe Mode</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hard Equity Stop-Loss</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>News Filter Bridge</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>&lt;5ms Native MQL4 Code</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                id="hero-get-titan-ea-btn"
                onClick={() => {
                  setCurrentPage('product');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-base shadow-xl shadow-cyan-950/60 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Sparkles className="w-5 h-5" />
                <span>Get Titan Grid EA</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-login-btn"
                onClick={() => {
                  setCurrentPage('login');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700 transition-all"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Client Portal Login</span>
              </button>
            </div>

            {/* Trust badge row */}
            <div className="pt-4 flex items-center gap-6 text-xs text-slate-400 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Tick Backtests</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>24/5 Automated Execution</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-400" />
                <span>Instant License Binding</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive MT4 Grid Visualizer */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0c1220] border border-slate-700/80 p-5 sm:p-6 shadow-2xl shadow-black/80 glow-cyan">
              
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="font-mono text-xs text-slate-300 font-semibold pl-2">
                    MT4 Terminal • [TitanGrid_Engine.ex4]
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1 rounded bg-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
                    title={isPlaying ? "Pause Visualizer" : "Play Visualizer"}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    AUTOTRADING ON
                  </span>
                </div>
              </div>

              {/* Pair Switcher & Live Stats Bar */}
              <div className="py-3 flex items-center justify-between gap-2 border-b border-slate-800/80">
                <div className="flex gap-1">
                  {(['GBPUSD', 'EURUSD', 'AUDCAD'] as const).map((pair) => (
                    <button
                      key={pair}
                      onClick={() => setSelectedPair(pair)}
                      className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors ${
                        selectedPair === pair 
                          ? 'bg-cyan-500 text-slate-950 font-bold' 
                          : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {pair}
                    </button>
                  ))}
                </div>
                <div className="text-right font-mono">
                  <div className="text-xs text-slate-400">Bid Price</div>
                  <div className="text-sm font-bold text-white tracking-wider">
                    {pairData[selectedPair].price}
                  </div>
                </div>
              </div>

              {/* Graphical Grid Radar / Chart Canvas Representation */}
              <div className="relative my-4 h-48 sm:h-56 w-full rounded-xl bg-slate-950/90 border border-slate-800 p-3 overflow-hidden">
                {/* Horizontal Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between p-3 opacity-30 pointer-events-none">
                  <div className="border-b border-dashed border-emerald-500/60 w-full" />
                  <div className="border-b border-dashed border-cyan-500/40 w-full" />
                  <div className="border-b border-dashed border-slate-600 w-full" />
                  <div className="border-b border-dashed border-cyan-500/40 w-full" />
                  <div className="border-b border-dashed border-rose-500/60 w-full" />
                </div>

                {/* Grid Position Labels */}
                <div className="absolute left-3 top-2 flex flex-col gap-3 font-mono text-[10px] pointer-events-none">
                  <span className="text-emerald-400 bg-emerald-950/70 px-1.5 py-0.5 rounded border border-emerald-800/50 w-fit">
                    TP (Target Basket): +45.0 pips
                  </span>
                  <span className="text-cyan-400 bg-cyan-950/70 px-1.5 py-0.5 rounded border border-cyan-800/50 w-fit">
                    Grid Sell Limit #1 (0.04 Lot)
                  </span>
                  <span className="text-white bg-slate-800/80 px-1.5 py-0.5 rounded w-fit">
                    Current Market Price
                  </span>
                  <span className="text-cyan-400 bg-cyan-950/70 px-1.5 py-0.5 rounded border border-cyan-800/50 w-fit">
                    Grid Buy Limit #1 (0.04 Lot)
                  </span>
                  <span className="text-rose-400 bg-rose-950/70 px-1.5 py-0.5 rounded border border-rose-800/50 w-fit">
                    Hard SL Circuit: -4.5% Equity
                  </span>
                </div>

                {/* Simulated Candlestick / Dynamic Price Wave */}
                <div className="absolute inset-y-4 right-6 w-3/5 flex items-center justify-between gap-1.5">
                  {[28, 42, 55, 38, 62, 70, 58, 66, 80, 75, (tickCount % 2 === 0 ? 84 : 78)].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center justify-center h-full">
                      <div className="w-[1px] bg-slate-600 h-full max-h-36" />
                      <div 
                        style={{ height: `${h}%` }}
                        className={`w-2.5 rounded-sm transition-all duration-700 ${
                          i % 2 === 0 
                            ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50' 
                            : 'bg-cyan-400 shadow-sm shadow-cyan-400/50'
                        }`}
                      />
                    </div>
                  ))}
                </div>

                {/* Floating dynamic status tag */}
                <div className="absolute right-3 bottom-3">
                  <span className="px-2 py-1 rounded bg-slate-900/90 text-cyan-300 border border-cyan-500/40 text-[11px] font-mono flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-cyan-400" />
                    ATR Step: {pairData[selectedPair].gridStep}
                  </span>
                </div>
              </div>

              {/* Bottom Quick Telemetry Grid */}
              <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-center">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase">Floating Profit</div>
                  <div className="text-xs sm:text-sm font-bold text-emerald-400">{pairData[selectedPair].pnl}</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase">Active Grid</div>
                  <div className="text-xs sm:text-sm font-bold text-cyan-300">{pairData[selectedPair].activeOrders} Orders</div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <div className="text-[10px] text-slate-400 uppercase">Max Drawdown</div>
                  <div className="text-xs sm:text-sm font-bold text-white">{pairData[selectedPair].drawdown}</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4 Quantitative Pillars Metric Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">1 : 4.8</div>
            <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider mt-1">Historical Profit Factor</div>
            <div className="text-xs text-slate-400 mt-0.5">Verified over 5+ years of live & tick data</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">8.2%</div>
            <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider mt-1">Maximum Drawdown</div>
            <div className="text-xs text-slate-400 mt-0.5">Controlled by volatility spacing limits</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono">99.9%</div>
            <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider mt-1">Real Tick Quality</div>
            <div className="text-xs text-slate-400 mt-0.5">Dukascopy variable spread backtested</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">&lt; 5 ms</div>
            <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider mt-1">MQL4 Execution Speed</div>
            <div className="text-xs text-slate-400 mt-0.5">Native C++ compiled binary architecture</div>
          </div>
        </div>

      </div>
    </section>
  );
};
