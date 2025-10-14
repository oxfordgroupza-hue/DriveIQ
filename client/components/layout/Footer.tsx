import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="container py-10 grid gap-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-gradient-to-br from-primary to-accent" />
            <span className="text-lg font-extrabold tracking-tight">
              DriveIQ
            </span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            A comprehensive learner driver ecosystem: K53 theory, AI vision,
            driving simulation, and life skills readiness.
          </p>
        </div>
        <div className="text-sm">
          <div className="font-semibold text-foreground">Legal</div>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li>
              <Link to="/privacy" className="hover:text-primary">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-primary">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
        <div className="text-sm">
          <div className="font-semibold text-foreground">Connect</div>
          <div className="mt-3 flex items-center gap-3 text-muted-foreground">
            <a href="#" aria-label="Twitter" className="hover:text-primary">
              <Twitter size={20} />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-primary">
              <Linkedin size={20} />
            </a>
            <a href="#" aria-label="GitHub" className="hover:text-primary">
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container py-6 text-xs text-muted-foreground flex items-center justify-center text-center">
          <span>
            © 2025 DriveIQ Academy. Powered by Oxford Business Group (PTY) LTD.
            All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
