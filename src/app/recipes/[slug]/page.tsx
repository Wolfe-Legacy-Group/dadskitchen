import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRecipeBySlug } from "@/lib/recipes";
import { ConversationStarters } from "@/components/ConversationStarters";
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

      {/* Batch size toggle + scaled badges, cost, ingredients */}
      <RecipeScaler
        servings={recipe.servings}
        yieldAmount={recipe.yield_amount}
        yieldUnit={recipe.yield_unit}
        ingredients={recipe.ingredients}
        recipeName={recipe.title}
        recipeSlug={recipe.slug}
      />

      {/* Conversation starters */}
      <ConversationStarters starters={recipe.conversationStarters} />

      {/* Steps */}
      <section className="mt-10">
        <h2 className="font-serif text-2xl text-foreground">Steps</h2>
        <div className="mt-4 space-y-4">
          {recipe.steps.map((step) => (
            <div key={step.id} className="flex gap-4">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${
                  step.min_age != null ? "bg-accent" : "bg-foreground-3"
                }`}
              >
                {step.step_number}
              </div>
              <div className="pt-1 flex-1">
                <p className="text-foreground-2">{step.instruction}</p>
                {step.kid_note && (
                  <p className="mt-1 text-sm text-accent">
                    {step.kid_note}
                  </p>
                )}
                {step.safety_warning && (
                  <p className="mt-1 text-sm font-medium text-red-600">
                    {step.safety_warning}
                  </p>
                )}
                <div className="mt-2 flex gap-2">
                  <AgeChip age={4} active={step.min_age != null && step.min_age <= 4} />
                  <AgeChip age={6} active={step.min_age != null && step.min_age <= 6} />
                  <AgeChip age={8} active={step.min_age != null && step.min_age <= 8} />
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-medium bg-foreground-3/20 text-foreground-2"
                  >
                    Adult
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex gap-4 text-xs text-foreground-3">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-full bg-accent" />
            Can help with this step
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-full bg-foreground-3/30" />
            Not recommended
          </span>
        </div>
      </section>

      {/* Substitutions */}
      {recipe.substitutions.length > 0 && (
        <section className="mt-10">
          <h2 className="font-serif text-2xl text-foreground">Substitutions</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-rule text-left text-xs font-medium uppercase tracking-wider text-foreground-3">
                  <th className="pb-2 pr-4">Instead of</th>
                  <th className="pb-2 pr-4">Use</th>
                  <th className="pb-2">Why</th>
                </tr>
              </thead>
              <tbody>
                {recipe.substitutions.map((sub) => (
                  <tr key={sub.id} className="border-b border-rule">
                    <td className="py-3 pr-4 text-foreground">
                      {sub.original_ingredient}
                    </td>
                    <td className="py-3 pr-4 text-foreground-2">
                      {sub.substitution}
                    </td>
                    <td className="py-3 text-foreground-3">{sub.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Safety notes */}
      <section className="mt-10">
        <h2 className="font-serif text-2xl text-foreground">Safety notes</h2>
        <p className="mt-3 text-sm leading-relaxed text-foreground-2">
          {recipe.safety_notes}
        </p>
      </section>

      {/* Leftovers */}
      <section className="mt-10">
        <h2 className="font-serif text-2xl text-foreground">Leftovers</h2>
        <p className="mt-3 text-sm leading-relaxed text-foreground-2">
          {recipe.leftover_tips}
        </p>
      </section>
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

function AgeChip({ age, active }: { age: number; active: boolean }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
        active
          ? "bg-accent/20 text-accent"
          : "bg-foreground-3/10 text-foreground-3 line-through"
      }`}
    >
      {age}+
    </span>
  );
}
