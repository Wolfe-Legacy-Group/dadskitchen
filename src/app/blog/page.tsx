import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Updates, stories, and ideas from the Dad's Kitchen community.",
};

export default function Blog() {
  const posts = getAllPosts();

  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pb-12 pt-16 md:pt-24">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          Blog
        </p>
        <h1 className="mt-4 font-serif text-4xl tracking-tight md:text-5xl">
          From the kitchen
        </h1>
        <p className="mt-4 max-w-lg text-foreground-2">
          Updates, stories, and ideas from the Dad&rsquo;s Kitchen community.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block rounded-lg border border-card-border bg-card-bg p-6 transition-shadow hover:shadow-md"
            >
              <time className="text-xs text-foreground-3">
                {new Date(post.date + "T12:00:00").toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <h2 className="mt-2 font-serif text-xl group-hover:text-accent-dark">
                {post.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground-2">
                {post.summary}
              </p>
              <span className="mt-3 inline-block text-sm font-medium text-accent-dark group-hover:text-foreground">
                Read more &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
