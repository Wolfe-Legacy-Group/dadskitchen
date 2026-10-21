"use client";

import { useRef, useState } from "react";

// Same inline-validation pattern as ContactForm (DK-20). The message
// field is optional, so only name and email are checked.
type Field = "name" | "email";
const FIELDS: Field[] = ["name", "email"];

// Returns the error message for a field, or "" when it is valid. Email
// format uses the browser's own type="email" rule.
function fieldError(field: Field, el: HTMLInputElement): string {
  const value = el.value.trim();
  switch (field) {
    case "name":
      return value ? "" : "Please enter your name.";
    case "email":
      if (!value) return "Please enter your email address.";
      return el.validity.typeMismatch
        ? "Please enter a valid email address, like you@example.com."
        : "";
  }
}

const INPUT_BASE =
  "mt-1 w-full rounded-md border bg-card-bg px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-3 focus:outline-none focus:ring-1";
const INPUT_OK = "border-rule focus:border-warm focus:ring-warm";
const INPUT_ERROR =
  "border-red-700 focus:border-red-700 focus:ring-red-700 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-400";
const ERROR_TEXT = "text-red-700 dark:text-red-400";

export function DonateForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const fieldRefs = useRef<Partial<Record<Field, HTMLInputElement | null>>>({});

  // Once a field shows an error, re-check it as the user edits so the
  // message clears (or changes) as soon as the value is fixed.
  function revalidate(field: Field, el: HTMLInputElement) {
    if (!errors[field]) return;
    setErrors((prev) => ({ ...prev, [field]: fieldError(field, el) }));
  }

  function fieldClass(field: Field) {
    return `${INPUT_BASE} ${errors[field] ? INPUT_ERROR : INPUT_OK}`;
  }

  function errorProps(field: Field) {
    return errors[field]
      ? { "aria-invalid": true, "aria-describedby": `donate-${field}-error` }
      : {};
  }

  function errorMessage(field: Field) {
    return errors[field] ? (
      <p id={`donate-${field}-error`} className={`mt-1.5 text-sm ${ERROR_TEXT}`}>
        {errors[field]}
      </p>
    ) : null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const found: Partial<Record<Field, string>> = {};
    for (const field of FIELDS) {
      const el = fieldRefs.current[field];
      const error = el ? fieldError(field, el) : "";
      if (error) found[field] = error;
    }
    setErrors(found);
    const firstInvalid = FIELDS.find((f) => found[f]);
    if (firstInvalid) {
      fieldRefs.current[firstInvalid]?.focus();
      return;
    }

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
    <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
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
          ref={(el) => {
            fieldRefs.current.name = el;
          }}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            revalidate("name", e.target);
          }}
          {...errorProps("name")}
          className={fieldClass("name")}
          placeholder="First and last name"
        />
        {errorMessage("name")}
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
          ref={(el) => {
            fieldRefs.current.email = el;
          }}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            revalidate("email", e.target);
          }}
          {...errorProps("email")}
          className={fieldClass("email")}
          placeholder="you@example.com"
        />
        {errorMessage("email")}
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
        <p className={`text-sm ${ERROR_TEXT}`}>
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
