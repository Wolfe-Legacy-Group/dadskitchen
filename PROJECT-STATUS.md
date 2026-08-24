# Dad's Kitchen — Project Status

Last updated: 2026-08-24

## Overview

Dad's Kitchen (dadskitchen.org) is the web presence for the Mens Philanthropy Foundation, a 501(c)(3) nonprofit dedicated to strengthening fatherhood through cooking and conversation.

- **Stack**: Next.js (App Router) + TypeScript + Tailwind CSS
- **Database**: Supabase (project: `sgdrwhpsuohhizcxtloy`)
- **Email**: Resend (from `noreply@dadskitchen.org`)
- **Hosting**: Vercel (team: ucperrys-projects, project: dadskitchen)
- **Repo**: github.com/Wolfe-Legacy-Group/dadskitchen (main branch)
- **Dev server**: port 3002

---

## Pages (15 routes)

| Route | Description | Data source |
|---|---|---|
| `/` | Landing page — hero, latest 3 recipes (dynamic), process steps, founder story, CTA | Supabase (ISR 60s) |
| `/about` | Foundation story, mission, team | Static |
| `/about/transparency` | 501(c)(3) status, EIN (placeholder), leadership, policies, fund usage | Static |
| `/blog` | Blog index | Supabase |
| `/blog/[slug]` | Blog post detail | Supabase |
| `/contact` | Contact form (name, email, subject dropdown, message) | Resend API |
| `/get-involved` | Volunteer options + "Apply to Donate" form | Resend API |
| `/process/spread-the-word` | How to help — sharing | Static |
| `/process/participate` | How to help — cooking with your kids | Static |
| `/process/be-an-example` | How to help — posting your experience | Static |
| `/process/guest-chef` | How to help — filming an episode | Static |
| `/recipes` | Searchable recipe index with meal type filter | Supabase (ISR 60s) |
| `/recipes/[slug]` | Full recipe detail — ingredients, steps, costs, conversation starters, substitutions, shopping list | Supabase |
| `/resources` | Resource links for dads | Static |
| `/watch` | Video library (placeholder — no episodes filmed yet) | Static |

## API Routes

| Endpoint | Purpose |
|---|---|
| `POST /api/contact` | Sends contact form submission to perry@wolfelegacies.com via Resend |
| `POST /api/donate-interest` | Sends donation interest confirmation to applicant + notification to Perry |
| `POST /api/send-shopping-list` | Emails a recipe shopping list to the user |

## Components

| Component | Description |
|---|---|
| `Nav.tsx` | Sticky header nav — About, Recipes, Watch, Blog, Resources, Get Involved, Support Us |
| `Footer.tsx` | Site footer — pages, social links, copyright |
| `RecipeScaler.tsx` | Recipe detail tabs — ingredients, steps, shopping list, substitutions, conversation starters, video. Supports batch scaling (1x–4x). ARIA tab semantics. |
| `RecipeSearch.tsx` | Recipe index search + meal type filter |
| `ContactForm.tsx` | Contact form with subject dropdown, validation, success/error states |
| `DonateForm.tsx` | "Apply to Donate" form — sends 501(c)(3) documentation promise |
| `ConversationStarters.tsx` | Displays cooking + table conversation starters for a recipe |
| `BlogSearch.tsx` | Blog search |
| `Logo.tsx` | LogoMark SVG component |

---

## Database (Supabase)

5 tables, all in `public` schema:

| Table | Purpose |
|---|---|
| `recipes` | Core recipe data — title, slug, description, difficulty, times, servings, age range, meal_type, published flag |
| `recipe_ingredients` | Ingredients with quantities, package costs (Walmart), storage tips, prep instructions |
| `recipe_steps` | Step-by-step instructions with kid-friendly flags, safety warnings, min age |
| `recipe_conversation_starters` | Questions for cooking time and table time |
| `recipe_substitutions` | Ingredient swap options with reasons |

### Recipes (9 published)

| Recipe | Type | Difficulty | Time |
|---|---|---|---|
| The Sunday Roast | Dinner | Medium | 95 min |
| No-Bake Peanut Butter Energy Bites | Snack | Medium | 15 min |
| Apple Nachos | Snack | Easy | 10 min |
| Mini Pizza English Muffins | Lunch | Easy | 25 min |
| Creamy Stovetop Mac and Cheese | Lunch | Medium | 25 min |
| Chicken Parmesan with Homemade Marinara | Dinner | Hard | 55 min |
| Build-Your-Own Beef Tacos | Dinner | Easy | 30 min |
| Spicy Honey Salmon Poke Bowl | Dinner | Medium | 30 min |
| Cinnamon Sweet Pancakes | Breakfast | Easy | 25 min |

---

## Design System

- **Fonts**: Lora (serif, headings) + system sans-serif (body)
- **Light tokens**: background #FFFFFF, foreground #1A1A1A, accent/herb #5E6E4B, warm #A06328, surface #F7F7F7
- **Dark tokens**: background #1A1A1A, foreground #F0F0F0, accent #7A8E64, warm #D4944E
- **Brand colors**: Cast Iron #2A2623, Linen #EDE8E0, Herb #5E6E4B, Copper #C17F3E, Smoke #7D7770, Enamel #123862
- **WCAG AA compliant**: foreground-3 and warm tokens updated for 4.5:1+ contrast ratios

## Security Headers (all routes)

- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- X-Frame-Options: DENY
- Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
- Strict-Transport-Security: max-age=63072000; includeSubDomains; preload

## SEO

- `robots.ts` — allows all crawlers, points to sitemap
- `sitemap.ts` — dynamic sitemap with all static pages + all published recipe slugs
- Recipe JSON-LD structured data on every recipe detail page (schema.org Recipe type)

---

## Environment Variables Needed

| Variable | Purpose | Required |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key | Yes |
| `RESEND_API_KEY` | Resend email API key | Yes (for forms) |
| `CONTACT_NOTIFY_EMAIL` | Where contact forms go (default: perry@wolfelegacies.com) | No |
| `DONATE_NOTIFY_EMAIL` | Where donation interests go (default: perry@wolfelegacies.com) | No |

---

## What's Done (evaluation cards DK-11 through DK-24)

- DK-11: Child safeguarding language on guest-chef page
- DK-12: "Support Us" CTA rename (was "Donate")
- DK-13: Homepage H1 fix
- DK-14: robots.txt, sitemap.xml, Recipe JSON-LD structured data
- DK-15: Nonprofit transparency page (EIN placeholder, leadership, policies)
- DK-16: WCAG AA contrast fixes (foreground-3 and warm tokens)
- DK-19: ARIA tab semantics + mobile scroll affordance on recipe tabs
- DK-20: Contact form with validation and Resend integration
- DK-21: Footer 320px overflow fix
- DK-22: Custom 404 page ("Wrong burner")
- DK-23: Security headers via next.config.ts
- DK-24: Prep time duplication bug fix
- Bonus: "Apply to Donate" form with Resend confirmation emails
- Bonus: "Latest recipes" section on landing page (dynamic, 3 most recent)
- Bonus: The Sunday Roast recipe (12 ingredients, 10 steps, 6 conversation starters, 4 substitutions)
- Bonus: Nav reorder (Recipes before Watch)
- Bonus: Removed placeholder "In Production" video section

## What's Remaining

- **DK-17**: Film and publish one authentic flagship video episode (content production, not code)
- **DK-18**: Recipe photography — dish photos and step-by-step images (content production, not code)
- **EIN number**: Transparency page has a placeholder; update when real EIN is available
- **Watch page**: Currently a placeholder; needs real video content from DK-17
- **Blog content**: Blog infrastructure exists but needs posts
- **Ingredient cost audit**: Sunday Roast costs updated to full package prices; other recipes should be spot-checked for the same pattern
- **Email domain**: Resend sends from noreply@dadskitchen.org — verify DNS/DKIM is configured
