"use client";

import { useState } from "react";
import type { Ingredient } from "@/lib/recipes";

const MULTIPLIERS = [1, 2, 3, 4] as const;

const FRACTIONS: [number, string][] = [
  [0.125, "1/8"],
  [0.25, "1/4"],
  [0.333, "1/3"],
  [0.375, "3/8"],
  [0.5, "1/2"],
  [0.625, "5/8"],
  [0.667, "2/3"],
  [0.75, "3/4"],
  [0.875, "7/8"],
];

function toFraction(value: number): string {
  if (value <= 0) return "0";
  const whole = Math.floor(value);
  const remainder = value - whole;

  if (remainder < 0.06) return String(whole || "0");

  let closest = "";
  let minDiff = Infinity;
  for (const [dec, frac] of FRACTIONS) {
    const diff = Math.abs(remainder - dec);
    if (diff < minDiff) {
      minDiff = diff;
      closest = frac;
    }
  }

  if (minDiff > 0.05) return value.toFixed(1).replace(/\.0$/, "");

  return whole > 0 ? `${whole} ${closest}` : closest;
}

interface RecipeScalerProps {
  servings: number;
  yieldAmount: number | null;
  yieldUnit: string | null;
  ingredients: Ingredient[];
}

export function RecipeScaler({
  servings,
  yieldAmount,
  yieldUnit,
  ingredients,
}: RecipeScalerProps) {
  const [multiplier, setMultiplier] = useState(1);

  const scaledServings = servings * multiplier;
  const scaledYield = yieldAmount ? yieldAmount * multiplier : null;
  const unit = yieldUnit ?? "pieces";
  const perServing = yieldAmount
    ? Math.round(yieldAmount / servings)
    : null;
  const singularUnit =
    unit.endsWith("es") && unit !== "pancakes"
      ? unit.slice(0, -2)
      : unit.endsWith("s")
        ? unit.slice(0, -1)
        : unit;
  const displayUnit = perServing === 1 ? singularUnit : unit;

  const totalCost = ingredients.reduce(
    (sum, i) => sum + Number(i.estimated_cost_usd) * multiplier,
    0
  );
  const costPerServing = totalCost / scaledServings;

  return (
    <>
      {/* Batch size toggle */}
      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-foreground-3">
          Batch size
        </p>
        <div className="mt-2 flex gap-2">
          {MULTIPLIERS.map((m) => (
            <button
              key={m}
              onClick={() => setMultiplier(m)}
              className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                multiplier === m
                  ? "border-warm bg-warm/15 text-warm"
                  : "border-card-border bg-card-bg text-foreground-3 hover:text-foreground"
              }`}
            >
              {m}x
            </button>
          ))}
        </div>
      </div>

      {/* Scaled badges */}
      <div className="mt-4 flex flex-wrap gap-3">
        <Badge label="Servings" value={String(scaledServings)} />
        {perServing != null && (
          <>
            <Badge label="1 Serving" value={`${perServing} ${displayUnit}`} />
            <Badge label={`Total ${unit}`} value={String(scaledYield)} />
          </>
        )}
      </div>

      {/* Cost summary */}
      <div className="mt-6 rounded-lg border border-card-border bg-card-bg p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-foreground-3">
          Estimated cost (Walmart.com, Aug 2026)
        </p>
        <div className="mt-2 flex gap-8">
          <div>
            <p className="text-2xl font-bold text-foreground">
              ~${totalCost.toFixed(2)}
            </p>
            <p className="text-xs text-foreground-3">total recipe</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">
              ~${costPerServing.toFixed(2)}
            </p>
            <p className="text-xs text-foreground-3">per serving</p>
          </div>
        </div>
        <p className="mt-3 text-xs text-foreground-3">
          Prices checked at Walmart.com on Aug 2026. Based on full package costs
          — you may already have some of these ingredients on hand.
        </p>
      </div>

      {/* Ingredients */}
      <section className="mt-10">
        <h2 className="font-serif text-2xl text-foreground">Ingredients</h2>
        <div className="mt-4 space-y-4">
          {ingredients.map((ing) => {
            const scaledQty =
              multiplier === 1
                ? ing.quantity
                : ing.quantity_decimal
                  ? toFraction(ing.quantity_decimal * multiplier)
                  : ing.quantity;
            const scaledCost = Number(ing.estimated_cost_usd) * multiplier;

            return (
              <div
                key={ing.id}
                className="rounded-lg border border-card-border bg-card-bg p-4"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-medium text-foreground">
                    {scaledQty} {ing.unit} {ing.name}
                  </p>
                  <p className="shrink-0 text-sm font-medium text-warm">
                    ~${scaledCost.toFixed(2)}
                  </p>
                </div>
                {ing.cost_note && (
                  <p className="mt-1 text-xs text-foreground-3">
                    {ing.cost_note}
                  </p>
                )}
                <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-foreground-3">
                      Prep
                    </p>
                    <p className="text-foreground-2">
                      {ing.prep_required}
                      {ing.prep_time_minutes
                        ? ` (~${ing.prep_time_minutes} min)`
                        : ""}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-foreground-3">
                      Store the rest
                    </p>
                    <p className="text-foreground-2">{ing.storage_tip}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
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
