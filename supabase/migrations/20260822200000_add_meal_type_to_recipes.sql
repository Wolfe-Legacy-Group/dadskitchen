ALTER TABLE recipes
ADD COLUMN meal_type text NOT NULL DEFAULT 'Dinner'
CHECK (meal_type IN ('Breakfast', 'Lunch', 'Dinner', 'Snack'));

UPDATE recipes SET meal_type = 'Breakfast' WHERE slug = 'cinnamon-sweet-pancakes';
UPDATE recipes SET meal_type = 'Lunch' WHERE slug = 'creamy-stovetop-mac-and-cheese';
UPDATE recipes SET meal_type = 'Lunch' WHERE slug = 'mini-pizza-english-muffins';
