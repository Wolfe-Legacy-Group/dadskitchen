import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRecipeBySlug } from "@/lib/recipes";
import { RecipeScaler } from "@/components/RecipeScaler";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  if (!recipe) return {};
  return {
    title: recipe.title,
    description: recipe.description,
  };
}

export default async function RecipePage({ params }: Props) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  if (!recipe) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 pb-16 pt-16 md:pt-24">
      <Link
        href="/recipes"
        className="text-sm text-foreground-3 hover:text-foreground"
      >
        &larr; All recipes
      </Link>

      {/* Header */}
      <h1 className="mt-6 font-serif text-4xl tracking-tight md:text-5xl">
        {recipe.title}
      </h1>
      <p className="mt-3 text-foreground-2">{recipe.description}</p>

      {/* Static meta badges */}
      <div className="mt-6 flex flex-wrap gap-3">
        <Badge label="Difficulty" value={recipe.difficulty} />
        <Badge label="Prep" value={`${recipe.prep_time_minutes} min`} />
        <Badge label="Cook" value={`${recipe.cook_time_minutes} min`} />
        <Badge label="Total" value={`${recipe.total_time_minutes} min`} />
        <Badge label="Ages" value={recipe.kid_age_range} />
      </div>

      {/* Everything interactive: batch toggle, cost, tabs */}
      <RecipeScaler
        servings={recipe.servings}
        yieldAmount={recipe.yield_amount}
        yieldUnit={recipe.yield_unit}
        ingredients={recipe.ingredients}
        recipeName={recipe.title}
        recipeSlug={recipe.slug}
        steps={recipe.steps}
        substitutions={recipe.substitutions}
        conversationStarters={recipe.conversationStarters}
        safetyNotes={recipe.safety_notes}
        leftoverTips={recipe.leftover_tips}
      />
    </article>
  );
}

function Badge({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-card-border bg-card-bg px-3 py-1.5">
      <p className="text-[10px] font-medium uppercase tracking-wider text-foreground-3">
        {label}
      </p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}
