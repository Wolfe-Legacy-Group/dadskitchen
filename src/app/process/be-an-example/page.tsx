import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Be an Example",
  description:
    "Post your Dad's Kitchen experience on social media, tag us, and inspire other dads.",
};

export default function BeAnExample() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pb-12 pt-16 md:pt-24">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
            3
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Step 3
          </p>
        </div>
        <h1 className="mt-4 font-serif text-4xl tracking-tight md:text-5xl">
          Be an example
        </h1>
        <p className="mt-4 max-w-lg text-foreground-2">
          Show other dads what this looks like in real life.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="space-y-6 text-lg leading-relaxed text-foreground-2">
          <p>
            You&rsquo;ve tried it. You know it works. Now make it a post
            and let other dads see what a real kitchen dinner looks like —
            not a perfect one, just an honest one. Tag @dadskitchenorg and
            we&rsquo;ll repost it on our story or add it to our post
            library.
          </p>
          <p>
            The most valuable thing you can share isn&rsquo;t the recipe.
            It&rsquo;s what actually happened — what went well, what
            didn&rsquo;t, and what you&rsquo;re changing for next time.
            That&rsquo;s what makes another dad think &ldquo;I could do
            that.&rdquo;
          </p>
        </div>

        <div className="mt-10 rounded-lg border border-card-border bg-card-bg p-6 md:p-8">
          <h2 className="font-serif text-xl">What to capture</h2>
          <p className="mt-3 text-foreground-2">
            Take 3–4 photos that tell the story of the meal:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              {
                label: "Before the meal",
                desc: "Cooking together — hands in the bowl, measuring, chopping. The messy, real part.",
              },
              {
                label: "During the meal",
                desc: "Sitting at the table, talking. This is where the conversation happens.",
              },
              {
                label: "After the meal",
                desc: "Cleaning up together. The work isn't done when the food is gone.",
              },
              {
                label: "All together (optional)",
                desc: "One picture of everyone. Doesn't have to be posed — candid is better.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-md border border-card-border bg-surface p-4"
              >
                <p className="text-sm font-semibold">{item.label}</p>
                <p className="mt-1 text-sm text-foreground-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-card-border bg-card-bg p-6 md:p-8">
          <h2 className="font-serif text-xl">What to write</h2>
          <p className="mt-3 text-foreground-2">
            In your caption, tell your audience three things:
          </p>
          <ul className="mt-4 space-y-3">
            {[
              "What went well — the moment that made it worth it",
              "What didn't — the mess, the burned food, the kid who didn't want to help",
              "What you're changing next time — because there will be a next time",
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
          <p className="mt-4 text-sm text-foreground-3">
            Tag @dadskitchenorg so we can find it and share it.
          </p>
        </div>

        <div className="mt-8">
          <a
            href="https://instagram.com/dadskitchenorg"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-accent px-6 py-3 text-sm font-semibold text-btn-text transition-colors hover:bg-accent-dark"
          >
            Follow @dadskitchenorg
          </a>
        </div>
      </section>

      <section className="border-t border-rule bg-surface">
        <div className="mx-auto max-w-3xl px-6 py-12 text-center">
          <p className="text-sm text-foreground-2">
            Ready to go all in?
          </p>
          <Link
            href="/process/guest-chef"
            className="mt-2 inline-block text-sm font-medium text-accent-dark hover:text-foreground"
          >
            Step 4: Guest Chef &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
