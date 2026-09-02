// Typed event plumbing for Paket C. No third-party analytics SDK is loaded
// or activated here — trackEvent() only fans out to a dev-console log today
// so call sites exist and are typed correctly before a real provider (with
// its own consent/cookie handling) is wired in.
export type AnalyticsEvent =
  | { name: "decision_card_click"; serviceId: string }
  | { name: "solar_check_step_completed"; step: number | "summary" }
  | { name: "solar_check_submitted" }
  | { name: "solar_check_error" }
  | { name: "quote_form_submitted" }
  | { name: "quote_form_error" };

export function trackEvent(event: AnalyticsEvent): void {
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event);
  }
  // No PII is ever passed in an AnalyticsEvent's fields by design — only
  // ids/step numbers. Keep it that way when adding new event variants.
}
