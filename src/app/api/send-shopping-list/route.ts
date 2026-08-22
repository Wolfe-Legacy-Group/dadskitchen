import { NextResponse } from "next/server";

interface ShoppingItem {
  name: string;
  quantity: string;
  unit: string;
  cost: string;
}

interface RequestBody {
  email: string;
  recipeName: string;
  recipeSlug: string;
  items: ShoppingItem[];
  alreadyHave: string[];
  totalCost: string;
  multiplier: number;
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 500 }
    );
  }

  const body: RequestBody = await request.json();
  const { email, recipeName, recipeSlug, items, alreadyHave, totalCost, multiplier } = body;

  if (!email || !items?.length) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dadskitchen.org";
  const recipeUrl = `${siteUrl}/recipes/${recipeSlug}`;

  const itemRows = items
    .map(
      (i) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #333;">${i.quantity} ${i.unit} ${i.name}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #333;text-align:right;">~$${i.cost}</td>
        </tr>`
    )
    .join("");

  const batchNote =
    multiplier > 1 ? ` (${multiplier}x batch)` : "";

  const alreadyHaveSection =
    alreadyHave?.length
      ? `<div style="margin:20px 0 0;padding:16px;border-radius:8px;background:#222019;">
          <p style="font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;color:#8a7e6e;margin:0 0 8px;">Already in your kitchen</p>
          <p style="font-size:13px;color:#6b6359;margin:0;">${alreadyHave.join(" &middot; ")}</p>
        </div>`
      : "";

  const batchLinks = [1, 2, 3, 4]
    .filter((b) => b !== multiplier)
    .map(
      (b) =>
        `<a href="${recipeUrl}?batch=${b}" style="color:#d4a574;text-decoration:none;font-weight:bold;">${b}x</a>`
    )
    .join(" &nbsp;&middot;&nbsp; ");

  const html = `
    <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#e8e0d4;background:#1a1714;padding:32px;border-radius:12px;">
      <h1 style="font-size:24px;color:#d4a574;margin:0 0 4px;">Dad's Kitchen</h1>
      <p style="font-size:14px;color:#8a7e6e;margin:0 0 24px;">Your shopping list is ready</p>

      <h2 style="font-size:20px;color:#e8e0d4;margin:0 0 8px;">${recipeName}${batchNote}</h2>
      <p style="font-size:14px;color:#8a7e6e;margin:0 0 20px;">Here's what you still need to pick up:</p>

      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <thead>
          <tr style="color:#8a7e6e;text-transform:uppercase;font-size:11px;letter-spacing:1px;">
            <th style="padding:8px 12px;border-bottom:2px solid #333;text-align:left;">Item</th>
            <th style="padding:8px 12px;border-bottom:2px solid #333;text-align:right;">Est. cost</th>
          </tr>
        </thead>
        <tbody>
          ${itemRows}
        </tbody>
        <tfoot>
          <tr>
            <td style="padding:12px;font-weight:bold;color:#d4a574;">Total</td>
            <td style="padding:12px;font-weight:bold;color:#d4a574;text-align:right;">~$${totalCost}</td>
          </tr>
        </tfoot>
      </table>

      ${alreadyHaveSection}

      <p style="font-size:12px;color:#8a7e6e;margin:16px 0 24px;">
        Prices checked at Walmart.com, Aug 2026. Based on full package costs.
      </p>

      <div style="text-align:center;margin:24px 0;">
        <a href="${recipeUrl}${multiplier > 1 ? `?batch=${multiplier}` : ""}" style="display:inline-block;background:#d4a574;color:#1a1714;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">
          View recipe &amp; start cooking
        </a>
      </div>

      <p style="font-size:13px;color:#8a7e6e;text-align:center;margin:16px 0 0;">
        Need a different batch size? ${batchLinks}
      </p>

      <p style="font-size:13px;color:#8a7e6e;text-align:center;margin:12px 0 0;">
        Don't forget to check out the conversation starters on the recipe page — great questions to ask while you cook together.
      </p>

      <hr style="border:none;border-top:1px solid #333;margin:24px 0;" />
      <p style="font-size:11px;color:#5a5349;text-align:center;margin:0;">
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
      subject: `Your shopping list for ${recipeName}`,
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
