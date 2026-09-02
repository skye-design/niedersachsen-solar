import { z } from "zod";

// Deliberately permissive — this rejects obvious garbage, not anything a
// real German phone/email could look like. Tightening further risks false
// negatives on real leads, which is worse than the spam this blocks.
// Exported so client-side forms (SolarCheck) can run the identical check
// instead of a second, potentially-drifting copy of the same pattern.
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PHONE_RE = /^\+?[0-9](?:[0-9\s()/-]){5,19}$/;

// Shared schema for both the single-step QuoteForm and the multi-step
// SolarCheck funnel. `company` is a honeypot: real visitors never see or
// fill this field (see the `sr-only`/off-screen styling at each call site),
// so any non-empty value here means the submission is automated.
export const leadSchema = z
  .object({
    name: z.string().trim().min(2, "Bitte geben Sie Ihren Namen an.").max(120),
    contact: z
      .string()
      .trim()
      .min(3, "Bitte geben Sie Telefon oder E-Mail an.")
      .max(200),
    contactMethod: z.enum(["telefon", "email"]).optional(),
    location: z.string().trim().max(200).optional(),
    postalCode: z
      .string()
      .trim()
      // German Postleitzahlen are always exactly 5 digits (00000-99999) —
      // NISO operates only in Germany, so a 4-digit match (Austria's
      // format) was accepting input that isn't actually valid here.
      .regex(/^\d{5}$/, "Bitte geben Sie eine gültige 5-stellige PLZ an.")
      .optional(),
    city: z.string().trim().max(120).optional(),
    interests: z.array(z.string().max(60)).max(10).optional(),
    propertyType: z.string().max(60).optional(),
    situation: z.string().max(120).optional(),
    message: z.string().trim().max(2000).optional(),
    source: z.enum(["quote-form", "solar-check", "solar-lotse"]),
    // Honeypot: validated only for shape here, checked for emptiness in the
    // route handler (kept out of the schema's pass/fail so a bot that fills
    // it gets an indistinguishable fake-success response, not a 400 that
    // would teach it which field to leave blank next time).
    company: z.string().max(200).optional().default(""),
  })
  // contact format depends on the declared method — a phone-shaped string
  // submitted as "email" (or vice versa) is exactly the kind of malformed
  // lead that wastes a callback. QuoteForm doesn't collect contactMethod at
  // all (one free-text field for either), so when it's absent we accept
  // whichever format matches rather than rejecting a valid submission.
  .superRefine((data, ctx) => {
    const matchesEmail = EMAIL_RE.test(data.contact);
    const matchesPhone = PHONE_RE.test(data.contact);
    const valid =
      data.contactMethod === "email"
        ? matchesEmail
        : data.contactMethod === "telefon"
          ? matchesPhone
          : matchesEmail || matchesPhone;
    if (!valid) {
      ctx.addIssue({
        code: "custom",
        path: ["contact"],
        message:
          data.contactMethod === "email"
            ? "Bitte geben Sie eine gültige E-Mail-Adresse an."
            : data.contactMethod === "telefon"
              ? "Bitte geben Sie eine gültige Telefonnummer an."
              : "Bitte geben Sie eine gültige Telefonnummer oder E-Mail-Adresse an.",
      });
    }
  });

export type LeadPayload = z.infer<typeof leadSchema>;
