import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

const videos = [
  {
    title: "Pancakes with Dad",
    ages: "Ages 4–6",
    duration: "4 min",
    bg: "bg-herb/80",
  },
  {
    title: "Taco Tuesday",
    ages: "Ages 7–10",
    duration: "6 min",
    bg: "bg-copper/80",
  },
  {
    title: "The Sunday Roast",
    ages: "Ages 11–14",
    duration: "8 min",
    bg: "bg-smoke/80",
  },
];

async function getLatestRecipes() {
  const { data: recipes } = await supabase
    .from("recipes")
    .select("slug, title, description, difficulty, total_time_minutes, kid_age_range, meal_type")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(3);

  return recipes ?? [];
}

export default async function Home() {
  const latestRecipes = await getLatestRecipes();

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 md:pb-24 md:pt-24">
        <div className="flex flex-col items-center text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            A Mens Philanthropy Foundation Initiative
          </p>
          <Image
            src="/logo-tagline.png"
            alt="Dad's Kitchen logo"
            width={420}
            height={420}
            className="mt-8 w-full max-w-[280px] md:max-w-xs"
            priority
          />
          <h1 className="mt-8 font-serif text-4xl tracking-tight md:text-5xl">
            Cook side by side. Talk face to face.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg text-foreground-2">
            Simple recipes, real conversations, and everything you need to make
            the kitchen the best part of your day with your kids.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/recipes"
              className="rounded bg-warm px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Choose your first recipe
            </Link>
            <Link
              href="/about"
              className="rounded border border-rule px-6 py-3 text-sm font-medium text-foreground-2 transition-colors hover:text-foreground"
            >
              Our story
            </Link>
          </div>
        </div>
      </section>

      {/* Latest recipes */}
      {latestRecipes.length > 0 && (
        <section className="border-t border-rule">
          <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              Latest recipes
            </p>
            <h2 className="mt-4 font-serif text-2xl md:text-3xl">
              Fresh out of the kitchen
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {latestRecipes.map((recipe) => (
                <Link
                  key={recipe.slug}
                  href={`/recipes/${recipe.slug}`}
                  className="group flex flex-col rounded-lg border border-card-border bg-card-bg p-5 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">
                      {recipe.meal_type}
                    </span>
                    <span className="rounded-full bg-warm/10 px-2.5 py-0.5 text-xs font-semibold text-warm">
                      {recipe.difficulty}
                    </span>
                  </div>
                  <h3 className="mt-3 font-serif text-lg">{recipe.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-2 line-clamp-2">
                    {recipe.description}
                  </p>
                  <p className="mt-3 text-xs text-foreground-3">
                    {recipe.total_time_minutes} min &middot; Ages{" "}
                    {recipe.kid_age_range}
                  </p>
                  <span className="mt-4 text-sm font-medium text-accent-dark group-hover:text-foreground">
                    View recipe &rarr;
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/recipes"
                className="text-sm font-medium text-accent-dark hover:text-foreground"
              >
                See all recipes &rarr;
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Our process */}
      <section className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Our process
          </p>
          <h2 className="mt-4 font-serif text-2xl md:text-3xl">
            Four ways to be part of this
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "1",
                title: "Spread the Word",
                desc: "Follow us, share our content, and help us reach more dads.",
                href: "/process/spread-the-word",
              },
              {
                step: "2",
                title: "Participate",
                desc: "Try it with your kids. Adapt it. Tell us how it went.",
                href: "/process/participate",
              },
              {
                step: "3",
                title: "Be an Example",
                desc: "Post your experience, tag us, and inspire other dads.",
                href: "/process/be-an-example",
              },
              {
                step: "4",
                title: "Guest Chef",
                desc: "Film a full episode and become part of our video library.",
                href: "/process/guest-chef",
                accent: true,
              },
            ].map((item) => (
              <Link
                key={item.step}
                href={item.href}
                className="group flex flex-col rounded-lg border border-card-border bg-card-bg p-5 transition-shadow hover:shadow-md"
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                    item.accent
                      ? "bg-warm/10 text-warm"
                      : "bg-accent/10 text-accent"
                  }`}
                >
                  {item.step}
                </span>
                <h3 className="mt-3 font-serif text-lg">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-2">
                  {item.desc}
                </p>
                <span
                  className={`mt-4 text-sm font-medium ${
                    item.accent
                      ? "text-warm group-hover:text-foreground"
                      : "text-accent-dark group-hover:text-foreground"
                  }`}
                >
                  Learn more &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured videos */}
      <section className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            In production
          </p>
          <h2 className="mt-4 font-serif text-2xl">What we&rsquo;re filming</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v) => (
              <article
                key={v.title}
                className="overflow-hidden rounded-md border border-card-border bg-card-bg"
              >
                <div
                  className={`flex aspect-video flex-col items-center justify-center gap-1 ${v.bg}`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-10 w-10 text-white/80 drop-shadow-md"
                  >
                    <polygon points="9.5,6.5 9.5,17.5 18,12" />
                  </svg>
                  <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
                    Coming soon
                  </span>
                </div>
                <div className="px-4 py-3">
                  <p className="text-sm font-semibold">{v.title}</p>
                  <p className="text-xs text-foreground-3">
                    {v.ages} &middot; {v.duration}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/watch"
              className="text-sm font-medium text-accent-dark hover:text-foreground"
            >
              See all videos &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="border-t border-rule">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-2 md:gap-12 md:py-16">
          <blockquote className="border-l-[3px] border-accent pl-6 font-serif text-xl leading-relaxed italic md:text-2xl">
            &ldquo;I involved them in whatever I was doing. When they were
            little, that might mean stirring something or carrying napkins to
            the table.&rdquo;
          </blockquote>
          <div>
            <p className="leading-relaxed text-foreground-2">
              As a single dad, Perry Wolfe realized that a surprising amount of
              his time with his kids happened around meals. So he learned to make
              the kitchen count. He involved them in whatever he was doing —
              something age-appropriate they could own. Then they&rsquo;d sit down
              to eat, and he&rsquo;d ask questions that couldn&rsquo;t be answered
              with &ldquo;yes,&rdquo; &ldquo;no,&rdquo; or
              &ldquo;fine.&rdquo;
            </p>
            <p className="mt-4 leading-relaxed text-foreground-2">
              Those meals became some of their best time together. That
              experience led him to found the Mens Philanthropy Foundation — a
              501(c)(3) dedicated to strengthening fatherhood through cooking and
              conversation.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-block text-sm font-medium text-accent-dark hover:text-foreground"
            >
              Read the full story &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-rule bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-12 text-center md:py-16">
          <h2 className="font-serif text-2xl md:text-3xl">
            Every meal is a chance to connect
          </h2>
          <p className="mx-auto mt-4 max-w-md text-foreground-2">
            Whether you&rsquo;re a dad looking for ideas or someone who believes
            in what we&rsquo;re building, there&rsquo;s a place for you here.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/get-involved#donate"
              className="rounded bg-accent px-6 py-3 text-sm font-semibold text-btn-text transition-colors hover:bg-accent-dark"
            >
              Support the foundation
            </Link>
            <Link
              href="/contact"
              className="rounded border border-rule px-6 py-3 text-sm font-medium text-foreground-2 transition-colors hover:text-foreground"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
