import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

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
        <ContactForm />
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
