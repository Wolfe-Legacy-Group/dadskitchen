"use client";

import { useRef, useState } from "react";

const SUBJECTS = [
  "General question",
  "I want to share my story",
  "Donation inquiry",
  "Partnership or sponsorship",
  "Media inquiry",
  "Something else",
];

type Field = "name" | "email" | "subject" | "message";
const FIELDS: Field[] = ["name", "email", "subject", "message"];

type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// Returns the error message for a field, or "" when it is valid. Email
// format uses the browser's own type="email" rule.
function fieldError(field: Field, el: FieldElement): string {
  const value = el.value.trim();
  switch (field) {
    case "name":
      return value ? "" : "Please enter your name.";
    case "email":
      if (!value) return "Please enter your email address.";
      return el.validity.typeMismatch
        ? "Please enter a valid email address, like you@example.com."
        : "";
    case "subject":
      return value ? "" : "Please choose a topic.";
    case "message":
      return value ? "" : "Please enter a message.";
  }
}

const INPUT_BASE =
  "mt-1.5 block w-full rounded-md border bg-card-bg px-3 py-2.5 text-foreground focus:outline-none focus:ring-1";
const INPUT_OK = "border-rule focus:border-accent focus:ring-accent";
const INPUT_ERROR =
  "border-red-700 focus:border-red-700 focus:ring-red-700 dark:border-red-400 dark:focus:border-red-400 dark:focus:ring-red-400";
const ERROR_TEXT = "text-red-700 dark:text-red-400";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const fieldRefs = useRef<Partial<Record<Field, FieldElement | null>>>({});

  // Once a field shows an error, re-check it as the user edits so the
  // message clears (or changes) as soon as the value is fixed.
  function revalidate(field: Field, el: FieldElement) {
    if (!errors[field]) return;
    setErrors((prev) => ({ ...prev, [field]: fieldError(field, el) }));
  }

  function fieldClass(field: Field, extra = "") {
    return `${INPUT_BASE} ${errors[field] ? INPUT_ERROR : INPUT_OK} ${extra}`;
  }

  function errorProps(field: Field) {
    return errors[field]
      ? { "aria-invalid": true, "aria-describedby": `${field}-error` }
      : {};
  }

  function errorMessage(field: Field) {
    return errors[field] ? (
      <p id={`${field}-error`} className={`mt-1.5 text-sm ${ERROR_TEXT}`}>
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
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name <span className="text-warm">*</span>
        </label>
        <input
          type="text"
          id="name"
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
          className={fieldClass("name", "placeholder:text-foreground-3")}
          placeholder="Your name"
        />
        {errorMessage("name")}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email <span className="text-warm">*</span>
        </label>
        <input
          type="email"
          id="email"
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
          className={fieldClass("email", "placeholder:text-foreground-3")}
          placeholder="you@example.com"
        />
        {errorMessage("email")}
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium">
          What&rsquo;s this about? <span className="text-warm">*</span>
        </label>
        <select
          id="subject"
          required
          ref={(el) => {
            fieldRefs.current.subject = el;
          }}
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
            revalidate("subject", e.target);
          }}
          {...errorProps("subject")}
          className={fieldClass("subject")}
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
        {errorMessage("subject")}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Message <span className="text-warm">*</span>
        </label>
        <textarea
          id="message"
          required
          ref={(el) => {
            fieldRefs.current.message = el;
          }}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            revalidate("message", e.target);
          }}
          {...errorProps("message")}
          rows={5}
          className={fieldClass("message", "placeholder:text-foreground-3")}
          placeholder="What's on your mind?"
        />
        {errorMessage("message")}
      </div>

      {status === "error" && (
        <p className={`text-sm ${ERROR_TEXT}`}>
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
