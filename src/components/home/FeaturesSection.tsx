import React from 'react';
import { 
  Sliders, 
  Layers, 
  TrendingUp, 
  ShieldAlert, 
  Calendar, 
  Gauge, 
  CheckCircle,
  Activity,
  Zap,
  Target
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Sliders className="w-6 h-6 text-cyan-400" />,
      title: "Dynamic ATR Volatility Spacing",
      badge: "Adaptive Engine",
      description: "Unlike static grid EAs that get trapped during trending moves, Titan Grid calculates optimal step spacing dynamically using live ATR (Average True Range) volatility filters.",
      details: ["Real-time volatility expansion", "Prevents premature order stacking", "Automated pip step optimization"]
    },
    {
      icon: <Layers className="w-6 h-6 text-emerald-400" />,
      title: "Correlated Multi-Pair Hedging",
      badge: "Portfolio Shield",
      description: "Deploys cross-pair correlation algorithms across GBPUSD, EURUSD, and AUDCAD to offset directional momentum and stabilize net portfolio equity.",
      details: ["Cross-pair exposure rebalancing", "Drawdown dampening mechanics", "Simultaneous basket calculation"]
    },
    {
      icon: <Target className="w-6 h-6 text-indigo-400" />,
      title: "Smart Basket Trailing Profit",
      badge: "Yield Maximizer",
      description: "Locks in partial profits on early grid tranches and deploys intelligent virtual trailing stops to extract maximum pips from market retracements.",
      details: ["Virtual hidden Take-Profit levels", "Tranche-by-tranche partial closes", "Zero broker stop-hunting exposure"]
    },
    {
      icon: <Calendar className="w-6 h-6 text-amber-400" />,
      title: "Economic News Calendar Auto-Pause",
      badge: "Macro Defense",
      description: "Built-in MT4 WebRequest news bridge pauses new grid generation 30 minutes prior to High-Impact events (NFP, FOMC, CPI, Central Bank rate decisions).",
      details: ["Customizable impact thresholds", "Auto-resumes once volatility settles", "Protects against sudden gap moves"]
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-rose-400" />,
      title: "Prop-Firm Challenge Safe-Mode",
      badge: "FTMO / Prop Ready",
      description: "Engineered specifically to satisfy stringent prop firm risk parameters, including strict 4.5% daily drawdown stops and mandatory Friday session close.",
      details: ["Strict daily equity circuit breaker", "Weekend rollover position auto-close", "Compatible with FTMO, FundedNext, MFF"]
    },
    {
      icon: <Gauge className="w-6 h-6 text-cyan-300" />,
      title: "Spread & Slippage Execution Filter",
      badge: "Broker Guard",
      description: "Real-time spread monitor prevents order placement during midnight rollover spread spikes or sudden low-liquidity market gaps.",
      details: ["Maximum allowed spread threshold", "Slippage tolerance checks", "Optimized for Raw/ECN MT4 brokers"]
    }
  ];

  return (
    <section id="features" className="py-20 lg:py-28 bg-[#0B0F1A] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-xs font-mono text-cyan-400 uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            Quantitative Core Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineered to Solve the Flaws of <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
              Traditional Grid Systems
            </span>
          </h2>
          <p className="text-base text-slate-400 leading-relaxed">
            Standard grid bots blow accounts because they use rigid pip distances and blind martingale multipliers. 
            Titan Grid EA was built with institutional safeguards from the ground up.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((item, idx) => (
            <div 
              key={idx}
              className="group relative rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 p-6 sm:p-7 transition-all duration-200 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-black/40 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 group-hover:border-cyan-500/40 transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 space-y-2">
                {item.details.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
