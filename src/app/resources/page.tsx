import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Conversation starters, age-appropriate kitchen tasks, and tips for making mealtime matter.",
};

const conversationStarters = [
  "What's something that happened today that surprised you?",
  "If you could have any superpower for just one day, what would you pick?",
  "What's the hardest thing about being your age right now?",
  "Who did you sit with at lunch today, and what did you talk about?",
  "If you could teach me one thing, what would it be?",
  "What's something you're really looking forward to?",
  "If we could go anywhere this weekend, where would you want to go?",
  "What's something a friend did recently that made you feel good?",
  "What do you think I was like when I was your age?",
  "What's one thing you wish grown-ups understood better?",
];

const ageGroups = [
  {
    range: "Ages 3–5",
    tasks: [
      "Washing vegetables",
      "Stirring (with help)",
      "Tearing lettuce",
      "Carrying napkins to the table",
      "Pressing cookie cutters",
      "Pouring pre-measured ingredients",
    ],
  },
  {
    range: "Ages 6–8",
    tasks: [
      "Measuring ingredients",
      "Cracking eggs",
      "Spreading and assembling",
      "Setting the full table",
      "Mixing batter",
      "Using a peeler (with supervision)",
    ],
  },
  {
    range: "Ages 9–11",
    tasks: [
      "Chopping soft foods with a real knife",
      "Following a recipe independently",
      "Using the stove (with supervision)",
      "Making a salad start to finish",
      "Timing multiple dishes",
      "Cleaning up as you go",
    ],
  },
  {
    range: "Ages 12–14",
    tasks: [
      "Planning a meal from a recipe",
      "Grocery shopping from a list",
      "Cooking a full dish independently",
      "Using the oven",
      "Adapting a recipe to taste",
      "Teaching a younger sibling",
    ],
  },
];

export default function Resources() {
  return (
    <>
      {/* Header */}
      <section className="mx-auto max-w-3xl px-6 pb-12 pt-16 md:pt-24">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          Resources
        </p>
        <h1 className="mt-4 font-serif text-4xl tracking-tight md:text-5xl">
          Tools for the table
        </h1>
        <p className="mt-4 max-w-lg text-foreground-2">
          Ideas for what to cook, what to talk about, and what your kid is ready
          to handle in the kitchen.
        </p>
      </section>

      {/* Conversation starters */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <h2 className="font-serif text-2xl md:text-3xl">
          Conversation starters
        </h2>
        <p className="mt-3 text-foreground-2">
          Questions that can&rsquo;t be answered with &ldquo;yes,&rdquo;
          &ldquo;no,&rdquo; or &ldquo;fine.&rdquo;
        </p>
        <ol className="mt-8 space-y-4">
          {conversationStarters.map((q, i) => (
            <li key={i} className="flex gap-4">
              <span className="mt-0.5 shrink-0 text-sm font-semibold tabular-nums text-foreground-3">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-lg">{q}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Age-appropriate tasks */}
      <section className="border-t border-rule">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="font-serif text-2xl md:text-3xl">
            What can they do?
          </h2>
          <p className="mt-3 text-foreground-2">
            Age-appropriate kitchen tasks. Every kid is different — use these as
            a starting point, not a checklist.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {ageGroups.map((group) => (
              <div
                key={group.range}
                className="rounded-lg border border-card-border bg-card-bg p-5"
              >
                <p className="text-sm font-semibold text-accent">
                  {group.range}
                </p>
                <ul className="mt-3 space-y-2">
                  {group.tasks.map((task) => (
                    <li
                      key={task}
                      className="flex items-start gap-2 text-sm text-foreground-2"
                    >
                      <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent/40" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="border-t border-rule bg-surface">
        <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          <h2 className="font-serif text-2xl md:text-3xl">
            Tips from the kitchen
          </h2>
          <div className="mt-8 space-y-6">
            {[
              {
                tip: "Let them make mistakes",
                detail:
                  "Spilled flour is a lesson, not a disaster. The mess cleans up — the memory doesn't.",
              },
              {
                tip: "Start with what they'll eat",
                detail:
                  "Kids are more excited to cook something they actually want to eat. Save the adventurous recipes for later.",
              },
              {
                tip: "Cook side by side, not face to face",
                detail:
                  "The best conversations happen when you're both focused on something else. That's the whole idea.",
              },
              {
                tip: "Don't correct their technique",
                detail:
                  "Unless it's a safety issue, let them do it their way. They'll figure it out — and they'll own it.",
              },
              {
                tip: "Ask the question before you sit down",
                detail:
                  "If you wait until everyone's at the table, you'll get 'fine.' Drop the question while you're still cooking together.",
              },
            ].map((item) => (
              <div key={item.tip}>
                <p className="font-semibold">{item.tip}</p>
                <p className="mt-1 text-foreground-2">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
