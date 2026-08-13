"use client";

import Link from "next/link";
import { useState } from "react";

interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
}

export function BlogSearch({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");

  const filtered = query
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.summary.toLowerCase().includes(query.toLowerCase())
      )
    : posts;

  return (
    <>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-card-border bg-card-bg px-4 py-3 text-sm text-foreground placeholder:text-foreground-3 focus:border-accent focus:outline-none"
        />
      </div>

      <div className="space-y-6">
        {filtered.length === 0 && (
          <p className="text-sm text-foreground-3">
            No posts matching &ldquo;{query}&rdquo;
          </p>
        )}
        {filtered.map((post) => (
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
    </>
  );
}
