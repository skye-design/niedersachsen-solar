"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ChatCircleDots,
  X,
  Phone,
  EnvelopeSimple,
  Trash,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  CircleNotch,
  CheckCircle,
  WarningCircle,
} from "@phosphor-icons/react";
import { services, site, type Service } from "@/lib/content";
import {
  BOT_IDENTITY,
  getServiceAnswer,
  getServiceFaqAnswer,
  getProcessAnswer,
  getPrepareProjectAnswer,
  type SolarLotseResponse,
} from "@/lib/solarLotse";
import { trackEvent } from "@/lib/analytics";

type Screen =
  | { name: "menu" }
  | { name: "solution-list" }
  | { name: "solution-detail"; slug: Service["slug"]; response: SolarLotseResponse; topicId: string }
  | { name: "process"; response: SolarLotseResponse }
  | { name: "prepare"; response: SolarLotseResponse }
  | { name: "handoff" };

type SubmitStatus = "idle" | "submitting" | "success" | "error";

// Guided Solar-Lotse launcher + dialog. No model provider, no free-text
// input to an AI — see src/lib/solarLotse.ts for why that's safe here.
// Uses the native <dialog> element for focus trapping, Escape-to-close and
// top-layer stacking instead of hand-rolling those behaviors.
export default function SolarLotse() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [screen, setScreen] = useState<Screen>({ name: "menu" });
  const [feedback, setFeedback] = useState<Record<string, boolean>>({});

  function openDialog() {
    setIsOpen(true);
    trackEvent({ name: "solar_lotse_opened" });
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  function resetChat() {
    setScreen({ name: "menu" });
    setFeedback({});
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => setIsOpen(false);
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  function selectEntry(entry: "solution" | "process" | "prepare" | "human") {
    trackEvent({ name: "solar_lotse_entry_selected", entry });
    if (entry === "solution") setScreen({ name: "solution-list" });
    else if (entry === "process") {
      const response = getProcessAnswer();
      trackEvent({ name: "solar_lotse_answer_shown", topicId: "process", confidence: response.confidence });
      setScreen({ name: "process", response });
    } else if (entry === "prepare") {
      const response = getPrepareProjectAnswer();
      trackEvent({ name: "solar_lotse_answer_shown", topicId: "prepare", confidence: response.confidence });
      setScreen({ name: "prepare", response });
    } else {
      setScreen({ name: "handoff" });
    }
  }

  function selectService(slug: Service["slug"]) {
    const response = getServiceAnswer(slug);
    const topicId = `service:${slug}`;
    trackEvent({ name: "solar_lotse_answer_shown", topicId, confidence: response.confidence });
    setScreen({ name: "solution-detail", slug, response, topicId });
  }

  function selectServiceFaq(slug: Service["slug"], question: string) {
    const response = getServiceFaqAnswer(slug, question);
    if (!response) return;
    const topicId = `service-faq:${slug}:${question}`;
    trackEvent({ name: "solar_lotse_answer_shown", topicId, confidence: response.confidence });
    setScreen({ name: "solution-detail", slug, response, topicId });
  }

  function giveFeedback(topicId: string, helpful: boolean) {
    setFeedback((f) => ({ ...f, [topicId]: helpful }));
    trackEvent({ name: "solar_lotse_feedback", topicId, helpful });
  }

  return (
    <>
      {/* 2026-09-02: bottom offset was a hardcoded bottom-20 (80px) guess
          against StickyMobileCTA's old, also-hardcoded height — now derived
          from the same --bottom-bar-height variable that component sets
          its actual height to, +16px clearance, so the two can't drift
          out of sync again. sm:bottom-6 is unaffected (StickyMobileCTA is
          sm:hidden, no bar to clear at that width). */}
      <button
        type="button"
        onClick={openDialog}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="fixed right-4 bottom-[calc(var(--bottom-bar-height)+16px)] z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-on-primary shadow-lg transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:right-6 sm:bottom-6"
      >
        <ChatCircleDots size={26} weight="fill" aria-hidden />
        <span className="sr-only">Geführten Solar-Lotsen öffnen</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Geführter Solar-Lotse"
        className="m-0 h-[min(680px,100dvh)] w-full max-w-md rounded-t-3xl border border-border bg-background p-0 backdrop:bg-black/40 sm:right-6 sm:bottom-6 sm:m-6 sm:h-[600px] sm:rounded-3xl sm:shadow-2xl [&:not([open])]:hidden"
        style={{ position: "fixed", insetInline: 0, bottom: 0, top: "auto" }}
        onCancel={() => setIsOpen(false)}
      >
        <div className="flex h-full flex-col">
          <header className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
            <div className="flex items-center gap-2.5">
              <ChatCircleDots size={22} weight="fill" className="text-primary" aria-hidden />
              <p className="font-heading text-base font-semibold text-foreground">Geführter Solar-Lotse</p>
            </div>
            <button
              type="button"
              onClick={closeDialog}
              aria-label="Geführten Solar-Lotsen schließen"
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background-alt hover:text-foreground"
            >
              <X size={20} aria-hidden />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto px-5 py-4" aria-live="polite">
            {screen.name === "menu" && <MenuScreen onSelect={selectEntry} />}
            {screen.name === "solution-list" && (
              <SolutionListScreen onSelect={selectService} onBack={() => setScreen({ name: "menu" })} />
            )}
            {screen.name === "solution-detail" && (
              <AnswerScreen
                response={screen.response}
                onBack={() => setScreen({ name: "solution-list" })}
                onHandoff={() => setScreen({ name: "handoff" })}
                relatedFaqs={services.find((s) => s.slug === screen.slug)?.faqs}
                onSelectFaq={(question) => selectServiceFaq(screen.slug, question)}
                feedback={feedback[screen.topicId]}
                onFeedback={(v) => giveFeedback(screen.topicId, v)}
              />
            )}
            {screen.name === "process" && (
              <AnswerScreen
                response={screen.response}
                onBack={() => setScreen({ name: "menu" })}
                onHandoff={() => setScreen({ name: "handoff" })}
                feedback={feedback.process}
                onFeedback={(v) => giveFeedback("process", v)}
              />
            )}
            {screen.name === "prepare" && (
              <AnswerScreen
                response={screen.response}
                onBack={() => setScreen({ name: "menu" })}
                onHandoff={() => setScreen({ name: "handoff" })}
                feedback={feedback.prepare}
                onFeedback={(v) => giveFeedback("prepare", v)}
              />
            )}
            {screen.name === "handoff" && (
              <HandoffScreen onBack={() => setScreen({ name: "menu" })} onDone={closeDialog} />
            )}
          </div>

          <footer className="flex items-center justify-between gap-2 border-t border-border px-5 py-3">
            <div className="flex items-center gap-2">
              <a
                href={site.phoneHref}
                className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Phone size={14} weight="fill" aria-hidden />
                Anrufen
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <EnvelopeSimple size={14} weight="fill" aria-hidden />
                E-Mail
              </a>
            </div>
            <button
              type="button"
              onClick={resetChat}
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-destructive"
            >
              <Trash size={14} weight="bold" aria-hidden />
              Chat löschen
            </button>
          </footer>
        </div>
      </dialog>
    </>
  );
}

function MenuScreen({
  onSelect,
}: {
  onSelect: (entry: "solution" | "process" | "prepare" | "human") => void;
}) {
  const entries: { id: "solution" | "process" | "prepare" | "human"; label: string }[] = [
    { id: "solution", label: "Lösung finden" },
    { id: "process", label: "Ablauf verstehen" },
    { id: "prepare", label: "Projekt vorbereiten" },
    { id: "human", label: "Mit einem Menschen sprechen" },
  ];
  return (
    <div className="flex flex-col gap-4">
      <p className="leading-relaxed text-foreground/90">{BOT_IDENTITY}</p>
      <div className="grid gap-2">
        {entries.map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => onSelect(entry.id)}
            className="flex items-center justify-between gap-2 rounded-xl border border-border bg-card px-4 py-3 text-left text-sm font-semibold text-foreground transition-colors hover:border-primary/40"
          >
            {entry.label}
            <ArrowRight size={16} weight="bold" className="shrink-0 text-primary" aria-hidden />
          </button>
        ))}
      </div>
    </div>
  );
}

function SolutionListScreen({
  onSelect,
  onBack,
}: {
  onSelect: (slug: Service["slug"]) => void;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <BackButton onClick={onBack} />
      <p className="text-sm text-muted-foreground">Wofür interessieren Sie sich?</p>
      <div className="grid gap-2">
        {services.map((service) => (
          <button
            key={service.slug}
            type="button"
            onClick={() => onSelect(service.slug)}
            className="rounded-xl border border-border bg-card px-4 py-3 text-left transition-colors hover:border-primary/40"
          >
            <span className="block text-sm font-semibold text-foreground">{service.title}</span>
            <span className="text-xs text-muted-foreground">{service.userQuestion}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function AnswerScreen({
  response,
  onBack,
  onHandoff,
  relatedFaqs,
  onSelectFaq,
  feedback,
  onFeedback,
}: {
  response: SolarLotseResponse;
  onBack: () => void;
  onHandoff: () => void;
  relatedFaqs?: { question: string; answer: string }[];
  onSelectFaq?: (question: string) => void;
  feedback: boolean | undefined;
  onFeedback: (helpful: boolean) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <BackButton onClick={onBack} />
      <div className="rounded-xl border border-border bg-card p-4">
        <p className="leading-relaxed text-foreground/90">{response.answer}</p>
        {response.confidence === "limited" && (
          <p className="mt-2 text-xs text-muted-foreground">
            Diese Frage kann ich nicht pauschal beantworten.
          </p>
        )}
        {response.sources.length > 0 && (
          <p className="mt-3 text-xs text-muted-foreground">
            Quelle:{" "}
            {response.sources.map((s, i) => (
              <span key={s.url}>
                {i > 0 && ", "}
                {s.title}
              </span>
            ))}
          </p>
        )}
      </div>

      {relatedFaqs && relatedFaqs.length > 0 && onSelectFaq && (
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-muted-foreground">Häufige Fragen dazu</span>
          <div className="flex flex-wrap gap-1.5">
            {relatedFaqs.map((faq) => (
              <button
                key={faq.question}
                type="button"
                onClick={() => onSelectFaq(faq.question)}
                className="rounded-full border border-border px-3 py-1.5 text-xs text-foreground/80 transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {faq.question}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Hilfreich?</span>
        <button
          type="button"
          onClick={() => onFeedback(true)}
          aria-pressed={feedback === true}
          aria-label="Antwort war hilfreich"
          className={`rounded-full p-1.5 transition-colors ${feedback === true ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}
        >
          <ThumbsUp size={16} weight={feedback === true ? "fill" : "regular"} aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => onFeedback(false)}
          aria-pressed={feedback === false}
          aria-label="Antwort war nicht hilfreich"
          className={`rounded-full p-1.5 transition-colors ${feedback === false ? "bg-destructive/10 text-destructive" : "text-muted-foreground hover:text-foreground"}`}
        >
          <ThumbsDown size={16} weight={feedback === false ? "fill" : "regular"} aria-hidden />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {response.suggestedActions.includes("start-solar-check") && (
          <Link
            href="/#solar-check"
            className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-on-primary"
          >
            Solar-Check starten
          </Link>
        )}
        {(response.needsHuman || response.suggestedActions.includes("request-callback")) && (
          <button
            type="button"
            onClick={onHandoff}
            className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground hover:border-primary/40"
          >
            Für Rückruf vormerken
          </button>
        )}
        {response.suggestedActions.includes("ask-follow-up") && (
          <button
            type="button"
            onClick={onBack}
            className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground hover:border-primary/40"
          >
            Weitere Frage
          </button>
        )}
      </div>
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-fit items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
    >
      <ArrowRight size={14} weight="bold" className="rotate-180" aria-hidden />
      Zurück
    </button>
  );
}

function HandoffScreen({ onBack, onDone }: { onBack: () => void; onDone: () => void }) {
  const nameId = useId();
  const contactId = useId();
  const plzId = useId();
  const summaryId = useId();

  const [name, setName] = useState("");
  const [contactMethod, setContactMethod] = useState<"telefon" | "email">("telefon");
  const [contact, setContact] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [summary, setSummary] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const nameError = touched.name && !name.trim() ? "Bitte geben Sie Ihren Namen an." : "";
  const contactError = touched.contact && !contact.trim() ? "Bitte geben Sie Telefon oder E-Mail an." : "";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched({ name: true, contact: true });
    if (!name.trim() || !contact.trim()) return;

    trackEvent({ name: "solar_lotse_handoff_requested" });
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "solar-lotse",
          name,
          contact,
          contactMethod,
          postalCode: postalCode.trim() || undefined,
          message: summary.trim() || undefined,
          company,
        }),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error ?? "Etwas ist schiefgelaufen.");

      trackEvent({ name: "solar_lotse_submitted" });
      setStatus("success");
    } catch (err) {
      trackEvent({ name: "solar_lotse_error" });
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Etwas ist schiefgelaufen.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center gap-3 rounded-xl border border-primary/30 bg-primary/5 px-5 py-10 text-center"
      >
        <CheckCircle size={36} weight="fill" className="text-primary" aria-hidden />
        <p className="font-heading text-base font-semibold text-foreground">Danke, {name.split(" ")[0]}!</p>
        <p className="max-w-xs text-sm text-muted-foreground">
          Wir melden uns bei Ihnen. Dringend? Rufen Sie uns direkt an:{" "}
          <a href={site.phoneHref} className="font-semibold text-primary underline underline-offset-2">
            {site.phone}
          </a>
        </p>
        <button type="button" onClick={onDone} className="mt-2 text-sm font-semibold text-primary">
          Chat schließen
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <BackButton onClick={onBack} />
      <p className="text-sm text-muted-foreground">
        Für den Rückruf brauchen wir Name und Kontakt. Verbindliche Planung und Angebote erhalten Sie
        persönlich von unserem Team — nicht vom Solar-Lotsen.
      </p>

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${nameId}-company`}>Firma (bitte freilassen)</label>
        <input
          id={`${nameId}-company`}
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor={nameId} className="mb-1 block text-xs font-semibold text-foreground">
          Name<span className="text-destructive"> *</span>
        </label>
        <input
          id={nameId}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          aria-invalid={!!nameError}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
        />
        {nameError && <p className="mt-1 text-xs text-destructive">{nameError}</p>}
      </div>

      <div>
        <span className="mb-1 block text-xs font-semibold text-foreground">Bevorzugter Kontaktweg</span>
        <div className="flex gap-2">
          {(["telefon", "email"] as const).map((method) => (
            <button
              key={method}
              type="button"
              onClick={() => setContactMethod(method)}
              aria-pressed={contactMethod === method}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${contactMethod === method ? "border-primary bg-primary/10 text-primary" : "border-border text-foreground/70"}`}
            >
              {method === "telefon" ? "Telefon" : "E-Mail"}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor={contactId} className="mb-1 block text-xs font-semibold text-foreground">
          {contactMethod === "telefon" ? "Telefonnummer" : "E-Mail-Adresse"}
          <span className="text-destructive"> *</span>
        </label>
        <input
          id={contactId}
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, contact: true }))}
          aria-invalid={!!contactError}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
        />
        {contactError && <p className="mt-1 text-xs text-destructive">{contactError}</p>}
      </div>

      <div>
        <label htmlFor={plzId} className="mb-1 block text-xs font-semibold text-foreground">
          PLZ (optional)
        </label>
        <input
          id={plzId}
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
        />
      </div>

      <div>
        <label htmlFor={summaryId} className="mb-1 block text-xs font-semibold text-foreground">
          Worum geht es? (optional, wird vor dem Absenden angezeigt)
        </label>
        <textarea
          id={summaryId}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={3}
          className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
        />
      </div>

      <p className="text-[11px] leading-relaxed text-muted-foreground">
        Zweck: Bearbeitung Ihrer Anfrage. Empfänger: Niedersachsen Solar. Ihre Angaben werden nur zu
        diesem Zweck verwendet — Details in der{" "}
        <Link href="/datenschutz" className="underline underline-offset-2">
          Datenschutzerklärung
        </Link>
        .
      </p>

      {status === "error" && (
        <p role="alert" className="flex items-center gap-1.5 text-xs text-destructive">
          <WarningCircle size={14} weight="fill" aria-hidden />
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-dark disabled:opacity-60"
      >
        {status === "submitting" && <CircleNotch size={16} weight="bold" className="animate-spin" aria-hidden />}
        {status === "submitting" ? "Wird gesendet…" : "Absenden"}
      </button>
    </form>
  );
}
