import { Link, useLocation } from "react-router-dom";

export default function Placeholder() {
  const { pathname } = useLocation();
  const title = pathname.replace("/", "").replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()) || "Page";
  return (
    <div className="container py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mt-3 text-muted-foreground">This page is a placeholder. If you want me to generate full legal content, let me know.</p>
        <div className="mt-6 rounded-xl border bg-card/60 p-6 shadow">
          <p className="text-sm text-muted-foreground">In the meantime, continue exploring the <Link to="/" className="underline">DriveIQ</Link> landing page.</p>
        </div>
      </div>
    </div>
  );
}
