import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, Copy, Share2 } from "lucide-react";

interface SlotsResponse { remaining: number }
interface SignupResponse { success: boolean; code: string; referralLink: string; remaining: number }

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [terms, setTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SignupResponse | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);

  const referrer = useMemo(() => new URLSearchParams(window.location.search).get("ref") || undefined, []);

  useEffect(() => {
    fetch("/api/slots").then(r => r.json()).then((d: SlotsResponse) => setRemaining(d.remaining)).catch(() => {});
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!terms || !name || !email || !whatsapp) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, whatsapp, terms, referrer }),
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
         href={`https://wa.me/?text=${encodeURIComponent("Join DriveIQ Early Bird with my referral: " + link)}`} target="_blank" rel="noreferrer">
        <Share2 className="mr-2 size-4" /> WhatsApp
      </a>
      <a className={cn("inline-flex items-center rounded-md border px-3 py-2 text-sm hover:bg-accent")}
         href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("DriveIQ Early Bird • R99 — " + link)}`} target="_blank" rel="noreferrer">
        <Share2 className="mr-2 size-4" /> X/Twitter
      </a>
      <a className={cn("inline-flex items-center rounded-md border px-3 py-2 text-sm hover:bg-accent")}
         href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`} target="_blank" rel="noreferrer">
        <Share2 className="mr-2 size-4" /> Facebook
      </a>
      <a className={cn("inline-flex items-center rounded-md border px-3 py-2 text-sm hover:bg-accent")}
         href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`} target="_blank" rel="noreferrer">
        <Share2 className="mr-2 size-4" /> LinkedIn
      </a>
    </div>
  );

  if (result?.success) {
    return (
      <div className="rounded-xl border bg-card/60 p-6 shadow">
        <div className="flex items-center gap-2 text-green-600 font-semibold"><Check className="size-5" /> You're on the list!</div>
        <p className="mt-2 text-sm text-muted-foreground">Your unique referral link:</p>
        <div className="mt-2 rounded-md border bg-background p-3 font-mono text-sm break-all">{result.referralLink}</div>
        <div className="mt-4">{shareButtons(result.referralLink)}</div>
        {typeof remaining === "number" && (
          <p className="mt-4 text-xs text-muted-foreground">Remaining Early Bird slots: <span className="font-semibold text-foreground">{remaining}</span></p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-xl border bg-card/60 p-6 shadow space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="text-sm font-medium">Name</label>
          <input className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 ring-ring" placeholder="Your full name" value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <input type="email" className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 ring-ring" placeholder="name@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <label className="text-sm font-medium">WhatsApp Number</label>
          <input className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 ring-ring" placeholder="e.g. +27 82 123 4567" value={whatsapp} onChange={e=>setWhatsapp(e.target.value)} />
        </div>
      </div>
      <div className="flex items-start gap-2 text-sm">
        <input id="terms" type="checkbox" checked={terms} onChange={e=>setTerms(e.target.checked)} className="mt-1 size-4 accent-primary" />
        <label htmlFor="terms">I agree to the <a href="/terms" className="underline">Terms</a> and <a href="/privacy" className="underline">Privacy Policy</a>.</label>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button disabled={!terms || submitting} className="bg-primary text-primary-foreground hover:bg-primary/90">Join Early Bird Waiting List — R99</Button>
        {typeof remaining === "number" && (
          <span className="text-xs text-muted-foreground">Remaining slots: <span className="font-semibold text-foreground">{remaining}</span></span>
        )}
      </div>
    </form>
  );
}
