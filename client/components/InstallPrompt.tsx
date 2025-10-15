import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import React from "react";
import { useNavigate } from "react-router-dom";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

function fireConfetti(durationMs = 1200) {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.inset = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9999";
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  let start: number | null = null;
  const pieces = Array.from({ length: 150 }).map(() => ({
    x: Math.random() * window.innerWidth,
    y: -20 - Math.random() * window.innerHeight,
    r: Math.random() * 6 + 2,
    c: `hsl(${Math.random() * 360}, 80%, 60%)`,
    s: Math.random() * 2 + 1,
  }));
  function draw(ts: number) {
    if (!ctx) return;
    if (!start) start = ts;
    const d = ts - start;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      p.y += p.s * 4;
      p.x += Math.sin((p.y + d) / 40) * 1.5;
      ctx.beginPath();
      ctx.fillStyle = p.c;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    if (d < durationMs) requestAnimationFrame(draw);
    else document.body.removeChild(canvas);
  }
  requestAnimationFrame(draw);
}

export default function InstallPrompt({
  onAccepted,
}: { onAccepted?: () => void } = {}) {
  const [deferred, setDeferred] =
    React.useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = React.useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  React.useEffect(() => {
    const onBip = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => setInstalled(true);
    window.addEventListener("beforeinstallprompt", onBip as any);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBip as any);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const onClick = async () => {
    try {
      await deferred?.prompt();
      const choice = await deferred?.userChoice;
      if (choice?.outcome === "accepted") {
        fireConfetti();
        try {
          const root: any = document.documentElement as any;
          if (document.fullscreenEnabled && root.requestFullscreen) {
            await root.requestFullscreen();
          }
        } catch {}
        onAccepted?.();
        setTimeout(() => navigate("/vision-test"), 1100);
      }
    } catch {}
  };

  if (!isMobile || installed || !deferred) return null;

  return (
    <Button
      onClick={onClick}
      size="sm"
      className="bg-primary text-primary-foreground shadow hover:bg-primary/90"
    >
      Download Mobile App
    </Button>
  );
}
