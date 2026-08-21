-- Recipe system schema for Dad's Kitchen

create table recipes (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null,
  difficulty text not null check (difficulty in ('Easy', 'Medium', 'Hard')),
  prep_time_minutes int not null,
  cook_time_minutes int not null,
  total_time_minutes int not null,
  servings int not null,
  kid_age_range text not null,
  conversation_starter text not null,
  leftover_tips text not null,
  safety_notes text not null,
  image_url text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table recipe_ingredients (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references recipes(id) on delete cascade,
  sort_order int not null,
  name text not null,
  quantity text not null,
  unit text not null,
  estimated_cost_usd numeric(6,2) not null,
  cost_note text,
  storage_tip text not null,
  prep_required text not null,
  prep_time_minutes int
);

create table recipe_steps (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references recipes(id) on delete cascade,
  step_number int not null,
  instruction text not null,
  is_kid_friendly boolean not null default true,
  kid_note text,
  safety_warning text
);

create table recipe_substitutions (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references recipes(id) on delete cascade,
  original_ingredient text not null,
  substitution text not null,
  reason text not null
);

create index idx_recipes_slug on recipes(slug);
create index idx_recipes_published on recipes(published);
create index idx_recipe_ingredients_recipe on recipe_ingredients(recipe_id, sort_order);
create index idx_recipe_steps_recipe on recipe_steps(recipe_id, step_number);
create index idx_recipe_substitutions_recipe on recipe_substitutions(recipe_id);

alter table recipes enable row level security;
alter table recipe_ingredients enable row level security;
alter table recipe_steps enable row level security;
alter table recipe_substitutions enable row level security;

create policy "Public read access for published recipes"
  on recipes for select using (published = true);

create policy "Public read access for published recipe ingredients"
  on recipe_ingredients for select
  using (exists (select 1 from recipes where recipes.id = recipe_ingredients.recipe_id and recipes.published = true));

create policy "Public read access for published recipe steps"
  on recipe_steps for select
  using (exists (select 1 from recipes where recipes.id = recipe_steps.recipe_id and recipes.published = true));

create policy "Public read access for published recipe substitutions"
  on recipe_substitutions for select
  using (exists (select 1 from recipes where recipes.id = recipe_substitutions.recipe_id and recipes.published = true));
