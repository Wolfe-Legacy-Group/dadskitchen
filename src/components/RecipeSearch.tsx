"use client";

import Link from "next/link";
import { useState } from "react";

interface RecipeCard {
  slug: string;
  title: string;
  description: string;
  difficulty: string;
  total_time_minutes: number;
  servings: number;
  kid_age_range: string;
  total_cost: number;
}

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const colors: Record<string, string> = {
    Easy: "bg-accent/10 text-accent",
    Medium: "bg-warm/10 text-warm",
    Hard: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[difficulty] ?? ""}`}
    >
      {difficulty}
    </span>
  );
}

export function RecipeSearch({ recipes }: { recipes: RecipeCard[] }) {
  const [query, setQuery] = useState("");

  const filtered = query
    ? recipes.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.description.toLowerCase().includes(query.toLowerCase())
      )
    : recipes;

  return (
    <>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-card-border bg-card-bg px-4 py-3 text-sm text-foreground placeholder:text-foreground-3 focus:border-accent focus:outline-none"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {filtered.length === 0 && (
          <p className="text-sm text-foreground-3 sm:col-span-2">
            {query
              ? <>No recipes matching &ldquo;{query}&rdquo;</>
              : "No recipes yet. Check back soon!"}
          </p>
        )}
        {filtered.map((recipe) => (
          <Link
            key={recipe.slug}
            href={`/recipes/${recipe.slug}`}
            className="group block rounded-lg border border-card-border bg-card-bg p-6 transition-shadow hover:shadow-md"
          >
            <div className="flex items-center gap-2">
              <DifficultyBadge difficulty={recipe.difficulty} />
              <span className="text-xs text-foreground-3">
                Ages {recipe.kid_age_range}
              </span>
            </div>
            <h2 className="mt-3 font-serif text-xl group-hover:text-accent-dark">
              {recipe.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground-2">
              {recipe.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-foreground-3">
              <span>{recipe.total_time_minutes} min</span>
              <span>{recipe.servings} servings</span>
              <span>~${recipe.total_cost.toFixed(2)} total</span>
            </div>
            <span className="mt-3 inline-block text-sm font-medium text-accent-dark group-hover:text-foreground">
              View recipe &rarr;
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
