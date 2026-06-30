"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/content/site";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Honeypot: real users never fill this hidden field.
    if (data.company) {
      setStatus("success");
      form.reset();
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-sm border border-line bg-surface p-8 text-center">
        <p className="font-serif text-2xl text-ink">Thank you!</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Your message is on its way. I&apos;ll be in touch within 1–2 business
          days.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="link-underline mt-5 text-sm font-medium text-ink"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full border-b border-line bg-transparent py-3 text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent";

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="eyebrow mb-2 block">Name</span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="eyebrow mb-2 block">Email</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@email.com"
            className={inputClass}
          />
        </label>
      </div>

      <label className="block">
        <span className="eyebrow mb-2 block">Project type</span>
        <select name="projectType" className={`${inputClass} cursor-pointer`}>
          <option>Full-Service Interior Design</option>
          <option>Furnishing &amp; Styling</option>
          <option>Design Consultation</option>
          <option>Not sure yet</option>
        </select>
      </label>

      <label className="block">
        <span className="eyebrow mb-2 block">Tell me about your space</span>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="A few words about your rooms, your style, and what you're hoping for…"
          className={`${inputClass} resize-none`}
        />
      </label>

      {/* Honeypot — visually hidden, ignored by humans, filled by bots. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === "error" && (
        <p className="text-sm text-red-700" role="alert">
          {error} You can also email{" "}
          <a className="link-underline" href={`mailto:${site.email}`}>
            directly
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-ink px-8 py-3.5 text-sm font-medium text-bg shadow-sm transition-all duration-300 ease-soft hover:-translate-y-0.5 hover:bg-accent hover:shadow-md active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-sm"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>

      <p className="mt-4 text-xs leading-relaxed text-muted">
        Your details are only used to reply to you, never sold or shared. See
        our{" "}
        <Link
          href="/privacy"
          className="link-underline text-ink/80 hover:text-accent"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
