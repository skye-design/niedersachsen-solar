"use client";

import { useId, useState, type FormEvent } from "react";
import { CheckCircle, WarningCircle, CircleNotch } from "@phosphor-icons/react";
import { site } from "@/lib/content";

const interestOptions = ["PV-Anlage", "Speicher", "Wallbox", "Wärmepumpe"];
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mrpzzbgd";

type Status = "idle" | "submitting" | "success" | "error";

export default function QuoteForm() {
  const nameId = useId();
  const contactId = useId();
  const locationId = useId();

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const nameError = touched.name && !name.trim() ? "Bitte geben Sie Ihren Namen an." : "";
  const contactError =
    touched.contact && !contact.trim()
      ? "Bitte geben Sie Telefon oder E-Mail an."
      : "";
  const locationError =
    touched.location && !location.trim() ? "Bitte geben Sie Ihren Ort an." : "";

  function toggleInterest(option: string) {
    setInterests((prev) =>
      prev.includes(option) ? prev.filter((i) => i !== option) : [...prev, option],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched({ name: true, contact: true, location: true });

    if (!name.trim() || !contact.trim() || !location.trim()) {
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Neue Angebotsanfrage von ${name}`,
          name,
          contact,
          location,
          interessen: interests.join(", "),
        }),
      });

      if (!response.ok) {
        throw new Error("Etwas ist schiefgelaufen.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Etwas ist schiefgelaufen.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-3 rounded-2xl border border-primary/30 bg-primary/5 px-6 py-12 text-center"
      >
        <CheckCircle size={40} weight="fill" className="text-primary" aria-hidden />
        <h3 className="font-heading text-xl font-semibold text-foreground">
          Vielen Dank, {name.split(" ")[0]}!
        </h3>
        <p className="max-w-sm text-muted-foreground">
          Wir haben Ihre Anfrage erhalten und melden uns in Kürze bei Ihnen.
          Bei dringenden Fragen erreichen Sie uns direkt unter{" "}
          <a href={site.phoneHref} className="font-semibold text-primary underline underline-offset-2">
            {site.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor={nameId} className="mb-1.5 block text-sm font-semibold text-foreground">
          Name<span className="text-destructive"> *</span>
        </label>
        <input
          id={nameId}
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          aria-invalid={!!nameError}
          aria-describedby={nameError ? `${nameId}-error` : undefined}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30"
        />
        {nameError && (
          <p id={`${nameId}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-destructive">
            <WarningCircle size={16} weight="fill" aria-hidden />
            {nameError}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={contactId} className="mb-1.5 block text-sm font-semibold text-foreground">
          Telefon oder E-Mail<span className="text-destructive"> *</span>
        </label>
        <input
          id={contactId}
          type="text"
          autoComplete="tel"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, contact: true }))}
          aria-invalid={!!contactError}
          aria-describedby={contactError ? `${contactId}-error` : undefined}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30"
        />
        {contactError && (
          <p id={`${contactId}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-destructive">
            <WarningCircle size={16} weight="fill" aria-hidden />
            {contactError}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={locationId} className="mb-1.5 block text-sm font-semibold text-foreground">
          Ort / PLZ<span className="text-destructive"> *</span>
        </label>
        <input
          id={locationId}
          type="text"
          autoComplete="postal-code"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, location: true }))}
          aria-invalid={!!locationError}
          aria-describedby={locationError ? `${locationId}-error` : undefined}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/30"
        />
        {locationError && (
          <p id={`${locationId}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-destructive">
            <WarningCircle size={16} weight="fill" aria-hidden />
            {locationError}
          </p>
        )}
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-foreground">
          Interesse an (optional)
        </legend>
        <div className="flex flex-wrap gap-2">
          {interestOptions.map((option) => {
            const checked = interests.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => toggleInterest(option)}
                aria-pressed={checked}
                className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  checked
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-foreground/70 hover:border-primary/50"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </fieldset>

      {status === "error" && (
        <p role="alert" className="flex items-center gap-1.5 text-sm text-destructive">
          <WarningCircle size={16} weight="fill" aria-hidden />
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-on-primary shadow-md transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {status === "submitting" && (
          <CircleNotch size={18} weight="bold" className="animate-spin" aria-hidden />
        )}
        {status === "submitting" ? "Wird gesendet…" : "Unverbindlich anfragen"}
      </button>
    </form>
  );
}
