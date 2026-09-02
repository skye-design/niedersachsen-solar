import { services, processSteps, generalFaqs, site, type Service } from "@/lib/content";

// Guided Solar-Lotse (owner decision 2026-09-02: guided-only, no AI model
// provider). This file has no server dependency and calls no model — every
// answer is a static lookup over already-vetted content.ts data, so there is
// nothing here that can hallucinate or need a system-prompt/injection guard.
// Kept shaped like handoff/05_CHATBOT_SPEC.md's SolarLotseResponse contract
// on purpose: if Skye later upgrades to the AI or hybrid variant, only the
// function bodies below change to real API calls — the UI never has to.

export type SuggestedAction = "ask-follow-up" | "start-solar-check" | "call" | "request-callback";

export type SolarLotseResponse = {
  answer: string;
  sources: { title: string; url: string; updatedAt: string }[];
  confidence: "high" | "limited";
  needsHuman: boolean;
  suggestedActions: SuggestedAction[];
};

// Every entry here traces to a real route in content.ts — no invented dates.
// "updatedAt" is this content model's authoring date, same caveat as the
// Article schema: confirm against the real go-live date before launch.
const CONTENT_DATE = "2026-09-02";

export const UNCONFIRMED_ANSWER =
  "Das hängt von Ihrem Gebäude und der konkreten Planung ab. Ich kann Ihre Frage für das persönliche Gespräch aufnehmen.";

export const BOT_IDENTITY =
  "Ich bin der digitale Solar-Lotse von Niedersachsen Solar. Ich kann Ihnen Leistungen und Ablauf erklären und Ihre Anfrage vorbereiten. Verbindliche Planung und Angebote erhalten Sie persönlich von unserem Team.";

export function getServiceAnswer(slug: Service["slug"]): SolarLotseResponse {
  const service = services.find((s) => s.slug === slug);
  if (!service) {
    return {
      answer: UNCONFIRMED_ANSWER,
      sources: [],
      confidence: "limited",
      needsHuman: true,
      suggestedActions: ["ask-follow-up", "call"],
    };
  }
  return {
    answer: `${service.description} ${service.benefits[0]?.description ?? ""}`.trim(),
    sources: [
      {
        title: service.title,
        url: `https://niedersachsen-solar.de${service.route}`,
        updatedAt: CONTENT_DATE,
      },
    ],
    confidence: "high",
    needsHuman: false,
    suggestedActions: ["start-solar-check", "ask-follow-up", "call"],
  };
}

export function getServiceFaqAnswer(slug: Service["slug"], question: string): SolarLotseResponse | null {
  const service = services.find((s) => s.slug === slug);
  const faq = service?.faqs.find((f) => f.question === question);
  if (!service || !faq) return null;
  return {
    answer: faq.answer,
    sources: [
      { title: service.title, url: `https://niedersachsen-solar.de${service.route}`, updatedAt: CONTENT_DATE },
    ],
    confidence: "high",
    needsHuman: false,
    suggestedActions: ["ask-follow-up", "start-solar-check"],
  };
}

export function getGeneralFaqAnswer(question: string): SolarLotseResponse | null {
  const faq = generalFaqs.find((f) => f.question === question);
  if (!faq) return null;
  return {
    answer: faq.answer,
    sources: [{ title: "Häufige Fragen", url: "https://niedersachsen-solar.de/#faq", updatedAt: CONTENT_DATE }],
    confidence: "high",
    needsHuman: false,
    suggestedActions: ["ask-follow-up", "start-solar-check"],
  };
}

export function getProcessAnswer(): SolarLotseResponse {
  const summary = processSteps
    .map((s) => `${s.step}. ${s.title}: ${s.result}`)
    .join(" ");
  return {
    answer: summary,
    sources: [{ title: "Ablauf", url: "https://niedersachsen-solar.de/ablauf", updatedAt: CONTENT_DATE }],
    confidence: "high",
    needsHuman: false,
    suggestedActions: ["start-solar-check", "ask-follow-up"],
  };
}

export function getPrepareProjectAnswer(): SolarLotseResponse {
  return {
    answer:
      `Für ein konkretes Angebot helfen: Ihre letzte Stromrechnung, Fotos Ihres Dachs falls vorhanden, ` +
      `und eine grobe Vorstellung, welche Bausteine Sie interessieren (${services.map((s) => s.title).join(", ")}). ` +
      `Weitere Unterlagen brauchen Sie für das Erstgespräch nicht.`,
    sources: [{ title: "Ablauf", url: "https://niedersachsen-solar.de/ablauf", updatedAt: CONTENT_DATE }],
    confidence: "high",
    needsHuman: false,
    suggestedActions: ["start-solar-check", "request-callback"],
  };
}

export const fallbackAnswer = (): SolarLotseResponse => ({
  answer: UNCONFIRMED_ANSWER,
  sources: [],
  confidence: "limited",
  needsHuman: true,
  suggestedActions: ["ask-follow-up", "call"],
});

export const contactInfo = { phone: site.phone, phoneHref: site.phoneHref, email: site.email };
