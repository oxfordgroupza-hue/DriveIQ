import { RequestHandler } from "express";
import crypto from "crypto";

// Token -> email
const tokens = new Map<string, string>();

// email -> { rx?: Buffer; referral?: Buffer }
const docs = new Map<string, { rx?: Buffer; referral?: Buffer }>();

// Build a minimal single-page PDF with text lines
function makeSimplePdf(title: string, lines: string[]): Buffer {
  const contentLines = [
    "BT /F1 16 Tf 72 760 Td (" + escapePdf(title) + ") Tj ET",
    ...lines.map((l, i) => `BT /F1 12 Tf 72 ${730 - i * 18} Td (${escapePdf(l)}) Tj ET`),
  ].join("\n");
  const stream = Buffer.from(contentLines, "utf8");
  const objects: Buffer[] = [];
  const xref: number[] = [0];

  function addObj(src: string | Buffer) {
    const offset = objects.reduce((a, b) => a + b.length, 0) + header.length;
    xref.push(offset);
    objects.push(Buffer.isBuffer(src) ? src : Buffer.from(src, "utf8"));
  }

  function obj(n: number, body: string) {
    return `${n} 0 obj\n${body}\nendobj\n`;
  }

  const header = Buffer.from("%PDF-1.4\n");
  const cat = obj(1, "<< /Type /Catalog /Pages 2 0 R >>");
  const pages = obj(2, "<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
  const page = obj(3, "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>");
  const contents = obj(4, `<< /Length ${stream.length} >>\nstream\n${contentLines}\nendstream`);
  const font = obj(5, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Name /F1 >>");

  addObj(cat);
  addObj(pages);
  addObj(page);
  addObj(contents);
  addObj(font);

  const body = Buffer.concat(objects);
  const xrefStart = header.length + body.length;
  const xrefTable = [
    `xref\n0 ${xref.length}\n0000000000 65535 f \n`,
    ...xref.slice(1).map((o) => `${String(o).padStart(10, "0")} 00000 n \n`),
  ].join("");
  const trailer = `trailer\n<< /Size ${xref.length} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
  return Buffer.concat([header, body, Buffer.from(xrefTable), Buffer.from(trailer)]);
}

function escapePdf(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

// Helpers to update a user record stored in signup.ts
import { getRecordByEmail, setRecordByEmail } from "./_records";

export const sendVisionLink: RequestHandler = (req, res) => {
  const { email } = req.body as { email?: string };
  if (!email) return res.status(400).json({ ok: false, error: "email required" });
  const rec = getRecordByEmail(email.toLowerCase());
  if (!rec) return res.status(404).json({ ok: false, error: "user not found" });
  if (!rec.paid) return res.status(400).json({ ok: false, error: "payment required" });
  const token = crypto.randomBytes(16).toString("hex");
  tokens.set(token, rec.email);
  setRecordByEmail(rec.email, { ...rec, vision: { ...(rec.vision||{}), status: "pending", needed: true } });
  const url = `/vision-test?token=${token}`;
  res.json({ ok: true, url });
};

export const getVisionToken: RequestHandler = (req, res) => {
  const { token } = req.params as { token: string };
  const email = tokens.get(token);
  if (!email) return res.status(404).json({ ok: false });
  res.json({ ok: true, email });
};

export const submitVisionResult: RequestHandler = (req, res) => {
  const { token, concern } = req.body as { token?: string; concern?: boolean };
  if (!token) return res.status(400).json({ ok: false, error: "token required" });
  const email = tokens.get(token);
  if (!email) return res.status(404).json({ ok: false, error: "invalid token" });
  tokens.delete(token);
  const rec = getRecordByEmail(email);
  if (!rec) return res.status(404).json({ ok: false, error: "user not found" });

  let rxBuf: Buffer | undefined;
  let refBuf: Buffer | undefined;
  if (concern) {
    const rxLines = [
      `Learner: ${rec.name}`,
      `Suggested Rx (AI screening): Sphere: -0.50, Cylinder: -0.25, Axis: 180`,
      `NOTE: For professional approval by a qualified optometrist`,
      `Date: ${new Date().toISOString()}`,
    ];
    rxBuf = makeSimplePdf("DriveIQ Vision — Sample Prescription", rxLines);

    const refLines = [
      `Learner: ${rec.name}`,
      `Reason for referral: AI screening detected potential vision concern`,
      `Please perform comprehensive eye examination and confirm prescription`,
      `Date: ${new Date().toISOString()}`,
    ];
    refBuf = makeSimplePdf("DriveIQ Vision — Referral Letter", refLines);
  }

  docs.set(email, { rx: rxBuf, referral: refBuf });
  const newRec = {
    ...rec,
    vision: {
      needed: true,
      status: concern ? "blocked" : "cleared",
      result: { concern: !!concern },
    },
  } as any;
  setRecordByEmail(email, newRec);
  res.json({ ok: true, status: newRec.vision.status });
};

export const getVisionDoc: RequestHandler = (req, res) => {
  const { email, type } = req.params as { email: string; type: string };
  const d = docs.get(email.toLowerCase());
  if (!d) return res.status(404).send("Not found");
  const buf = type === "rx" ? d.rx : d.referral;
  if (!buf) return res.status(404).send("Not found");
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename=driveiq-${type}.pdf`);
  res.send(buf);
};
