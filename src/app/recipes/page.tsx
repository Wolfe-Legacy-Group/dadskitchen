import type { Metadata } from "next";
import { getAllRecipes } from "@/lib/recipes";
import { supabase } from "@/lib/supabase";
import { RecipeSearch } from "@/components/RecipeSearch";

export const metadata: Metadata = {
  title: "Recipes",
  description:
    "Simple, kid-friendly recipes with real costs, storage tips, and step-by-step guidance for cooking with your kids.",
};

export const revalidate = 60;

async function getRecipesWithCosts() {
  const recipes = await getAllRecipes();

  const recipesWithCosts = await Promise.all(
    recipes.map(async (recipe) => {
      const { data: ingredients } = await supabase
        .from("recipe_ingredients")
        .select("estimated_cost_usd")
        .eq("recipe_id", recipe.id);

      const total_cost = (ingredients ?? []).reduce(
        (sum, i) => sum + Number(i.estimated_cost_usd),
        0
      );

      return {
        slug: recipe.slug,
        title: recipe.title,
        description: recipe.description,
        difficulty: recipe.difficulty,
        total_time_minutes: recipe.total_time_minutes,
        servings: recipe.servings,
        kid_age_range: recipe.kid_age_range,
        total_cost,
      };
    })
  );

  return recipesWithCosts;
}

export default async function Recipes() {
  const recipes = await getRecipesWithCosts();

  return (
    <>
      <section className="mx-auto max-w-3xl px-6 pb-12 pt-16 md:pt-24">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          Recipes
        </p>
        <h1 className="mt-4 font-serif text-4xl tracking-tight md:text-5xl">
          Cook together
        </h1>
        <p className="mt-4 max-w-lg text-foreground-2">
          Simple, kid-friendly recipes with real costs, storage tips, and
          step-by-step guidance. Everything you need to get cooking with your
          kids.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <RecipeSearch recipes={recipes} />
      </section>
    </>
  );
}
