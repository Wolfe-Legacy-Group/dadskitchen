"use client";

import { useEffect, useState } from "react";
import type {
  Ingredient,
  Step,
  Substitution,
  ConversationStarter,
} from "@/lib/recipes";

const MULTIPLIERS = [1, 2, 3, 4] as const;

const TABS = [
  { key: "convos", label: "Cooking Convos" },
  { key: "ingredients", label: "Ingredients" },
  { key: "steps", label: "Steps" },
  { key: "substitutions", label: "Substitutions" },
  { key: "storage", label: "Storage" },
  { key: "video", label: "Video" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

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
  steps: Step[];
  substitutions: Substitution[];
  conversationStarters: ConversationStarter[];
  safetyNotes: string;
  leftoverTips: string;
}

export function RecipeScaler({
  servings,
  yieldAmount,
  yieldUnit,
  ingredients,
  recipeName,
  recipeSlug,
  steps,
  substitutions,
  conversationStarters,
  safetyNotes,
  leftoverTips,
}: RecipeScalerProps) {
  const [multiplier, setMultiplier] = useState(1);
  const [activeTab, setActiveTab] = useState<TabKey>("ingredients");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [emailForm, setEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [cookingIdx, setCookingIdx] = useState(0);
  const [tableIdx, setTableIdx] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const batch = Number(params.get("batch"));
    if (batch === 2 || batch === 3 || batch === 4) setMultiplier(batch);
  }, []);

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

    const alreadyHave = ingredients
      .filter((i) => checked[i.id])
      .map((i) => `${getScaledQty(i)} ${i.unit} ${i.name}`);

    try {
      const res = await fetch("/api/send-shopping-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          recipeName,
          recipeSlug,
          items,
          alreadyHave,
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

  const cookingStarters = conversationStarters.filter((s) => s.moment === "cooking");
  const tableStarters = conversationStarters.filter((s) => s.moment === "table");

  const visibleTabs = substitutions.length > 0
    ? TABS
    : TABS.filter((t) => t.key !== "substitutions");

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

      {/* Tab bar */}
      <div className="mt-8 flex gap-1 overflow-x-auto border-b border-card-border">
        {visibleTabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "border-warm text-warm"
                : "border-transparent text-foreground-3 hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-6">
        {activeTab === "convos" && (
          <div className="space-y-8">
            {cookingStarters.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-foreground-3">
                  While you cook
                </p>
                <p className="mt-3 text-lg leading-relaxed text-foreground-2">
                  {cookingStarters[cookingIdx]?.question}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() =>
                      setCookingIdx((i) => (i + 1) % cookingStarters.length)
                    }
                    className="rounded-md border border-card-border bg-card-bg px-3 py-1.5 text-sm text-foreground-3 hover:text-foreground"
                  >
                    Next question
                  </button>
                  <span className="text-xs text-foreground-3">
                    {cookingIdx + 1} of {cookingStarters.length}
                  </span>
                </div>
              </div>
            )}

            {tableStarters.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-foreground-3">
                  At the table
                </p>
                <p className="mt-3 text-lg leading-relaxed text-foreground-2">
                  {tableStarters[tableIdx]?.question}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() =>
                      setTableIdx((i) => (i + 1) % tableStarters.length)
                    }
                    className="rounded-md border border-card-border bg-card-bg px-3 py-1.5 text-sm text-foreground-3 hover:text-foreground"
                  >
                    Next question
                  </button>
                  <span className="text-xs text-foreground-3">
                    {tableIdx + 1} of {tableStarters.length}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "ingredients" && (
          <section>
            <div className="flex items-baseline justify-between">
              <h2 className="font-serif text-2xl text-foreground">
                Ingredients
              </h2>
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
                              <p className="text-foreground-2">
                                {ing.storage_tip}
                              </p>
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
        )}

        {activeTab === "steps" && (
          <section>
            {/* Safety notes first */}
            <div className="rounded-lg border border-red-600/20 bg-red-600/5 p-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-red-600">
                Safety notes
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground-2">
                {safetyNotes}
              </p>
            </div>

            <h2 className="mt-8 font-serif text-2xl text-foreground">Steps</h2>
            <div className="mt-4 space-y-4">
              {steps.map((step) => (
                <div key={step.id} className="flex gap-4">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${
                      step.min_age != null ? "bg-accent" : "bg-foreground-3"
                    }`}
                  >
                    {step.step_number}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-foreground-2">{step.instruction}</p>
                    {step.kid_note && (
                      <p className="mt-1 text-sm text-accent">{step.kid_note}</p>
                    )}
                    {step.safety_warning && (
                      <p className="mt-1 text-sm font-medium text-red-600">
                        {step.safety_warning}
                      </p>
                    )}
                    <div className="mt-2 flex gap-2">
                      <AgeChip
                        age={4}
                        active={step.min_age != null && step.min_age <= 4}
                      />
                      <AgeChip
                        age={6}
                        active={step.min_age != null && step.min_age <= 6}
                      />
                      <AgeChip
                        age={8}
                        active={step.min_age != null && step.min_age <= 8}
                      />
                      <span className="rounded-full bg-foreground-3/20 px-2 py-0.5 text-[10px] font-medium text-foreground-2">
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
        )}

        {activeTab === "substitutions" && substitutions.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl text-foreground">
              Substitutions
            </h2>
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
                  {substitutions.map((sub) => (
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

        {activeTab === "storage" && (
          <section>
            <h2 className="font-serif text-2xl text-foreground">Leftovers</h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground-2">
              {leftoverTips}
            </p>
          </section>
        )}

        {activeTab === "video" && (
          <section className="flex flex-col items-center py-8">
            <div className="flex h-48 w-full max-w-md items-center justify-center rounded-lg border-2 border-dashed border-card-border bg-card-bg">
              <svg
                className="h-16 w-16 text-foreground-3/40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </div>
            <p className="mt-4 font-serif text-lg text-foreground-3">
              Coming soon
            </p>
            <p className="mt-1 text-sm text-foreground-3/70">
              A step-by-step cooking video for this recipe is on the way.
            </p>
          </section>
        )}
      </div>
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
