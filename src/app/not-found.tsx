import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
        404
      </p>
      <h1 className="mt-4 font-serif text-4xl tracking-tight md:text-5xl">
        Wrong burner
      </h1>
      <p className="mt-4 max-w-md text-foreground-2">
        We couldn&rsquo;t find that page. It may have been moved, or it
        might not exist yet.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded bg-warm px-6 py-3 text-sm font-semibold text-btn-text transition-opacity hover:opacity-90"
        >
          Back to the kitchen
        </Link>
        <Link
          href="/recipes"
          className="rounded border border-rule px-6 py-3 text-sm font-medium text-foreground-2 transition-colors hover:text-foreground"
        >
          Browse recipes
        </Link>
      </div>
    </section>
  );
}
