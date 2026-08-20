import { LicenseItem, ProductTier, EaFilePackage, OrderRecord, AdminStats, UserProfile } from '../types';

export const CURRENT_EA_VERSION = "v3.4.2 Pro";
export const MT4_BUILD_SUPPORT = "Build 1420+";

export const PRODUCT_TIERS: ProductTier[] = [
  {
    id: 'starter',
    name: 'Single Trader',
    price: 199,
    period: 'one-time / lifetime',
    description: 'Perfect for individual traders looking to automate a single MetaTrader 4 live account.',
    maxMt4Accounts: 1,
    features: [
      '1 Live MT4 Account License',
      'Unlimited Demo MT4 Accounts',
      'Dynamic Grid Spacing Engine',
      'ATR Volatility Adjuster',
      'Smart Equity Protection & Hard SL',
      'All Official Currency .SET Presets',
      'Standard Email & Telegram Support',
      'Lifetime Free Minor Updates (v3.x)'
    ],
    recommended: false
  },
  {
    id: 'pro',
    name: 'Pro Trader Package',
    badge: 'MOST POPULAR',
    price: 349,
    period: 'one-time / lifetime',
    description: 'The definitive algorithmic trading setup for multi-account portfolios and high-volume brokers.',
    maxMt4Accounts: 3,
    features: [
      '3 Live MT4 Account Licenses',
      'Unlimited Demo MT4 Accounts',
      'Correlated Multi-Pair Hedging Mode',
      'News Calendar Auto-Pause Bridge',
      'Custom Equity Drawdown Circuit Breakers',
      'Prop Firm Challenge Safe-Mode Preset',
      'Private VIP Discord Strategy Channel',
      'Lifetime Free Major & Minor Updates'
    ],
    recommended: true
  },
  {
    id: 'prop-firm',
    name: 'Institutional & Prop',
    badge: 'UNLIMITED & PROP READY',
    price: 699,
    period: 'one-time / lifetime',
    description: 'Engineered specifically for prop firm challenges (FTMO, FundedNext) and asset managers.',
    maxMt4Accounts: 10,
    features: [
      '10 Live / Prop MT4 Account Bindings',
      'Strict Daily Equity Loss Limiters (4.5%)',
      'Weekend Rollover & Friday Auto-Close',
      'Tick-by-Tick Latency Arbitrage Guard',
      'Custom Source Code Consulting & Preset Audit',
      '1-on-1 VPS Setup & Strategy Optimization',
      'Dedicated 24/7 Priority Quant Engineer Support',
      'Lifetime Priority Updates + Beta Access'
    ],
    recommended: false
  }
];

export const MOCK_CURRENT_USER: UserProfile = {
  id: 'usr_8829104',
  name: 'Alex Vance',
  email: 'alex.trader@titanalgo.com',
  role: 'user',
  createdAt: '2026-02-14',
  activePlan: 'Pro Trader Package'
};

export const MOCK_ADMIN_USER: UserProfile = {
  id: 'adm_00192',
  name: 'Titan Admin Operations',
  email: 'admin@titangrid-ea.com',
  role: 'admin',
  createdAt: '2025-11-01',
  activePlan: 'System Administrator'
};

export const MOCK_USER_LICENSES: LicenseItem[] = [
  {
    id: 'lic_88301',
    licenseKey: 'TITAN-PRO-8839-4402-9912',
    productName: 'Titan Grid EA Pro',
    eaVersion: CURRENT_EA_VERSION,
    status: 'active',
    mt4Account: '8492048',
    broker: 'IC Markets Global (Raw Spread)',
    maxAccounts: 3,
    assignedToEmail: 'alex.trader@titanalgo.com',
    issuedDate: '2026-02-15',
    expirationDate: 'Lifetime Access',
    lastHeartbeat: '2026-08-20 08:14 UTC'
  },
  {
    id: 'lic_88302',
    licenseKey: 'TITAN-PRO-8839-4402-9913',
    productName: 'Titan Grid EA Pro (Slot 2)',
    eaVersion: CURRENT_EA_VERSION,
    status: 'active',
    mt4Account: '5510294',
    broker: 'Pepperstone Razor (MT4 Live02)',
    maxAccounts: 3,
    assignedToEmail: 'alex.trader@titanalgo.com',
    issuedDate: '2026-02-15',
    expirationDate: 'Lifetime Access',
    lastHeartbeat: '2026-08-20 08:28 UTC'
  }
];

export const MOCK_ALL_LICENSES: LicenseItem[] = [
  {
    id: 'lic_88301',
    licenseKey: 'TITAN-PRO-8839-4402-9912',
    productName: 'Titan Grid EA Pro',
    eaVersion: 'v3.4.2 Pro',
    status: 'active',
    mt4Account: '8492048',
    broker: 'IC Markets Global',
    maxAccounts: 3,
    assignedToEmail: 'alex.trader@titanalgo.com',
    issuedDate: '2026-02-15',
    expirationDate: 'Lifetime',
    lastHeartbeat: '2 mins ago'
  },
  {
    id: 'lic_99014',
    licenseKey: 'TITAN-PROP-1102-7729-3381',
    productName: 'Titan Grid Institutional',
    eaVersion: 'v3.4.2 Pro',
    status: 'active',
    mt4Account: '2093847',
    broker: 'FTMO MT4 Server',
    maxAccounts: 10,
    assignedToEmail: 'david.quant@vertexfunds.io',
    issuedDate: '2026-04-10',
    expirationDate: 'Lifetime',
    lastHeartbeat: '15 mins ago'
  },
  {
    id: 'lic_77182',
    licenseKey: 'TITAN-ST-5521-0029-4411',
    productName: 'Titan Grid Single',
    eaVersion: 'v3.3.0',
    status: 'inactive',
    mt4Account: 'Unassigned',
    broker: 'None',
    maxAccounts: 1,
    assignedToEmail: 'sarah.m@fxcap.net',
    issuedDate: '2026-06-01',
    expirationDate: 'Lifetime',
    lastHeartbeat: 'Never'
  },
  {
    id: 'lic_66190',
    licenseKey: 'TITAN-PRO-4421-9988-1200',
    productName: 'Titan Grid EA Pro',
    eaVersion: 'v3.4.2 Pro',
    status: 'expired',
    mt4Account: '1102948',
    broker: 'Tickmill Pro',
    maxAccounts: 3,
    assignedToEmail: 'marcus.k@berlin-fx.de',
    issuedDate: '2025-08-01',
    expirationDate: '2026-08-01',
    lastHeartbeat: '20 days ago'
  }
];

export const MOCK_EA_FILES: EaFilePackage[] = [
  {
    id: 'ea_file_01',
    fileName: 'TitanGrid_EA_v3.4.2.ex4',
    version: 'v3.4.2 Pro',
    fileSize: '1.84 MB',
    buildDate: '2026-07-28',
    type: 'ea',
    description: 'Compiled production Expert Advisor binary for MetaTrader 4 (Build 1420+ compatible).',
    downloadCount: 1420
  },
  {
    id: 'ea_file_02',
    fileName: 'TitanGrid_Preset_Packs_2026.zip',
    version: 'v3.4.2',
    fileSize: '420 KB',
    buildDate: '2026-08-01',
    type: 'preset',
    description: 'Curated .SET presets: Conservative (Low DD), Balanced, Aggressive, and PropFirm FTMO Safe.',
    downloadCount: 3120
  },
  {
    id: 'ea_file_03',
    fileName: 'TitanGrid_EA_Installation_Guide.pdf',
    version: 'Manual v3.4',
    fileSize: '3.2 MB',
    buildDate: '2026-07-30',
    type: 'manual',
    description: 'Comprehensive step-by-step PDF manual on installation, MT4 WebRequest setup, and DLL permissions.',
    downloadCount: 2890
  }
];

export const MOCK_ORDERS: OrderRecord[] = [
  {
    id: 'ORD-9842',
    customerName: 'Alex Vance',
    customerEmail: 'alex.trader@titanalgo.com',
    productTier: 'Pro Trader Package',
    amount: 349,
    currency: 'USD',
    status: 'completed',
    date: '2026-02-15',
    paymentMethod: 'Crypto (USDT TRC20)'
  },
  {
    id: 'ORD-9843',
    customerName: 'David Zhang',
    customerEmail: 'david.quant@vertexfunds.io',
    productTier: 'Institutional & Prop',
    amount: 699,
    currency: 'USD',
    status: 'completed',
    date: '2026-04-10',
    paymentMethod: 'Stripe Credit Card'
  },
  {
    id: 'ORD-9844',
    customerName: 'Elena Rostova',
    customerEmail: 'elena.rost@nordicfin.com',
    productTier: 'Single Trader',
    amount: 199,
    currency: 'USD',
    status: 'completed',
    date: '2026-08-18',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD-9845',
    customerName: 'Kenji Sato',
    customerEmail: 'kenji.s@tokyofx.jp',
    productTier: 'Pro Trader Package',
    amount: 349,
    currency: 'USD',
    status: 'pending',
    date: '2026-08-20',
    paymentMethod: 'Crypto (BTC)'
  }
];

export const MOCK_ADMIN_STATS: AdminStats = {
  totalUsers: 842,
  activeLicenses: 1149,
  totalOrdersPlaceholder: 1284,
  totalEaDownloads: 7430,
  activeMt4Terminals: 968
};

export const FAQ_ITEMS = [
  {
    question: "What is Titan Grid EA and what platform does it support?",
    answer: "Titan Grid EA is an institutional-grade algorithmic Expert Advisor engineered strictly for MetaTrader 4 (MT4). It utilizes dynamic volatility-based grid placement, correlation hedging, and strict equity drawdowns to capture market moves around major liquid currency pairs without relying on dangerous classic grid doubling."
  },
  {
    question: "Which currency pairs and timeframes work best?",
    answer: "Titan Grid EA is optimized for high-liquidity pairs with low broker spreads: GBPUSD, EURUSD, AUDCAD, and NZDCAD. Recommended chart timeframes are M15 and H1. Detailed .SET files tailored for each pair are included in the download package."
  },
  {
    question: "What is the minimum account balance recommended?",
    answer: "For standard micro-lot (0.01) accounts, we recommend a minimum equity of $500–$1,000 with 1:100 to 1:500 leverage. For Cent accounts ($100 = 10,000 cents), you can start safely with as low as $50–$100 to test settings in live market conditions."
  },
  {
    question: "Is Titan Grid EA compatible with Prop Firm rules (e.g. FTMO, FundedNext)?",
    answer: "Yes. The EA features dedicated 'Prop-Firm Safe Mode' containing hard daily loss limits (e.g., 4.5% max daily drawdown stop), automated Friday position closing before weekend rollover, and tick-spread protection to ensure full compliance with funding challenge criteria."
  },
  {
    question: "How does the MT4 license activation work?",
    answer: "Upon obtaining your license key, you simply enter your unique key into the User Dashboard and bind your MT4 live account number. In your MT4 terminal, enable 'Allow WebRequest' with our validation server URL and input your key into the EA inputs dialog."
  },
  {
    question: "Do I need a VPS (Virtual Private Server)?",
    answer: "Yes, automated trading EAs require an uninterrupted 24/5 internet connection with low latency to your broker server. We recommend running Titan Grid EA on a Windows VPS located near your broker's server (e.g., London or New York) with under 10ms execution ping."
  }
];
