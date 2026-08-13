import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { BlogSearch } from "@/components/BlogSearch";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Updates, stories, and ideas from the Dad's Kitchen community.",
};

export default function Blog() {
  const posts = getAllPosts().map(({ slug, title, date, summary }) => ({
    slug,
    title,
    date,
    summary,
  }));

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
        <BlogSearch posts={posts} />
      </section>
    </>
  );
}
