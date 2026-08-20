// ============================================================
// Titan Grid EA — License Validation API (Vercel Serverless)
// Endpoint: POST /api/license/validate
// Required Env Vars in Vercel (Settings -> Environment Variables):
//   SUPABASE_URL              = https://webhlwegocwmwyunjirn.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY = service_role key (SECRET! server only)
//   EA_API_KEY                = secret shared with the EA (same value in MQL4 code)
// ============================================================
import { createClient } from '@supabase/supabase-js';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ valid: false, reason: 'method_not_allowed', message: 'Use POST' });
  }

  // 1. Check API key (blocks unauthorized callers)
  if ((req.headers['x-api-key'] || '') !== (process.env.EA_API_KEY || '')) {
    return res.status(401).json({ valid: false, reason: 'unauthorized', message: 'Invalid API key' });
  }

  const { license_key, mt4_account, ea_version } = req.body || {};
  if (!license_key || !mt4_account) {
    return res.status(200).json({
      valid: false,
      reason: 'bad_request',
      message: 'license_key and mt4_account are required',
    });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    { auth: { persistSession: false } }
  );

  const key = String(license_key).toUpperCase().trim();
  const account = String(mt4_account).trim();
  const now = new Date();

  const logResult = async (result: string) => {
    try {
      await supabase.from('license_logs').insert({
        license_key: key,
        mt4_account: account,
        ea_version: ea_version ? String(ea_version) : null,
        result,
      });
    } catch (_) { /* never break validation because of logging */ }
  };

  // 2. Look up the license
  const { data: lic, error } = await supabase
    .from('licenses')
    .select('*, products(name, ea_version)')
    .eq('license_key', key)
    .maybeSingle();

  if (error || !lic) {
    await logResult('not_found');
    return res.status(200).json({
      valid: false,
      reason: 'not_found',
      message: 'License key not found. Please check your key.',
    });
  }

  // 3. Check suspended
  if (lic.status === 'suspended') {
    await logResult('suspended');
    return res.status(200).json({
      valid: false,
      reason: 'suspended',
      message: 'License suspended. Please contact support.',
    });
  }

  // 4. Check expiry (auto-expire happens right here)
  const expires = new Date(lic.expires_at);
  if (lic.status === 'expired' || expires.getTime() < now.getTime()) {
    if (lic.status !== 'expired') {
      await supabase.from('licenses').update({ status: 'expired' }).eq('id', lic.id);
    }
    await logResult('expired');
    return res.status(200).json({
      valid: false,
      reason: 'expired',
      message: 'License expired. Please renew your subscription.',
      expires_at: lic.expires_at,
    });
  }

  // 5. MT4 account binding (auto-binds on first validation)
  if (!lic.mt4_account) {
    await supabase
      .from('licenses')
      .update({ mt4_account: account, last_heartbeat: now.toISOString() })
      .eq('id', lic.id);
  } else if (String(lic.mt4_account) !== account) {
    await logResult('account_mismatch');
    return res.status(200).json({
