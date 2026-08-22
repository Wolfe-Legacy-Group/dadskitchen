import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Dad's Kitchen — how one single dad turned mealtime into the most meaningful time of the day.",
};

export default function About() {
  return (
    <>
      {/* Header */}
      <section className="mx-auto max-w-3xl px-6 pb-12 pt-16 md:pt-24">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          About
        </p>
        <h1 className="mt-4 font-serif text-4xl tracking-tight md:text-5xl">
          The story behind Dad&rsquo;s Kitchen
        </h1>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="space-y-6 text-lg leading-relaxed text-foreground-2">
          <p>
            As a single dad, I realized that a surprising amount of my time
            with my kids happened around meals. So I learned to make the kitchen
            count.
          </p>
          <p>
            I involved them in whatever I was doing. When they were little, that
            might mean stirring something or carrying napkins to the table. As
            they got older, they could measure, chop, season, and eventually
            take responsibility for parts of the meal themselves. There was
            always something age-appropriate they could own.
          </p>
          <p>
            Then we would sit down to eat, and I&rsquo;d ask questions that
            couldn&rsquo;t be answered with &ldquo;yes,&rdquo;
            &ldquo;no,&rdquo; or &ldquo;fine.&rdquo; Mostly, I tried to stay
            quiet and let them talk their little hearts out.
          </p>
          <p>
            Those meals became some of our best time together — not because the
            food was always great, but because the kitchen gave us something to
            do side by side, and the table gave us space to talk.
          </p>
        </div>
      </section>

      {/* Foundation */}
      <section className="border-t border-rule">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="font-serif text-2xl md:text-3xl">The Foundation</h2>
          <div className="mt-6 space-y-4 text-foreground-2 leading-relaxed">
            <p>
              That experience eventually led to the creation of the Mens
              Philanthropy Foundation, a 501(c)(3) nonprofit dedicated to
              strengthening fatherhood through cooking and conversation.
            </p>
            <p>
              Our cooking videos have received more than 20,000 views on
              Instagram over the past two years — organic growth from dads who
              saw something real and wanted to share it.
            </p>
            <p>
              Dad&rsquo;s Kitchen is the public face of that mission: a place
              where dads can find ideas for cooking with their kids, discover
              conversation starters that go deeper than &ldquo;how was
              school,&rdquo; and see other dads doing the same thing.
            </p>
            <p>
              <Link
                href="/about/transparency"
                className="text-sm font-medium text-accent-dark hover:text-foreground"
              >
                Read about our governance, policies, and how we use funds
                &rarr;
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* What we believe */}
      <section className="border-t border-rule bg-surface">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="font-serif text-2xl md:text-3xl">What we believe</h2>
          <ul className="mt-8 space-y-6">
            {[
              {
                heading: "The kitchen is the room that matters most",
                body: "It's where you work together, make mistakes, and sit down to share what you made. No screens, no schedule — just presence.",
              },
              {
                heading: "Every dad can cook well enough",
                body: "This isn't about culinary skill. It's about showing up, involving your kids, and making a meal together. The food doesn't have to be perfect.",
              },
              {
                heading: "Conversation doesn't happen by accident",
                body: "You have to create the conditions for it — a shared activity, a table, and questions that invite real answers.",
              },
              {
                heading: "Kids remember the ordinary moments",
                body: "Not the big trips or expensive gifts. They remember Tuesday night tacos and the time Dad let them crack the eggs.",
              },
            ].map((item) => (
              <li key={item.heading}>
                <p className="font-semibold">{item.heading}</p>
                <p className="mt-1 text-foreground-2">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-rule">
        <div className="mx-auto max-w-3xl px-6 py-12 text-center md:py-16">
          <h2 className="font-serif text-2xl">Join us in the kitchen</h2>
          <p className="mx-auto mt-4 max-w-md text-foreground-2">
            Whether you want to support what we&rsquo;re building, share your
            own story, or just find some ideas for dinner tonight.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/watch"
              className="rounded bg-accent px-6 py-3 text-sm font-semibold text-btn-text transition-colors hover:bg-accent-dark"
            >
              Watch our videos
            </Link>
            <Link
              href="/get-involved"
              className="rounded border border-rule px-6 py-3 text-sm font-medium text-foreground-2 transition-colors hover:text-foreground"
            >
              Get involved
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
