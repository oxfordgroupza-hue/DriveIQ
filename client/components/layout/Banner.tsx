import { useEffect, useState } from "react";

interface UserRes { ok: boolean; user?: any }

export default function Banner() {
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    const email = localStorage.getItem("driveiq_email");
    if (!email) return;
    const load = async () => {
      try {
        const r = await fetch(`/api/user?email=${encodeURIComponent(email)}`);
        const j: UserRes = await r.json();
        if (!j.ok || !j.user) return;
        if (j.user.vision?.status === "blocked") {
          setMsg("Vision clearance required: spectacles pending. Access limited to theory only.");
        } else {
          setMsg(null);
        }
      } catch {}
    };
    load();
    const id = setInterval(load, 10000);
    return () => clearInterval(id);
  }, []);

  if (!msg) return null;
  return (
    <div className="fixed top-16 inset-x-0 z-40 bg-destructive text-destructive-foreground text-sm">
      <div className="container py-2">{msg}</div>
    </div>
  );
}
