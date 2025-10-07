import { RequestHandler } from "express";

interface SignupBody {
  name: string;
  email: string;
  whatsapp: string;
  province: string;
  city: string;
  institution: string;
  licenseCode: string;
  hasWhatsApp: boolean;
  smsVerified: boolean;
  whatsappVerified?: boolean;
  emailVerified?: boolean;
  studentCardImage?: string;
  terms: boolean;
  referrer?: string;
}
interface Record {
  name: string;
  email: string;
  whatsapp: string;
  province: string;
  city: string;
  institution: string;
  licenseCode: string;
  hasWhatsApp: boolean;
  code: string;
  referrer?: string;
  createdAt: number;
}

const signups = new Map<string, Record>();
let remainingSlots = 500;

function genCode(len = 8) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < len; i++) out += alphabet[Math.floor(Math.random() * alphabet.length)];
  return out;
}

export const getSlots: RequestHandler = (_req, res) => {
  res.json({ remaining: remainingSlots });
};

export const postSignup: RequestHandler = (req, res) => {
  const { name, email, whatsapp, terms, referrer } = (req.body || {}) as SignupBody;
  if (!name || !email || !whatsapp || !terms) {
    return res.status(400).json({ success: false, error: "Missing fields" });
  }

  const existing = signups.get(email.toLowerCase());
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  if (existing) {
    return res.json({ success: true, code: existing.code, referralLink: `${baseUrl}/?ref=${existing.code}`, remaining: remainingSlots });
  }

  const code = genCode();
  const rec: Record = { name, email: email.toLowerCase(), whatsapp, code, referrer, createdAt: Date.now() };
  signups.set(rec.email, rec);
  if (remainingSlots > 0) remainingSlots -= 1;

  return res.json({ success: true, code, referralLink: `${baseUrl}/?ref=${code}`, remaining: remainingSlots });
};
