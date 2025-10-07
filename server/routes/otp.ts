import { RequestHandler } from "express";

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const waOtps = new Map<string, string>();
const smsOtps = new Map<string, string>();
const emailOtps = new Map<string, string>();

export const sendWhatsAppOtp: RequestHandler = (req, res) => {
  const { number } = req.body as { number?: string };
  if (!number) return res.status(400).json({ ok: false, error: "number required" });
  const code = generateCode();
  waOtps.set(number, code);
  console.log(`[OTP] WhatsApp -> ${number}: ${code}`);
  return res.json({ ok: true, devCode: code });
};

export const verifyWhatsAppOtp: RequestHandler = (req, res) => {
  const { number, code } = req.body as { number?: string; code?: string };
  if (!number || !code) return res.status(400).json({ ok: false, error: "number and code required" });
  const expected = waOtps.get(number);
  if (expected && expected === code) {
    waOtps.delete(number);
    return res.json({ ok: true });
  }
  return res.status(400).json({ ok: false, error: "invalid code" });
};

export const sendSmsOtp: RequestHandler = (req, res) => {
  const { number } = req.body as { number?: string };
  if (!number) return res.status(400).json({ ok: false, error: "number required" });
  const code = generateCode();
  smsOtps.set(number, code);
  console.log(`[OTP] SMS -> ${number}: ${code}`);
  return res.json({ ok: true, devCode: code });
};

export const verifySmsOtp: RequestHandler = (req, res) => {
  const { number, code } = req.body as { number?: string; code?: string };
  if (!number || !code) return res.status(400).json({ ok: false, error: "number and code required" });
  const expected = smsOtps.get(number);
  if (expected && expected === code) {
    smsOtps.delete(number);
    return res.json({ ok: true });
  }
  return res.status(400).json({ ok: false, error: "invalid code" });
};

export const sendEmailOtp: RequestHandler = (req, res) => {
  const { email } = req.body as { email?: string };
  if (!email) return res.status(400).json({ ok: false, error: "email required" });
  const code = generateCode();
  emailOtps.set(email.toLowerCase(), code);
  console.log(`[OTP] Email -> ${email}: ${code}`);
  return res.json({ ok: true, devCode: code });
};

export const verifyEmailOtp: RequestHandler = (req, res) => {
  const { email, code } = req.body as { email?: string; code?: string };
  if (!email || !code) return res.status(400).json({ ok: false, error: "email and code required" });
  const expected = emailOtps.get(email.toLowerCase());
  if (expected && expected === code) {
    emailOtps.delete(email.toLowerCase());
    return res.json({ ok: true });
  }
  return res.status(400).json({ ok: false, error: "invalid code" });
};
