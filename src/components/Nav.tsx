"use client";

import Link from "next/link";
import { useState } from "react";
import { LogoMark } from "./Logo";

const links = [
  { href: "/about", label: "About" },
  { href: "/watch", label: "Watch" },
  { href: "/resources", label: "Resources" },
  { href: "/get-involved", label: "Get Involved" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-background/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <LogoMark className="h-8 w-8" />
          <span className="font-serif text-lg tracking-tight text-enamel">
            Dad&rsquo;s Kitchen
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-foreground-2 transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/get-involved#donate"
            className="rounded bg-accent px-4 py-2 text-sm font-semibold text-btn-text transition-colors hover:bg-accent-dark"
          >
            Donate
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span
            className={`block h-0.5 w-5 bg-foreground transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-foreground transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-rule px-6 pb-4 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm text-foreground-2 transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/get-involved#donate"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded bg-accent px-4 py-2.5 text-center text-sm font-semibold text-btn-text"
          >
            Donate
          </Link>
        </div>
      )}
    </header>
  );
}
