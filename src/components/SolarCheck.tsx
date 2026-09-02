"use client";

import { useId, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  CircleNotch,
  WarningCircle,
} from "@phosphor-icons/react";
import { site } from "@/lib/content";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mrpzzbgd";

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
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const step = STEP_ORDER[stepIndex];
  const numberedStepCount = 6;
  const currentNumber =
    step === "summary" ? 4 : typeof step === "number" && step <= 4 ? step : step === 5 ? 5 : 6;

  function canAdvance(): boolean {
    switch (step) {
      case 1:
        return connections.length > 0;
      case 2:
        return !!propertyType;
      case 3:
        return !!situation;
      case 4:
        return /^\d{4,5}$/.test(postalCode.trim()) && city.trim().length > 1;
      case "summary":
        return true;
      case 5:
        return name.trim().length > 1 && !!contactMethod && contactValue.trim().length > 2;
      case 6:
        return true;
      default:
        return false;
    }
  }

  function goNext() {
    if (step === 4 || step === 5) {
      setTouched((t) => ({ ...t, [String(step)]: true }));
    }
    if (!canAdvance()) return;
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
      setTouched((t) => ({ ...t, "5": true }));
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Neuer Solar-Check von ${name}`,
          name,
          kontaktweg: contactMethod,
          kontakt: contactValue,
          plz: postalCode,
          ort: city,
          immobilie: labelFor(PROPERTY_OPTIONS, propertyType),
          situation: labelFor(SITUATION_OPTIONS, situation),
          interessen: connections
            .map((id) => CONNECTION_OPTIONS.find((o) => o.id === id)?.label)
            .join(", "),
          nachricht: message,
        }),
      });

      if (!response.ok) throw new Error("Etwas ist schiefgelaufen.");
      setStatus("success");
    } catch (err) {
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
          Wir haben Ihren Solar-Check erhalten und melden uns innerhalb eines
          Werktags bei Ihnen. Bei dringenden Fragen erreichen Sie uns direkt
          unter{" "}
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
      <div className="mb-8 flex items-center gap-2" role="progressbar" aria-valuenow={currentNumber} aria-valuemin={1} aria-valuemax={numberedStepCount}>
        {Array.from({ length: numberedStepCount }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < currentNumber ? "bg-primary" : "bg-border"
            }`}
          />
        ))}
      </div>
      <p className="font-data mb-6 text-xs text-muted-foreground uppercase">
        Schritt {currentNumber} von {numberedStepCount}
      </p>

      <form onSubmit={step === 6 ? handleSubmit : (e) => e.preventDefault()}>
        {step === 1 && (
          <fieldset>
            <legend className="text-lg font-semibold text-foreground">
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
            <legend className="text-lg font-semibold text-foreground">
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
            <legend className="text-lg font-semibold text-foreground">
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
            <legend className="text-lg font-semibold text-foreground">
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
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                />
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
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                />
              </div>
            </div>
            {touched["4"] && !canAdvance() && (
              <p className="mt-2 flex items-center gap-1.5 text-sm text-destructive">
                <WarningCircle size={16} weight="fill" aria-hidden />
                Bitte geben Sie eine gültige PLZ und einen Ort an.
              </p>
            )}
          </fieldset>
        )}

        {step === "summary" && (
          <div>
            <h3 className="text-lg font-semibold text-foreground">
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
            <legend className="text-lg font-semibold text-foreground">
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
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                />
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
                      onClick={() => setContactMethod(m)}
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
              </fieldset>

              <div>
                <label htmlFor={`${formBase}-contact`} className="mb-1.5 block text-sm font-semibold text-foreground">
                  {contactMethod === "email" ? "E-Mail-Adresse" : "Telefonnummer"}
                </label>
                <input
                  id={`${formBase}-contact`}
                  type="text"
                  autoComplete={contactMethod === "email" ? "email" : "tel"}
                  value={contactValue}
                  onChange={(e) => setContactValue(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                />
              </div>
            </div>
            {touched["5"] && !canAdvance() && (
              <p className="mt-2 flex items-center gap-1.5 text-sm text-destructive">
                <WarningCircle size={16} weight="fill" aria-hidden />
                Bitte Name, Kontaktweg und Kontaktdaten angeben.
              </p>
            )}
          </fieldset>
        )}

        {step === 6 && (
          <fieldset>
            <legend className="text-lg font-semibold text-foreground">
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
