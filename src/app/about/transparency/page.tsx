import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Transparency",
  description:
    "Nonprofit transparency for the Mens Philanthropy Foundation — EIN, leadership, governance, and policies.",
};

export default function Transparency() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pb-12 pt-16 md:pt-24">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          Transparency
        </p>
        <h1 className="mt-4 font-serif text-4xl tracking-tight md:text-5xl">
          How we operate
        </h1>
        <p className="mt-4 max-w-lg text-foreground-2">
          We believe nonprofits should be easy to understand. Here&rsquo;s
          who we are, how we&rsquo;re structured, and what guides our
          decisions.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="space-y-8">
          {/* Organization */}
          <div className="rounded-lg border border-card-border bg-card-bg p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Organization
            </p>
            <h2 className="mt-2 font-serif text-2xl">
              Mens Philanthropy Foundation
            </h2>
            <p className="mt-3 leading-relaxed text-foreground-2">
              The Mens Philanthropy Foundation is a 501(c)(3) tax-exempt
              nonprofit organization registered in the state of Florida.
              Dad&rsquo;s Kitchen is the public-facing program of the
              foundation, dedicated to strengthening fatherhood through
              cooking and conversation.
            </p>
            <div className="mt-6 rounded-md border border-rule bg-surface px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wider text-foreground-3">
                EIN (Tax ID)
              </p>
              <p className="mt-1 font-mono text-sm text-foreground">
                {/* TODO: Replace with actual EIN */}
                Pending &mdash; contact us for documentation
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="rounded-lg border border-card-border bg-card-bg p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Mission
            </p>
            <h2 className="mt-2 font-serif text-2xl">What we exist to do</h2>
            <p className="mt-3 leading-relaxed text-foreground-2">
              To strengthen the bond between fathers and their children by
              making mealtime a place for hands-on cooperation and meaningful
              conversation. We provide free recipes, conversation starters,
              age-appropriate kitchen tasks, and video content designed to help
              dads show up in the kitchen and at the table.
            </p>
          </div>

          {/* Leadership */}
          <div className="rounded-lg border border-card-border bg-card-bg p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Leadership
            </p>
            <h2 className="mt-2 font-serif text-2xl">Board &amp; leadership</h2>
            <div className="mt-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-warm/10 font-serif text-lg text-warm">
                  PW
                </div>
                <div>
                  <p className="font-semibold">Perry Wolfe</p>
                  <p className="text-sm text-foreground-2">Founder</p>
                </div>
              </div>
            </div>
          </div>

          {/* How funds are used */}
          <div className="rounded-lg border border-card-border bg-card-bg p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Finances
            </p>
            <h2 className="mt-2 font-serif text-2xl">How funds are used</h2>
            <p className="mt-3 leading-relaxed text-foreground-2">
              All contributions go directly toward the mission. Our primary
              expenses include:
            </p>
            <ul className="mt-4 space-y-3">
              {[
                "Video production — filming, editing, and publishing Dad's Kitchen episodes",
                "Website and technology — hosting, development, and maintaining dadskitchen.org",
                "Content development — recipes, conversation starters, and educational resources",
                "Community outreach — reaching dads through social media and partnerships",
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
              As a young nonprofit, we are building our financial reporting
              infrastructure. Annual reports will be published here as they
              become available.
            </p>
          </div>

          {/* Governance */}
          <div className="rounded-lg border border-card-border bg-card-bg p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Governance
            </p>
            <h2 className="mt-2 font-serif text-2xl">
              Policies &amp; governance
            </h2>
            <p className="mt-3 leading-relaxed text-foreground-2">
              We operate under the following policies and commitments:
            </p>
            <ul className="mt-4 space-y-3">
              {[
                {
                  title: "Child and family media policy",
                  desc: "All content featuring children requires parental consent, child assent, editing approval, and a standing right to withdrawal.",
                  href: "/process/guest-chef",
                },
                {
                  title: "Non-discrimination",
                  desc: "Dad's Kitchen is open to all fathers and father figures regardless of race, ethnicity, religion, sexual orientation, gender identity, marital status, or socioeconomic background.",
                },
                {
                  title: "Privacy",
                  desc: "We collect only the information necessary to operate our programs. Email addresses submitted through our site are used solely for the requested purpose and are never sold or shared with third parties.",
                },
                {
                  title: "Conflict of interest",
                  desc: "Board members and officers are required to disclose any financial or personal interests that could influence organizational decisions.",
                },
                {
                  title: "Compensation",
                  desc: "The foundation currently operates with an all-volunteer leadership team. No board member receives compensation.",
                },
              ].map((item) => (
                <li
                  key={item.title}
                  className="rounded-md border border-rule bg-surface p-4"
                >
                  <p className="font-semibold">
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="text-accent-dark hover:text-foreground"
                      >
                        {item.title} &rarr;
                      </Link>
                    ) : (
                      item.title
                    )}
                  </p>
                  <p className="mt-1 text-sm text-foreground-2">{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="rounded-lg border border-card-border bg-card-bg p-6 text-center md:p-8">
            <p className="text-foreground-2">
              Questions about our organization, finances, or policies?
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-block rounded bg-accent px-6 py-3 text-sm font-semibold text-btn-text transition-colors hover:bg-accent-dark"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
