import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guest Chef",
  description:
    "Film a full Dad's Kitchen episode with your kids and become part of our video library.",
};

export default function GuestChef() {
  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pb-12 pt-16 md:pt-24">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-warm/10 text-sm font-bold text-warm">
            4
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-warm">
            Step 4
          </p>
        </div>
        <h1 className="mt-4 font-serif text-4xl tracking-tight md:text-5xl">
          Be a guest chef
        </h1>
        <p className="mt-4 max-w-lg text-foreground-2">
          Film a full episode and become part of the Dad&rsquo;s Kitchen
          library.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="space-y-6 text-lg leading-relaxed text-foreground-2">
          <p>
            This is the full experience. You&rsquo;re going to plan a meal,
            cook it with your kids, have a real conversation at the table,
            and film the whole thing. We&rsquo;ll give you a template so
            you know what to capture — you just bring the food and the
            family.
          </p>
          <p>
            Your video will live on our site and YouTube as a full episode.
            We&rsquo;ll also cut a shorter version for our reels library on
            Instagram and TikTok. This is a community of dads, not a
            one-man show — and your kitchen belongs here.
          </p>
        </div>

        <div className="mt-10 rounded-lg border border-card-border bg-card-bg p-6 md:p-8">
          <h2 className="font-serif text-xl">Episode template</h2>
          <p className="mt-3 text-foreground-2">
            Follow this structure and we&rsquo;ll handle the rest:
          </p>
          <div className="mt-6 space-y-4">
            {[
              {
                step: "1",
                title: "Choose your recipe",
                desc: "Pick something you and your kids can make together. It doesn't have to be complicated — the best episodes are simple meals made with real effort.",
              },
              {
                step: "2",
                title: "Film the cook",
                desc: "Set up a phone or camera in the kitchen. Get the prep, the mess, the teamwork. Show the age-appropriate tasks your kids are handling.",
              },
              {
                step: "3",
                title: "Film the conversation",
                desc: "Use our conversation starters or bring your own. The table is where the real content happens — let the kids talk.",
              },
              {
                step: "4",
                title: "Film the cleanup",
                desc: "The work isn't done when the food is gone. Show the whole arc — cooking, eating, cleaning up together.",
              },
              {
                step: "5",
                title: "Reflect",
                desc: "After the kids are done, record a short reflection: how did the dinner go? What worked? What would you do differently?",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-warm/10 text-xs font-bold text-warm">
                  {item.step}
                </span>
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="mt-0.5 text-foreground-2">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-card-border bg-card-bg p-6 md:p-8">
          <h2 className="font-serif text-xl">What to send us</h2>
          <p className="mt-3 text-foreground-2">
            Along with your video, include:
          </p>
          <ul className="mt-4 space-y-3">
            {[
              "The recipe you used",
              "The conversation starters you asked at the table",
              "The age-appropriate tasks your kids handled and their ages",
              "A short written reflection on how the dinner went",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-foreground-2"
              >
                <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-warm/40" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 rounded-lg border border-card-border bg-card-bg p-6 md:p-8">
          <h2 className="font-serif text-xl">Where your video lives</h2>
          <ul className="mt-4 space-y-3">
            {[
              "Full episode on dadskitchen.org with your name, recipe, and reflection",
              "Full episode on our YouTube channel",
              "Short-form cut for our Instagram and TikTok reels library",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-foreground-2"
              >
                <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-warm/40" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 rounded-lg border border-card-border bg-card-bg p-6 md:p-8">
          <h2 className="font-serif text-xl">Child &amp; family media policy</h2>
          <p className="mt-3 leading-relaxed text-foreground-2">
            Dad&rsquo;s Kitchen features children. We take that seriously.
            Before any submitted footage is published, every participating
            family must complete the following:
          </p>
          <ul className="mt-4 space-y-3">
            {[
              "Parent or legal guardian media release — a signed form authorizing the use of your child's likeness in Dad's Kitchen content across our website, YouTube, Instagram, and TikTok.",
              "Child assent — for children old enough to understand (generally age 7+), we ask that you explain what the video is for and confirm they are comfortable participating.",
              "Identifying information — only first names and ages are published. Last names, school names, locations, and other identifying details are never shared.",
              "Footage transfer and storage — videos are submitted via a secure upload link. Raw footage is stored on encrypted, access-controlled infrastructure and is never sold or shared with third parties.",
              "Editing and approval — you will review the final edit before publication. Nothing goes live without your written approval.",
              "Takedown and withdrawal — you can request removal of your family's content at any time by emailing us. We will remove the video from all platforms we control within 7 business days.",
              "Comments and moderation — comments are moderated on all platforms. Any comment directed at a child is removed immediately.",
              "Retention — if you withdraw consent, raw footage is deleted within 30 days of your request. Published content is removed per the takedown policy above.",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-foreground-2"
              >
                <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-warm/40" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-foreground-3">
            The full media release form will be provided when you begin the
            guest chef process. If you have questions about our policies,{" "}
            <Link href="/contact" className="text-warm hover:text-foreground">
              contact us
            </Link>
            .
          </p>
        </div>

        <div className="mt-8">
          <Link
            href="/contact"
            className="rounded bg-warm px-6 py-3 text-sm font-semibold text-btn-text transition-opacity hover:opacity-90"
          >
            Become a guest chef
          </Link>
        </div>
      </section>

      <section className="border-t border-rule bg-surface">
        <div className="mx-auto max-w-3xl px-6 py-12 text-center">
          <Link
            href="/get-involved"
            className="text-sm font-medium text-accent-dark hover:text-foreground"
          >
            &larr; See all ways to get involved
          </Link>
        </div>
      </section>
    </>
  );
}
