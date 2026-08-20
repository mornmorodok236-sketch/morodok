export type PageType = 'home' | 'product' | 'login' | 'register' | 'dashboard' | 'admin';

export type UserRole = 'guest' | 'user' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: string;
  activePlan: string;
}

export interface LicenseItem {
  id: string;
  licenseKey: string;
  productName: string;
  eaVersion: string;
  status: 'active' | 'inactive' | 'expired' | 'suspended';
  mt4Account: string;
  broker?: string;
  maxAccounts: number;
  assignedToEmail: string;
  issuedDate: string;
  expirationDate: string; // "Lifetime" or ISO date
  lastHeartbeat?: string;
}

export interface ProductTier {
  id: string;
  name: string;
  badge?: string;
  price: number;
  period: string;
  description: string;
  maxMt4Accounts: number;
  features: string[];
  recommended?: boolean;
}

export interface EaFilePackage {
  id: string;
  fileName: string;
  version: string;
  fileSize: string;
  buildDate: string;
  type: 'ea' | 'preset' | 'manual';
  description: string;
  downloadCount: number;
}

export interface OrderRecord {
  id: string;
  customerName: string;
  customerEmail: string;
  productTier: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'refunded';
  date: string;
  paymentMethod: string;
}

export interface AdminStats {
  totalUsers: number;
  activeLicenses: number;
  totalOrdersPlaceholder: number;
  totalEaDownloads: number;
  activeMt4Terminals: number;
}
