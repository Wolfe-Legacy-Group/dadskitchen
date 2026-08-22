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
  recipeName: string;
  recipeSlug: string;
}

export function RecipeScaler({
  servings,
  yieldAmount,
  yieldUnit,
  ingredients,
  recipeName,
  recipeSlug,
}: RecipeScalerProps) {
  const [multiplier, setMultiplier] = useState(1);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [emailForm, setEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

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

  function toggleCheck(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const needCount = ingredients.filter((i) => !checked[i.id]).length;
  const needCost = ingredients
    .filter((i) => !checked[i.id])
    .reduce((sum, i) => sum + Number(i.estimated_cost_usd) * multiplier, 0);

  function getScaledQty(ing: Ingredient) {
    return multiplier === 1
      ? ing.quantity
      : ing.quantity_decimal
        ? toFraction(ing.quantity_decimal * multiplier)
        : ing.quantity;
  }

  async function handleSendEmail(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);

    const items = ingredients
      .filter((i) => !checked[i.id])
      .map((i) => ({
        name: i.name,
        quantity: getScaledQty(i),
        unit: i.unit,
        cost: (Number(i.estimated_cost_usd) * multiplier).toFixed(2),
      }));

    try {
      const res = await fetch("/api/send-shopping-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          recipeName,
          recipeSlug,
          items,
          totalCost: needCost.toFixed(2),
          multiplier,
        }),
      });
      if (res.ok) {
        setSent(true);
        setTimeout(() => {
          setEmailForm(false);
          setSent(false);
        }, 3000);
      }
    } finally {
      setSending(false);
    }
  }

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

      {/* Ingredients with checkboxes */}
      <section className="mt-10">
        <div className="flex items-baseline justify-between">
          <h2 className="font-serif text-2xl text-foreground">Ingredients</h2>
          <p className="text-xs text-foreground-3">
            Check off what you already have
          </p>
        </div>
        <div className="mt-4 space-y-4">
          {ingredients.map((ing) => {
            const isChecked = !!checked[ing.id];
            const scaledQty = getScaledQty(ing);
            const scaledCost = Number(ing.estimated_cost_usd) * multiplier;

            return (
              <div
                key={ing.id}
                onClick={() => toggleCheck(ing.id)}
                className={`cursor-pointer rounded-lg border p-4 transition-all ${
                  isChecked
                    ? "border-accent/30 bg-accent/5 opacity-60"
                    : "border-card-border bg-card-bg"
                }`}
              >
                <div className="flex items-baseline gap-3">
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border text-xs transition-colors ${
                      isChecked
                        ? "border-accent bg-accent text-white"
                        : "border-foreground-3/30"
                    }`}
                  >
                    {isChecked && "✓"}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <p
                        className={`font-medium ${
                          isChecked
                            ? "text-foreground-3 line-through"
                            : "text-foreground"
                        }`}
                      >
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
                    {!isChecked && (
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
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Shopping list summary bar */}
        <div className="mt-6 rounded-lg border border-warm/30 bg-warm/5 p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-foreground">
                {needCount === 0
                  ? "You have everything!"
                  : `${needCount} item${needCount !== 1 ? "s" : ""} still needed`}
              </p>
              {needCount > 0 && (
                <p className="text-xs text-foreground-3">
                  ~${needCost.toFixed(2)} estimated
                </p>
              )}
            </div>
            {needCount > 0 && !emailForm && (
              <button
                onClick={() => setEmailForm(true)}
                className="rounded-md border border-warm bg-warm/15 px-4 py-2 text-sm font-medium text-warm transition-colors hover:bg-warm/25"
              >
                Email my shopping list
              </button>
            )}
          </div>

          {/* Email form */}
          {emailForm && !sent && (
            <form onSubmit={handleSendEmail} className="mt-4 flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 rounded-md border border-card-border bg-card-bg px-3 py-2 text-sm text-foreground placeholder:text-foreground-3/50 focus:border-warm focus:outline-none"
              />
              <button
                type="submit"
                disabled={sending}
                className="rounded-md bg-warm px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {sending ? "Sending..." : "Send"}
              </button>
              <button
                type="button"
                onClick={() => setEmailForm(false)}
                className="rounded-md px-3 py-2 text-sm text-foreground-3 hover:text-foreground"
              >
                Cancel
              </button>
            </form>
          )}
          {sent && (
            <p className="mt-3 text-sm font-medium text-accent">
              Shopping list sent! Check your inbox.
            </p>
          )}
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
