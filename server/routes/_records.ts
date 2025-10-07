// Shared in-memory record store helpers
export interface VisionState { needed: boolean; status: "pending" | "cleared" | "blocked"; result?: { concern: boolean } }
export interface Record {
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
  paid?: boolean;
  vision?: VisionState;
}

const byEmail = new Map<string, Record>();

export function getRecordByEmail(email: string) {
  return byEmail.get(email.toLowerCase());
}
export function setRecordByEmail(email: string, rec: Record) {
  byEmail.set(email.toLowerCase(), rec);
}
export function exposeAll() { return byEmail; }
