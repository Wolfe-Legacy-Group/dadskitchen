import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Spread the Word",
  description:
    "Follow Dad's Kitchen on social media and help us reach more dads.",
};

export default function SpreadTheWord() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pb-12 pt-16 md:pt-24">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
            1
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Step 1
          </p>
        </div>
        <h1 className="mt-4 font-serif text-4xl tracking-tight md:text-5xl">
          Spread the word
        </h1>
        <p className="mt-4 max-w-lg text-foreground-2">
          The simplest way to help — and one of the most powerful.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="space-y-6 text-lg leading-relaxed text-foreground-2">
          <p>
            Dad&rsquo;s Kitchen grew to 20,000+ views on Instagram without a
            dollar of paid promotion. Every bit of that growth came from one
            dad sharing a video with another dad who needed to see it.
          </p>
          <p>
            That&rsquo;s still how this works. When you follow us, like a
            post, or share a video, you&rsquo;re putting it in front of
            someone who might not know this exists yet — a dad who&rsquo;s
            looking for a way to connect with his kids and hasn&rsquo;t
            found it.
          </p>
        </div>

        <div className="mt-10 rounded-lg border border-card-border bg-card-bg p-6 md:p-8">
          <h2 className="font-serif text-xl">How to help</h2>
          <ul className="mt-4 space-y-3">
            {[
              "Follow @dadskitchenorg on Instagram, TikTok, and Facebook",
              "Share a video with a dad you think would appreciate it",
              "Like and comment — it tells the algorithm to show it to more people",
              "Send a link to a friend, a group chat, or a community you're part of",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-foreground-2"
              >
                <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent/40" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="https://instagram.com/dadskitchenorg"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-accent px-6 py-3 text-sm font-semibold text-btn-text transition-colors hover:bg-accent-dark"
          >
            Follow on Instagram
          </a>
          <a
            href="https://tiktok.com/@dadskitchenorg"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-rule px-6 py-3 text-sm font-medium text-foreground-2 transition-colors hover:text-foreground"
          >
            TikTok
          </a>
          <a
            href="https://facebook.com/dadskitchenorg"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-rule px-6 py-3 text-sm font-medium text-foreground-2 transition-colors hover:text-foreground"
          >
            Facebook
          </a>
        </div>
      </section>

      <section className="border-t border-rule bg-surface">
        <div className="mx-auto max-w-3xl px-6 py-12 text-center">
          <p className="text-sm text-foreground-2">
            Ready for the next step?
          </p>
          <Link
            href="/process/participate"
            className="mt-2 inline-block text-sm font-medium text-accent-dark hover:text-foreground"
          >
            Step 2: Participate &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
