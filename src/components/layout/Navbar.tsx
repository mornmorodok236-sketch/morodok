import React, { useState } from 'react';
import { PageType, UserRole } from '../../types';
import { 
  Terminal, 
  Cpu, 
  ShieldCheck, 
  Layers, 
  HelpCircle, 
  LogIn, 
  UserPlus, 
  LayoutDashboard, 
  ShieldAlert, 
  ChevronDown, 
  Menu, 
  X,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  userRole,
  setUserRole
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const handleNav = (page: PageType) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#090D16]/90 backdrop-blur-md">
      {/* Top micro banner for quick preview switching */}
      <div className="w-full bg-slate-950/80 border-b border-slate-800/50 py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-slate-400">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-slate-300">Titan Grid EA v3.4.2</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline">MetaTrader 4 Verified MQL4 Engine</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-500 hidden md:inline">Quick Preview Role:</span>
            <div className="relative">
              <button 
                id="role-switcher-toggle"
                onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800/90 text-cyan-300 hover:bg-slate-700/80 border border-slate-700 transition-colors font-mono text-[11px]"
              >
                <span>Role: <strong className="uppercase text-white">{userRole}</strong></span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {roleSwitcherOpen && (
                <div className="absolute right-0 mt-1 w-44 rounded-lg bg-slate-900 border border-slate-700 shadow-2xl p-1 z-50 text-xs">
                  <button 
                    onClick={() => { setUserRole('guest'); setRoleSwitcherOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 rounded flex items-center justify-between ${userRole === 'guest' ? 'bg-cyan-950/60 text-cyan-400 font-semibold' : 'text-slate-300 hover:bg-slate-800'}`}
                  >
                    <span>Guest / Visitor</span>
                    {userRole === 'guest' && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>}
                  </button>
                  <button 
                    onClick={() => { setUserRole('user'); setCurrentPage('dashboard'); setRoleSwitcherOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 rounded flex items-center justify-between ${userRole === 'user' ? 'bg-cyan-950/60 text-cyan-400 font-semibold' : 'text-slate-300 hover:bg-slate-800'}`}
                  >
                    <span>Customer (User)</span>
                    {userRole === 'user' && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>}
                  </button>
                  <button 
                    onClick={() => { setUserRole('admin'); setCurrentPage('admin'); setRoleSwitcherOpen(false); }}
                    className={`w-full text-left px-3 py-1.5 rounded flex items-center justify-between ${userRole === 'admin' ? 'bg-emerald-950/60 text-emerald-400 font-semibold' : 'text-slate-300 hover:bg-slate-800'}`}
                  >
                    <span>Administrator</span>
                    {userRole === 'admin' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo & Brand */}
          <div 
            id="brand-logo-button"
            onClick={() => handleNav('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-slate-900 to-indigo-500/20 border border-cyan-500/40 group-hover:border-cyan-400 transition-all shadow-lg shadow-cyan-950/40">
              <div className="absolute inset-0 bg-cyan-400/10 rounded-xl blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity" />
              <Terminal className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-wider text-lg sm:text-xl text-white font-mono">
                  TITAN<span className="text-cyan-400">GRID</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 uppercase tracking-wider font-mono">
                  EA MT4
                </span>
              </div>
              <span className="text-[10px] text-slate-400 tracking-wide">
                Institutional Algorithmic System
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              id="nav-home-btn"
              onClick={() => handleNav('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                currentPage === 'home'
                  ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-900/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Home
            </button>

            <button
              id="nav-product-btn"
              onClick={() => handleNav('product')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                currentPage === 'product'
                  ? 'text-cyan-400 bg-cyan-950/40 border border-cyan-900/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Product & MT4 Specs
            </button>

            <a
              href="#features"
              onClick={(e) => {
                if (currentPage !== 'home') {
                  e.preventDefault();
                  handleNav('home');
                  setTimeout(() => {
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
            >
              Features
            </a>

            <a
              href="#risk-management"
              onClick={(e) => {
                if (currentPage !== 'home') {
                  e.preventDefault();
                  handleNav('home');
                  setTimeout(() => {
                    document.getElementById('risk-management')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
            >
              Risk Engine
            </a>

            <a
              href="#technology"
              onClick={(e) => {
                if (currentPage !== 'home') {
                  e.preventDefault();
                  handleNav('home');
                  setTimeout(() => {
                    document.getElementById('technology')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
            >
              Technology
            </a>

            <a
              href="#faq"
              onClick={(e) => {
                if (currentPage !== 'home') {
                  e.preventDefault();
                  handleNav('home');
                  setTimeout(() => {
                    document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
            >
              FAQ
            </a>
          </nav>

          {/* Desktop Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {userRole === 'admin' ? (
              <div className="flex items-center gap-2">
                <button
                  id="nav-admin-dashboard-btn"
                  onClick={() => handleNav('admin')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider font-mono border transition-all ${
                    currentPage === 'admin'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                      : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  <ShieldAlert className="w-4 h-4 text-emerald-400" />
                  Admin Console
                </button>
                <button
                  onClick={() => { setUserRole('guest'); handleNav('home'); }}
                  className="px-2.5 py-2 rounded-lg text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                  title="Logout"
                >
                  Exit Admin
                </button>
              </div>
            ) : userRole === 'user' ? (
              <div className="flex items-center gap-2">
                <button
                  id="nav-user-dashboard-btn"
                  onClick={() => handleNav('dashboard')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold font-mono border transition-all ${
                    currentPage === 'dashboard'
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                      : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-cyan-400" />
                  Client Dashboard
                </button>
                <button
                  onClick={() => { setUserRole('guest'); handleNav('home'); }}
                  className="px-2.5 py-2 rounded-lg text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <button
                  id="nav-login-btn"
                  onClick={() => handleNav('login')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentPage === 'login'
                      ? 'text-cyan-400 bg-slate-800/80 border border-slate-700'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>

                <button
                  id="nav-get-ea-btn"
                  onClick={() => handleNav('product')}
                  className="relative group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-md shadow-cyan-950/50 transition-all active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Get Titan Grid EA</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-800 bg-[#0c1220] px-4 pt-3 pb-6 space-y-2">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800 text-xs">
            <button
              onClick={() => handleNav('home')}
              className={`p-2 rounded-lg text-center font-medium ${currentPage === 'home' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-slate-900 text-slate-300'}`}
            >
              Home
            </button>
            <button
              onClick={() => handleNav('product')}
              className={`p-2 rounded-lg text-center font-medium ${currentPage === 'product' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-slate-900 text-slate-300'}`}
            >
              Product & Pricing
            </button>
            <button
              onClick={() => handleNav('dashboard')}
              className={`p-2 rounded-lg text-center font-medium ${currentPage === 'dashboard' ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-slate-900 text-slate-300'}`}
            >
              User Portal
            </button>
            <button
              onClick={() => handleNav('admin')}
              className={`p-2 rounded-lg text-center font-medium ${currentPage === 'admin' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-900 text-slate-300'}`}
            >
              Admin Portal
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => handleNav('login')}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 text-sm font-medium"
            >
              <LogIn className="w-4 h-4" />
              Login to Account
            </button>
            <button
              onClick={() => handleNav('register')}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-700 bg-slate-900 text-slate-200 text-sm font-medium"
            >
              <UserPlus className="w-4 h-4" />
              Create Account
            </button>
            <button
              onClick={() => handleNav('product')}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-cyan-500 text-slate-950 text-sm font-bold shadow-lg shadow-cyan-950"
            >
              <Sparkles className="w-4 h-4" />
              Get Titan Grid EA (MT4)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
