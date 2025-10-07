import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export default function VisionTest() {
  const params = new URLSearchParams(location.search);
  const token = params.get("token") || "";
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [running, setRunning] = useState(false);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (!token) return;
    fetch(`/api/vision-token/${token}`).then(r=>r.json()).then(j=>{ if(!j.ok){ setStatus("Invalid or expired link"); } else { setStatus("Ready"); } });
  }, [token]);

  const startCam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream as any;
        await videoRef.current.play();
        setReady(true);
      }
    } catch (e) {
      setStatus("Camera access denied");
    }
  };

  const analyze = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    setRunning(true);
    const samples = 20;
    let total = 0;
    for (let i=0;i<samples;i++){
      const v = videoRef.current;
      const c = canvasRef.current;
      c.width = v.videoWidth || 320; c.height = v.videoHeight || 240;
      const ctx = c.getContext("2d");
      if (!ctx) continue;
      ctx.drawImage(v, 0, 0, c.width, c.height);
      const data = ctx.getImageData(0,0,c.width,c.height).data;
      let sum = 0;
      for (let p=0; p<data.length; p+=4){ sum += (data[p]+data[p+1]+data[p+2])/3; }
      const avg = sum / (data.length/4);
      total += avg;
      await new Promise(r=>setTimeout(r,100));
    }
    const brightness = total / samples; // 0..255
    const concern = brightness < 60 || brightness > 220; // naive heuristic
    const res = await fetch("/api/vision-submit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, concern }) });
    const j = await res.json();
    setRunning(false);
    if (j.ok) setStatus(j.status === "blocked" ? "Concern detected — prescription generated" : "All clear — proceed");
    else setStatus("Submission failed");
  };

  return (
    <div className="container py-10 space-y-4">
      <h1 className="text-2xl font-bold">DriveIQ Vision Test</h1>
      <p className="text-sm text-muted-foreground">Use your front camera. Ensure good lighting and remove spectacles if applicable.</p>
      <div className="rounded-xl border p-4 grid gap-4">
        <video ref={videoRef} className="w-full rounded-md bg-black" playsInline muted />
        <canvas ref={canvasRef} className="hidden" />
        <div className="flex gap-3">
          <Button type="button" onClick={startCam} disabled={ready}>Enable Camera</Button>
          <Button type="button" onClick={analyze} disabled={!ready || running}>{running ? "Analyzing..." : "Run AI Vision"}</Button>
        </div>
        {status && <div className="text-sm">{status}</div>}
      </div>
      <div className="text-xs text-muted-foreground">This is an AI screening. A qualified optometrist must verify any prescription.</div>
    </div>
  );
}
