"use client";

import { useState } from "react";

interface Starter {
  id: string;
  question: string;
  sort_order: number;
}

export function ConversationStarters({ starters }: { starters: Starter[] }) {
  const [index, setIndex] = useState(0);

  if (starters.length === 0) return null;

  const current = starters[index];

  function cycle() {
    setIndex((i) => (i + 1) % starters.length);
  }

  return (
    <div className="mt-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-warm">
        Conversation starter
      </p>
      <div className="mt-3 flex items-start gap-4 rounded-lg border-l-4 border-warm bg-warm/5 p-5">
        <p className="flex-1 font-serif text-lg text-foreground">
          {current.question}
        </p>
        {starters.length > 1 && (
          <button
            onClick={cycle}
            className="shrink-0 rounded-full p-2 text-warm transition-colors hover:bg-warm/10"
            aria-label="Next conversation starter"
            title="Try another question"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 21h5v-5" />
            </svg>
          </button>
        )}
      </div>
      <p className="mt-2 text-xs text-foreground-3">
        {index + 1} of {starters.length}
      </p>
    </div>
  );
}
