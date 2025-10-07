import { RequestHandler } from "express";
import { getRecordByEmail, setRecordByEmail } from "./_records";

export const getUser: RequestHandler = (req, res) => {
  const email = String(req.query.email || "").toLowerCase();
  if (!email) return res.status(400).json({ ok: false, error: "email required" });
  const rec = getRecordByEmail(email);
  if (!rec) return res.status(404).json({ ok: false, error: "not found" });
  res.json({ ok: true, user: rec });
};

export const confirmPayment: RequestHandler = (req, res) => {
  const { email } = req.body as { email?: string };
  if (!email) return res.status(400).json({ ok: false, error: "email required" });
  const rec = getRecordByEmail(email.toLowerCase());
  if (!rec) return res.status(404).json({ ok: false, error: "not found" });
  const updated = { ...rec, paid: true };
  setRecordByEmail(updated.email, updated);
  res.json({ ok: true });
};
