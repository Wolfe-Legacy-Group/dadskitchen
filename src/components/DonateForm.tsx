"use client";

import { useState } from "react";

export function DonateForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setStatus("sending");

    try {
      const res = await fetch("/api/donate-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim() || undefined,
        }),
      });

      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-herb/30 bg-herb/5 p-6 text-center">
        <p className="font-serif text-xl">Thank you for your interest.</p>
        <p className="mt-2 text-foreground-2">
          We&rsquo;ve sent you a confirmation email. You&rsquo;ll receive our
          501(c)(3) documentation soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <label
          htmlFor="donate-name"
          className="block text-sm font-medium text-foreground-2"
        >
          Your name
        </label>
        <input
          id="donate-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full rounded-md border border-rule bg-card-bg px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-3 focus:border-warm focus:outline-none focus:ring-1 focus:ring-warm"
          placeholder="First and last name"
        />
      </div>
      <div>
        <label
          htmlFor="donate-email"
          className="block text-sm font-medium text-foreground-2"
        >
          Email address
        </label>
        <input
          id="donate-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-md border border-rule bg-card-bg px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-3 focus:border-warm focus:outline-none focus:ring-1 focus:ring-warm"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label
          htmlFor="donate-message"
          className="block text-sm font-medium text-foreground-2"
        >
          Message{" "}
          <span className="font-normal text-foreground-3">(optional)</span>
        </label>
        <textarea
          id="donate-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-md border border-rule bg-card-bg px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-3 focus:border-warm focus:outline-none focus:ring-1 focus:ring-warm"
          placeholder="Anything you'd like us to know"
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again or email us at{" "}
          <a href="mailto:perry@wolfelegacies.com" className="underline">
            perry@wolfelegacies.com
          </a>
          .
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded bg-warm px-6 py-3 text-sm font-semibold text-btn-text transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Apply to support"}
      </button>
    </form>
  );
}
