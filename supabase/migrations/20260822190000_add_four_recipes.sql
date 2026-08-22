-- Chicken Parmesan with Homemade Marinara (Dinner - Hard)
INSERT INTO recipes (id, slug, title, description, difficulty, prep_time_minutes, cook_time_minutes, total_time_minutes, servings, kid_age_range, conversation_starter, leftover_tips, safety_notes, published, yield_amount, yield_unit) VALUES
('36f9b0db-076e-4548-a782-9bebae39c42b', 'chicken-parmesan-homemade-marinara', 'Chicken Parmesan with Homemade Marinara', 'Golden, crispy chicken cutlets topped with melted mozzarella and a rich marinara you make from scratch. The breading station is a hands-on highlight for kids, and the kitchen smells incredible.', 'Hard', 30, 45, 75, 4, '6+', 'What is the hardest thing you have ever made?', 'Wrap individual portions in foil and refrigerate for up to 3 days. Reheat in a 350°F oven for 15 minutes to keep the breading crispy. Leftover marinara freezes well for up to 3 months in an airtight container.', 'Hot oil is used for pan-frying the chicken. An adult must handle all frying. Keep kids well back from the stove during frying. The oven reaches 400°F for finishing — an adult should handle all oven work. Use a meat thermometer to confirm chicken reaches 165°F internal temperature.', true, 4, 'pieces');

INSERT INTO recipe_ingredients (recipe_id, sort_order, name, quantity, unit, estimated_cost_usd, cost_note, storage_tip, prep_required, prep_time_minutes, quantity_decimal) VALUES
('36f9b0db-076e-4548-a782-9bebae39c42b', 1, 'Boneless skinless chicken breasts', '4', 'pieces', 8.47, 'Great Value, ~3 lb pack', 'Refrigerate and use within 2 days of purchase, or freeze individually wrapped for up to 6 months.', 'Pound each breast to even 1/2-inch thickness between plastic wrap (~5 min)', 5, 4),
('36f9b0db-076e-4548-a782-9bebae39c42b', 2, 'All-purpose flour', '1/2', 'cup', 2.38, 'Great Value, 5 lb bag', 'Seal the bag or transfer to an airtight container. Store in a cool, dry pantry for up to 8 months.', 'None', NULL, 0.5),
('36f9b0db-076e-4548-a782-9bebae39c42b', 3, 'Eggs', '2', 'large', 1.67, 'Great Value Large White, 12 count', 'Keep refrigerated in the original carton. Use by the date on the package.', 'Beat in a shallow bowl (~1 min)', 1, 2),
('36f9b0db-076e-4548-a782-9bebae39c42b', 4, 'Italian breadcrumbs', '1', 'cup', 1.98, 'Great Value, 15 oz canister', 'Keep sealed in a cool, dry pantry. Stays fresh for about 6 months after opening.', 'None', NULL, 1),
('36f9b0db-076e-4548-a782-9bebae39c42b', 5, 'Grated Parmesan cheese', '1/2', 'cup', 3.47, 'Great Value, 8 oz canister', 'Refrigerate after opening. Use within 6 weeks.', 'None', NULL, 0.5),
('36f9b0db-076e-4548-a782-9bebae39c42b', 6, 'Shredded mozzarella cheese', '1 1/2', 'cups', 2.78, 'Great Value, 8 oz bag', 'Reseal the bag and refrigerate. Use within 5 days of opening or freeze for up to 3 months.', 'None', NULL, 1.5),
('36f9b0db-076e-4548-a782-9bebae39c42b', 7, 'Canned crushed tomatoes', '1', '28 oz can', 1.28, 'Great Value, 28 oz', 'Transfer unused tomatoes to a container and refrigerate for up to 5 days, or freeze for 3 months.', 'None', NULL, 1),
('36f9b0db-076e-4548-a782-9bebae39c42b', 8, 'Garlic', '3', 'cloves', 0.50, 'Fresh, 1 head', 'Store the whole head in a cool, dry spot. Individual cloves last about 10 days once separated.', 'Peel and mince (~3 min)', 3, 3),
('36f9b0db-076e-4548-a782-9bebae39c42b', 9, 'Olive oil', '3', 'tablespoons', 3.97, 'Great Value, 17 oz bottle', 'Keep the cap sealed. Store in a cool, dark spot. Good for about a year.', 'None', NULL, 3),
('36f9b0db-076e-4548-a782-9bebae39c42b', 10, 'Vegetable oil', '1/2', 'cup', 3.82, 'Great Value, 48 oz bottle', 'Keep the cap sealed. Store in a cool, dark pantry. Good for about a year after opening.', 'For pan-frying the chicken', NULL, 0.5),
('36f9b0db-076e-4548-a782-9bebae39c42b', 11, 'Dried basil', '1', 'teaspoon', 1.27, 'Great Value, 0.62 oz', 'Keep the lid tightly sealed. Store in a cool, dark place. Stays potent for about a year.', 'None', NULL, 1),
('36f9b0db-076e-4548-a782-9bebae39c42b', 12, 'Dried oregano', '1', 'teaspoon', 1.27, 'Great Value, 0.75 oz', 'Keep the lid tightly sealed. Store in a cool, dark place. Stays potent for about a year.', 'None', NULL, 1),
('36f9b0db-076e-4548-a782-9bebae39c42b', 13, 'Salt', '1', 'teaspoon', 0.97, 'Great Value Iodized, 26 oz', 'Keep in the original container. Salt does not expire.', 'None', NULL, 1),
('36f9b0db-076e-4548-a782-9bebae39c42b', 14, 'Black pepper', '1/2', 'teaspoon', 2.98, 'Great Value, 3 oz container', 'Keep the lid sealed. Store in a cool, dry spot. Stays potent for 2-3 years.', 'None', NULL, 0.5);

INSERT INTO recipe_steps (recipe_id, step_number, instruction, is_kid_friendly, kid_note, safety_warning, min_age) VALUES
('36f9b0db-076e-4548-a782-9bebae39c42b', 1, 'Preheat the oven to 400°F. Line a baking sheet with foil or parchment paper.', false, NULL, 'Adult only. The oven gets very hot.', NULL),
('36f9b0db-076e-4548-a782-9bebae39c42b', 2, 'Place each chicken breast between two sheets of plastic wrap. Use a meat mallet or rolling pin to pound them to an even 1/2-inch thickness.', false, NULL, 'Adult only. Requires firm pressure and a heavy tool.', NULL),
('36f9b0db-076e-4548-a782-9bebae39c42b', 3, 'Set up the breading station: put flour in one shallow dish, beaten eggs in a second, and breadcrumbs mixed with Parmesan in a third. Season each dish with a pinch of salt and pepper.', true, 'This is the star step for kids. Let them set up the three dishes and mix the breadcrumbs and Parmesan together with a fork.', NULL, 6),
('36f9b0db-076e-4548-a782-9bebae39c42b', 4, 'Coat each chicken breast: press into flour on both sides, dip in egg, then press firmly into the breadcrumb mixture. Set on a plate.', true, 'Ages 6+ can do the full breading line — one hand for dry, one hand for wet keeps things manageable. Younger kids can press the breadcrumbs on.', NULL, 6),
('36f9b0db-076e-4548-a782-9bebae39c42b', 5, 'Heat the vegetable oil in a large oven-safe skillet over medium-high heat until it shimmers, about 2-3 minutes.', false, NULL, 'Adult only. Hot oil can splatter and cause serious burns. Keep kids well back.', NULL),
('36f9b0db-076e-4548-a782-9bebae39c42b', 6, 'Carefully place the breaded chicken in the hot oil. Cook without moving for 3-4 minutes until the bottom is golden brown, then flip and cook 3-4 minutes on the other side.', false, NULL, 'Adult only. The oil is very hot and will splatter. Use tongs and stand back.', NULL),
('36f9b0db-076e-4548-a782-9bebae39c42b', 7, 'While the chicken fries, make the marinara. Heat olive oil in a saucepan over medium heat. Add the minced garlic and cook for 30 seconds until fragrant.', false, NULL, 'Adult handles the hot pan. Kids can help in the next step.', NULL),
('36f9b0db-076e-4548-a782-9bebae39c42b', 8, 'Pour in the crushed tomatoes, basil, oregano, salt, and pepper. Stir and let simmer for 15 minutes, stirring occasionally.', true, 'Ages 8+ can stir the sauce gently with a long spoon. Younger kids can measure and pour in the spices before the simmering starts.', 'The sauce bubbles and can splatter. Use a long spoon and keep faces back.', 8),
('36f9b0db-076e-4548-a782-9bebae39c42b', 9, 'Transfer the fried chicken to the prepared baking sheet. Spoon marinara sauce over each piece.', true, 'Kids can spoon the sauce over the chicken carefully. It is still hot, so supervise closely.', NULL, 8),
('36f9b0db-076e-4548-a782-9bebae39c42b', 10, 'Top each piece with a generous handful of shredded mozzarella.', true, 'Everyone can pile on the cheese — the more the better.', NULL, 4),
('36f9b0db-076e-4548-a782-9bebae39c42b', 11, 'Bake at 400°F for 10-12 minutes until the cheese is melted and bubbly and the chicken reaches 165°F internally.', false, NULL, 'Adult only. Use a meat thermometer to check temperature. The baking sheet is very hot.', NULL),
('36f9b0db-076e-4548-a782-9bebae39c42b', 12, 'Let rest for 5 minutes before serving. Spoon extra marinara alongside.', true, 'Kids can help plate by spooning extra sauce onto the plate next to the chicken.', NULL, 6);

INSERT INTO recipe_conversation_starters (recipe_id, question, sort_order, moment) VALUES
('36f9b0db-076e-4548-a782-9bebae39c42b', 'Have you ever tried to cook something that seemed really hard? What happened?', 1, 'cooking'),
('36f9b0db-076e-4548-a782-9bebae39c42b', 'If you could eat dinner at any restaurant in the world tonight, where would you go?', 2, 'cooking'),
('36f9b0db-076e-4548-a782-9bebae39c42b', 'What is the messiest thing you have ever done in a kitchen? Was it worth it?', 3, 'cooking'),
('36f9b0db-076e-4548-a782-9bebae39c42b', 'What part of cooking this meal made you feel the most proud? Why?', 1, 'table'),
('36f9b0db-076e-4548-a782-9bebae39c42b', 'If you could teach someone one thing you learned today, what would it be?', 2, 'table'),
('36f9b0db-076e-4548-a782-9bebae39c42b', 'What is something hard that you stuck with and it turned out great?', 3, 'table');

INSERT INTO recipe_substitutions (recipe_id, original_ingredient, substitution, reason) VALUES
('36f9b0db-076e-4548-a782-9bebae39c42b', 'Chicken breasts', 'Chicken cutlets or thinly sliced chicken thighs', 'Skips the pounding step'),
('36f9b0db-076e-4548-a782-9bebae39c42b', 'Italian breadcrumbs', 'Panko breadcrumbs mixed with 1 tsp Italian seasoning', 'Extra crispy texture'),
('36f9b0db-076e-4548-a782-9bebae39c42b', 'Mozzarella cheese', 'Provolone slices', 'Sharper flavor, melts well'),
('36f9b0db-076e-4548-a782-9bebae39c42b', 'Canned crushed tomatoes', 'Jarred marinara sauce (24 oz)', 'Saves 15 minutes — skip the sauce-making step');

-- Build-Your-Own Beef Tacos (Dinner - Easy)
INSERT INTO recipes (id, slug, title, description, difficulty, prep_time_minutes, cook_time_minutes, total_time_minutes, servings, kid_age_range, conversation_starter, leftover_tips, safety_notes, published, yield_amount, yield_unit) VALUES
('ab25bb7d-bb88-4e89-9be9-a76526559079', 'build-your-own-beef-tacos', 'Build-Your-Own Beef Tacos', 'Seasoned ground beef, warm tortillas, and a spread of toppings everyone picks from. A perfect first-cook recipe — simple enough that the kids run the assembly line.', 'Easy', 10, 15, 25, 6, '4+', 'What is the best meal you have ever had?', 'Store leftover seasoned beef in an airtight container in the fridge for up to 3 days. Reheat in a skillet over medium heat. Keep toppings separate and refrigerated. Leftover beef works great in quesadillas, nachos, or scrambled eggs the next day.', 'The skillet gets hot when browning the beef. An adult should handle all stovetop cooking. Keep kids back from the stove and handle draining the grease carefully — hot grease can splash and burn.', true, 12, 'tacos');

INSERT INTO recipe_ingredients (recipe_id, sort_order, name, quantity, unit, estimated_cost_usd, cost_note, storage_tip, prep_required, prep_time_minutes, quantity_decimal) VALUES
('ab25bb7d-bb88-4e89-9be9-a76526559079', 1, 'Ground beef (80/20)', '1', 'lb', 5.97, 'Great Value, 1 lb roll', 'Refrigerate and use within 2 days of purchase, or freeze in original packaging for up to 4 months.', 'None', NULL, 1),
('ab25bb7d-bb88-4e89-9be9-a76526559079', 2, 'Taco seasoning', '1', 'packet', 0.78, 'Great Value, 1 oz packet', 'Store unused packets in a cool, dry pantry. Stays good for over a year.', 'None', NULL, 1),
('ab25bb7d-bb88-4e89-9be9-a76526559079', 3, 'Small flour tortillas', '12', 'tortillas', 2.68, 'Great Value, 10-count pack (buy 2)', 'Reseal and refrigerate after opening. Use within 7 days, or freeze for up to 3 months.', 'Warm in a dry skillet or wrapped in damp paper towels in microwave (~2 min)', 2, 12),
('ab25bb7d-bb88-4e89-9be9-a76526559079', 4, 'Shredded cheddar cheese', '1', 'cup', 2.78, 'Great Value, 8 oz bag', 'Reseal the bag and refrigerate. Use within 5 days of opening or freeze for up to 3 months.', 'None', NULL, 1),
('ab25bb7d-bb88-4e89-9be9-a76526559079', 5, 'Iceberg lettuce', '2', 'cups shredded', 1.68, 'Fresh, 1 head', 'Wrap the remaining head in a damp paper towel inside a plastic bag. Refrigerate for up to 7 days.', 'Wash, dry, and shred or tear into small pieces (~3 min)', 3, 2),
('ab25bb7d-bb88-4e89-9be9-a76526559079', 6, 'Tomato', '2', 'medium', 1.28, 'Fresh, sold by the pound', 'Store at room temperature until ripe. Once ripe, refrigerate and use within 3-4 days.', 'Wash and dice (~3 min)', 3, 2),
('ab25bb7d-bb88-4e89-9be9-a76526559079', 7, 'Sour cream', '1/2', 'cup', 1.48, 'Great Value, 16 oz tub', 'Refrigerate after opening. Use within 2 weeks.', 'None', NULL, 0.5),
('ab25bb7d-bb88-4e89-9be9-a76526559079', 8, 'Salsa', '1/2', 'cup', 2.18, 'Great Value Mild Chunky, 24 oz jar', 'Refrigerate after opening. Use within 2 weeks.', 'None', NULL, 0.5),
('ab25bb7d-bb88-4e89-9be9-a76526559079', 9, 'Lime', '1', 'whole', 0.38, 'Fresh, sold individually', 'Store at room temperature for up to a week, or refrigerate for up to 2 weeks.', 'Cut into wedges (~1 min)', 1, 1),
('ab25bb7d-bb88-4e89-9be9-a76526559079', 10, 'Vegetable oil', '1', 'tablespoon', 3.82, 'Great Value, 48 oz bottle', 'Keep the cap sealed. Store in a cool, dark pantry. Good for about a year after opening.', 'None', NULL, 1);

INSERT INTO recipe_steps (recipe_id, step_number, instruction, is_kid_friendly, kid_note, safety_warning, min_age) VALUES
('ab25bb7d-bb88-4e89-9be9-a76526559079', 1, 'Prep the toppings: wash and shred the lettuce, dice the tomatoes, and cut the lime into wedges. Arrange everything in small bowls on the table.', true, 'Ages 4+ can tear lettuce into small pieces. Ages 8+ can dice tomatoes with supervision. Let everyone set up the topping bar.', NULL, 4),
('ab25bb7d-bb88-4e89-9be9-a76526559079', 2, 'Heat the vegetable oil in a large skillet over medium-high heat.', false, NULL, 'Adult only. The pan gets very hot.', NULL),
('ab25bb7d-bb88-4e89-9be9-a76526559079', 3, 'Add the ground beef to the skillet. Break it up with a spatula or wooden spoon and cook for 6-8 minutes until no pink remains.', false, NULL, 'Adult only. Hot grease can splatter. Keep kids back from the stove.', NULL),
('ab25bb7d-bb88-4e89-9be9-a76526559079', 4, 'Carefully drain any excess grease from the skillet. Return to medium heat.', false, NULL, 'Adult only. Hot grease is dangerous. Tilt the pan carefully and drain into a heat-safe container, never down the sink.', NULL),
('ab25bb7d-bb88-4e89-9be9-a76526559079', 5, 'Add the taco seasoning packet and 1/3 cup water to the beef. Stir and let simmer for 3-4 minutes until the sauce thickens.', true, 'Ages 6+ can pour in the seasoning packet and measure the water. An adult stirs since the pan is hot.', NULL, 6),
('ab25bb7d-bb88-4e89-9be9-a76526559079', 6, 'Warm the tortillas: heat a dry skillet over medium heat and warm each tortilla for about 30 seconds per side, or wrap a stack in damp paper towels and microwave for 30-45 seconds.', true, 'Ages 8+ can use the microwave method. The skillet method is for adults.', NULL, 8),
('ab25bb7d-bb88-4e89-9be9-a76526559079', 7, 'Set up the assembly line: seasoned beef, warm tortillas, and all the topping bowls. Let everyone build their own tacos.', true, 'This is the main event. Let kids spoon their own meat, pick their toppings, and squeeze their own lime. Remind them less is more — overstuffed tacos fall apart.', NULL, 4),
('ab25bb7d-bb88-4e89-9be9-a76526559079', 8, 'Squeeze fresh lime juice over each taco and serve immediately.', true, 'Kids love squeezing limes. Show them how to cup their hand under to catch seeds.', NULL, 4);

INSERT INTO recipe_conversation_starters (recipe_id, question, sort_order, moment) VALUES
('ab25bb7d-bb88-4e89-9be9-a76526559079', 'If you could add any topping in the world to a taco, even something weird, what would it be?', 1, 'cooking'),
('ab25bb7d-bb88-4e89-9be9-a76526559079', 'What is the spiciest thing you have ever eaten? Could you handle it?', 2, 'cooking'),
('ab25bb7d-bb88-4e89-9be9-a76526559079', 'If our family had a food truck, what would we serve and what would we name it?', 3, 'cooking'),
('ab25bb7d-bb88-4e89-9be9-a76526559079', 'What is something you are really good at that most people do not know about?', 1, 'table'),
('ab25bb7d-bb88-4e89-9be9-a76526559079', 'If you could have dinner with anyone — alive or from history — who would you pick and what would you ask them?', 2, 'table'),
('ab25bb7d-bb88-4e89-9be9-a76526559079', 'What is one thing you wish we did together more often?', 3, 'table');

INSERT INTO recipe_substitutions (recipe_id, original_ingredient, substitution, reason) VALUES
('ab25bb7d-bb88-4e89-9be9-a76526559079', 'Ground beef', 'Ground turkey or ground chicken', 'Lower fat option'),
('ab25bb7d-bb88-4e89-9be9-a76526559079', 'Flour tortillas', 'Corn tortillas or hard taco shells', 'Gluten-free or preference'),
('ab25bb7d-bb88-4e89-9be9-a76526559079', 'Sour cream', 'Plain Greek yogurt', 'Higher protein, similar tang'),
('ab25bb7d-bb88-4e89-9be9-a76526559079', 'Iceberg lettuce', 'Shredded cabbage or romaine', 'More crunch or more nutrition');

-- Creamy Stovetop Mac and Cheese (Lunch - Medium)
INSERT INTO recipes (id, slug, title, description, difficulty, prep_time_minutes, cook_time_minutes, total_time_minutes, servings, kid_age_range, conversation_starter, leftover_tips, safety_notes, published, yield_amount, yield_unit) VALUES
('00c3d6d1-c077-4011-9be8-d6b3ab331f12', 'creamy-stovetop-mac-and-cheese', 'Creamy Stovetop Mac and Cheese', 'Rich, velvety cheese sauce made from a real roux — no powder packets. Kids stir the sauce and watch it transform from milk into something magical. Better than the box, and now they know why.', 'Medium', 5, 20, 25, 6, '4+', 'What is your favorite comfort food?', 'Refrigerate leftovers in an airtight container for up to 3 days. To reheat, add a splash of milk and warm over medium-low heat, stirring often, until creamy again. Mac and cheese thickens as it cools — the extra milk brings it back.', 'The pot of boiling water is the biggest hazard. An adult must handle draining the pasta. Keep kids back from the stove when the water is boiling. The cheese sauce is hot — let it cool a few minutes before serving to young children.', true, NULL, NULL);

INSERT INTO recipe_ingredients (recipe_id, sort_order, name, quantity, unit, estimated_cost_usd, cost_note, storage_tip, prep_required, prep_time_minutes, quantity_decimal) VALUES
('00c3d6d1-c077-4011-9be8-d6b3ab331f12', 1, 'Elbow macaroni', '1', 'lb box', 1.18, 'Great Value, 16 oz box', 'Reseal the box or transfer to an airtight container. Keeps in a dry pantry for over a year.', 'None', NULL, 1),
('00c3d6d1-c077-4011-9be8-d6b3ab331f12', 2, 'Unsalted butter', '4', 'tablespoons', 3.06, 'Great Value, 16 oz (4 sticks)', 'Wrap remaining sticks tightly and refrigerate for up to 2 months, or freeze for up to 6 months.', 'None', NULL, 4),
('00c3d6d1-c077-4011-9be8-d6b3ab331f12', 3, 'All-purpose flour', '3', 'tablespoons', 2.38, 'Great Value, 5 lb bag', 'Seal the bag or transfer to an airtight container. Store in a cool, dry pantry for up to 8 months.', 'None', NULL, 3),
('00c3d6d1-c077-4011-9be8-d6b3ab331f12', 4, 'Whole milk', '2 1/2', 'cups', 2.92, 'Great Value Whole Vitamin D, 1 gallon', 'Refrigerate immediately. Use within 7 days of opening.', 'None', NULL, 2.5),
('00c3d6d1-c077-4011-9be8-d6b3ab331f12', 5, 'Sharp cheddar cheese', '3', 'cups shredded', 4.47, 'Great Value Sharp Cheddar Block, 16 oz (buy 2)', 'Wrap remaining cheese tightly in plastic wrap or reseal. Refrigerate for up to 3 weeks.', 'Shred from a block using a box grater (~5 min)', 5, 3),
('00c3d6d1-c077-4011-9be8-d6b3ab331f12', 6, 'Dijon mustard', '1', 'teaspoon', 1.97, 'Great Value, 12 oz bottle', 'Refrigerate after opening. Lasts about a year.', 'None', NULL, 1),
('00c3d6d1-c077-4011-9be8-d6b3ab331f12', 7, 'Garlic powder', '1/2', 'teaspoon', 1.27, 'Great Value, 3.12 oz', 'Keep the lid sealed. Store in a cool, dry place. Stays potent for about a year.', 'None', NULL, 0.5),
('00c3d6d1-c077-4011-9be8-d6b3ab331f12', 8, 'Salt', '1', 'teaspoon', 0.97, 'Great Value Iodized, 26 oz', 'Keep in the original container. Salt does not expire.', 'None', NULL, 1),
('00c3d6d1-c077-4011-9be8-d6b3ab331f12', 9, 'Black pepper', '1/4', 'teaspoon', 2.98, 'Great Value, 3 oz container', 'Keep the lid sealed. Store in a cool, dry spot. Stays potent for 2-3 years.', 'None', NULL, 0.25);

INSERT INTO recipe_steps (recipe_id, step_number, instruction, is_kid_friendly, kid_note, safety_warning, min_age) VALUES
('00c3d6d1-c077-4011-9be8-d6b3ab331f12', 1, 'Bring a large pot of salted water to a rolling boil.', false, NULL, 'Adult only. The pot is heavy and the water is extremely hot.', NULL),
('00c3d6d1-c077-4011-9be8-d6b3ab331f12', 2, 'Cook the elbow macaroni according to the package directions until al dente, usually about 7-8 minutes. Drain and set aside.', false, NULL, 'Adult only. Draining a heavy pot of boiling water is the most dangerous step.', NULL),
('00c3d6d1-c077-4011-9be8-d6b3ab331f12', 3, 'While the pasta cooks, shred the cheddar cheese using a box grater if using a block.', true, 'Ages 8+ can grate cheese with supervision — show them to keep fingers away from the grater and stop when the piece gets small. Younger kids can use pre-shredded.', NULL, 8),
('00c3d6d1-c077-4011-9be8-d6b3ab331f12', 4, 'In the same pot over medium heat, melt the butter. Once melted and foamy, add the flour and whisk constantly for 1-2 minutes until it turns light golden. This is your roux.', true, 'Ages 8+ can whisk the roux with an adult standing close by. Explain that a roux is the secret to creamy sauces — flour and butter cooked together thicken everything they touch.', 'The roux is hot. Use a long whisk and keep hands back.', 8),
('00c3d6d1-c077-4011-9be8-d6b3ab331f12', 5, 'Slowly pour in the milk while whisking constantly. The mixture will thicken after 4-5 minutes of gentle stirring.', true, 'Kids can slowly pour the milk from a measuring cup while an adult whisks, or take over whisking once the milk is in. Watch the sauce transform — that is the roux doing its job.', NULL, 6),
('00c3d6d1-c077-4011-9be8-d6b3ab331f12', 6, 'Remove the pot from heat. Stir in the shredded cheddar cheese a handful at a time, stirring until each batch melts completely before adding more.', true, 'This is the best step for kids. They add the cheese, stir, and watch it disappear into the sauce. Add the Dijon mustard and garlic powder here too.', NULL, 4),
('00c3d6d1-c077-4011-9be8-d6b3ab331f12', 7, 'Add the Dijon mustard, garlic powder, salt, and pepper. Stir until smooth.', true, 'Let kids measure and pour in each seasoning. Taste and adjust — this is where they learn to season to their own preference.', NULL, 4),
('00c3d6d1-c077-4011-9be8-d6b3ab331f12', 8, 'Add the drained pasta to the cheese sauce and fold gently until every noodle is coated. Serve immediately.', true, 'Kids can do the final fold with a big spoon. Remind them to be gentle — stirring too hard breaks the noodles.', NULL, 4);

INSERT INTO recipe_conversation_starters (recipe_id, question, sort_order, moment) VALUES
('00c3d6d1-c077-4011-9be8-d6b3ab331f12', 'What is a food you could eat every single day and never get tired of?', 1, 'cooking'),
('00c3d6d1-c077-4011-9be8-d6b3ab331f12', 'If you could mix any two foods together to make something new, what would you combine?', 2, 'cooking'),
('00c3d6d1-c077-4011-9be8-d6b3ab331f12', 'What is the best thing about cooking with someone instead of cooking alone?', 3, 'cooking'),
('00c3d6d1-c077-4011-9be8-d6b3ab331f12', 'What is something that happened today that you want to remember when you are older?', 1, 'table'),
('00c3d6d1-c077-4011-9be8-d6b3ab331f12', 'If you could learn any skill overnight — anything at all — what would you pick?', 2, 'table'),
('00c3d6d1-c077-4011-9be8-d6b3ab331f12', 'What makes our family different from other families, in a good way?', 3, 'table');

INSERT INTO recipe_substitutions (recipe_id, original_ingredient, substitution, reason) VALUES
('00c3d6d1-c077-4011-9be8-d6b3ab331f12', 'Sharp cheddar cheese', 'Gruyère, Colby, or a mix of both', 'Different flavor profiles'),
('00c3d6d1-c077-4011-9be8-d6b3ab331f12', 'Whole milk', 'Oat milk or 2% milk', 'Dairy-free or lighter option'),
('00c3d6d1-c077-4011-9be8-d6b3ab331f12', 'Unsalted butter', 'Olive oil (same amount)', 'Dairy-free'),
('00c3d6d1-c077-4011-9be8-d6b3ab331f12', 'Elbow macaroni', 'Cavatappi, shells, or penne', 'Different shapes hold sauce differently — all work'),
('00c3d6d1-c077-4011-9be8-d6b3ab331f12', 'All-purpose flour', 'Gluten-free 1:1 baking flour', 'Gluten-free');

-- Mini Pizza English Muffins (Lunch - Easy)
INSERT INTO recipes (id, slug, title, description, difficulty, prep_time_minutes, cook_time_minutes, total_time_minutes, servings, kid_age_range, conversation_starter, leftover_tips, safety_notes, published, yield_amount, yield_unit) VALUES
('18a9437e-f8c9-451e-a3ab-fd8cfd97fb07', 'mini-pizza-english-muffins', 'Mini Pizza English Muffins', 'Split, spread, top, and toast — personal pizzas in under 15 minutes. Every step is kid-sized, and everyone gets to pick their own toppings. The ultimate "I made it myself" lunch.', 'Easy', 10, 5, 15, 4, '4+', 'If you could put anything on a pizza, what would it be?', 'These are best fresh but you can refrigerate assembled, unbaked muffins covered in plastic wrap for up to 1 day. Pop them in the oven when ready. Fully cooked mini pizzas reheat well in a toaster oven for 3-4 minutes.', 'The oven or toaster oven gets very hot. An adult should handle putting the baking sheet in and taking it out. The cheese and sauce are very hot right out of the oven — let them cool for 2-3 minutes before anyone takes a bite.', true, 8, 'mini pizzas');

INSERT INTO recipe_ingredients (recipe_id, sort_order, name, quantity, unit, estimated_cost_usd, cost_note, storage_tip, prep_required, prep_time_minutes, quantity_decimal) VALUES
('18a9437e-f8c9-451e-a3ab-fd8cfd97fb07', 1, 'English muffins', '4', 'whole', 2.48, 'Great Value, 6-count pack', 'Store at room temperature for 3-4 days, or freeze in the bag for up to 3 months.', 'Split in half with a fork (~2 min)', 2, 4),
('18a9437e-f8c9-451e-a3ab-fd8cfd97fb07', 2, 'Pizza sauce', '1/2', 'cup', 1.28, 'Great Value, 14 oz can', 'Transfer unused sauce to an airtight container and refrigerate for up to 5 days, or freeze for 3 months.', 'None', NULL, 0.5),
('18a9437e-f8c9-451e-a3ab-fd8cfd97fb07', 3, 'Shredded mozzarella cheese', '1 1/2', 'cups', 2.78, 'Great Value, 8 oz bag', 'Reseal the bag and refrigerate. Use within 5 days of opening or freeze for up to 3 months.', 'None', NULL, 1.5),
('18a9437e-f8c9-451e-a3ab-fd8cfd97fb07', 4, 'Pepperoni slices', '24', 'slices', 2.98, 'Great Value, 6 oz pack', 'Reseal and refrigerate. Use within 7 days of opening.', 'None', NULL, 24),
('18a9437e-f8c9-451e-a3ab-fd8cfd97fb07', 5, 'Green bell pepper', '1/2', 'medium', 0.98, 'Fresh, sold individually', 'Wrap the remaining half tightly in plastic wrap. Refrigerate for up to 5 days.', 'Wash, remove seeds, and dice into small pieces (~3 min)', 3, 0.5),
('18a9437e-f8c9-451e-a3ab-fd8cfd97fb07', 6, 'Black olives', '1/4', 'cup sliced', 1.28, 'Great Value, 2.25 oz can', 'Transfer remaining olives and liquid to a container. Refrigerate and use within 5 days.', 'Drain and slice if whole (~2 min)', 2, 0.25),
('18a9437e-f8c9-451e-a3ab-fd8cfd97fb07', 7, 'Dried oregano', '1/2', 'teaspoon', 1.27, 'Great Value, 0.75 oz', 'Keep the lid tightly sealed. Store in a cool, dark place. Stays potent for about a year.', 'None', NULL, 0.5);

INSERT INTO recipe_steps (recipe_id, step_number, instruction, is_kid_friendly, kid_note, safety_warning, min_age) VALUES
('18a9437e-f8c9-451e-a3ab-fd8cfd97fb07', 1, 'Preheat the oven to 375°F. Line a baking sheet with foil or parchment paper.', false, NULL, 'Adult only. The oven gets very hot.', NULL),
('18a9437e-f8c9-451e-a3ab-fd8cfd97fb07', 2, 'Split each English muffin in half using a fork to separate the halves. Place all 8 halves cut-side up on the baking sheet.', true, 'Ages 4+ can help pull apart the muffin halves. Using a fork to start the split is easier than a knife and gives a better texture for the sauce to grip.', NULL, 4),
('18a9437e-f8c9-451e-a3ab-fd8cfd97fb07', 3, 'Spoon about 1 tablespoon of pizza sauce onto each muffin half. Use the back of the spoon to spread it to the edges.', true, 'Perfect for all ages. Show them the spreading technique — start in the middle and push outward in circles. A little mess is fine.', NULL, 4),
('18a9437e-f8c9-451e-a3ab-fd8cfd97fb07', 4, 'Sprinkle shredded mozzarella over each muffin, covering the sauce.', true, 'Let everyone top their own pizzas. Kids love being in charge of the cheese.', NULL, 4),
('18a9437e-f8c9-451e-a3ab-fd8cfd97fb07', 5, 'Add toppings: pepperoni slices, diced bell pepper, sliced olives, or whatever each person wants. Sprinkle a pinch of oregano on top.', true, 'This is the creative part. Let each person pick their own toppings and place them however they want. Every pizza is different and that is the point.', NULL, 4),
('18a9437e-f8c9-451e-a3ab-fd8cfd97fb07', 6, 'Bake for 8-10 minutes until the cheese is melted and bubbly and the muffin edges are golden and crispy.', false, NULL, 'Adult only. The baking sheet is very hot. Use oven mitts.', NULL),
('18a9437e-f8c9-451e-a3ab-fd8cfd97fb07', 7, 'Let cool for 2-3 minutes on the baking sheet before serving. The cheese and sauce are very hot right out of the oven.', true, 'Remind kids to wait — the cheese is lava-hot for the first couple of minutes. Count to 60 together twice.', 'The cheese and sauce retain extreme heat. Do not let young children grab them right away.', 4);

INSERT INTO recipe_conversation_starters (recipe_id, question, sort_order, moment) VALUES
('18a9437e-f8c9-451e-a3ab-fd8cfd97fb07', 'If you could design the perfect pizza with unlimited toppings, what would be on it?', 1, 'cooking'),
('18a9437e-f8c9-451e-a3ab-fd8cfd97fb07', 'Would you rather eat the same lunch every day for a year or never eat your favorite food again?', 2, 'cooking'),
('18a9437e-f8c9-451e-a3ab-fd8cfd97fb07', 'What is the funniest thing that has happened at school or home this week?', 3, 'cooking'),
('18a9437e-f8c9-451e-a3ab-fd8cfd97fb07', 'What do you like best about the pizza you made? Would you change anything next time?', 1, 'table'),
('18a9437e-f8c9-451e-a3ab-fd8cfd97fb07', 'If you could plan our whole weekend, what would we do from start to finish?', 2, 'table'),
('18a9437e-f8c9-451e-a3ab-fd8cfd97fb07', 'What is something nice someone did for you recently that made your day?', 3, 'table');

INSERT INTO recipe_substitutions (recipe_id, original_ingredient, substitution, reason) VALUES
('18a9437e-f8c9-451e-a3ab-fd8cfd97fb07', 'English muffins', 'Bagel halves or naan bread', 'Different base, same idea'),
('18a9437e-f8c9-451e-a3ab-fd8cfd97fb07', 'Pizza sauce', 'Pesto or alfredo sauce', 'Different flavor direction'),
('18a9437e-f8c9-451e-a3ab-fd8cfd97fb07', 'Mozzarella cheese', 'Cheddar, Monterey Jack, or a Mexican blend', 'Preference or what you have on hand'),
('18a9437e-f8c9-451e-a3ab-fd8cfd97fb07', 'Pepperoni', 'Turkey pepperoni, ham, or skip for veggie-only', 'Lighter option or dietary preference');
