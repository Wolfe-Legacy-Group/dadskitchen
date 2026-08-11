import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Participate",
  description:
    "Try cooking with your kids using Dad's Kitchen ideas. Adapt them. Tell us how it went.",
};

export default function Participate() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pb-12 pt-16 md:pt-24">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
            2
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Step 2
          </p>
        </div>
        <h1 className="mt-4 font-serif text-4xl tracking-tight md:text-5xl">
          Try it yourself
        </h1>
        <p className="mt-4 max-w-lg text-foreground-2">
          Take what you see here and make it your own.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="space-y-6 text-lg leading-relaxed text-foreground-2">
          <p>
            Pick a recipe — anything you and your kids can make together.
            It doesn&rsquo;t have to be from our videos. Use our
            conversation starters or come up with your own. The point
            isn&rsquo;t to follow a script — it&rsquo;s to spend time
            together in the kitchen and at the table.
          </p>
          <p>
            Make any changes that work better for your family. Maybe your
            kid is too young for one of the tasks we suggest, or maybe
            they&rsquo;re ready for more. Maybe the questions we recommend
            don&rsquo;t land with your kids the way they landed with ours.
            That&rsquo;s fine. Adapt it.
          </p>
          <p>
            If you want, send us an email afterward. Tell us what was good,
            what wasn&rsquo;t, and what you&rsquo;d change next time. Your
            feedback makes this better for every dad who comes after you.
          </p>
        </div>

        <div className="mt-10 rounded-lg border border-card-border bg-card-bg p-6 md:p-8">
          <h2 className="font-serif text-xl">Getting started</h2>
          <ul className="mt-4 space-y-3">
            {[
              "Pick a meal your kids already like — save the adventurous stuff for later",
              "Check our Resources page for age-appropriate kitchen tasks",
              "Choose 2–3 conversation starters before you sit down",
              "Let them make mistakes — spilled flour is a lesson, not a disaster",
              "Stay quiet when they're talking — the goal is to listen",
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
          <Link
            href="/resources"
            className="rounded bg-accent px-6 py-3 text-sm font-semibold text-btn-text transition-colors hover:bg-accent-dark"
          >
            Browse resources
          </Link>
          <Link
            href="/contact"
            className="rounded border border-rule px-6 py-3 text-sm font-medium text-foreground-2 transition-colors hover:text-foreground"
          >
            Tell us how it went
          </Link>
        </div>
      </section>

      <section className="border-t border-rule bg-surface">
        <div className="mx-auto max-w-3xl px-6 py-12 text-center">
          <p className="text-sm text-foreground-2">
            Ready to share your experience?
          </p>
          <Link
            href="/process/be-an-example"
            className="mt-2 inline-block text-sm font-medium text-accent-dark hover:text-foreground"
          >
            Step 3: Be an Example &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
