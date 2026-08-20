import React, { useState } from 'react';
import { PageType, UserRole } from '../../types';
import { 
  Terminal, 
  Lock, 
  Mail, 
  User, 
  UserPlus, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

interface RegisterPageProps {
  setCurrentPage: (page: PageType) => void;
  setUserRole: (role: UserRole) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ setCurrentPage, setUserRole }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMessage("Please complete all required fields.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please verify.");
      return;
    }
    if (!agreeTerms) {
      setErrorMessage("Please accept the Algorithmic Software Terms & Risk Disclaimer.");
      return;
    }

    setErrorMessage(null);
    setSuccess(true);

    // Transition smoothly to dashboard
    setTimeout(() => {
      setUserRole('user');
      setCurrentPage('dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-[#090D16] bg-grid-pattern relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Brand Card Header */}
        <div className="text-center mb-8 space-y-2">
          <div 
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center gap-2.5 cursor-pointer group mb-2"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-300 transition-colors shadow-lg shadow-cyan-950">
              <Terminal className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-2xl text-white font-mono tracking-wider">
              TITAN<span className="text-cyan-400">GRID</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Create Trader Account
          </h1>
          <p className="text-xs text-slate-400">
            Sign up to manage your MetaTrader 4 license keys, presets, and updates.
          </p>
        </div>

        {/* Register Form Box */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl shadow-black/80 glow-cyan">
          
          {success ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Account Created Successfully!</h3>
              <p className="text-xs text-slate-400">
                Setting up your client portal and initializing MT4 license manager...
              </p>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              
              {errorMessage && (
                <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Name Field */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block font-mono">
                  Full Name / Trader Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="register-name-input"
                    type="text"
                    required
                    placeholder="e.g. Alex Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-600 transition-colors"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block font-mono">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="register-email-input"
                    type="email"
                    required
                    placeholder="trader@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-600 transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block font-mono">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="register-password-input"
                    type="password"
                    required
                    placeholder="Create secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-600 transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block font-mono">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="register-confirm-password-input"
                    type="password"
                    required
                    placeholder="Repeat password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-600 transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Agreement */}
              <div className="pt-1 text-xs text-slate-400">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-0"
                  />
                  <span className="leading-snug">
                    I acknowledge that algorithmic trading carries market risk and agree to the Titan Grid EA software terms.
                  </span>
                </label>
              </div>

              {/* Register Button */}
              <button
                id="register-submit-btn"
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-950/60 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Create Trader Account</span>
              </button>
            </form>
          )}

          {/* Login Link */}
          <div className="mt-6 text-center text-xs text-slate-400 border-t border-slate-800 pt-4">
            Already registered?{' '}
            <button
              id="goto-login-btn"
              onClick={() => setCurrentPage('login')}
              className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-2 transition-colors ml-1"
            >
              Sign In to Portal
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
