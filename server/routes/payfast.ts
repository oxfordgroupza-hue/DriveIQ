import { RequestHandler } from "express";
import { createHash } from "crypto";
import { getRecordByEmail, setRecordByEmail } from "./_records";

function pfParamString(params: Record<string, string | number | undefined | null>, passphrase?: string) {
  const entries = Object.entries(params)
    .filter(([k, v]) => k !== "signature" && v !== undefined && v !== null && String(v).length > 0)
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v).trim())}`);
  if (passphrase) entries.push(`${encodeURIComponent("passphrase")}=${encodeURIComponent(passphrase)}`);
  return entries.join("&");
}

function pfSignature(params: Record<string, any>, passphrase?: string) {
  const paramStr = pfParamString(params, passphrase);
  return createHash("md5").update(paramStr).digest("hex");
}

export const initiatePayfast: RequestHandler = (req, res) => {
  const merchant_id = process.env.PAYFAST_MERCHANT_ID || "";
  const merchant_key = process.env.PAYFAST_MERCHANT_KEY || "";
  const passphrase = process.env.PAYFAST_PASSPHRASE || "";
  if (!merchant_id || !merchant_key || !passphrase) {
    return res.status(500).json({ ok: false, error: "PayFast not configured" });
  }

  const { email, name, amount } = (req.body || {}) as { email?: string; name?: string; amount?: number };
  if (!email || !amount) return res.status(400).json({ ok: false, error: "email and amount required" });

  const rec = getRecordByEmail(email.toLowerCase());
  if (!rec) return res.status(404).json({ ok: false, error: "signup required" });

  const baseUrl = `${req.protocol}://${req.get("host")}`;
  const payload: Record<string, string | number> = {
    merchant_id,
    merchant_key,
    return_url: `${baseUrl}/`,
    cancel_url: `${baseUrl}/`,
    notify_url: `${baseUrl}/api/payfast/notify`,
    m_payment_id: rec.email,
    amount: Number(amount).toFixed(2),
    item_name: "DriveIQ Early Bird",
    email_address: rec.email,
    name_first: name || rec.name,
  };

  const signature = pfSignature(payload, passphrase);

  return res.json({ ok: true, gateway: "https://www.payfast.co.za/eng/process", fields: { ...payload, signature } });
};

export const payfastNotify: RequestHandler = (req, res) => {
  try {
    const passphrase = process.env.PAYFAST_PASSPHRASE || "";
    const posted = req.body || {};
    const { signature: postedSig, m_payment_id, payment_status } = posted as any;
    const calcSig = pfSignature(posted, passphrase);

    if (!postedSig || postedSig !== calcSig) {
      return res.status(400).send("Invalid signature");
    }

    if (typeof m_payment_id === "string") {
      const email = m_payment_id.toLowerCase();
      const rec = getRecordByEmail(email);
      if (rec) {
        const paid = payment_status === "COMPLETE" || payment_status === "COMPLETE-PENDING" || posted.amount_gross === "99.00";
        if (paid) setRecordByEmail(email, { ...rec, paid: true });
      }
    }

    return res.status(200).send("OK");
  } catch (e) {
    return res.status(200).send("OK");
  }
};
