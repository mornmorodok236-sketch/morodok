// ============================================================
// Titan Grid EA — Data Layer (Supabase Queries)
// All functions the frontend calls — protected by RLS
// ============================================================
import { supabase } from './supabase';
import type { ProductTier, LicenseItem, OrderRecord } from '../types';

// ------------------- PRODUCTS -------------------

interface DbProduct {
  id: string;
  tier_slug: string;
  name: string;
  badge: string | null;
  description: string | null;
  max_mt4_accounts: number;
  features: string[];
  price_monthly: number;
  price_yearly: number;
  ea_version: string;
  recommended: boolean;
  sort_order: number;
}

export function mapProduct(p: DbProduct): ProductTier & { priceYearly: number; dbId: string } {
  return {
    id: p.tier_slug,
    dbId: p.id,
    name: p.name,
    badge: p.badge ?? undefined,
    price: p.price_monthly,
    priceYearly: p.price_yearly,
    period: 'month • subscription',
    description: p.description ?? '',
    maxMt4Accounts: p.max_mt4_accounts,
    features: p.features ?? [],
    recommended: p.recommended,
  };
}

export async function fetchProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('active', true)
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return (data as DbProduct[]).map(mapProduct);
}

// ------------------- ORDERS (customer side) -------------------

export async function createOrder(input: {
  userId: string;
  productTierSlug: string;
  plan: 'monthly' | 'yearly';
  paymentRef?: string;
  customerEmail: string | null;
  customerName: string | null;
}): Promise<{ error?: string; orderId?: string; amount?: number }> {
  // Look up the product row
  const { data: product, error: pErr } = await supabase
    .from('products')
    .select('*')
    .eq('tier_slug', input.productTierSlug)
    .maybeSingle();
  if (pErr || !product) return { error: 'Product not found' };

  const amount = input.plan === 'yearly' ? product.price_yearly : product.price_monthly;

  const { data, error } = await supabase
    .from('orders')
    .insert({
      user_id: input.userId,
      product_id: product.id,
      plan: input.plan,
      amount,
      currency: 'USD',
      status: 'pending',
      payment_ref: input.paymentRef?.trim() || null,
      customer_email: input.customerEmail,
      customer_name: input.customerName,
    })
    .select('id')
    .single();

  if (error) return { error: error.message };
  return { orderId: data.id as string, amount };
}

export async function fetchMyOrders(userId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select('*, products(name)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) return [];
  return data as any[];
}

// ------------------- LICENSES (customer side) -------------------

export function mapLicense(l: any): LicenseItem {
  const daysLeft = Math.max(0, Math.ceil((new Date(l.expires_at).getTime() - Date.now()) / 86400000));
  const expired = new Date(l.expires_at).getTime() < Date.now();
  return {
    id: l.id,
    licenseKey: l.license_key,
    productName: l.products?.name ?? 'Titan Grid EA',
    eaVersion: l.products?.ea_version ?? 'v3.4.2 Pro',
    status: expired && l.status === 'active' ? 'expired' : l.status,
    mt4Account: l.mt4_account ?? 'Unassigned',
    broker: l.broker ?? undefined,
    maxAccounts: l.max_accounts,
    assignedToEmail: l.customer_email ?? '',
    issuedDate: (l.starts_at ?? l.created_at)?.split('T')[0],
    expirationDate: expired ? `Expired ${l.expires_at.split('T')[0]}` : `${l.expires_at.split('T')[0]} (${daysLeft} days left)`,
    lastHeartbeat: l.last_heartbeat ? new Date(l.last_heartbeat).toLocaleString() : 'Never',
  };
}

export async function fetchMyLicenses(userId: string): Promise<LicenseItem[]> {
  const { data, error } = await supabase
    .from('licenses')
    .select('*, products(name, ea_version)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return data.map(mapLicense);
}

export async function bindMt4Account(licenseId: string, mt4Account: string, broker?: string) {
  const { error } = await supabase
    .from('licenses')
    .update({ mt4_account: mt4Account, broker: broker || null })
    .eq('id', licenseId);
  return { error: error?.message };
}

export async function claimLicenseByKey(key: string): Promise<{ error?: string }> {
  const { error } = await supabase.rpc('claim_license', { p_key: key });
  if (error) return { error: error.message };
  return {};
}

// ------------------- ADMIN -------------------

export async function fetchAdminStats() {
  const count = async (table: string, filter?: (q: any) => any) => {
    let q = supabase.from(table).select('id', { count: 'exact', head: true });
    if (filter) q = filter(q);
    const { count: c } = await q;
    return c ?? 0;
  };
  return {
    totalUsers: await count('profiles'),
    totalOrders: await count('orders'),
    pendingOrders: await count('orders', (q) => q.eq('status', 'pending')),
    activeLicenses: await count('licenses', (q) => q.eq('status', 'active')),
    revenue: 0, // computed later if needed
  };
}

export async function fetchAllOrders(): Promise<OrderRecord[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*, products(name)')
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return data.map((o: any) => ({
    id: o.id.slice(0, 8).toUpperCase(),
    _dbId: o.id,
    customerName: o.customer_name ?? '—',
    customerEmail: o.customer_email ?? '—',
    productTier: o.products?.name ?? '—',
    amount: o.amount,
    currency: o.currency,
    status: o.status === 'paid' ? 'completed' : o.status === 'rejected' ? 'refunded' : 'pending',
    _rawStatus: o.status,
    date: o.created_at.split('T')[0],
    paymentMethod: `Bakong KHQR${o.payment_ref ? ` • Ref: ${o.payment_ref}` : ''}`,
    _plan: o.plan,
  })) as any;
}

export async function fetchAllLicenses(): Promise<LicenseItem[]> {
  const { data, error } = await supabase
    .from('licenses')
    .select('*, products(name, ea_version)')
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return data.map(mapLicense);
}

// Admin approves an order: mark paid + create/extend the license
export async function approveOrder(dbOrderId: string): Promise<{ error?: string; renewed?: boolean; licenseKey?: string }> {
  const { data: order, error } = await supabase
    .from('orders')
    .select('*, products(*)')
    .eq('id', dbOrderId)
    .single();
  if (error || !order) return { error: error?.message ?? 'Order not found' };
  if (order.status !== 'pending') return { error: 'Order already processed' };

  // 1. Mark the order as paid
  const { error: upErr } = await supabase
    .from('orders')
    .update({ status: 'paid', paid_at: new Date().toISOString() })
    .eq('id', dbOrderId);
  if (upErr) return { error: upErr.message };

  const days = order.plan === 'yearly' ? 365 : 30;

  // 2. Existing ACTIVE license for the same product? (renew = add days on top)
  const { data: existing } = await supabase
    .from('licenses')
    .select('*')
    .eq('user_id', order.user_id)
    .eq('product_id', order.product_id)
    .eq('status', 'active')
    .maybeSingle();

  if (existing) {
    const base = new Date(existing.expires_at) > new Date() ? new Date(existing.expires_at) : new Date();
    const newExp = new Date(base.getTime() + days * 86400000);
    const { error: licErr } = await supabase
      .from('licenses')
      .update({ expires_at: newExp.toISOString(), order_id: dbOrderId })
      .eq('id', existing.id);
    if (licErr) return { error: licErr.message };
    return { renewed: true, licenseKey: existing.license_key };
  }

  // 3. No active license yet -> create a brand new one
  const expires = new Date(Date.now() + days * 86400000);
  const { data: lic, error: licErr } = await supabase
    .from('licenses')
    .insert({
      user_id: order.user_id,
      order_id: dbOrderId,
      product_id: order.product_id,
      plan: order.plan,
      max_accounts: order.products?.max_mt4_accounts ?? 1,
      expires_at: expires.toISOString(),
      customer_email: order.customer_email,
    })
    .select('license_key')
    .single();

  if (licErr) return { error: licErr.message };
  return { renewed: false, licenseKey: lic.license_key };
}

export async function rejectOrder(dbOrderId: string) {
  const { error } = await supabase
    .from('orders')
    .update({ status: 'rejected' })
    .eq('id', dbOrderId)
    .eq('status', 'pending');
  return { error: error?.message };
}

export async function setLicenseStatus(licenseId: string, status: 'active' | 'suspended') {
  const { error } = await supabase
    .from('licenses')
    .update({ status })
    .eq('id', licenseId);
  return { error: error?.message };
}

// Admin manually issues a license to an email (customer claims it by key later)
export async function adminCreateLicense(input: {
  customerEmail: string;
  productTierSlug: string;
  plan: 'monthly' | 'yearly';
}): Promise<{ error?: string; licenseKey?: string }> {
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('tier_slug', input.productTierSlug)
    .maybeSingle();
  if (!product) return { error: 'Product not found' };

  const days = input.plan === 'yearly' ? 365 : 30;
  const expires = new Date(Date.now() + days * 86400000);

  const { data, error } = await supabase
    .from('licenses')
    .insert({
      user_id: null,
      product_id: product.id,
      plan: input.plan,
      max_accounts: product.max_mt4_accounts,
      expires_at: expires.toISOString(),
      customer_email: input.customerEmail.trim().toLowerCase(),
    })
    .select('license_key')
    .single();

  if (error) return { error: error.message };
  return { licenseKey: data.license_key as string };
}
