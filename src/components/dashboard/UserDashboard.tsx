import React, { useState } from 'react';
import { PageType, LicenseItem, UserProfile } from '../../types';
import { MOCK_CURRENT_USER, MOCK_USER_LICENSES, MOCK_EA_FILES, CURRENT_EA_VERSION } from '../../data/mockData';
import { 
  Key, 
  Cpu, 
  Clock, 
  HardDrive, 
  Download, 
  CheckCircle2, 
  Copy, 
  Check, 
  Plus, 
  RefreshCw, 
  AlertCircle, 
  Terminal, 
  ExternalLink, 
  ShieldCheck, 
  Layers,
  FileCode,
  Activity,
  Zap,
  Lock
} from 'lucide-react';

interface UserDashboardProps {
  setCurrentPage: (page: PageType) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ setCurrentPage }) => {
  const [licenses, setLicenses] = useState<LicenseItem[]>(MOCK_USER_LICENSES);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activationInput, setActivationInput] = useState('');
  const [activationMsg, setActivationMsg] = useState<{ text: string; success: boolean } | null>(null);
  
  // Binding Modal state
  const [bindModalOpen, setBindModalOpen] = useState(false);
  const [selectedLicenseForBind, setSelectedLicenseForBind] = useState<LicenseItem | null>(null);
  const [newMt4Account, setNewMt4Account] = useState('');
  const [newBroker, setNewBroker] = useState('');

  const copyToClipboard = (text: string, keyId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyId);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleActivateNewLicense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activationInput.trim()) {
      setActivationMsg({ text: "Please enter a valid Titan license key.", success: false });
      return;
    }
    // Simulation placeholder
    const newLic: LicenseItem = {
      id: `lic_${Date.now()}`,
      licenseKey: activationInput.toUpperCase().trim(),
      productName: 'Titan Grid EA (Custom Activated)',
      eaVersion: CURRENT_EA_VERSION,
      status: 'active',
      mt4Account: 'Unassigned',
      broker: 'Pending MT4 Binding',
      maxAccounts: 1,
      assignedToEmail: MOCK_CURRENT_USER.email,
      issuedDate: new Date().toISOString().split('T')[0],
      expirationDate: 'Lifetime Access',
      lastHeartbeat: 'Never'
    };
    setLicenses([newLic, ...licenses]);
    setActivationInput('');
    setActivationMsg({ text: "License key successfully activated and added to your portfolio! (UI Placeholder)", success: true });
    setTimeout(() => setActivationMsg(null), 4000);
  };

  const handleSaveMt4Binding = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLicenseForBind || !newMt4Account) return;

    setLicenses(licenses.map(lic => {
      if (lic.id === selectedLicenseForBind.id) {
        return {
          ...lic,
          mt4Account: newMt4Account,
          broker: newBroker || 'Custom MT4 Broker',
          lastHeartbeat: 'Just now'
        };
      }
      return lic;
    }));

    setBindModalOpen(false);
    setSelectedLicenseForBind(null);
    setNewMt4Account('');
    setNewBroker('');
  };

  const handleDownloadFile = (fileName: string) => {
    alert(`Downloading ${fileName}... (Placeholder: In production, will serve compiled .ex4 / .zip directly from secure storage).`);
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 py-10 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Dashboard Top Header & Profile Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0d1424] to-cyan-950/40 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-mono font-bold text-xl shadow-lg">
              AV
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white">{MOCK_CURRENT_USER.name}</h1>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {MOCK_CURRENT_USER.activePlan}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                {MOCK_CURRENT_USER.email} • Member since {MOCK_CURRENT_USER.createdAt}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
              <span className="text-slate-400">Total Active Licenses:</span>
              <span className="ml-2 font-bold text-cyan-400">{licenses.length} Slots</span>
            </div>
            <button
              onClick={() => setCurrentPage('product')}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-md"
            >
              + Upgrade / Buy Slots
            </button>
          </div>
        </div>

        {/* 2-Column Main Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Main Column: Licenses & MT4 Bindings */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Active Licenses List */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Key className="w-5 h-5 text-cyan-400" />
                  <h2 className="text-lg font-bold text-white">Your MT4 License Keys</h2>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {licenses.filter(l => l.status === 'active').length} Active Terminals
                </span>
              </div>

              {/* License Cards */}
              <div className="space-y-4">
                {licenses.map((lic) => (
                  <div 
                    key={lic.id}
                    className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-sm font-bold text-white font-mono">{lic.productName}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                          {lic.eaVersion}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 uppercase">
                          {lic.status}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          Expires: <strong className="text-slate-200">{lic.expirationDate}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Key Code Bar */}
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between gap-2">
                      <div className="font-mono text-xs sm:text-sm text-cyan-300 font-semibold tracking-wider truncate">
                        {lic.licenseKey}
                      </div>
                      <button
                        onClick={() => copyToClipboard(lic.licenseKey, lic.id)}
                        className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 shrink-0 font-mono transition-colors"
                        title="Copy Key"
                      >
                        {copiedKey === lic.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400 text-[11px]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span className="text-[11px]">Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Bound MT4 Terminal Info & Binding Action */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono border-t border-slate-800/80">
                      <div>
                        <span className="text-slate-400 block text-[11px]">Bound MT4 Account Number:</span>
                        <span className="text-sm font-bold text-white">{lic.mt4Account}</span>
                        {lic.broker && <span className="text-[11px] text-slate-400 block truncate">{lic.broker}</span>}
                      </div>
                      
                      <div className="flex items-center sm:justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedLicenseForBind(lic);
                            setNewMt4Account(lic.mt4Account === 'Unassigned' ? '' : lic.mt4Account);
                            setNewBroker(lic.broker || '');
                            setBindModalOpen(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-mono transition-colors flex items-center gap-1.5"
                        >
                          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{lic.mt4Account === 'Unassigned' ? 'Bind MT4 Account' : 'Change MT4 Account'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* License Activation Box */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Activate New License Key (Placeholder)</h3>
              </div>
              <p className="text-xs text-slate-400">
                Purchased a license slot from an official reseller or invoice? Enter your product key below to claim it.
              </p>
              
              {activationMsg && (
                <div className={`p-3 rounded-lg text-xs font-mono flex items-center gap-2 ${
                  activationMsg.success 
                    ? 'bg-emerald-950/70 border border-emerald-800 text-emerald-300' 
                    : 'bg-rose-950/70 border border-rose-800 text-rose-300'
                }`}>
                  {activationMsg.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                  <span>{activationMsg.text}</span>
                </div>
              )}

              <form onSubmit={handleActivateNewLicense} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="e.g. TITAN-PRO-XXXX-XXXX-XXXX"
                  value={activationInput}
                  onChange={(e) => setActivationInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 focus:outline-none text-sm text-white font-mono placeholder-slate-600"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs font-mono uppercase tracking-wider shadow-md transition-all shrink-0"
                >
                  Activate License
                </button>
              </form>
            </div>

          </div>

          {/* Right Column: EA Download Center & MT4 Setup Checklist */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Download EA Center */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">EA Download Center</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Always ensure you are running the latest compiled MQL4 build for maximum security.
              </p>

              <div className="space-y-3">
                {MOCK_EA_FILES.map((file) => (
                  <div 
                    key={file.id}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-mono font-bold text-white truncate">
                        {file.fileName}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {file.version} • {file.fileSize}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownloadFile(file.fileName)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-cyan-300 border border-slate-700 transition-colors shrink-0"
                      title="Download Package"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-800/60 text-[11px] text-cyan-300 font-mono">
                💡 Place <code className="text-white">TitanGrid.ex4</code> in MT4 &rarr; <code>MQL4/Experts/</code>
              </div>
            </div>

            {/* MT4 Quick Setup Checklist */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                MT4 Terminal Setup Steps
              </h4>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-slate-800 text-cyan-400 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <span>In MT4, open <strong>Tools &rarr; Options &rarr; Expert Advisors</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-slate-800 text-cyan-400 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <span>Check <strong>"Allow automated trading"</strong> and <strong>"Allow WebRequest"</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-slate-800 text-cyan-400 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <span>Add URL: <code className="text-cyan-300 bg-slate-950 px-1 py-0.5 rounded">https://api.titangrid-ea.com</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-slate-800 text-cyan-400 font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">4</span>
                  <span>Attach EA to <strong>GBPUSD or EURUSD (M15)</strong> chart and input license key.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>

      {/* Bind MT4 Account Modal */}
      {bindModalOpen && selectedLicenseForBind && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-cyan-500/40 p-6 space-y-5 shadow-2xl">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Bind MT4 Account</h3>
              <p className="text-xs text-slate-400">
                Bind license key <code className="text-cyan-300 font-mono">{selectedLicenseForBind.licenseKey}</code> to your live MT4 login.
              </p>
            </div>

            <form onSubmit={handleSaveMt4Binding} className="space-y-4">
              <div className="space-y-1 text-left">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block font-mono">
                  MT4 Account Number (Login ID)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 8492048"
                  value={newMt4Account}
                  onChange={(e) => setNewMt4Account(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white font-mono focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block font-mono">
                  Broker Name / Server (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. IC Markets Live05"
                  value={newBroker}
                  onChange={(e) => setNewBroker(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white font-mono focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="p-3 rounded-lg bg-slate-950 text-slate-400 text-[11px] leading-relaxed">
                Note: MT4 accounts can be rebound once every 24 hours to prevent license misuse.
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setBindModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider"
                >
                  Save Binding
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
