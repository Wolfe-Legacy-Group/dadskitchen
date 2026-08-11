import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Dad's Kitchen and the Mens Philanthropy Foundation.",
};

export default function Contact() {
  return (
    <>
      {/* Header */}
      <section className="mx-auto max-w-xl px-6 pb-12 pt-16 md:pt-24">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          Contact
        </p>
        <h1 className="mt-4 font-serif text-4xl tracking-tight md:text-5xl">
          Get in touch
        </h1>
        <p className="mt-4 text-foreground-2">
          Have a question, want to share your story, or interested in supporting
          the foundation? We&rsquo;d love to hear from you.
        </p>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-xl px-6 pb-16">
        <form className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1.5 block w-full rounded-md border border-rule bg-card-bg px-3 py-2.5 text-foreground placeholder:text-foreground-3 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              placeholder="Your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1.5 block w-full rounded-md border border-rule bg-card-bg px-3 py-2.5 text-foreground placeholder:text-foreground-3 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium"
            >
              What&rsquo;s this about?
            </label>
            <select
              id="subject"
              name="subject"
              className="mt-1.5 block w-full rounded-md border border-rule bg-card-bg px-3 py-2.5 text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              defaultValue=""
            >
              <option value="" disabled>
                Select a topic
              </option>
              <option>General question</option>
              <option>I want to share my story</option>
              <option>Donation inquiry</option>
              <option>Partnership or sponsorship</option>
              <option>Media inquiry</option>
              <option>Something else</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="mt-1.5 block w-full rounded-md border border-rule bg-card-bg px-3 py-2.5 text-foreground placeholder:text-foreground-3 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              placeholder="What's on your mind?"
            />
          </div>

          <button
            type="submit"
            className="rounded bg-accent px-6 py-3 text-sm font-semibold text-btn-text transition-colors hover:bg-accent-dark"
          >
            Send message
          </button>
        </form>
      </section>

      {/* Direct contact */}
      <section className="border-t border-rule bg-surface">
        <div className="mx-auto max-w-xl px-6 py-12 text-center">
          <p className="text-sm text-foreground-2">
            You can also reach us directly at{" "}
            <a
              href="mailto:hello@dadskitchen.org"
              className="font-medium text-accent-dark hover:text-foreground"
            >
              hello@dadskitchen.org
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
