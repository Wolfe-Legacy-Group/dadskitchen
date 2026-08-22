import Link from "next/link";
import { LogoMark } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-nav-bg text-white overflow-x-hidden">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <LogoMark className="h-7 w-7" />
            <p className="font-serif text-lg">Dad&rsquo;s Kitchen</p>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-white/60">
            A program of the Mens Philanthropy Foundation, a 501(c)(3) nonprofit
            dedicated to strengthening fatherhood through cooking and
            conversation.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
            Pages
          </p>
          <nav className="mt-3 flex flex-col gap-2">
            <Link href="/about" className="text-sm text-white/60 hover:text-nav-link-hover">About</Link>
            <Link href="/recipes" className="text-sm text-white/60 hover:text-nav-link-hover">Recipes</Link>
            <Link href="/watch" className="text-sm text-white/60 hover:text-nav-link-hover">Watch</Link>
            <Link href="/resources" className="text-sm text-white/60 hover:text-nav-link-hover">Resources</Link>
            <Link href="/blog" className="text-sm text-white/60 hover:text-nav-link-hover">Blog</Link>
            <Link href="/get-involved" className="text-sm text-white/60 hover:text-nav-link-hover">Get Involved</Link>
            <Link href="/contact" className="text-sm text-white/60 hover:text-nav-link-hover">Contact</Link>
            <Link href="/about/transparency" className="text-sm text-white/60 hover:text-nav-link-hover">Transparency</Link>
          </nav>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
            Follow
          </p>
          <nav className="mt-3 flex flex-col gap-2">
            <a
              href="https://instagram.com/dadskitchenorg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/60 hover:text-nav-link-hover"
            >
              Instagram
            </a>
            <a
              href="https://tiktok.com/@dadskitchenorg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/60 hover:text-nav-link-hover"
            >
              TikTok
            </a>
            <a
              href="https://facebook.com/dadskitchenorg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/60 hover:text-nav-link-hover"
            >
              Facebook
            </a>
          </nav>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-4">
        <p className="mx-auto max-w-6xl text-xs text-white/40">
          &copy; {new Date().getFullYear()} Mens Philanthropy Foundation. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
