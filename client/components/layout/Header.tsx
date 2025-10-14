import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import InstallPrompt from "../InstallPrompt";

export default function Header() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const scrollTo = (id: string) => {
    if (location.pathname !== "/") {
      window.location.href = `/${id}`;
      return;
    }
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border/60">
      <div className="container flex h-16 items-center justify-between">
        <a
          href="https://91f068cada464e0b8f54f2c1425a584c-6e8beae71b7041ccb6b408d02.fly.dev/"
          className="flex items-center gap-2"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Fd0bbd55af2ca41b992bc39029063eb3e%2F3f92f747c3b643a189426ffe1ee884c4?format=webp&width=200"
            alt="DriveIQ logo"
            className="h-8 w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 object-contain"
            loading="eager"
            decoding="async"
          />
          <span className="text-lg font-extrabold tracking-tight">DriveIQ</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <button
            onClick={() => scrollTo("#features")}
            className={cn("hover:text-primary transition-colors")}
          >
            Features
          </button>
          <button
            onClick={() => scrollTo("#offer")}
            className={cn("hover:text-primary transition-colors")}
          >
            Early Bird
          </button>
          <button
            onClick={() => scrollTo("#academy")}
            className={cn("hover:text-primary transition-colors")}
          >
            Academy
          </button>
          <Link to="/privacy" className="hover:text-primary transition-colors">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-primary transition-colors">
            Terms
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          {isHome ? (
            <Button
              onClick={() => scrollTo("#signup")}
              className="hidden sm:inline-flex bg-primary text-primary-foreground shadow hover:bg-primary/90"
            >
              Join Waiting List
            </Button>
          ) : (
            <Link to="/" className="text-sm hover:text-primary">
              Home
            </Link>
          )}
          <span className="md:hidden"><InstallPrompt /></span>
        </div>
      </div>
    </header>
  );
}
