import React, { useState } from 'react';
import { PageType, UserRole } from '../../types';
import { 
  Terminal, 
  Lock, 
  Mail, 
  LogIn, 
  ShieldCheck, 
  UserCheck, 
  ArrowRight, 
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles
} from 'lucide-react';

interface LoginPageProps {
  setCurrentPage: (page: PageType) => void;
  setUserRole: (role: UserRole) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ setCurrentPage, setUserRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setSubmittedMessage("Please enter both email and password.");
      return;
    }
    // Check if admin email or regular user
    if (email.toLowerCase().includes('admin')) {
      setUserRole('admin');
      setCurrentPage('admin');
    } else {
      setUserRole('user');
      setCurrentPage('dashboard');
    }
  };

  const handleQuickDemoUser = () => {
    setEmail('alex.trader@titanalgo.com');
    setPassword('••••••••••••');
    setUserRole('user');
    setCurrentPage('dashboard');
  };

  const handleQuickDemoAdmin = () => {
    setEmail('admin@titangrid-ea.com');
    setPassword('••••••••••••');
    setUserRole('admin');
    setCurrentPage('admin');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 bg-[#090D16] bg-grid-pattern relative">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

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
            Client Portal Login
          </h1>
          <p className="text-xs text-slate-400">
            Access your MT4 license bindings, download latest .ex4 builds, and manage EA presets.
          </p>
        </div>

        {/* Login Form Box */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl shadow-black/80 glow-cyan">
          
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {submittedMessage && (
              <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{submittedMessage}</span>
              </div>
            )}

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
                  id="login-email-input"
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
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block font-mono">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="login-password-input"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:outline-none text-sm text-white placeholder-slate-600 transition-colors font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-0 focus:outline-none"
                />
                <span>Remember this terminal session</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              id="login-submit-btn"
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-950/60 transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Log In to Client Portal</span>
            </button>
          </form>

          {/* Quick Demo Logins for easy reviewer testing */}
          <div className="mt-6 pt-5 border-t border-slate-800 space-y-2">
            <div className="text-center text-[11px] font-mono uppercase tracking-wider text-slate-400">
              ⚡ Instant 1-Click Demo Login
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                id="quick-demo-user-btn"
                onClick={handleQuickDemoUser}
                className="px-3 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-cyan-300 transition-colors flex items-center justify-center gap-1.5"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>User Dashboard</span>
              </button>
              <button
                type="button"
                id="quick-demo-admin-btn"
                onClick={handleQuickDemoAdmin}
                className="px-3 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-emerald-300 transition-colors flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Console</span>
              </button>
            </div>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center text-xs text-slate-400">
            Don't have a Titan Grid account yet?{' '}
            <button
              id="goto-register-btn"
              onClick={() => setCurrentPage('register')}
              className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-2 transition-colors ml-1"
            >
              Register here
            </button>
          </div>

        </div>

      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">Reset Account Password</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enter your registered trading email. In Step 2 (Supabase integration), a secure password recovery magic link will be dispatched.
            </p>
            <input
              type="email"
              placeholder="name@domain.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white font-mono"
            />
            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => setForgotModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Password recovery link dispatched (Placeholder).");
                  setForgotModalOpen(false);
                }}
                className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs"
              >
                Send Reset Link (Placeholder)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
