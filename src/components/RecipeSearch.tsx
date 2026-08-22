"use client";

import Link from "next/link";
import { useState } from "react";

const MEAL_TYPES = ["All", "Breakfast", "Lunch", "Dinner", "Snack"] as const;

interface RecipeCard {
  slug: string;
  title: string;
  description: string;
  difficulty: string;
  total_time_minutes: number;
  servings: number;
  kid_age_range: string;
  meal_type: string;
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

function MealTypeBadge({ mealType }: { mealType: string }) {
  const colors: Record<string, string> = {
    Breakfast: "bg-amber-100 text-amber-700",
    Lunch: "bg-blue-100 text-blue-700",
    Dinner: "bg-purple-100 text-purple-700",
    Snack: "bg-emerald-100 text-emerald-700",
  };
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[mealType] ?? ""}`}
    >
      {mealType}
    </span>
  );
}

export function RecipeSearch({ recipes }: { recipes: RecipeCard[] }) {
  const [query, setQuery] = useState("");
  const [mealFilter, setMealFilter] = useState("All");

  const filtered = recipes.filter((r) => {
    const matchesQuery =
      !query ||
      r.title.toLowerCase().includes(query.toLowerCase()) ||
      r.description.toLowerCase().includes(query.toLowerCase());
    const matchesMeal = mealFilter === "All" || r.meal_type === mealFilter;
    return matchesQuery && matchesMeal;
  });

  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border border-card-border bg-card-bg px-4 py-3 text-sm text-foreground placeholder:text-foreground-3 focus:border-accent focus:outline-none"
        />
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {MEAL_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setMealFilter(type)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              mealFilter === type
                ? "border-warm bg-warm/15 text-warm"
                : "border-card-border bg-card-bg text-foreground-3 hover:text-foreground"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {filtered.length === 0 && (
          <p className="text-sm text-foreground-3 sm:col-span-2">
            {query
              ? <>No recipes matching &ldquo;{query}&rdquo;</>
              : "No recipes found. Try a different filter."}
          </p>
        )}
        {filtered.map((recipe) => (
          <Link
            key={recipe.slug}
            href={`/recipes/${recipe.slug}`}
            className="group block rounded-lg border border-card-border bg-card-bg p-6 transition-shadow hover:shadow-md"
          >
            <div className="flex items-center gap-2">
              <MealTypeBadge mealType={recipe.meal_type} />
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
