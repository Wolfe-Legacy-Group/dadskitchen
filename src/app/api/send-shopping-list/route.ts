import { NextResponse } from "next/server";
import { getRecipeBySlug, type Ingredient } from "@/lib/recipes";
import { escapeHtml } from "@/lib/escape-html";

interface RequestBody {
  email: string;
  recipeSlug: string;
  multiplier: number;
  checkedIngredientIds: string[];
}

const EMAIL_MAX = 254;
const EMAIL_PATTERN = /^[^\s@<>()",;:\\]+@[^\s@<>()",;:\\]+\.[^\s@<>()",;:\\]+$/;
const SLUG_PATTERN = /^[a-z0-9-]{1,100}$/;
const MAX_CHECKED_IDS = 200;

// Per-instance limit; resets on cold start. Durable limiting is a follow-up.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const sendsByIp = new Map<string, number[]>();

function clientIp(request: Request): string {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

function recentSends(ip: string, now: number): number[] {
  if (sendsByIp.size > 1000) {
    for (const [key, times] of sendsByIp) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) sendsByIp.delete(key);
    }
  }
  return (sendsByIp.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
}

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

// Mirrors toFraction in RecipeScaler so the email matches the on-page list.
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

function scaledQty(ing: Ingredient, multiplier: number): string {
  return multiplier === 1
    ? ing.quantity
    : ing.quantity_decimal
      ? toFraction(ing.quantity_decimal * multiplier)
      : ing.quantity;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 500 }
    );
  }

  let body: Partial<RequestBody>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { recipeSlug, multiplier, checkedIngredientIds = [] } = body ?? {};
  const email = typeof body?.email === "string" ? body.email.trim() : undefined;

  if (
    !email ||
    email.length > EMAIL_MAX ||
    !EMAIL_PATTERN.test(email)
  ) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (typeof recipeSlug !== "string" || !SLUG_PATTERN.test(recipeSlug)) {
    return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
  }
  if (
    typeof multiplier !== "number" ||
    !Number.isInteger(multiplier) ||
    multiplier < 1 ||
    multiplier > 4
  ) {
    return NextResponse.json({ error: "Invalid batch size" }, { status: 400 });
  }
  if (
    !Array.isArray(checkedIngredientIds) ||
    checkedIngredientIds.length > MAX_CHECKED_IDS ||
    !checkedIngredientIds.every((id) => typeof id === "string")
  ) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const ip = clientIp(request);
  const now = Date.now();
  const sends = recentSends(ip, now);
  if (sends.length >= RATE_LIMIT) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  const recipe = await getRecipeBySlug(recipeSlug);
  if (!recipe) {
    return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
  }

  const checked = new Set(checkedIngredientIds);
  const needed = recipe.ingredients.filter((i) => !checked.has(i.id));
  const have = recipe.ingredients.filter((i) => checked.has(i.id));

  if (!needed.length) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  sendsByIp.set(ip, [...sends, now]);

  const recipeName = recipe.title;
  const totalCost = needed
    .reduce((sum, i) => sum + Number(i.estimated_cost_usd) * multiplier, 0)
    .toFixed(2);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dadskitchen.org";
  const recipeUrl = escapeHtml(
    `${siteUrl}/recipes/${encodeURIComponent(recipe.slug)}`
  );

  const itemRows = needed
    .map(
      (i) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e0d6c8;">${escapeHtml(`${scaledQty(i, multiplier)} ${i.unit} ${i.name}`)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e0d6c8;text-align:right;">~$${(Number(i.estimated_cost_usd) * multiplier).toFixed(2)}</td>
        </tr>`
    )
    .join("");

  const batchNote =
    multiplier > 1 ? ` (${multiplier}x batch)` : "";

  const alreadyHaveSection =
    have.length
      ? `<div style="margin:20px 0 0;padding:16px;border-radius:8px;background:#f5f0e8;">
          <p style="font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;color:#8a7e6e;margin:0 0 8px;">Already in your kitchen</p>
          <p style="font-size:13px;color:#6b5d4f;margin:0;">${have
            .map((i) => escapeHtml(`${scaledQty(i, multiplier)} ${i.unit} ${i.name}`))
            .join(" &middot; ")}</p>
        </div>`
      : "";

  const batchLinks = [1, 2, 3, 4]
    .filter((b) => b !== multiplier)
    .map(
      (b) =>
        `<a href="${recipeUrl}?batch=${b}" style="color:#b8834a;text-decoration:none;font-weight:bold;">${b}x</a>`
    )
    .join(" &nbsp;&middot;&nbsp; ");

  const html = `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#2c2416;background:#ffffff;padding:32px;border-radius:12px;">
      <h1 style="font-size:24px;color:#b8834a;margin:0 0 4px;">Dad's Kitchen</h1>
      <p style="font-size:14px;color:#8a7e6e;margin:0 0 24px;">Your shopping list is ready</p>

      <h2 style="font-size:20px;color:#2c2416;margin:0 0 8px;">${escapeHtml(recipeName)}${batchNote}</h2>
      <p style="font-size:14px;color:#6b5d4f;margin:0 0 20px;">Here's what you still need to pick up:</p>

      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <thead>
          <tr style="color:#8a7e6e;text-transform:uppercase;font-size:11px;letter-spacing:1px;">
            <th style="padding:8px 12px;border-bottom:2px solid #e0d6c8;text-align:left;">Item</th>
            <th style="padding:8px 12px;border-bottom:2px solid #e0d6c8;text-align:right;">Est. cost</th>
          </tr>
        </thead>
        <tbody>
          ${itemRows}
        </tbody>
        <tfoot>
          <tr>
            <td style="padding:12px;font-weight:bold;color:#b8834a;">Total</td>
            <td style="padding:12px;font-weight:bold;color:#b8834a;text-align:right;">~$${totalCost}</td>
          </tr>
        </tfoot>
      </table>

      ${alreadyHaveSection}

      <p style="font-size:12px;color:#8a7e6e;margin:16px 0 24px;">
        Prices checked at Walmart.com, Aug 2026. Based on full package costs.
      </p>

      <div style="text-align:center;margin:24px 0;">
        <a href="${recipeUrl}${multiplier > 1 ? `?batch=${multiplier}` : ""}" style="display:inline-block;background:#b8834a;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">
          View recipe &amp; start cooking
        </a>
      </div>

      <p style="font-size:13px;color:#6b5d4f;text-align:center;margin:16px 0 0;">
        Need a different batch size? ${batchLinks}
      </p>

      <p style="font-size:13px;color:#8a7e6e;text-align:center;margin:12px 0 0;">
        Don't forget to check out the conversation starters on the recipe page — great questions to ask while you cook together.
      </p>

      <hr style="border:none;border-top:1px solid #e0d6c8;margin:24px 0;" />
      <p style="font-size:11px;color:#8a7e6e;text-align:center;margin:0;">
        Dad's Kitchen — A program of the Mens Philanthropy Foundation<br/>
        Strengthening fathers through the kitchen
      </p>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Dad's Kitchen <noreply@dadskitchen.org>",
      to: email,
      subject: `Your shopping list for ${recipeName.replace(/[\r\n]+/g, " ")}`,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Resend error:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
