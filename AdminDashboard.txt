/* ================================================
   ADMINDASHBOARD.TSX - NEW VERSION v2.0 (2026-08-21)
   (contains approveOrder + adminCreateLicense + Supabase)
   ================================================ */
import React, { useState, useEffect } from 'react';
import { PageType, LicenseItem, ProductTier, OrderRecord, EaFilePackage } from '../../types';
import {
  MOCK_ADMIN_STATS,
  MOCK_ALL_LICENSES,
  PRODUCT_TIERS,
  MOCK_ORDERS,
  MOCK_EA_FILES,
  CURRENT_EA_VERSION
} from '../../data/mockData';
import { useAuth } from '../../lib/auth';
import { isSupabaseConfigured } from '../../lib/supabase';
import {
  fetchAdminStats,
  fetchAllOrders,
  fetchAllLicenses,
  approveOrder,
  rejectOrder,
  setLicenseStatus,
  adminCreateLicense,
} from '../../lib/data';
import { 
  LayoutDashboard, 
  Users, 
  Key, 
  Package, 
  ShoppingCart, 
  FolderArchive, 
  Settings, 
  Plus, 
  Search, 
  ShieldAlert, 
  TrendingUp, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  HardDrive, 
  Download, 
  RefreshCw, 
  Sliders, 
  Lock,
  FileCode,
  Activity,
  Terminal
} from 'lucide-react';

interface AdminDashboardProps {
  setCurrentPage: (page: PageType) => void;
}

type AdminTab = 'overview' | 'users' | 'licenses' | 'products' | 'orders' | 'eafiles' | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ setCurrentPage }) => {
  const { isDemoMode } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [licensesList, setLicensesList] = useState<LicenseItem[]>(MOCK_ALL_LICENSES);
  const [ordersList, setOrdersList] = useState<OrderRecord[]>(MOCK_ORDERS);
  const [stats, setStats] = useState(MOCK_ADMIN_STATS);
  const [orderActionBusy, setOrderActionBusy] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // New License Generator Modal state
  const [generateModalOpen, setGenerateModalOpen] = useState(false);
  const [newLicTier, setNewLicTier] = useState('Titan Grid EA Pro');
  const [newLicEmail, setNewLicEmail] = useState('');
  const [newLicMaxAccounts, setNewLicMaxAccounts] = useState(3);
  const [newLicPlan, setNewLicPlan] = useState<'monthly' | 'yearly'>('yearly');
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [generateBusy, setGenerateBusy] = useState(false);

  // Fetch real data from Supabase (admin sees everything per RLS)
  const reloadAdminData = async () => {
    if (!isSupabaseConfigured) return;
    try {
      const [s, orders, lics] = await Promise.all([fetchAdminStats(), fetchAllOrders(), fetchAllLicenses()]);
      setStats({
        totalUsers: s.totalUsers,
        activeLicenses: s.activeLicenses,
        totalOrdersPlaceholder: s.totalOrders,
        totalEaDownloads: stats.totalEaDownloads,
        activeMt4Terminals: s.activeLicenses,
      });
      setOrdersList(orders);
      setLicensesList(lics);
    } catch (err) {
      console.error('Admin data load failed:', err);
    }
  };

  useEffect(() => {
    if (isDemoMode) return;
    void reloadAdminData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDemoMode]);

  // ✅ Admin approve/reject order (Bakong KHQR flow)
  const handleApproveOrder = async (ord: any) => {
    setOrderActionBusy(ord._dbId);
    const result = await approveOrder(ord._dbId);
    setOrderActionBusy(null);
    if (result.error) {
      alert(`❌ Approve មិនបាន: ${result.error}`);
    } else {
      alert(result.renewed
        ? `✅ បាន Approve! License ចាស់ត្រូវបានបន្ថែមថ្ងៃ (Renew)\nKey: ${result.licenseKey}`
        : `✅ បាន Approve! License ថ្មីត្រូវបានបង្កើត\nKey: ${result.licenseKey}`);
      await reloadAdminData();
    }
  };

  const handleRejectOrder = async (ord: any) => {
    if (!confirm('បដិសេធ Order នេះមែនទេ? (លុយមិនទាន់បានទទួល)')) return;
    setOrderActionBusy(ord._dbId);
    const { error } = await rejectOrder(ord._dbId);
    setOrderActionBusy(null);
    if (error) alert(`❌ Reject មិនបាន: ${error}`);
    else await reloadAdminData();
  };

  // File upload modal state
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newBuildVersion, setNewBuildVersion] = useState('v3.5.0 Pro');

  // Handle License Generation
  const TIER_NAME_TO_SLUG: Record<string, string> = {
    'Titan Grid Single': 'starter',
    'Titan Grid EA Pro': 'pro',
    'Titan Grid Institutional': 'prop-firm',
  };

  const handleGenerateLicense = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isDemoMode) {
      // Real mode: create license in Supabase (user claims it by key later)
      setGenerateBusy(true);
      setGeneratedKey(null);
      const { licenseKey, error } = await adminCreateLicense({
        customerEmail: newLicEmail,
        productTierSlug: TIER_NAME_TO_SLUG[newLicTier] ?? 'pro',
        plan: newLicPlan,
      });
      setGenerateBusy(false);
      if (error) {
        alert(`❌ បង្កើត License មិនបាន: ${error}`);
      } else {
        setGeneratedKey(licenseKey!);
        await reloadAdminData();
      }
      return;
    }

    // Demo mode: simulation as before
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    const randomHex2 = Math.random().toString(36).substring(2, 6).toUpperCase();
    const newKey = `TITAN-PRO-${randomHex}-${randomHex2}-2026`;

    const newEntry: LicenseItem = {
      id: `lic_${Date.now()}`,
      licenseKey: newKey,
      productName: newLicTier,
      eaVersion: CURRENT_EA_VERSION,
      status: 'active',
      mt4Account: 'Unassigned',
      broker: 'Pending',
      maxAccounts: newLicMaxAccounts,
      assignedToEmail: newLicEmail || 'client@tradingfirm.com',
      issuedDate: new Date().toISOString().split('T')[0],
      expirationDate: 'Lifetime',
      lastHeartbeat: 'Never'
    };

    setLicensesList([newEntry, ...licensesList]);
    setGenerateModalOpen(false);
    setNewLicEmail('');
  };

  const handleRevokeLicense = async (id: string) => {
    if (!isDemoMode) {
      // Real mode: suspend/reactivate in Supabase
      const current = licensesList.find(l => l.id === id);
      if (!current) return;
      const next = current.status === 'active' ? 'suspended' : 'active';
      const { error } = await setLicenseStatus(id, next);
      if (error) {
        alert(`❌ ប្តូរ status មិនបាន: ${error}`);
        return;
      }
      await reloadAdminData();
      return;
    }
    setLicensesList(licensesList.map(lic => {
      if (lic.id === id) {
        return { ...lic, status: lic.status === 'active' ? 'suspended' : 'active' };
      }
      return lic;
    }));
  };

  const filteredLicenses = licensesList.filter(l => 
    l.licenseKey.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.assignedToEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.mt4Account.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-950 border border-emerald-500/40 text-emerald-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h1 className="text-2xl font-bold text-white font-mono">Titan Admin Console</h1>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 uppercase">
                SYSTEM ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Manage MT4 license distribution, client terminal heartbeats, EA binary releases, and product catalogs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('licenses')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <Key className="w-3.5 h-3.5" />
              <span>License Manager</span>
            </button>
            <button
              onClick={() => setGenerateModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono transition-all flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Issue New Key</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex border-b border-slate-800 overflow-x-auto gap-2 text-xs font-mono">
          {[
            { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
            { id: 'users', label: 'Users', icon: <Users className="w-4 h-4" /> },
            { id: 'licenses', label: 'Licenses', icon: <Key className="w-4 h-4" /> },
            { id: 'products', label: 'Products', icon: <Package className="w-4 h-4" /> },
            { id: 'orders', label: 'Orders', icon: <ShoppingCart className="w-4 h-4" /> },
            { id: 'eafiles', label: 'EA Files & Builds', icon: <FolderArchive className="w-4 h-4" /> },
            { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminTab)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-emerald-400 text-emerald-400 bg-slate-900/50'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/20'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="text-[11px] text-slate-400 font-mono uppercase">Total Registered Users</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1">
                  {stats.totalUsers}
                </div>
                <div className="text-[10px] text-emerald-400 font-mono mt-1">+14 this week</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="text-[11px] text-slate-400 font-mono uppercase">Active License Keys</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono mt-1">
                  {stats.activeLicenses}
                </div>
                <div className="text-[10px] text-cyan-300 font-mono mt-1">98.4% uptime</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="text-[11px] text-slate-400 font-mono uppercase">Live MT4 Terminals</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono mt-1">
                  {stats.activeMt4Terminals}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-1">Heartbeat active</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="text-[11px] text-slate-400 font-mono uppercase">Total EA Downloads</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono mt-1">
                  {stats.totalEaDownloads}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-1">Binaries + Presets</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <div className="text-[11px] text-slate-400 font-mono uppercase">Total Orders (Placeholder)</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1">
                  {stats.totalOrdersPlaceholder}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-1">Stripe / Crypto</div>
              </div>
            </div>

            {/* Quick Actions & Live Telemetry Mock */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    Recent License Heartbeats (MT4 Live Terminals)
                  </h3>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Realtime Feed
                  </span>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  {licensesList.slice(0, 4).map((lic) => (
                    <div key={lic.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <div>
                          <span className="text-white font-semibold">{lic.assignedToEmail}</span>
                          <span className="text-slate-500 ml-2">MT4: #{lic.mt4Account}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-cyan-300">{lic.eaVersion}</span>
                        <span className="text-slate-500 ml-2">({lic.lastHeartbeat})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  Quick Admin Operations
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setGenerateModalOpen(true)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-200 text-left flex items-center justify-between transition-colors"
                  >
                    <span>+ Issue Manual License</span>
                    <Key className="w-4 h-4 text-emerald-400" />
                  </button>
                  <button
                    onClick={() => setUploadModalOpen(true)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-200 text-left flex items-center justify-between transition-colors"
                  >
                    <span>+ Release New EA Build (.ex4)</span>
                    <FolderArchive className="w-4 h-4 text-cyan-400" />
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-mono text-slate-200 text-left flex items-center justify-between transition-colors"
                  >
                    <span>Configure Licensing API</span>
                    <Settings className="w-4 h-4 text-indigo-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: USERS */}
        {activeTab === 'users' && (
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <h3 className="text-base font-bold text-white font-mono">Registered User Accounts</h3>
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search user email or name..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-3 font-semibold">User</th>
                    <th className="pb-3 font-semibold">Role</th>
                    <th className="pb-3 font-semibold">Plan Tier</th>
                    <th className="pb-3 font-semibold">Registered</th>
                    <th className="pb-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr>
                    <td className="py-3">
                      <div className="font-bold text-white">Alex Vance</div>
                      <div className="text-slate-400 text-[11px]">alex.trader@titanalgo.com</div>
                    </td>
                    <td className="py-3"><span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">User</span></td>
                    <td className="py-3 text-slate-300">Pro Trader (3 MT4 Slots)</td>
                    <td className="py-3 text-slate-400">2026-02-14</td>
                    <td className="py-3 text-right">
                      <button className="px-2.5 py-1 rounded bg-slate-800 text-cyan-300 hover:bg-slate-700">View Details</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3">
                      <div className="font-bold text-white">David Zhang</div>
                      <div className="text-slate-400 text-[11px]">david.quant@vertexfunds.io</div>
                    </td>
                    <td className="py-3"><span className="px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">Prop User</span></td>
                    <td className="py-3 text-slate-300">Institutional & Prop (10 Slots)</td>
                    <td className="py-3 text-slate-400">2026-04-10</td>
                    <td className="py-3 text-right">
                      <button className="px-2.5 py-1 rounded bg-slate-800 text-cyan-300 hover:bg-slate-700">View Details</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3">
                      <div className="font-bold text-white">Titan Operations</div>
                      <div className="text-slate-400 text-[11px]">admin@titangrid-ea.com</div>
                    </td>
                    <td className="py-3"><span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">Super Admin</span></td>
                    <td className="py-3 text-slate-300">System Admin</td>
                    <td className="py-3 text-slate-400">2025-11-01</td>
                    <td className="py-3 text-right">
                      <span className="text-slate-500">Root Protected</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: LICENSES */}
        {activeTab === 'licenses' && (
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-white font-mono">Issued MT4 License Database</h3>
                <p className="text-xs text-slate-400">Manage hardware/account bindings and revoke expired keys.</p>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search key, email, account..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white font-mono"
                  />
                </div>
                <button
                  onClick={() => setGenerateModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold text-xs font-mono shrink-0"
                >
                  + Issue Key
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-3 font-semibold">License Key</th>
                    <th className="pb-3 font-semibold">Product</th>
                    <th className="pb-3 font-semibold">Assigned User</th>
                    <th className="pb-3 font-semibold">Bound MT4</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredLicenses.map((lic) => (
                    <tr key={lic.id} className="hover:bg-slate-900/30">
                      <td className="py-3 font-bold text-cyan-300 select-all">{lic.licenseKey}</td>
                      <td className="py-3 text-slate-300">{lic.productName}</td>
                      <td className="py-3 text-slate-400">{lic.assignedToEmail}</td>
                      <td className="py-3 text-white font-semibold">{lic.mt4Account}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          lic.status === 'active' 
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                            : lic.status === 'suspended'
                            ? 'bg-rose-950 text-rose-400 border border-rose-800'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {lic.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => handleRevokeLicense(lic.id)}
                          className={`px-2 py-1 rounded text-[11px] font-mono ${
                            lic.status === 'active'
                              ? 'bg-rose-950 text-rose-300 hover:bg-rose-900'
                              : 'bg-emerald-950 text-emerald-300 hover:bg-emerald-900'
                          }`}
                        >
                          {lic.status === 'active' ? 'Suspend' : 'Reactivate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: PRODUCTS */}
        {activeTab === 'products' && (
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white font-mono">Product Tier Catalogs</h3>
              <button 
                onClick={() => alert("Product Editor Placeholder: In step 2, can dynamically edit pricing & features via Supabase.")}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono"
              >
                + Add Product Edition
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PRODUCT_TIERS.map((tier) => (
                <div key={tier.id} className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 font-mono">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white">{tier.name}</span>
                    <span className="text-emerald-400 font-bold">${tier.price}</span>
                  </div>
                  <p className="text-xs text-slate-400 font-sans">{tier.description}</p>
                  <div className="text-xs text-cyan-300">Max Accounts: {tier.maxMt4Accounts} MT4</div>
                  <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500">
                    Status: Published on Website
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: ORDERS */}
        {activeTab === 'orders' && (
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white font-mono">Orders & Payment Transactions</h3>
                <span className="text-xs text-slate-500 font-mono">Bakong KHQR → ពិនិត្យក្នុង Bakong App រួច Approve ដើម្បីបើក License</span>
              </div>
              {!isDemoMode && (
                <button
                  onClick={() => void reloadAdminData()}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Refresh
                </button>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Package</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Gateway</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {ordersList.map((ord: any) => (
                    <tr key={ord.id}>
                      <td className="py-3 font-bold text-cyan-300">{ord.id}</td>
                      <td className="py-3">
                        <div className="text-white">{ord.customerName}</div>
                        <div className="text-slate-500 text-[10px]">{ord.customerEmail}</div>
                      </td>
                      <td className="py-3 text-slate-300">
                        {ord.productTier}
                        {ord._plan && <span className="text-slate-500 text-[10px]"> ({ord._plan})</span>}
                      </td>
                      <td className="py-3 font-bold text-emerald-400">${ord.amount}.00 USD</td>
                      <td className="py-3 text-slate-400">{ord.paymentMethod}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                          ord.status === 'completed' ? 'bg-emerald-950 text-emerald-400' : ord.status === 'refunded' ? 'bg-rose-950 text-rose-400' : 'bg-amber-950 text-amber-400'
                        }`}>
                          {ord._rawStatus ?? ord.status}
                        </span>
                      </td>
                      <td className="py-3">
                        {ord._rawStatus === 'pending' ? (
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => void handleApproveOrder(ord)}
                              disabled={orderActionBusy === ord._dbId}
                              className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold disabled:opacity-50 flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              {orderActionBusy === ord._dbId ? '...' : 'Approve'}
                            </button>
                            <button
                              onClick={() => void handleRejectOrder(ord)}
                              disabled={orderActionBusy === ord._dbId}
                              className="px-2.5 py-1 rounded bg-rose-900/70 hover:bg-rose-800 text-rose-200 font-bold disabled:opacity-50 flex items-center gap-1"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {ordersList.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-500">
                        មិនទាន់មាន Order នៅឡើយ។
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: EA FILES */}
        {activeTab === 'eafiles' && (
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white font-mono">Expert Advisor Binary & Preset Releases</h3>
                <p className="text-xs text-slate-400">Host compiled .ex4 artifacts, preset bundles, and changelogs.</p>
              </div>
              <button
                onClick={() => setUploadModalOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Upload New Binary</span>
              </button>
            </div>

            <div className="space-y-3">
              {MOCK_EA_FILES.map((file) => (
                <div key={file.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4 font-mono text-xs">
                  <div>
                    <div className="font-bold text-white text-sm">{file.fileName}</div>
                    <div className="text-slate-400 text-[11px] font-sans mt-0.5">{file.description}</div>
                    <div className="text-slate-500 text-[10px] mt-1">
                      Build: {file.version} • Size: {file.fileSize} • Uploaded: {file.buildDate}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-cyan-300 block">{file.downloadCount.toLocaleString()} DLs</span>
                    <button 
                      onClick={() => alert(`Serving ${file.fileName} directly.`)}
                      className="mt-1 px-2.5 py-1 rounded bg-slate-800 text-slate-200 hover:bg-slate-700"
                    >
                      Download File
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6 font-mono text-xs">
            <h3 className="text-base font-bold text-white">System & WebRequest Licensing Configuration</h3>
            
            <div className="space-y-4 max-w-2xl text-left">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold uppercase">MT4 WebRequest Host Whitelist</label>
                <input
                  type="text"
                  readOnly
                  value="https://api.titangrid-ea.com"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold uppercase">Heartbeat Interval (Seconds)</label>
                <input
                  type="number"
                  defaultValue={300}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white font-mono"
                />
                <p className="text-[11px] text-slate-500">How often live MT4 charts verify authorization status.</p>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold uppercase">Macro News API Bridge Source</label>
                <input
                  type="text"
                  defaultValue="https://api.titangrid-ea.com/v1/economic-calendar"
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-mono"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-white font-bold">Emergency Kill-Switch (EA Master Stop)</div>
                  <div className="text-slate-500 text-[11px]">Forces all live MT4 instances to halt order placement immediately.</div>
                </div>
                <button
                  onClick={() => alert("Emergency kill switch is currently in SAFE STANDBY mode.")}
                  className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-rose-950 text-rose-400 border border-slate-700 text-xs font-bold"
                >
                  Kill Switch: OFF
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Generate License Modal */}
      {generateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-emerald-500/40 p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white font-mono">Issue MT4 License Key</h3>
            
            <form onSubmit={handleGenerateLicense} className="space-y-4 text-xs font-mono text-left">
              <div className="space-y-1">
                <label className="text-slate-300">Recipient Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="client@tradingfirm.com"
                  value={newLicEmail}
                  onChange={(e) => setNewLicEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300">Product Edition</label>
                <select
                  value={newLicTier}
                  onChange={(e) => setNewLicTier(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                >
                  <option value="Titan Grid Single">Single Trader (1 Account)</option>
                  <option value="Titan Grid EA Pro">Pro Trader Package (3 Accounts)</option>
                  <option value="Titan Grid Institutional">Institutional & Prop (10 Accounts)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300">Subscription Plan (រយៈពេល License)</label>
                <select
                  value={newLicPlan}
                  onChange={(e) => setNewLicPlan(e.target.value as 'monthly' | 'yearly')}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                >
                  <option value="monthly">Monthly — 30 ថ្ងៃ</option>
                  <option value="yearly">Yearly — 365 ថ្ងៃ</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300">Max MT4 Accounts Allowed</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={newLicMaxAccounts}
                  onChange={(e) => setNewLicMaxAccounts(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
                />
              </div>

              {generatedKey && (
                <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-600/50 space-y-2">
                  <div className="text-emerald-400 font-bold text-xs uppercase tracking-wider">✅ License Key បង្កើតរួច (ផ្ញើឱ្យអតិថិជន):</div>
                  <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-950 border border-emerald-700/40">
                    <span className="text-emerald-300 font-bold tracking-wider select-all">{generatedKey}</span>
                    <button
                      type="button"
                      onClick={() => { navigator.clipboard.writeText(generatedKey); }}
                      className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold"
                    >
                      COPY
                    </button>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    អតិថិជនចូល Dashboard → ដាក់ Key នេះក្នុងប្រអប់ "Activate License" → វានឹងភ្ជាប់ទៅគណនីរបស់ពួកគេ។
                  </p>
                </div>
              )}

              <div className="flex gap-2 justify-end pt-3">
                <button
                  type="button"
                  onClick={() => { setGenerateModalOpen(false); setGeneratedKey(null); setNewLicEmail(''); }}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={generateBusy}
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold disabled:opacity-50"
                >
                  {generateBusy ? 'Generating...' : 'Generate & Activate Key'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload EA Build Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-cyan-500/40 p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white font-mono">Upload New EA Build (.ex4)</h3>
            <p className="text-xs text-slate-400">
              Select compiled binary from your MQL4 compiler to distribute to client dashboards.
            </p>

            <div className="p-6 rounded-xl border-2 border-dashed border-slate-700 bg-slate-950 text-center space-y-2 cursor-pointer hover:border-cyan-400 transition-colors">
              <FolderArchive className="w-8 h-8 text-cyan-400 mx-auto" />
              <div className="text-xs text-slate-300">Drag & drop <strong>TitanGrid.ex4</strong> or click to browse</div>
              <div className="text-[10px] text-slate-500">Compiled MQL4 binary only (&lt; 10MB)</div>
            </div>

            <div className="space-y-1 text-xs font-mono text-left">
              <label className="text-slate-300">Version String</label>
              <input
                type="text"
                value={newBuildVersion}
                onChange={(e) => setNewBuildVersion(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
              />
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => setUploadModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`EA Release ${newBuildVersion} uploaded and published to client downloads! (Placeholder)`);
                  setUploadModalOpen(false);
                }}
                className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono"
              >
                Publish Release
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
