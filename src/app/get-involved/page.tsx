import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Support Dad's Kitchen — donate, volunteer, share your story, or host a dinner.",
};

export default function GetInvolved() {
  return (
    <>
      {/* Header */}
      <section className="mx-auto max-w-3xl px-6 pb-12 pt-16 md:pt-24">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          Get Involved
        </p>
        <h1 className="mt-4 font-serif text-4xl tracking-tight md:text-5xl">
          Be part of this
        </h1>
        <p className="mt-4 max-w-lg text-foreground-2">
          Dad&rsquo;s Kitchen grows because dads share it with other dads. Here
          are the ways you can help.
        </p>
      </section>

      {/* Ways to help */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="space-y-8">
          <div
            id="donate"
            className="scroll-mt-24 rounded-lg border border-card-border bg-card-bg p-6 md:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-warm">
              Support
            </p>
            <h2 className="mt-2 font-serif text-2xl">Donate</h2>
            <p className="mt-3 leading-relaxed text-foreground-2">
              The Mens Philanthropy Foundation is a 501(c)(3) nonprofit. Your
              tax-deductible donation helps us produce more videos, build
              resources for dads, and reach families who need this.
            </p>
            <p className="mt-4 text-sm text-foreground-3">
              Donation infrastructure coming soon. In the meantime, reach out
              directly to discuss how you can support the foundation.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-block rounded bg-warm px-6 py-3 text-sm font-semibold text-btn-text transition-opacity hover:opacity-90"
            >
              Contact us to donate
            </Link>
          </div>

          <div className="rounded-lg border border-card-border bg-card-bg p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Participate
            </p>
            <h2 className="mt-2 font-serif text-2xl">Share your story</h2>
            <p className="mt-3 leading-relaxed text-foreground-2">
              Every dad has a kitchen story. Maybe it&rsquo;s the first time
              your kid made you breakfast, or the conversation that happened
              over burned grilled cheese. We want to hear it — and with your
              permission, share it.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-block text-sm font-medium text-accent-dark hover:text-foreground"
            >
              Tell us your story &rarr;
            </Link>
          </div>

          <div className="rounded-lg border border-card-border bg-card-bg p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Spread the word
            </p>
            <h2 className="mt-2 font-serif text-2xl">Follow and share</h2>
            <p className="mt-3 leading-relaxed text-foreground-2">
              The simplest way to help is to follow us on social media and share
              our videos with a dad who might need them. Word of mouth built
              this community — it&rsquo;s how we keep growing.
            </p>
            <div className="mt-4 flex gap-4">
              <a
                href="https://instagram.com/dadskitchenorg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-accent-dark hover:text-foreground"
              >
                Instagram &rarr;
              </a>
              <a
                href="https://tiktok.com/@dadskitchenorg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-accent-dark hover:text-foreground"
              >
                TikTok &rarr;
              </a>
              <a
                href="https://facebook.com/dadskitchenorg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-accent-dark hover:text-foreground"
              >
                Facebook &rarr;
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-card-border bg-card-bg p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Host
            </p>
            <h2 className="mt-2 font-serif text-2xl">Host a dinner</h2>
            <p className="mt-3 leading-relaxed text-foreground-2">
              Cook a meal with your kids and make it count. You don&rsquo;t
              have to film anything — just do the thing. If you want to
              share the experience, snap three photos: cooking together,
              talking at the table, and cleaning up. Tag us and
              we&rsquo;ll repost it.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-block text-sm font-medium text-accent-dark hover:text-foreground"
            >
              Learn more &rarr;
            </Link>
          </div>

          <div className="rounded-lg border border-card-border bg-card-bg p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-warm">
              Create
            </p>
            <h2 className="mt-2 font-serif text-2xl">Be a guest instructor</h2>
            <p className="mt-3 leading-relaxed text-foreground-2">
              Ready to go all in? Film a Dad&rsquo;s Kitchen episode with
              your kids — pick a recipe, cook it together, ask the
              questions, and reflect on how it went. We&rsquo;ll feature
              your video on the site and across our social channels. This
              is a community of dads, not a one-man show.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-block text-sm font-medium text-accent-dark hover:text-foreground"
            >
              Submit a video &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
