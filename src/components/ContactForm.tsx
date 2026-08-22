"use client";

import { useState } from "react";

const SUBJECTS = [
  "General question",
  "I want to share my story",
  "Donation inquiry",
  "Partnership or sponsorship",
  "Media inquiry",
  "Something else",
];

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject || !message.trim()) return;

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject,
          message: message.trim(),
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
        <p className="font-serif text-xl">Message sent.</p>
        <p className="mt-2 text-foreground-2">
          Thank you for reaching out. We&rsquo;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name <span className="text-warm">*</span>
        </label>
        <input
          type="text"
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1.5 block w-full rounded-md border border-rule bg-card-bg px-3 py-2.5 text-foreground placeholder:text-foreground-3 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email <span className="text-warm">*</span>
        </label>
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 block w-full rounded-md border border-rule bg-card-bg px-3 py-2.5 text-foreground placeholder:text-foreground-3 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium">
          What&rsquo;s this about? <span className="text-warm">*</span>
        </label>
        <select
          id="subject"
          required
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="mt-1.5 block w-full rounded-md border border-rule bg-card-bg px-3 py-2.5 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        >
          <option value="" disabled>
            Select a topic
          </option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Message <span className="text-warm">*</span>
        </label>
        <textarea
          id="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="mt-1.5 block w-full rounded-md border border-rule bg-card-bg px-3 py-2.5 text-foreground placeholder:text-foreground-3 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          placeholder="What's on your mind?"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">
          Something went wrong. Please try again or email us directly at{" "}
          <a href="mailto:hello@dadskitchen.org" className="underline">
            hello@dadskitchen.org
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded bg-accent px-6 py-3 text-sm font-semibold text-btn-text transition-colors hover:bg-accent-dark disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>

      <p className="text-xs text-foreground-3">
        We use your information only to respond to your message. We don&rsquo;t
        share your email with third parties.
      </p>
    </form>
  );
}
