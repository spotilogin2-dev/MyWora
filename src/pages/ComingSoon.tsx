import { useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";

interface ComingSoonProps {
  title: string;
  description?: string;
}

/**
 * Minimal, finished destination for routes that are prepared but not yet
 * implemented (e.g. /login, /signup during Phase 1). Intentionally tiny —
 * it is NOT a placeholder page for a future phase's features.
 */
export default function ComingSoon({ title, description }: ComingSoonProps) {
  useEffect(() => {
    document.title = `MyWora — ${title}`;
    return () => {
      document.title = "MyWora — Run Your Workshop Smarter";
    };
  }, [title]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-mist px-6 py-16 text-center">
      <Logo />
      <div className="card mt-10 w-full max-w-md p-10">
        <p className="eyebrow">{title}</p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight text-navy">Coming Soon</h1>
        <p className="mt-4 text-sm leading-relaxed text-navy/55">
          {description ??
            "This part of MyWora is under active development and will open soon. Meanwhile, explore what MyWora will do on the landing page."}
        </p>
        <Link
          to="/"
          className="btn btn-primary focus-ring mt-8 inline-flex h-11 items-center justify-center px-6 text-sm"
        >
          Back to Home
        </Link>
      </div>
      <p className="mt-8 text-xs text-navy/40">© 2026 MyWora. All rights reserved.</p>
    </div>
  );
}
