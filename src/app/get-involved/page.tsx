import type { Metadata } from "next";
import Link from "next/link";
import { DonateForm } from "@/components/DonateForm";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Support Dad's Kitchen — follow, participate, share your experience, or become a guest chef.",
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
          Dad&rsquo;s Kitchen grows because dads share it with other dads.
          Start wherever you are — every level matters.
        </p>
      </section>

      {/* Ways to help */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="space-y-8">

          {/* Support */}
          <div
            id="donate"
            className="scroll-mt-24 rounded-lg border border-card-border bg-card-bg p-6 md:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-warm">
              Support
            </p>
            <h2 className="mt-2 font-serif text-2xl">Support the foundation</h2>
            <p className="mt-3 leading-relaxed text-foreground-2">
              The Mens Philanthropy Foundation is a 501(c)(3) nonprofit. Your
              tax-deductible support helps us produce more videos, build
              resources for dads, and reach families who need this.
            </p>
            <p className="mt-3 leading-relaxed text-foreground-2">
              Let us know you&rsquo;re interested and we&rsquo;ll send you
              our 501(c)(3) documentation along with details on how your
              contribution will be used.
            </p>
            <DonateForm />
          </div>

          {/* 1. Spread the word */}
          <div className="rounded-lg border border-card-border bg-card-bg p-6 md:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                1
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                Spread the word
              </p>
            </div>
            <h2 className="mt-3 font-serif text-2xl">Follow and share</h2>
            <p className="mt-3 leading-relaxed text-foreground-2">
              The simplest way to help. Follow us, share our videos with a
              dad who might need them, and help us reach the right people.
              Word of mouth built this community — it&rsquo;s how we keep
              growing.
            </p>
            <Link
              href="/process/spread-the-word"
              className="mt-4 inline-block text-sm font-medium text-accent-dark hover:text-foreground"
            >
              Learn more &rarr;
            </Link>
          </div>

          {/* 2. Participate */}
          <div className="rounded-lg border border-card-border bg-card-bg p-6 md:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                2
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                Participate
              </p>
            </div>
            <h2 className="mt-3 font-serif text-2xl">Try it yourself</h2>
            <p className="mt-3 leading-relaxed text-foreground-2">
              Take what you see here and give it a shot. Pick a recipe, cook
              it with your kids, ask the questions. Make any changes that
              work better for your family — there&rsquo;s no wrong way to do
              this. If you want, send us an email and tell us what was good,
              what wasn&rsquo;t, and what you&rsquo;d change next time.
            </p>
            <Link
              href="/process/participate"
              className="mt-4 inline-block text-sm font-medium text-accent-dark hover:text-foreground"
            >
              Learn more &rarr;
            </Link>
          </div>

          {/* 3. Be an example */}
          <div className="rounded-lg border border-card-border bg-card-bg p-6 md:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                3
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                Be an example
              </p>
            </div>
            <h2 className="mt-3 font-serif text-2xl">Post it and tag us</h2>
            <p className="mt-3 leading-relaxed text-foreground-2">
              Make it a post. Take three or four pictures — cooking together
              before the meal, talking at the table during dinner, cleaning
              up after, and optionally one all together. Tell your audience
              what was good, what wasn&rsquo;t, and what you&rsquo;re
              changing for next time. Tag @dadskitchenorg and we&rsquo;ll
              repost it on our story or add it to our post library.
            </p>
            <Link
              href="/process/be-an-example"
              className="mt-4 inline-block text-sm font-medium text-accent-dark hover:text-foreground"
            >
              Learn more &rarr;
            </Link>
          </div>

          {/* 4. Be a guest chef */}
          <div className="rounded-lg border border-card-border bg-card-bg p-6 md:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-warm/10 text-xs font-bold text-warm">
                4
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-warm">
                Be a guest chef
              </p>
            </div>
            <h2 className="mt-3 font-serif text-2xl">Film an episode</h2>
            <p className="mt-3 leading-relaxed text-foreground-2">
              Ready to go all in? Film a full Dad&rsquo;s Kitchen episode
              with your kids. We&rsquo;ll give you a template to follow —
              pick a recipe, cook it together, and use our conversation
              starters at the table. Then send us the video along with the
              list of questions you used, the age-appropriate tasks your
              kids handled, and a short reflection on how the dinner went.
            </p>
            <p className="mt-3 leading-relaxed text-foreground-2">
              We&rsquo;ll feature the full video on our site and YouTube,
              plus cut a shorter version for our reels library. This is a
              community of dads, not a one-man show.
            </p>
            <Link
              href="/process/guest-chef"
              className="mt-4 inline-block text-sm font-medium text-accent-dark hover:text-foreground"
            >
              Learn more &rarr;
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
