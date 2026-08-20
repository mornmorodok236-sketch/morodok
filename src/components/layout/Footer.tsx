import React from 'react';
import { PageType } from '../../types';
import { Terminal, Shield, AlertTriangle, ExternalLink, Cpu, HardDrive } from 'lucide-react';
import { CURRENT_EA_VERSION, MT4_BUILD_SUPPORT } from '../../data/mockData';

interface FooterProps {
  setCurrentPage: (page: PageType) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  return (
    <footer className="w-full bg-[#05080F] border-t border-slate-800 text-slate-400">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-3 cursor-pointer group w-fit"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400">
                <Terminal className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white font-mono tracking-wider">
                TITAN<span className="text-cyan-400">GRID</span> EA
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Institutional-grade automated trading algorithm engineered for MetaTrader 4. 
              Featuring dynamic ATR volatility grid distribution, multi-pair correlation hedging, 
              and hard equity circuit breakers.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono text-slate-300">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                {CURRENT_EA_VERSION}
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
                MT4 {MT4_BUILD_SUPPORT}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentPage('product'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Product & Pricing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentPage('dashboard'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Client Portal
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentPage('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Admin Console
                </button>
              </li>
            </ul>
          </div>

          {/* Technology & MT4 */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono mb-4">
              Algorithmic Core
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-1.5 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                <span>Volatility Spacing</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                <span>Correlated Hedging</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                <span>Prop Firm Guard</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                <span>Equity Hard Stop</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                <span>MQL4 Native C++</span>
              </li>
            </ul>
          </div>

          {/* Account & Access */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 font-mono mb-4">
              Client Access
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => { setCurrentPage('login'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Client Login
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentPage('register'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Register Account
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentPage('product'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-cyan-400 transition-colors text-cyan-400 font-semibold"
                >
                  Get License Key &rarr;
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Financial Risk Warning - Mandatory for MT4 trading products */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 leading-relaxed mb-8 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-slate-300">HIGH-RISK INVESTMENT & FOREX DISCLAIMER: </span>
            Trading Foreign Exchange (Forex) and Contracts for Difference (CFDs) on margin carries a high level of risk and may not be suitable for all investors. 
            Before deciding to trade or use Titan Grid EA (Expert Advisor), you should carefully consider your investment objectives, level of experience, and risk appetite. 
            Past performance and backtested results are no guarantee of future returns. Titan Grid EA is provided as an algorithmic trading tool and does not constitute personalized financial advice.
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Titan Grid EA. All rights reserved. Professional MetaTrader 4 Algorithmic Software.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>MQL4 Architecture</span>
            <span>•</span>
            <span>Zero Secret Keys Exposed</span>
            <span>•</span>
            <span className="text-cyan-400 font-mono">v3.4.2 Pro</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
