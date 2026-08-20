import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertOctagon, 
  SlidersHorizontal, 
  Lock, 
  RefreshCw, 
  Percent, 
  Calculator,
  Flame,
  CheckCircle2,
  TrendingDown
} from 'lucide-react';

export const RiskManagementSection: React.FC = () => {
  // Interactive Risk Simulator state
  const [balance, setBalance] = useState<number>(5000);
  const [riskProfile, setRiskProfile] = useState<'conservative' | 'moderate' | 'propFirm' | 'aggressive'>('propFirm');

  // Compute calculated safe metrics
  const profiles = {
    conservative: {
      label: "Conservative (Low DD)",
      lotMultiplier: 0.01 / 2000, // 0.01 lot per $2,000
      maxDdTarget: "4.8% - 7.5%",
      monthlyTarget: "3.5% - 6.0%",
      maxGridTranches: 6,
      stopLossSetting: "7.0% Hard Equity SL",
      desc: "Maximum capital preservation for large accounts or cautious prop firm phases."
    },
    propFirm: {
      label: "Prop-Firm Safe Mode (FTMO)",
      lotMultiplier: 0.01 / 1500, // 0.01 lot per $1,500
      maxDdTarget: "4.2% Strict Daily Cap",
      monthlyTarget: "5.0% - 8.5%",
      maxGridTranches: 5,
      stopLossSetting: "4.5% Hard Daily SL",
      desc: "Tailored to pass and maintain prop firm accounts without violating max daily or total drawdown."
    },
    moderate: {
      label: "Balanced Growth",
      lotMultiplier: 0.01 / 1000, // 0.01 lot per $1,000
      maxDdTarget: "8.0% - 12.0%",
      monthlyTarget: "7.5% - 12.0%",
      maxGridTranches: 8,
      stopLossSetting: "12.0% Hard Equity SL",
      desc: "Optimal balance between consistent monthly yield and controlled grid exposure."
    },
    aggressive: {
      label: "Aggressive Multiplier",
      lotMultiplier: 0.01 / 500, // 0.01 lot per $500
      maxDdTarget: "15.0% - 22.0%",
      monthlyTarget: "14.0% - 24.0%",
      maxGridTranches: 10,
      stopLossSetting: "20.0% Hard Equity SL",
      desc: "For small test accounts or high risk tolerance seeking maximum capital velocity."
    }
  };

  const currentProfile = profiles[riskProfile];
  const calculatedLot = Math.max(0.01, parseFloat((balance * currentProfile.lotMultiplier).toFixed(2)));

  return (
    <section id="risk-management" className="py-20 lg:py-28 bg-[#090D16] border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-xs font-mono text-emerald-400 uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            Capital Preservation First
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Institutional-Grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Risk Architecture</span>
          </h2>
          <p className="text-base text-slate-400 leading-relaxed">
            The secret to longevity in algorithmic trading isn't just entries—it is impenetrable risk containment.
            Titan Grid EA embeds military-grade circuit breakers to prevent unexpected market anomalies.
          </p>
        </div>

        {/* 2-Column layout: 4 Circuit Breaker Pillars & Interactive Risk Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: 4 Safety Pillars */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-800/60 text-rose-400">
                  <AlertOctagon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Hard Equity Cutoff Circuit Breaker</h3>
                  <span className="text-xs text-rose-400 font-mono">User Configurable: 3.0% to 15.0%</span>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                If adverse black-swan market volatility causes floating drawdown to reach your specified equity threshold, 
                Titan Grid immediately closes all open orders, cancels pending orders, and stops trading to save your account balance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-cyan-950/60 border border-cyan-800/60 text-cyan-400">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Max Grid Level & Lot Exposure Ceiling</h3>
                  <span className="text-xs text-cyan-400 font-mono">Hard Cap on Tranches (e.g. Max 6 Orders)</span>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Prevents runaway position stacking. Once the designated maximum grid level is reached, the EA halts additional order entries and switches to dynamic hedging or partial break-even recovery.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-400">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Dynamic Hedging Correlation Matrix</h3>
                  <span className="text-xs text-emerald-400 font-mono">GBPUSD / EURUSD / AUDCAD Cross-Hedge</span>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                When one currency pair experiences strong unidirectional momentum, inverse counter-hedges in correlated pairs neutralize net directional exposure, keeping portfolio margin healthy.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-amber-950/60 border border-amber-800/60 text-amber-400">
                  <TrendingDown className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Weekend Rollover & Friday Auto-Close</h3>
                  <span className="text-xs text-amber-400 font-mono">Zero Weekend Gap Risk</span>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Eliminates Monday morning opening gap risk. The algorithm can be configured to automatically liquidate all open positions or tighten stops on Friday before the market closes.
              </p>
            </div>
          </div>

          {/* Right: Interactive Risk Calculator / Simulator */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-[#0d1424] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl shadow-black/80 glow-cyan">
              
              <div className="flex items-center justify-between pb-5 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-800/80 text-cyan-400">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Interactive Risk & Lot Calculator</h3>
                    <p className="text-xs text-slate-400">Simulate parameters for your MT4 account balance</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-slate-800 text-cyan-300">
                  MT4 Live Math
                </span>
              </div>

              {/* Balance Slider */}
              <div className="py-5 space-y-3 border-b border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    MT4 Account Balance (USD)
                  </label>
                  <span className="font-mono text-lg font-extrabold text-cyan-400">
                    ${balance.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="50000"
                  step="500"
                  value={balance}
                  onChange={(e) => setBalance(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>$500 (Min)</span>
                  <span>$10,000 (Standard)</span>
                  <span>$50,000 (Prop / Institutional)</span>
                </div>
              </div>

              {/* Preset Profile Selectors */}
              <div className="py-5 space-y-3 border-b border-slate-800">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Select Risk Strategy Preset
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['propFirm', 'conservative', 'moderate', 'aggressive'] as const).map((key) => (
                    <button
                      key={key}
                      onClick={() => setRiskProfile(key)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium text-left transition-all border ${
                        riskProfile === key
                          ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-md shadow-cyan-950'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="font-bold">{profiles[key].label}</div>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-400 italic pt-1">
                  &ldquo;{currentProfile.desc}&rdquo;
                </p>
              </div>

              {/* Output Results Grid */}
              <div className="pt-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800">
                    <div className="text-[10px] uppercase text-slate-400 font-mono">Recommended Base Lot</div>
                    <div className="text-lg font-mono font-bold text-emerald-400">
                      {calculatedLot} Lot
                    </div>
                    <div className="text-[10px] text-slate-400">First grid order size</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800">
                    <div className="text-[10px] uppercase text-slate-400 font-mono">Max Grid Tranches</div>
                    <div className="text-lg font-mono font-bold text-cyan-400">
                      {currentProfile.maxGridTranches} Levels
                    </div>
                    <div className="text-[10px] text-slate-400">Dynamic ATR spaced</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800">
                    <div className="text-[10px] uppercase text-slate-400 font-mono">Est. Max Historical DD</div>
                    <div className="text-lg font-mono font-bold text-white">
                      {currentProfile.maxDdTarget}
                    </div>
                    <div className="text-[10px] text-slate-400">Hard stop protected</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800">
                    <div className="text-[10px] uppercase text-slate-400 font-mono">Projected Monthly Range</div>
                    <div className="text-lg font-mono font-bold text-cyan-300">
                      {currentProfile.monthlyTarget}
                    </div>
                    <div className="text-[10px] text-slate-400">Compoundable</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-300">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    Circuit Breaker Setting:
                  </span>
                  <span className="font-bold text-emerald-300">{currentProfile.stopLossSetting}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
