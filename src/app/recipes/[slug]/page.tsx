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

  const totalCost = recipe.ingredients.reduce(
    (sum, i) => sum + Number(i.estimated_cost_usd),
    0
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.description,
    url: `https://dadskitchen.org/recipes/${recipe.slug}`,
    ...(recipe.image_url ? { image: recipe.image_url } : {}),
    author: {
      "@type": "Organization",
      name: "Dad's Kitchen — Mens Philanthropy Foundation",
      url: "https://dadskitchen.org",
    },
    prepTime: `PT${recipe.prep_time_minutes}M`,
    cookTime: `PT${recipe.cook_time_minutes}M`,
    totalTime: `PT${recipe.total_time_minutes}M`,
    recipeYield: recipe.yield_amount
      ? `${recipe.yield_amount} ${recipe.yield_unit}`
      : `${recipe.servings} servings`,
    recipeCategory: recipe.meal_type,
    recipeIngredient: recipe.ingredients.map(
      (i) => `${i.quantity} ${i.unit} ${i.name}`.trim()
    ),
    recipeInstructions: recipe.steps.map((s) => ({
      "@type": "HowToStep",
      position: s.step_number,
      text: s.instruction,
    })),
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: totalCost.toFixed(2),
    },
  };

  return (
    <article className="mx-auto max-w-3xl px-6 pb-16 pt-16 md:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
