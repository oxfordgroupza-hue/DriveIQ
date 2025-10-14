import { Link, useLocation } from "react-router-dom";
import { Home, ListChecks, Gift, BookOpen, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const goOrScroll = (hash: string) => {
    if (!isHome) {
      window.location.href = "/" + hash;
      return;
    }
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70 pb-[env(safe-area-inset-bottom)]">
      <ul className="grid grid-cols-5">
        <li>
          <Link
            to="/"
            className={cn(
              "flex flex-col items-center justify-center py-2 text-xs",
              location.pathname === "/" && "text-primary",
            )}
            aria-label="Home"
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <button
            onClick={() => goOrScroll("#features")}
            className="flex flex-col items-center justify-center py-2 text-xs w-full"
            aria-label="Features"
          >
            <ListChecks className="h-5 w-5" />
            <span>Features</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => goOrScroll("#offer")}
            className="flex flex-col items-center justify-center py-2 text-xs w-full"
            aria-label="Early Bird"
          >
            <Gift className="h-5 w-5" />
            <span>Offer</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => goOrScroll("#academy")}
            className="flex flex-col items-center justify-center py-2 text-xs w-full"
            aria-label="Academy"
          >
            <BookOpen className="h-5 w-5" />
            <span>Academy</span>
          </button>
        </li>
        <li>
          <Link
            to="/privacy"
            className={"flex flex-col items-center justify-center py-2 text-xs"}
            aria-label="Privacy"
          >
            <Shield className="h-5 w-5" />
            <span>Privacy</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
