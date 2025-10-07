import { useEffect, useMemo, useState } from "react";

function getRemaining(target: Date) {
  const now = new Date().getTime();
  const diff = Math.max(0, target.getTime() - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, diff };
}

export default function Countdown({ targetDate }: { targetDate: string | Date }) {
  const target = useMemo(() => new Date(targetDate), [targetDate]);
  const [t, setT] = useState(() => getRemaining(target));

  useEffect(() => {
    const id = setInterval(() => setT(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="grid grid-flow-col gap-2 text-center auto-cols-fr">
      {[
        { label: "Days", value: t.days },
        { label: "Hours", value: t.hours },
        { label: "Minutes", value: t.minutes },
        { label: "Seconds", value: t.seconds },
      ].map((item) => (
        <div key={item.label} className="rounded-md bg-secondary px-3 py-2">
          <div className="text-2xl font-bold tabular-nums leading-none">{String(item.value).padStart(2, "0")}</div>
          <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
