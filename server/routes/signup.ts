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

import { setRecordByEmail, getRecordByEmail, type Record as Rec } from "./_records";
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
  const {
    name, email, whatsapp, province, city, institution, licenseCode,
    hasWhatsApp, smsVerified, whatsappVerified, emailVerified, terms, referrer,
  } = (req.body || {}) as SignupBody;

  if (!name || !email || !whatsapp || !province || !city || !institution || !licenseCode || terms !== true) {
    return res.status(400).json({ success: false, error: "Missing required fields" });
  }
  if (!smsVerified) {
    return res.status(400).json({ success: false, error: "SMS verification required" });
  }
  if (hasWhatsApp) {
    if (!whatsappVerified) return res.status(400).json({ success: false, error: "WhatsApp verification required" });
  } else {
    if (!emailVerified) return res.status(400).json({ success: false, error: "Email verification required" });
  }

  const existing = getRecordByEmail(email.toLowerCase());
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  if (existing) {
    return res.json({ success: true, code: existing.code, referralLink: `${baseUrl}/?ref=${existing.code}`, remaining: remainingSlots });
  }

  const code = genCode();
  const rec: Rec = {
    name,
    email: email.toLowerCase(),
    whatsapp,
    province,
    city,
    institution,
    licenseCode,
    hasWhatsApp,
    code,
    referrer,
    createdAt: Date.now(),
    paid: false,
    vision: { needed: true, status: "pending" },
  };
  setRecordByEmail(rec.email, rec);
  if (remainingSlots > 0) remainingSlots -= 1;

  return res.json({ success: true, code, referralLink: `${baseUrl}/?ref=${code}`, remaining: remainingSlots });
};
