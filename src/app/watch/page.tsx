import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Watch",
  description:
    "Cooking videos for dads and kids — organized by age group, with conversation starters for the table.",
};

const videos = [
  {
    title: "Pancakes with Dad",
    ages: "Ages 4–6",
    duration: "4 min",
    description: "Measuring, stirring, and flipping — the perfect first recipe.",
    bg: "bg-herb/80",
  },
  {
    title: "Taco Tuesday",
    ages: "Ages 7–10",
    duration: "6 min",
    description: "Chopping, seasoning, and building your own plate.",
    bg: "bg-copper/80",
  },
  {
    title: "The Sunday Roast",
    ages: "Ages 11–14",
    duration: "8 min",
    description:
      "Taking ownership of a full meal — timing, temperature, and teamwork.",
    bg: "bg-smoke/80",
  },
  {
    title: "Scrambled Eggs 101",
    ages: "Ages 5–7",
    duration: "3 min",
    description: "Cracking, whisking, and the patience of low heat.",
    bg: "bg-herb/60",
  },
  {
    title: "Pizza Night",
    ages: "Ages 6–12",
    duration: "7 min",
    description: "Rolling dough, choosing toppings, and sharing the results.",
    bg: "bg-copper/60",
  },
  {
    title: "Spaghetti from Scratch",
    ages: "Ages 10–14",
    duration: "10 min",
    description: "Making sauce, boiling pasta, and feeding the whole family.",
    bg: "bg-smoke/60",
  },
];

const filters = ["All ages", "Ages 4–6", "Ages 7–10", "Ages 11–14"];

export default function Watch() {
  return (
    <>
      {/* Header */}
      <section className="mx-auto max-w-6xl px-6 pb-8 pt-16 md:pt-24">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          Watch
        </p>
        <h1 className="mt-4 font-serif text-4xl tracking-tight md:text-5xl">
          From the kitchen
        </h1>
        <p className="mt-4 max-w-lg text-foreground-2">
          Cooking videos for dads and kids — organized by age group. Each one
          comes with conversation starters for the table.
        </p>
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-6xl px-6 pb-4">
        <div className="flex flex-wrap gap-2">
          {filters.map((f, i) => (
            <button
              key={f}
              className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                i === 0
                  ? "bg-accent text-btn-text"
                  : "border border-rule text-foreground-2 hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Video grid */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => (
            <article
              key={v.title}
              className="group cursor-pointer overflow-hidden rounded-md border border-card-border bg-card-bg transition-shadow hover:shadow-md"
            >
              <div
                className={`flex aspect-video flex-col items-center justify-center gap-1 ${v.bg} transition-opacity group-hover:opacity-90`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-12 w-12 text-white/80 drop-shadow-md transition-transform group-hover:scale-110"
                >
                  <polygon points="9.5,6.5 9.5,17.5 18,12" />
                </svg>
                <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
                  Coming soon
                </span>
              </div>
              <div className="px-4 py-3">
                <p className="font-semibold">{v.title}</p>
                <p className="mt-0.5 text-xs text-foreground-3">
                  {v.ages} &middot; {v.duration}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-foreground-2">
                  {v.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Coming soon */}
      <section className="border-t border-rule bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-12 text-center md:py-16">
          <h2 className="font-serif text-2xl">More videos coming soon</h2>
          <p className="mx-auto mt-4 max-w-md text-foreground-2">
            We&rsquo;re filming new episodes every month. Follow us on Instagram
            to see what&rsquo;s cooking next.
          </p>
        </div>
      </section>
    </>
  );
}
