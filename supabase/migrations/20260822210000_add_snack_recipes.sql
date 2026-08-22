-- Apple Nachos (Snack - Easy)
INSERT INTO recipes (id, slug, title, description, difficulty, prep_time_minutes, cook_time_minutes, total_time_minutes, servings, kid_age_range, conversation_starter, leftover_tips, safety_notes, published, yield_amount, yield_unit, meal_type) VALUES
('3f8b494c-39dd-4483-832a-1380a6378f31', 'apple-nachos', 'Apple Nachos', 'Crisp apple slices fanned out on a plate and loaded with peanut butter drizzle, granola, chocolate chips, and coconut. No cooking, no heat, no mess — just a snack that looks as fun as it tastes.', 'Easy', 10, 0, 10, 4, '4+', 'What is your favorite snack after school?', 'Apple slices brown quickly once cut. Squeeze a little lemon juice over leftover slices and store in an airtight container in the fridge for up to 1 day. Keep toppings separate until ready to eat.', 'The only sharp tool is the knife for slicing the apples. An adult should handle all cutting. Everything else is safe for all ages.', true, NULL, NULL, 'Snack');

INSERT INTO recipe_ingredients (recipe_id, sort_order, name, quantity, unit, estimated_cost_usd, cost_note, storage_tip, prep_required, prep_time_minutes, quantity_decimal) VALUES
('3f8b494c-39dd-4483-832a-1380a6378f31', 1, 'Apples (Gala, Fuji, or Honeycrisp)', '3', 'medium', 3.48, 'Fresh, sold by the pound (~$1.16 each)', 'Store whole apples in the fridge in the crisper drawer for up to 3 weeks.', 'Wash, core, and slice thin (~5 min). Squeeze lemon juice over slices to prevent browning.', 5, 3),
('3f8b494c-39dd-4483-832a-1380a6378f31', 2, 'Peanut butter', '3', 'tablespoons', 2.98, 'Great Value Creamy, 16 oz jar', 'Keep in the pantry before opening. Refrigerate after opening for longer shelf life, or keep at room temperature and use within 3 months.', 'Microwave for 15-20 seconds to make it drizzleable (~1 min)', 1, 3),
('3f8b494c-39dd-4483-832a-1380a6378f31', 3, 'Granola', '1/4', 'cup', 3.28, 'Great Value Oats & Honey, 18 oz bag', 'Reseal the bag tightly. Keeps in a cool, dry pantry for 2-3 months.', 'None', NULL, 0.25),
('3f8b494c-39dd-4483-832a-1380a6378f31', 4, 'Mini chocolate chips', '2', 'tablespoons', 2.48, 'Great Value Semi-Sweet, 12 oz bag', 'Reseal the bag. Store in a cool, dry pantry for up to a year.', 'None', NULL, 2),
('3f8b494c-39dd-4483-832a-1380a6378f31', 5, 'Shredded coconut', '2', 'tablespoons', 1.98, 'Great Value Sweetened, 14 oz bag', 'Reseal tightly and store in the pantry for up to 6 months, or refrigerate for up to 8 months.', 'None', NULL, 2),
('3f8b494c-39dd-4483-832a-1380a6378f31', 6, 'Honey', '1', 'tablespoon', 4.28, 'Great Value Clover, 12 oz bottle', 'Honey does not expire. Store at room temperature. If it crystallizes, warm the jar in hot water.', 'None', NULL, 1),
('3f8b494c-39dd-4483-832a-1380a6378f31', 7, 'Lemon', '1/2', 'whole', 0.38, 'Fresh, sold individually', 'Wrap the cut half tightly in plastic wrap. Refrigerate for up to 3 days.', 'Squeeze juice over apple slices to prevent browning', NULL, 0.5);

INSERT INTO recipe_steps (recipe_id, step_number, instruction, is_kid_friendly, kid_note, safety_warning, min_age) VALUES
('3f8b494c-39dd-4483-832a-1380a6378f31', 1, 'Wash the apples. Cut them in half, remove the cores, and slice each half into thin wedges.', false, NULL, 'Adult only. The knife and coring are sharp work.', NULL),
('3f8b494c-39dd-4483-832a-1380a6378f31', 2, 'Squeeze lemon juice over the apple slices and toss gently. This keeps them from turning brown.', true, 'Kids can squeeze the lemon — show them how to cup their hand underneath to catch seeds. Explain why the lemon works: the acid slows down oxidation.', NULL, 4),
('3f8b494c-39dd-4483-832a-1380a6378f31', 3, 'Fan the apple slices out on a large plate or platter in a single layer, overlapping slightly like nachos.', true, 'Let kids arrange the slices however they want. The messier the better — this is their plate.', NULL, 4),
('3f8b494c-39dd-4483-832a-1380a6378f31', 4, 'Warm the peanut butter in the microwave for 15-20 seconds until it is thin enough to drizzle.', true, 'Ages 6+ can microwave with supervision. Check that the bowl is not too hot before handing it over.', NULL, 6),
('3f8b494c-39dd-4483-832a-1380a6378f31', 5, 'Drizzle the warm peanut butter over the apple slices using a spoon or fork, zigzagging back and forth.', true, 'This is the fun part. Show them the zigzag technique — hold the spoon high and let the peanut butter fall in thin streams.', NULL, 4),
('3f8b494c-39dd-4483-832a-1380a6378f31', 6, 'Sprinkle the granola, mini chocolate chips, and shredded coconut over the top. Drizzle with honey.', true, 'Let each person sprinkle their own toppings. Set out small bowls so everyone can choose what they want and how much.', NULL, 4),
('3f8b494c-39dd-4483-832a-1380a6378f31', 7, 'Serve immediately — pick up slices with your hands, just like nachos.', true, 'Remind everyone: fingers are the only utensil you need.', NULL, 4);

INSERT INTO recipe_conversation_starters (recipe_id, question, sort_order, moment) VALUES
('3f8b494c-39dd-4483-832a-1380a6378f31', 'If you could only eat one fruit for the rest of your life, which one would you pick?', 1, 'cooking'),
('3f8b494c-39dd-4483-832a-1380a6378f31', 'What is the weirdest food combination you actually like?', 2, 'cooking'),
('3f8b494c-39dd-4483-832a-1380a6378f31', 'If you opened a snack shop, what would you sell and what would you name it?', 3, 'cooking'),
('3f8b494c-39dd-4483-832a-1380a6378f31', 'What topping was your favorite? What would you add next time?', 1, 'table'),
('3f8b494c-39dd-4483-832a-1380a6378f31', 'What is something that made you laugh really hard this week?', 2, 'table'),
('3f8b494c-39dd-4483-832a-1380a6378f31', 'If you could hang out with anyone for a whole afternoon, who would it be and what would you do?', 3, 'table');

INSERT INTO recipe_substitutions (recipe_id, original_ingredient, substitution, reason) VALUES
('3f8b494c-39dd-4483-832a-1380a6378f31', 'Peanut butter', 'Sunflower seed butter or almond butter', 'Nut allergy or preference'),
('3f8b494c-39dd-4483-832a-1380a6378f31', 'Granola', 'Crushed graham crackers or cereal', 'Different texture or what you have on hand'),
('3f8b494c-39dd-4483-832a-1380a6378f31', 'Mini chocolate chips', 'Dried cranberries or raisins', 'Less sugar or different flavor'),
('3f8b494c-39dd-4483-832a-1380a6378f31', 'Honey', 'Maple syrup or caramel sauce', 'Vegan or different flavor');

-- No-Bake Peanut Butter Energy Bites (Snack - Medium)
INSERT INTO recipes (id, slug, title, description, difficulty, prep_time_minutes, cook_time_minutes, total_time_minutes, servings, kid_age_range, conversation_starter, leftover_tips, safety_notes, published, yield_amount, yield_unit, meal_type) VALUES
('575ca781-c9bd-4608-96bb-0b819f3d7b52', 'no-bake-peanut-butter-energy-bites', 'No-Bake Peanut Butter Energy Bites', 'Chewy little bites packed with oats, peanut butter, honey, and chocolate chips — mixed in one bowl and rolled by hand. No oven needed. Kids love rolling them, and they disappear fast.', 'Medium', 15, 0, 15, 6, '4+', 'What gives you energy when you are tired?', 'Store in an airtight container in the fridge for up to 1 week. They also freeze well — place on a baking sheet to freeze individually, then transfer to a freezer bag for up to 2 months. Let them sit for 5 minutes at room temperature before eating.', 'Honey is sticky and can be a choking hazard for children under 1 year old — do not serve to infants. No heat is used in this recipe. If you have a peanut allergy in the household, substitute sunflower seed butter.', true, 20, 'bites', 'Snack');

INSERT INTO recipe_ingredients (recipe_id, sort_order, name, quantity, unit, estimated_cost_usd, cost_note, storage_tip, prep_required, prep_time_minutes, quantity_decimal) VALUES
('575ca781-c9bd-4608-96bb-0b819f3d7b52', 1, 'Old-fashioned rolled oats', '1 1/2', 'cups', 2.78, 'Great Value, 42 oz canister', 'Reseal the canister or transfer to an airtight container. Keeps in a dry pantry for over a year.', 'None', NULL, 1.5),
('575ca781-c9bd-4608-96bb-0b819f3d7b52', 2, 'Peanut butter', '1/2', 'cup', 2.98, 'Great Value Creamy, 16 oz jar', 'Keep in the pantry before opening. Refrigerate after opening for longer shelf life, or keep at room temperature and use within 3 months.', 'None', NULL, 0.5),
('575ca781-c9bd-4608-96bb-0b819f3d7b52', 3, 'Honey', '1/3', 'cup', 4.28, 'Great Value Clover, 12 oz bottle', 'Honey does not expire. Store at room temperature. If it crystallizes, warm the jar in hot water.', 'None', NULL, 0.333),
('575ca781-c9bd-4608-96bb-0b819f3d7b52', 4, 'Mini chocolate chips', '1/3', 'cup', 2.48, 'Great Value Semi-Sweet, 12 oz bag', 'Reseal the bag. Store in a cool, dry pantry for up to a year.', 'None', NULL, 0.333),
('575ca781-c9bd-4608-96bb-0b819f3d7b52', 5, 'Ground flaxseed', '2', 'tablespoons', 3.47, 'Great Value, 16 oz bag', 'Reseal and refrigerate after opening. Use within 3 months for best freshness.', 'None', NULL, 2),
('575ca781-c9bd-4608-96bb-0b819f3d7b52', 6, 'Vanilla extract', '1', 'teaspoon', 5.12, 'Great Value Pure, 2 fl oz bottle', 'Keep the cap on tight. Store in a cool, dark spot like a pantry or cabinet. Lasts 2+ years.', 'None', NULL, 1),
('575ca781-c9bd-4608-96bb-0b819f3d7b52', 7, 'Salt', '1/4', 'teaspoon', 0.97, 'Great Value Iodized, 26 oz', 'Keep in the original container. Salt does not expire.', 'None', NULL, 0.25);

INSERT INTO recipe_steps (recipe_id, step_number, instruction, is_kid_friendly, kid_note, safety_warning, min_age) VALUES
('575ca781-c9bd-4608-96bb-0b819f3d7b52', 1, 'In a large bowl, combine the oats, mini chocolate chips, ground flaxseed, and salt. Stir to mix evenly.', true, 'Kids can measure and pour each ingredient into the bowl. Let them stir with a big spoon.', NULL, 4),
('575ca781-c9bd-4608-96bb-0b819f3d7b52', 2, 'Add the peanut butter, honey, and vanilla extract. Stir everything together until the mixture is thick and evenly combined. It will be sticky.', true, 'This takes some arm strength. Let kids take turns stirring. If the mixture is too dry, add a teaspoon more honey. If too sticky, add a tablespoon more oats.', NULL, 4),
('575ca781-c9bd-4608-96bb-0b819f3d7b52', 3, 'Cover the bowl and refrigerate for 15-20 minutes. This makes the mixture easier to roll.', true, 'While you wait, this is a great time for conversation starters. Kids can help clean up the measuring cups and spoons.', NULL, 4),
('575ca781-c9bd-4608-96bb-0b819f3d7b52', 4, 'Lightly dampen your hands with water to keep the mixture from sticking. Scoop about 1 tablespoon of mixture and roll it between your palms into a ball.', true, 'This is the star step. Show them the rolling technique — gentle pressure, round and round. Dampening hands is the secret. Expect some to be lumpy — that is fine.', NULL, 4),
('575ca781-c9bd-4608-96bb-0b819f3d7b52', 5, 'Place each finished bite on a parchment-lined plate or baking sheet. You should get about 20 bites.', true, 'Let kids count as they go. It is a sneaky math lesson.', NULL, 4),
('575ca781-c9bd-4608-96bb-0b819f3d7b52', 6, 'Refrigerate the bites for at least 30 minutes to firm up before serving.', true, 'Hard part: waiting. Set a timer together and find something to do while they chill.', NULL, 4);

INSERT INTO recipe_conversation_starters (recipe_id, question, sort_order, moment) VALUES
('575ca781-c9bd-4608-96bb-0b819f3d7b52', 'What do you grab for a snack when you get home from school? Would you change it?', 1, 'cooking'),
('575ca781-c9bd-4608-96bb-0b819f3d7b52', 'If you could invent a new flavor of anything — ice cream, chips, candy — what would it be?', 2, 'cooking'),
('575ca781-c9bd-4608-96bb-0b819f3d7b52', 'What is something you made with your own hands that you were really proud of?', 3, 'cooking'),
('575ca781-c9bd-4608-96bb-0b819f3d7b52', 'How do these compare to store-bought snack bars? What is different?', 1, 'table'),
('575ca781-c9bd-4608-96bb-0b819f3d7b52', 'What is something you want to get better at? How would you practice?', 2, 'table'),
('575ca781-c9bd-4608-96bb-0b819f3d7b52', 'If you could teach a younger kid one thing, what would it be?', 3, 'table');

INSERT INTO recipe_substitutions (recipe_id, original_ingredient, substitution, reason) VALUES
('575ca781-c9bd-4608-96bb-0b819f3d7b52', 'Peanut butter', 'Sunflower seed butter or almond butter', 'Nut allergy or preference'),
('575ca781-c9bd-4608-96bb-0b819f3d7b52', 'Honey', 'Maple syrup or agave', 'Vegan option'),
('575ca781-c9bd-4608-96bb-0b819f3d7b52', 'Mini chocolate chips', 'Dried cranberries, raisins, or chopped dates', 'Less sugar or different flavor'),
('575ca781-c9bd-4608-96bb-0b819f3d7b52', 'Ground flaxseed', 'Chia seeds or hemp hearts', 'Different nutrition profile or availability');
