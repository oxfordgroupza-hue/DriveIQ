import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Copy, Share2, Phone, Mail, ShieldCheck, UploadCloud, Globe } from "lucide-react";

interface SlotsResponse { remaining: number }
interface SignupResponse { success: boolean; code: string; referralLink: string; remaining: number }

const PROVINCES = [
  "Eastern Cape","Free State","Gauteng","KwaZulu-Natal","Limpopo","Mpumalanga","Northern Cape","North West","Western Cape",
];

function normalizeZA(input: string) {
  const trimmed = input.replace(/\s+/g, "");
  if (!trimmed) return "";
  if (trimmed.startsWith("+")) return "+" + trimmed.replace(/[^\d]/g, "").slice(0);
  const digits = trimmed.replace(/[^\d]/g, "");
  if (digits.startsWith("27")) return "+" + digits;
  if (digits.startsWith("0")) return "+27" + digits.slice(1);
  return "+27" + digits;
}

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [hasWhatsApp, setHasWhatsApp] = useState(true);
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [institution, setInstitution] = useState("");
  const [licenseCode, setLicenseCode] = useState("");
  const [studentCardImage, setStudentCardImage] = useState<string | null>(null);
  const [terms, setTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SignupResponse | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);

  const [smsCode, setSmsCode] = useState("");
  const [smsSent, setSmsSent] = useState(false);
  const [smsVerified, setSmsVerified] = useState(false);
  const [waCode, setWaCode] = useState("");
  const [waSent, setWaSent] = useState(false);
  const [waVerified, setWaVerified] = useState(false);
  const [emailCode, setEmailCode] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const [socialProvider, setSocialProvider] = useState<string | null>(null);

  const referrer = useMemo(() => new URLSearchParams(window.location.search).get("ref") || undefined, []);

  useEffect(() => {
    fetch("/api/slots").then(r => r.json()).then((d: SlotsResponse) => setRemaining(d.remaining)).catch(() => {});
  }, []);

  const onBlurWhatsapp = () => setWhatsapp(prev => normalizeZA(prev));

  const onUpload = async (f: File | null) => {
    if (!f) return setStudentCardImage(null);
    const reader = new FileReader();
    reader.onload = () => setStudentCardImage(String(reader.result || ""));
    reader.readAsDataURL(f);
  };

  const sendSms = async () => {
    const number = normalizeZA(whatsapp);
    const res = await fetch("/api/send-sms-otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ number }) });
    const data = await res.json();
    if (data.ok) { setSmsSent(true); if (data.devCode) setSmsCode(data.devCode); }
  };
  const verifySms = async () => {
    const number = normalizeZA(whatsapp);
    const res = await fetch("/api/verify-sms-otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ number, code: smsCode }) });
    const data = await res.json();
    if (data.ok) setSmsVerified(true);
  };

  const sendWa = async () => {
    const number = normalizeZA(whatsapp);
    const res = await fetch("/api/send-whatsapp-otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ number }) });
    const data = await res.json();
    if (data.ok) setWaSent(true);
  };
  const verifyWa = async () => {
    const number = normalizeZA(whatsapp);
    const res = await fetch("/api/verify-whatsapp-otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ number, code: waCode }) });
    const data = await res.json();
    if (data.ok) setWaVerified(true);
  };

  const sendEmail = async () => {
    const res = await fetch("/api/send-email-otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    const data = await res.json();
    if (data.ok) setEmailSent(true);
  };
  const verifyEmail = async () => {
    const res = await fetch("/api/verify-email-otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, code: emailCode }) });
    const data = await res.json();
    if (data.ok) setEmailVerified(true);
  };

  const canSubmit = () => {
    if (!terms) return false;
    if (!name || !email || !whatsapp || !province || !city || !institution || !licenseCode) return false;
    if (!smsVerified) return false;
    if (hasWhatsApp) return waVerified;
    return emailVerified;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit()) return;
    setSubmitting(true);
    try {
      const body = {
        name,
        email,
        whatsapp: normalizeZA(whatsapp),
        province,
        city,
        institution,
        licenseCode,
        hasWhatsApp,
        smsVerified,
        whatsappVerified: waVerified,
        emailVerified,
        studentCardImage,
        terms,
        referrer,
        socialProvider,
      } as any;
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data: SignupResponse = await res.json();
      setResult(data);
      setRemaining(data.remaining);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const copy = async (text: string) => {
    try { await navigator.clipboard.writeText(text); alert("Copied to clipboard"); } catch {}
  };

  const shareButtons = (link: string) => (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline" size="sm" onClick={() => copy(link)}><Copy className="size-4" /> Copy</Button>
      <a className={cn("inline-flex items-center rounded-md border px-3 py-2 text-sm hover:bg-accent")}
         href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`} target="_blank" rel="noreferrer">
        <Share2 className="mr-2 size-4" /> Facebook
      </a>
      <a className={cn("inline-flex items-center rounded-md border px-3 py-2 text-sm hover:bg-accent")}
         href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("I just joined DriveIQ! " + link)}`} target="_blank" rel="noreferrer">
        <Share2 className="mr-2 size-4" /> X/Twitter
      </a>
      <a className={cn("inline-flex items-center rounded-md border px-3 py-2 text-sm hover:bg-accent")}
         href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`} target="_blank" rel="noreferrer">
        <Share2 className="mr-2 size-4" /> LinkedIn
      </a>
      <a className={cn("inline-flex items-center rounded-md border px-3 py-2 text-sm hover:bg-accent")}
         href={`https://wa.me/?text=${encodeURIComponent("I just joined DriveIQ! " + link)}`} target="_blank" rel="noreferrer">
        <Share2 className="mr-2 size-4" /> WhatsApp
      </a>
      <a className={cn("inline-flex items-center rounded-md border px-3 py-2 text-sm hover:bg-accent")}
         href={`https://www.instagram.com/`} target="_blank" rel="noreferrer">
        <Share2 className="mr-2 size-4" /> Instagram
      </a>
      <a className={cn("inline-flex items-center rounded-md border px-3 py-2 text-sm hover:bg-accent")}
         href={`https://tiktok.com/upload?url=${encodeURIComponent(link)}`} target="_blank" rel="noreferrer">
        <Share2 className="mr-2 size-4" /> TikTok
      </a>
    </div>
  );

  if (result?.success) {
    const creditsPerReferral = 25;
    const randEquivalent = "R10.00";
    const minWithdrawal = "R700.00";
    return (
      <div className="rounded-xl border bg-card/60 p-6 shadow space-y-4">
        <div className="flex items-center gap-2 text-green-600 font-semibold"><Check className="size-5" /> You're on the list!</div>
        <p className="text-sm text-muted-foreground">Your unique referral link:</p>
        <div className="rounded-md border bg-background p-3 font-mono text-sm break-all">{result.referralLink}</div>
        <div className="text-sm text-muted-foreground">Share now (tag DriveIQ) to start earning credits.</div>
        {shareButtons(result.referralLink)}
        <div className="rounded-md border bg-background/60 p-3 text-xs text-muted-foreground">
          Earn {creditsPerReferral} credits ({randEquivalent}) per paid referral. Minimum withdrawal balance {minWithdrawal}. Redeemable as gift cards, airtime, data, or cash.
        </div>
        {typeof remaining === "number" && (
          <p className="text-xs text-muted-foreground">Remaining Early Bird slots: <span className="font-semibold text-foreground">{remaining}</span></p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-xl border bg-card/60 p-6 shadow space-y-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <button type="button" onClick={() => setSocialProvider("facebook")} className="flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent"><Globe className="size-4" /> Continue with Facebook</button>
        <button type="button" onClick={() => setSocialProvider("instagram")} className="flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent"><Globe className="size-4" /> Continue with Instagram</button>
        <button type="button" onClick={() => setSocialProvider("tiktok")} className="flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent"><Globe className="size-4" /> Continue with TikTok</button>
        <button type="button" onClick={() => setSocialProvider("x")} className="flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent"><Globe className="size-4" /> Continue with X/Twitter</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium">Name</label>
          <input className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 ring-ring" placeholder="Your full name" value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <div className="mt-1 flex gap-2">
            <input type="email" className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 ring-ring" placeholder="name@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
            {!hasWhatsApp && (
              emailVerified ? <span className="inline-flex items-center gap-1 text-green-600 text-xs"><Check className="size-4" />Verified</span> : (
                <>
                  {!emailSent ? <Button type="button" variant="outline" size="sm" onClick={sendEmail}><Mail className="mr-1 size-4"/>Send code</Button> : (
                    <div className="flex items-center gap-2">
                      <input className="w-28 rounded-md border bg-background px-2 py-2 text-xs" placeholder="Email code" value={emailCode} onChange={e=>setEmailCode(e.target.value)} />
                      <Button type="button" variant="outline" size="sm" onClick={verifyEmail}><ShieldCheck className="mr-1 size-4"/>Verify</Button>
                    </div>
                  )}
                </>
              )
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium">WhatsApp Number</label>
          <div className="mt-1 flex gap-2">
            <input onBlur={onBlurWhatsapp} className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 ring-ring" placeholder="e.g. +27 82 123 4567" value={whatsapp} onChange={e=>setWhatsapp(e.target.value)} />
            {hasWhatsApp ? (
              waVerified ? <span className="inline-flex items-center gap-1 text-green-600 text-xs"><Check className="size-4" />Verified</span> : (
                <>
                  {!waSent ? <Button type="button" variant="outline" size="sm" onClick={sendWa}><Phone className="mr-1 size-4"/>Send WA</Button> : (
                    <div className="flex items-center gap-2">
                      <input className="w-24 rounded-md border bg-background px-2 py-2 text-xs" placeholder="WA code" value={waCode} onChange={e=>setWaCode(e.target.value)} />
                      <Button type="button" variant="outline" size="sm" onClick={verifyWa}><ShieldCheck className="mr-1 size-4"/>Verify</Button>
                    </div>
                  )}
                </>
              )
            ) : (
              <span className="text-xs text-muted-foreground">No WhatsApp? Email verification required.</span>
            )}
          </div>
          <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
            <input id="haswa" type="checkbox" checked={hasWhatsApp} onChange={e=>setHasWhatsApp(e.target.checked)} className="size-4 accent-primary" />
            <label htmlFor="haswa">I have WhatsApp</label>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">SMS Verification (required)</label>
          <div className="mt-1 flex gap-2">
            {smsVerified ? <span className="inline-flex items-center gap-1 text-green-600 text-xs"><Check className="size-4" />Verified</span> : (
              <>
                {!smsSent ? <Button type="button" variant="outline" size="sm" onClick={sendSms}><Phone className="mr-1 size-4"/>Send SMS</Button> : (
                  <div className="flex items-center gap-2">
                    <input className="w-24 rounded-md border bg-background px-2 py-2 text-xs" placeholder="SMS code" value={smsCode} onChange={e=>setSmsCode(e.target.value)} />
                    <Button type="button" variant="outline" size="sm" onClick={verifySms}><ShieldCheck className="mr-1 size-4"/>Verify</Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="text-sm font-medium">Province</label>
          <select value={province} onChange={e=>setProvince(e.target.value)} className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm">
            <option value="">Select province</option>
            {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Town/City</label>
          <input className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm" value={city} onChange={e=>setCity(e.target.value)} placeholder="e.g. Pretoria" />
        </div>
        <div>
          <label className="text-sm font-medium">Driver's Licence Code</label>
          <select value={licenseCode} onChange={e=>setLicenseCode(e.target.value)} className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm">
            <option value="">Select code</option>
            <option value="Code 1">Code 1 (Motorcycle)</option>
            <option value="Code 2">Code 2 (Light Motor)</option>
            <option value="Code 3">Code 3 (Heavy Motor)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium">Learning Institution</label>
          <input className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm" value={institution} onChange={e=>setInstitution(e.target.value)} placeholder="e.g. Tshwane North TVET" />
        </div>
        <div>
          <label className="text-sm font-medium">Student Card (photo)</label>
          <div className="mt-1 flex items-center gap-3">
            <input type="file" accept="image/*" capture="environment" onChange={e=>onUpload(e.target.files?.[0] || null)} />
            {studentCardImage && <span className="text-xs text-green-600 inline-flex items-center gap-1"><UploadCloud className="size-4"/> Uploaded</span>}
          </div>
        </div>
      </div>

      <div className="flex items-start gap-2 text-sm">
        <input id="terms" type="checkbox" checked={terms} onChange={e=>setTerms(e.target.checked)} className="mt-1 size-4 accent-primary" />
        <label htmlFor="terms">I agree to the <a href="/terms" className="underline">Terms</a> and <a href="/privacy" className="underline">Privacy Policy</a>.</label>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button disabled={!canSubmit() || submitting} className="bg-primary text-primary-foreground hover:bg-primary/90">Join Early Bird — R99</Button>
        {typeof remaining === "number" && (
          <span className="text-xs text-muted-foreground">Remaining slots: <span className="font-semibold text-foreground">{remaining}</span></span>
        )}
      </div>
    </form>
  );
}
