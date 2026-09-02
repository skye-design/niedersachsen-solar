import { z } from "zod";

// Shared schema for both the single-step QuoteForm and the multi-step
// SolarCheck funnel. `company` is a honeypot: real visitors never see or
// fill this field (see the `sr-only`/off-screen styling at each call site),
// so any non-empty value here means the submission is automated.
export const leadSchema = z.object({
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
    .regex(/^\d{4,5}$/, "Bitte geben Sie eine gültige PLZ an.")
    .optional(),
  city: z.string().trim().max(120).optional(),
  interests: z.array(z.string().max(60)).max(10).optional(),
  propertyType: z.string().max(60).optional(),
  situation: z.string().max(120).optional(),
  message: z.string().trim().max(2000).optional(),
  source: z.enum(["quote-form", "solar-check"]),
  // Honeypot: validated only for shape here, checked for emptiness in the
  // route handler (kept out of the schema's pass/fail so a bot that fills
  // it gets an indistinguishable fake-success response, not a 400 that
  // would teach it which field to leave blank next time).
  company: z.string().max(200).optional().default(""),
});

export type LeadPayload = z.infer<typeof leadSchema>;
