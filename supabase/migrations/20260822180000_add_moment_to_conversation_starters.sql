ALTER TABLE recipe_conversation_starters
ADD COLUMN moment text NOT NULL DEFAULT 'cooking'
CHECK (moment IN ('cooking', 'table'));

INSERT INTO recipe_conversation_starters (recipe_id, question, sort_order, moment) VALUES
-- Cinnamon Sweet Pancakes
('f096da98-5a0d-4bce-b422-160836c755fa', 'What was the hardest part of making these pancakes? What would you do differently next time?', 1, 'table'),
('f096da98-5a0d-4bce-b422-160836c755fa', 'Who taught you something important this year? What did they teach you and why did it matter?', 2, 'table'),
('f096da98-5a0d-4bce-b422-160836c755fa', 'If we could start a Saturday morning tradition together, what would it be?', 3, 'table'),
-- Spicy Honey Salmon Poke Bowl
('5693a2df-ce69-4ebb-8f97-d40cd5a05272', 'What flavor surprised you the most in this bowl? Would you change anything about it?', 1, 'table'),
('5693a2df-ce69-4ebb-8f97-d40cd5a05272', 'Is there a food you used to dislike but now you love? What changed your mind?', 2, 'table'),
('5693a2df-ce69-4ebb-8f97-d40cd5a05272', 'If we could plan a trip somewhere to try the local food, where should we go first?', 3, 'table');
