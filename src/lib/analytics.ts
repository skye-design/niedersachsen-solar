// Typed event plumbing for Paket C. No third-party analytics SDK is loaded
// or activated here — trackEvent() only fans out to a dev-console log today
// so call sites exist and are typed correctly before a real provider (with
// its own consent/cookie handling) is wired in.
export type AnalyticsEvent =
  | { name: "decision_card_click"; serviceId: string }
  | { name: "solar_check_step_completed"; step: number | "summary" | "estimate" }
  | { name: "solar_check_submitted" }
  | { name: "solar_check_error" }
  | { name: "quote_form_submitted" }
  | { name: "quote_form_error" }
  // Solar-Lotse: topic ids and booleans only, per handoff/05_CHATBOT_SPEC.md
  // §Monitoring — never message text, name, contact, or summary content.
  | { name: "solar_lotse_opened" }
  | { name: "solar_lotse_entry_selected"; entry: "solution" | "process" | "prepare" | "human" }
  | { name: "solar_lotse_answer_shown"; topicId: string; confidence: "high" | "limited" }
  | { name: "solar_lotse_feedback"; topicId: string; helpful: boolean }
  | { name: "solar_lotse_handoff_requested" }
  | { name: "solar_lotse_submitted" }
  | { name: "solar_lotse_error" };

export function trackEvent(event: AnalyticsEvent): void {
  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", event);
  }
  // No PII is ever passed in an AnalyticsEvent's fields by design — only
  // ids/step numbers. Keep it that way when adding new event variants.
}
