"use client";

import { useMemo, useState, useTransition } from "react";
import { submitCustomizeForm } from "@/app/customize/actions";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import {
  buildCustomizeWhatsAppMessage,
  type CustomizePayload,
} from "@/lib/customize";
import { ArrivalCountdown } from "@/components/premium/ArrivalCountdown";

const interestOptions = [
  "Pyramids & museums",
  "Nile cruise",
  "Luxor temples",
  "Desert camping",
  "Red Sea beach",
  "Family pacing",
  "Luxury hotels",
  "Photography focus",
];

const destinationOptions = [
  "Cairo & Giza",
  "Luxor",
  "Aswan",
  "Abu Simbel",
  "Hurghada",
  "Sharm El Sheikh",
  "White Desert",
  "Alexandria",
];

const fieldClass = "field-input";

export function CustomizeForm() {
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [destinations, setDestinations] = useState<string[]>([]);
  const [arrivalDate, setArrivalDate] = useState("");

  const whatsappPreview = useMemo(() => {
    return buildCustomizeWhatsAppMessage({
      name: "Traveler",
      email: "you@email.com",
      phone: "",
      travelMonth: "",
      adults: "",
      children: "",
      duration: "",
      hotelLevel: "",
      budget: "",
      interests,
      destinations,
      message: "",
    });
  }, [interests, destinations]);

  function toggle(list: string[], value: string, setter: (v: string[]) => void) {
    setter(
      list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value],
    );
  }

  return (
    <form
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        const payload: CustomizePayload = {
          name: String(formData.get("name") || "").trim(),
          email: String(formData.get("email") || "").trim(),
          phone: String(formData.get("phone") || "").trim(),
          travelMonth:
            String(formData.get("travelMonth") || "").trim() ||
            (arrivalDate
              ? `Approximate arrival ${arrivalDate}`
              : ""),
          adults: String(formData.get("adults") || "").trim(),
          children: String(formData.get("children") || "").trim(),
          duration: String(formData.get("duration") || "").trim(),
          hotelLevel: String(formData.get("hotelLevel") || "").trim(),
          budget: String(formData.get("budget") || "").trim(),
          interests,
          destinations,
          message: String(formData.get("message") || "").trim(),
        };

        startTransition(async () => {
          const result = await submitCustomizeForm(payload);
          if (!result.ok) {
            setStatus("error");
            setStatusMessage(result.message);
            return;
          }

          setStatus("success");
          setStatusMessage(result.message);

          const wa = buildWhatsAppUrl(buildCustomizeWhatsAppMessage(payload));
          window.open(wa, "_blank", "noopener,noreferrer");
          form.reset();
          setInterests([]);
          setDestinations([]);
          setArrivalDate("");
        });
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Full name *</span>
          <input name="name" required className={fieldClass} placeholder="Alex Morgan" />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Email *</span>
          <input
            name="email"
            type="email"
            required
            className={fieldClass}
            placeholder="you@email.com"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">
            Mobile / WhatsApp
          </span>
          <input name="phone" className={fieldClass} placeholder="+20 ..." />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">
            Travel month / dates
          </span>
          <input
            name="travelMonth"
            className={fieldClass}
            placeholder="e.g. March 2027 or 12–22 Oct"
          />
        </label>
      </div>

      <ArrivalCountdown value={arrivalDate} onChange={setArrivalDate} />

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Adults</span>
          <input name="adults" type="number" min="1" className={fieldClass} placeholder="2" />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Children</span>
          <input name="children" type="number" min="0" className={fieldClass} placeholder="0" />
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Trip length</span>
          <select name="duration" className={fieldClass} defaultValue="">
            <option value="" disabled>
              Select
            </option>
            <option>3–5 days</option>
            <option>6–7 days</option>
            <option>8–10 days</option>
            <option>11–15+ days</option>
            <option>Flexible</option>
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Hotel level</span>
          <select name="hotelLevel" className={fieldClass} defaultValue="">
            <option value="" disabled>
              Select
            </option>
            <option>Smart value / 4★</option>
            <option>Balanced comfort / 5★</option>
            <option>Premium / luxury</option>
            <option>Mix / advise me</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-ink">Budget feel</span>
          <select name="budget" className={fieldClass} defaultValue="">
            <option value="" disabled>
              Select
            </option>
            <option>Value-focused</option>
            <option>Balanced</option>
            <option>Premium</option>
            <option>Open / custom quote</option>
          </select>
        </label>
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-ink">Interests</legend>
        <div className="flex flex-wrap gap-2">
          {interestOptions.map((item) => {
            const active = interests.includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => toggle(interests, item, setInterests)}
                className={`rounded-full px-3 py-1.5 text-sm transition ${
                  active
                    ? "bg-nile text-white"
                    : "choice-chip"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-ink">
          Destinations of interest
        </legend>
        <div className="flex flex-wrap gap-2">
          {destinationOptions.map((item) => {
            const active = destinations.includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => toggle(destinations, item, setDestinations)}
                className={`rounded-full px-3 py-1.5 text-sm transition ${
                  active
                    ? "bg-nile text-white"
                    : "choice-chip"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </fieldset>

      <label className="block text-sm">
        <span className="mb-1.5 block font-medium text-ink">
          Anything else we should know?
        </span>
        <textarea
          name="message"
          rows={4}
          className={fieldClass}
          placeholder="Walking comfort, anniversary trip, guide language, accessibility..."
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-full bg-nile px-6 py-3 text-sm font-semibold text-white transition hover:bg-nile-deep disabled:opacity-60"
        >
          {pending ? "Preparing..." : "Send & open WhatsApp"}
        </button>
        <p className="text-xs text-ink-soft">
          We’ll open WhatsApp with your brief ready to send.
        </p>
      </div>

      {status !== "idle" ? (
        <p
          className={
            status === "success" ? "text-sm text-nile" : "text-sm text-copper"
          }
        >
          {statusMessage}
        </p>
      ) : null}

      <p className="sr-only">{whatsappPreview}</p>
    </form>
  );
}
