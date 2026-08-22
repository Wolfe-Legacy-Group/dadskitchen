import { supabase } from "./supabase";

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  prep_time_minutes: number;
  cook_time_minutes: number;
  total_time_minutes: number;
  servings: number;
  kid_age_range: string;
  conversation_starter: string;
  leftover_tips: string;
  safety_notes: string;
  image_url: string | null;
  yield_amount: number | null;
  yield_unit: string | null;
}

export interface Ingredient {
  id: string;
  sort_order: number;
  name: string;
  quantity: string;
  unit: string;
  estimated_cost_usd: number;
  cost_note: string | null;
  storage_tip: string;
  prep_required: string;
  prep_time_minutes: number | null;
  quantity_decimal: number | null;
}

export interface Step {
  id: string;
  step_number: number;
  instruction: string;
  is_kid_friendly: boolean;
  kid_note: string | null;
  safety_warning: string | null;
  min_age: number | null;
}

export interface ConversationStarter {
  id: string;
  question: string;
  sort_order: number;
}

export interface Substitution {
  id: string;
  original_ingredient: string;
  substitution: string;
  reason: string;
}

export interface RecipeDetail extends Recipe {
  ingredients: Ingredient[];
  steps: Step[];
  substitutions: Substitution[];
  conversationStarters: ConversationStarter[];
}

export async function getAllRecipes(): Promise<Recipe[]> {
  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getRecipeBySlug(
  slug: string
): Promise<RecipeDetail | null> {
  const { data: recipe, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !recipe) return null;

  const [ingredients, steps, substitutions, starters] = await Promise.all([
    supabase
      .from("recipe_ingredients")
      .select("*")
      .eq("recipe_id", recipe.id)
      .order("sort_order"),
    supabase
      .from("recipe_steps")
      .select("*")
      .eq("recipe_id", recipe.id)
      .order("step_number"),
    supabase
      .from("recipe_substitutions")
      .select("*")
      .eq("recipe_id", recipe.id),
    supabase
      .from("recipe_conversation_starters")
      .select("*")
      .eq("recipe_id", recipe.id)
      .order("sort_order"),
  ]);

  return {
    ...recipe,
    ingredients: ingredients.data ?? [],
    steps: steps.data ?? [],
    substitutions: substitutions.data ?? [],
    conversationStarters: starters.data ?? [],
  };
}
