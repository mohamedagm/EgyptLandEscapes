"use client";

import { useState, useTransition } from "react";
import { submitContactForm } from "@/lib/contact-actions";

export function ContactForm({ defaultSubject = "" }: { defaultSubject?: string }) {
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        startTransition(async () => {
          const result = await submitContactForm(formData);
          if (result.ok) {
            setStatus("success");
            setMessage(result.message);
            event.currentTarget.reset();
          } else {
            setStatus("error");
            setMessage(result.message);
          }
        });
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Full name</span>
          <input
            name="name"
            required
            className="field-input"
            placeholder="Alex Morgan"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Email</span>
          <input
            name="email"
            type="email"
            required
            className="field-input"
            placeholder="you@email.com"
          />
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-ink">
          Mobile / WhatsApp
        </span>
        <input
          name="phone"
          className="field-input"
          placeholder="+20 ..."
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-ink">Subject</span>
        <input
          name="subject"
          defaultValue={defaultSubject}
          required
          className="field-input"
          placeholder="Tour enquiry"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-ink">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          className="field-input"
          placeholder="Travel month, number of travelers, and interests..."
        />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center rounded-full bg-nile px-6 py-3 text-sm font-semibold text-white transition hover:bg-nile-deep disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Sending..." : "Send message"}
      </button>
      {status !== "idle" ? (
        <p
          className={
            status === "success" ? "text-sm text-nile" : "text-sm text-copper"
          }
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
