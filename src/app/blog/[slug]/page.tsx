import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { getAllPosts, getPost } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const html = await marked(post.content);

  return (
    <>
      <article className="mx-auto max-w-3xl px-6 pb-16 pt-16 md:pt-24">
        <Link
          href="/blog"
          className="text-sm text-foreground-3 hover:text-foreground"
        >
          &larr; All posts
        </Link>
        <time className="mt-6 block text-xs text-foreground-3">
          {new Date(post.date + "T12:00:00").toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h1 className="mt-2 font-serif text-4xl tracking-tight md:text-5xl">
          {post.title}
        </h1>
        <div
          className="prose mt-8"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </>
  );
}
