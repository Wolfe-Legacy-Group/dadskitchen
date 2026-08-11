import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3">
        <div>
          <p className="font-serif text-lg">Dad&rsquo;s Kitchen</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground-2">
            A program of the Mens Philanthropy Foundation, a 501(c)(3) nonprofit
            dedicated to strengthening fatherhood through cooking and
            conversation.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground-3">
            Pages
          </p>
          <nav className="mt-3 flex flex-col gap-2">
            <Link href="/about" className="text-sm text-foreground-2 hover:text-foreground">About</Link>
            <Link href="/watch" className="text-sm text-foreground-2 hover:text-foreground">Watch</Link>
            <Link href="/resources" className="text-sm text-foreground-2 hover:text-foreground">Resources</Link>
            <Link href="/get-involved" className="text-sm text-foreground-2 hover:text-foreground">Get Involved</Link>
            <Link href="/contact" className="text-sm text-foreground-2 hover:text-foreground">Contact</Link>
          </nav>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground-3">
            Follow
          </p>
          <nav className="mt-3 flex flex-col gap-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground-2 hover:text-foreground"
            >
              Instagram
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground-2 hover:text-foreground"
            >
              YouTube
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground-2 hover:text-foreground"
            >
              Facebook
            </a>
          </nav>
        </div>
      </div>

      <div className="border-t border-rule px-6 py-4">
        <p className="mx-auto max-w-6xl text-xs text-foreground-3">
          &copy; {new Date().getFullYear()} Mens Philanthropy Foundation. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
