"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  CircleNotch,
  WarningCircle,
} from "@phosphor-icons/react";
import { site } from "@/lib/content";
import { trackEvent } from "@/lib/analytics";
import { EMAIL_RE, PHONE_RE } from "@/lib/validation";

const CONNECTION_OPTIONS = [
  { id: "pv", label: "Photovoltaik" },
  { id: "speicher", label: "Speicher" },
  { id: "wallbox", label: "Wallbox" },
  { id: "waermepumpe", label: "Wärmepumpe" },
  { id: "dach", label: "Dach" },
] as const;

const PROPERTY_OPTIONS = [
  { id: "efh", label: "Einfamilienhaus" },
  { id: "zfh", label: "Zweifamilienhaus" },
  { id: "andere", label: "Andere Immobilie" },
] as const;

const SITUATION_OPTIONS = [
  { id: "neubau", label: "Neubau" },
  { id: "bestand", label: "Bestand ohne PV" },
  { id: "bestehende-pv", label: "Bestehende PV-Anlage" },
  { id: "dachpruefung", label: "Dachprüfung gewünscht" },
] as const;

type Step = 1 | 2 | 3 | 4 | "summary" | 5 | 6;
const STEP_ORDER: Step[] = [1, 2, 3, 4, "summary", 5, 6];
// The summary screen isn't a numbered form step — it's a review checkpoint
// of steps 1-4 before contact details. It used to display "Schritt 4 von
// 6", identical to the real step 4, which read as if nothing had advanced.
const NUMBERED_STEP_COUNT = 6;

type Status = "idle" | "submitting" | "success" | "error";

function labelFor(options: readonly { id: string; label: string }[], id: string | null) {
  return options.find((o) => o.id === id)?.label ?? "—";
}

export default function SolarCheck() {
  const formBase = useId();
  const [stepIndex, setStepIndex] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [connections, setConnections] = useState<string[]>([]);
  const [propertyType, setPropertyType] = useState<string | null>(null);
  const [situation, setSituation] = useState<string | null>(null);
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [contactMethod, setContactMethod] = useState<"telefon" | "email" | null>(null);
  const [contactValue, setContactValue] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot — left empty by real visitors
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const step = STEP_ORDER[stepIndex];
  // Fills through 4/6 while reviewing the summary — it's showing progress
  // made, not claiming the summary itself is step 4.
  const progressFill = step === "summary" ? 4 : typeof step === "number" && step <= 4 ? step : step === 5 ? 5 : 6;

  // Focus the new step's heading/legend on every step change, so keyboard
  // and screen-reader users land somewhere meaningful instead of the focus
  // silently staying on the now-hidden "Weiter" button.
  const headingRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    headingRef.current?.focus();
  }, [stepIndex]);

  function fieldError(key: string): string {
    if (!touched[key]) return "";
    switch (key) {
      case "plz":
        return /^\d{4,5}$/.test(postalCode.trim()) ? "" : "Bitte geben Sie eine gültige PLZ an.";
      case "ort":
        return city.trim().length > 1 ? "" : "Bitte geben Sie einen Ort an.";
      case "name":
        return name.trim().length > 1 ? "" : "Bitte geben Sie Ihren Namen an.";
      case "contactMethod":
        return contactMethod ? "" : "Bitte wählen Sie einen Kontaktweg.";
      case "contact": {
        if (!contactMethod) return "";
        const value = contactValue.trim();
        if (contactMethod === "email") {
          return EMAIL_RE.test(value) ? "" : "Bitte geben Sie eine gültige E-Mail-Adresse an.";
        }
        return PHONE_RE.test(value) ? "" : "Bitte geben Sie eine gültige Telefonnummer an.";
      }
      default:
        return "";
    }
  }

  function canAdvance(): boolean {
    switch (step) {
      case 1:
        return connections.length > 0;
      case 2:
        return !!propertyType;
      case 3:
        return !!situation;
      case 4:
        return !fieldError("plz") && !fieldError("ort") && postalCode.trim() !== "" && city.trim() !== "";
      case "summary":
        return true;
      case 5:
        return (
          name.trim().length > 1 &&
          !!contactMethod &&
          !fieldError("contact") &&
          contactValue.trim().length > 0
        );
      case 6:
        return true;
      default:
        return false;
    }
  }

  function goNext() {
    if (step === 4) setTouched((t) => ({ ...t, plz: true, ort: true }));
    if (step === 5) setTouched((t) => ({ ...t, name: true, contactMethod: true, contact: true }));
    if (!canAdvance()) return;
    trackEvent({ name: "solar_check_step_completed", step });
    setStepIndex((i) => Math.min(i + 1, STEP_ORDER.length - 1));
  }

  function goBack() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  function toggleConnection(id: string) {
    setConnections((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!canAdvance()) {
      setTouched((t) => ({ ...t, name: true, contactMethod: true, contact: true }));
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "solar-check",
          name,
          contactMethod: contactMethod ?? undefined,
          contact: contactValue,
          postalCode,
          city,
          propertyType: labelFor(PROPERTY_OPTIONS, propertyType),
          situation: labelFor(SITUATION_OPTIONS, situation),
          interests: connections
            .map((id) => CONNECTION_OPTIONS.find((o) => o.id === id)?.label)
            .filter((label): label is (typeof CONNECTION_OPTIONS)[number]["label"] => label !== undefined),
          message,
          company,
        }),
      });

      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Etwas ist schiefgelaufen.");
      }

      trackEvent({ name: "solar_check_submitted" });
      setStatus("success");
    } catch (err) {
      trackEvent({ name: "solar_check_error" });
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Etwas ist schiefgelaufen.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-3 rounded-2xl border border-primary/30 bg-primary/5 px-6 py-14 text-center"
      >
        <CheckCircle size={44} weight="fill" className="text-primary" aria-hidden />
        <h3 className="text-xl font-semibold text-foreground">Vielen Dank, {name.split(" ")[0]}!</h3>
        <p className="max-w-sm text-muted-foreground">
          Wir haben Ihren Solar-Check erhalten und melden uns bei Ihnen. Bei
          dringenden Fragen erreichen Sie uns direkt unter{" "}
          <a href={site.phoneHref} className="font-semibold text-primary underline underline-offset-2">
            {site.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
      {/* Progress */}
      <div className="mb-8 flex items-center gap-2" role="progressbar" aria-valuenow={progressFill} aria-valuemin={1} aria-valuemax={NUMBERED_STEP_COUNT}>
        {Array.from({ length: NUMBERED_STEP_COUNT }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < progressFill ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </div>
      <p className="font-data mb-6 text-xs text-muted-foreground uppercase">
        {step === "summary" ? "Zusammenfassung" : `Schritt ${progressFill} von ${NUMBERED_STEP_COUNT}`}
      </p>

      <form onSubmit={step === 6 ? handleSubmit : (e) => e.preventDefault()}>
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor={`${formBase}-company`}>Firma (bitte freilassen)</label>
          <input
            id={`${formBase}-company`}
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        {step === 1 && (
          <fieldset>
            <legend ref={(el) => { headingRef.current = el; }} tabIndex={-1} className="text-lg font-semibold text-foreground outline-none">
              Was möchten Sie verbinden?
            </legend>
            <div className="mt-4 flex flex-wrap gap-2">
              {CONNECTION_OPTIONS.map((opt) => {
                const checked = connections.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    aria-pressed={checked}
                    onClick={() => toggleConnection(opt.id)}
                    className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      checked
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-foreground/70 hover:border-primary/50"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset>
            <legend ref={(el) => { headingRef.current = el; }} tabIndex={-1} className="text-lg font-semibold text-foreground outline-none">
              Um welche Immobilie geht es?
            </legend>
            <div className="mt-4 flex flex-col gap-2">
              {PROPERTY_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                    propertyType === opt.id ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="propertyType"
                    value={opt.id}
                    checked={propertyType === opt.id}
                    onChange={() => setPropertyType(opt.id)}
                    className="accent-primary"
                  />
                  <span className="text-foreground">{opt.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset>
            <legend ref={(el) => { headingRef.current = el; }} tabIndex={-1} className="text-lg font-semibold text-foreground outline-none">
              Wie ist die aktuelle Situation?
            </legend>
            <div className="mt-4 flex flex-col gap-2">
              {SITUATION_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                    situation === opt.id ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="situation"
                    value={opt.id}
                    checked={situation === opt.id}
                    onChange={() => setSituation(opt.id)}
                    className="accent-primary"
                  />
                  <span className="text-foreground">{opt.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {step === 4 && (
          <fieldset>
            <legend ref={(el) => { headingRef.current = el; }} tabIndex={-1} className="text-lg font-semibold text-foreground outline-none">
              Wo befindet sich das Gebäude?
            </legend>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <label htmlFor={`${formBase}-plz`} className="mb-1.5 block text-sm font-semibold text-foreground">
                  PLZ
                </label>
                <input
                  id={`${formBase}-plz`}
                  type="text"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, plz: true }))}
                  aria-invalid={!!fieldError("plz")}
                  aria-describedby={fieldError("plz") ? `${formBase}-plz-error` : undefined}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                />
                {fieldError("plz") && (
                  <p id={`${formBase}-plz-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-destructive">
                    <WarningCircle size={14} weight="fill" aria-hidden />
                    {fieldError("plz")}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor={`${formBase}-ort`} className="mb-1.5 block text-sm font-semibold text-foreground">
                  Ort
                </label>
                <input
                  id={`${formBase}-ort`}
                  type="text"
                  autoComplete="address-level2"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, ort: true }))}
                  aria-invalid={!!fieldError("ort")}
                  aria-describedby={fieldError("ort") ? `${formBase}-ort-error` : undefined}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                />
                {fieldError("ort") && (
                  <p id={`${formBase}-ort-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-destructive">
                    <WarningCircle size={14} weight="fill" aria-hidden />
                    {fieldError("ort")}
                  </p>
                )}
              </div>
            </div>
          </fieldset>
        )}

        {step === "summary" && (
          <div>
            <h3 ref={(el) => { headingRef.current = el; }} tabIndex={-1} className="text-lg font-semibold text-foreground outline-none">
              Das sollten wir gemeinsam prüfen
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Keine automatische Preis- oder Ertragszusage — nur eine
              Zusammenfassung für unser Gespräch.
            </p>
            <dl className="mt-5 space-y-3 rounded-xl border border-border bg-background p-5 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Interesse</dt>
                <dd className="text-right font-medium text-foreground">
                  {connections
                    .map((id) => CONNECTION_OPTIONS.find((o) => o.id === id)?.label)
                    .join(", ") || "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Immobilie</dt>
                <dd className="font-medium text-foreground">{labelFor(PROPERTY_OPTIONS, propertyType)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Situation</dt>
                <dd className="font-medium text-foreground">{labelFor(SITUATION_OPTIONS, situation)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Ort</dt>
                <dd className="font-medium text-foreground">
                  {postalCode} {city}
                </dd>
              </div>
            </dl>
          </div>
        )}

        {step === 5 && (
          <fieldset>
            <legend ref={(el) => { headingRef.current = el; }} tabIndex={-1} className="text-lg font-semibold text-foreground outline-none">
              Wie dürfen wir Sie erreichen?
            </legend>
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor={`${formBase}-name`} className="mb-1.5 block text-sm font-semibold text-foreground">
                  Name
                </label>
                <input
                  id={`${formBase}-name`}
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                  aria-invalid={!!fieldError("name")}
                  aria-describedby={fieldError("name") ? `${formBase}-name-error` : undefined}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                />
                {fieldError("name") && (
                  <p id={`${formBase}-name-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-destructive">
                    <WarningCircle size={14} weight="fill" aria-hidden />
                    {fieldError("name")}
                  </p>
                )}
              </div>

              <fieldset>
                <legend className="mb-1.5 text-sm font-semibold text-foreground">
                  Bevorzugter Kontaktweg
                </legend>
                <div className="flex gap-2">
                  {(["telefon", "email"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      aria-pressed={contactMethod === m}
                      onClick={() => {
                        setContactMethod(m);
                        setTouched((t) => ({ ...t, contactMethod: true }));
                      }}
                      className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                        contactMethod === m
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-foreground/70 hover:border-primary/50"
                      }`}
                    >
                      {m === "telefon" ? "Telefon" : "E-Mail"}
                    </button>
                  ))}
                </div>
                {fieldError("contactMethod") && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm text-destructive">
                    <WarningCircle size={14} weight="fill" aria-hidden />
                    {fieldError("contactMethod")}
                  </p>
                )}
              </fieldset>

              <div>
                <label htmlFor={`${formBase}-contact`} className="mb-1.5 block text-sm font-semibold text-foreground">
                  {contactMethod === "email" ? "E-Mail-Adresse" : "Telefonnummer"}
                </label>
                <input
                  id={`${formBase}-contact`}
                  type={contactMethod === "email" ? "email" : "tel"}
                  autoComplete={contactMethod === "email" ? "email" : "tel"}
                  value={contactValue}
                  onChange={(e) => setContactValue(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, contact: true }))}
                  aria-invalid={!!fieldError("contact")}
                  aria-describedby={fieldError("contact") ? `${formBase}-contact-error` : undefined}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                />
                {fieldError("contact") && (
                  <p id={`${formBase}-contact-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-destructive">
                    <WarningCircle size={14} weight="fill" aria-hidden />
                    {fieldError("contact")}
                  </p>
                )}
              </div>
            </div>
          </fieldset>
        )}

        {step === 6 && (
          <fieldset>
            <legend ref={(el) => { headingRef.current = el; }} tabIndex={-1} className="text-lg font-semibold text-foreground outline-none">
              Möchten Sie uns noch etwas mitgeben? (optional)
            </legend>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Zum Beispiel: Baujahr des Hauses, aktueller Stromverbrauch, Wunschtermin…"
              className="mt-4 w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
            />

            {status === "error" && (
              <p role="alert" className="mt-3 flex items-center gap-1.5 text-sm text-destructive">
                <WarningCircle size={16} weight="fill" aria-hidden />
                {errorMessage}
              </p>
            )}
          </fieldset>
        )}

        <div className="mt-8 flex items-center justify-between gap-3">
          {stepIndex > 0 ? (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-foreground/70 transition-colors hover:text-foreground"
            >
              <ArrowLeft size={16} weight="bold" aria-hidden />
              Zurück
            </button>
          ) : (
            <span />
          )}

          {step === 6 ? (
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-on-primary shadow-md transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {status === "submitting" && (
                <CircleNotch size={18} weight="bold" className="animate-spin" aria-hidden />
              )}
              {status === "submitting" ? "Wird gesendet…" : "Solar-Check abschicken"}
            </button>
          ) : (
            <button
              type="button"
              onClick={goNext}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-on-primary shadow-md transition-colors hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {step === "summary" ? "Weiter zum Kontakt" : "Weiter"}
              <ArrowRight size={16} weight="bold" aria-hidden />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
