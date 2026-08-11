"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/about", label: "About" },
  { href: "/watch", label: "Watch" },
  { href: "/resources", label: "Resources" },
  { href: "/get-involved", label: "Get Involved" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-nav-bg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-lg tracking-tight text-white">
          Dad&rsquo;s Kitchen
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-nav-link transition-colors hover:text-nav-link-hover"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/get-involved#donate"
            className="rounded bg-warm px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
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
            className={`block h-0.5 w-5 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-white transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/10 px-6 pb-4 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm text-nav-link transition-colors hover:text-nav-link-hover"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/get-involved#donate"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded bg-warm px-4 py-2.5 text-center text-sm font-semibold text-white"
          >
            Donate
          </Link>
        </div>
      )}
    </header>
  );
}
