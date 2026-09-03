// Rough, non-binding savings estimate shown at the end of the Solar-Check's
// input steps — not a quote, not a substitute for a real site assessment
// with roof measurements. Every constant here is sourced and dated; the
// Einspeisevergütung in particular degresses over time under EEG rules and
// needs rechecking periodically (see the comment on that constant).

// Fraunhofer ISE, "Aktuelle Fakten zur Photovoltaik in Deutschland":
// national average ~980 kWh/kWp/Jahr; northern Germany (including
// Niedersachsen) runs 900-1.000. Using the conservative end deliberately —
// better to under-promise on a rough estimate than over-promise.
const YIELD_KWH_PER_KWP = 950;

// BDEW Strompreisanalyse, Ø Haushaltskunden, Stand Mitte 2026.
const ELECTRICITY_PRICE_EUR_PER_KWH = 0.37;

// §51 EEG, Teileinspeisung, Anlagen bis 10 kWp, Inbetriebnahme Q3/Q4 2026.
// This rate is set at commissioning and holds for 20 years per installation,
// but new installations get whatever rate is current when they go live, and
// that rate degresses over time — recheck this value before 2027.
const FEED_IN_TARIFF_EUR_PER_KWH = 0.077;

// Standard PV orientation yield-loss factors relative to due-south — an
// established technical figure (see e.g. Verbraucherzentrale orientation
// tables), not a business claim. "unbekannt" defaults conservatively rather
// than assuming the best case for an unanswered question.
const ORIENTATION_FACTOR = {
  sued: 1.0,
  "ost-west": 0.85,
  norden: 0.65,
  unbekannt: 0.95,
} as const;

export type Orientation = keyof typeof ORIENTATION_FACTOR;

// Typical German residential PV self-consumption share: roughly 25-35%
// without a battery, 55-70% with one. Using the conservative/lower end of
// each range.
const SELF_CONSUMPTION_SHARE_NO_BATTERY = 0.3;
const SELF_CONSUMPTION_SHARE_WITH_BATTERY = 0.55;

export interface SavingsEstimateInput {
  annualConsumptionKwh: number;
  orientation: Orientation;
  hasBattery: boolean;
}

export interface SavingsEstimateResult {
  recommendedKwp: number;
  annualGenerationKwh: number;
  lowEstimateEur: number;
  highEstimateEur: number;
}

function roundTo(value: number, step: number): number {
  return Math.round(value / step) * step;
}

export function estimateAnnualSavings(input: SavingsEstimateInput): SavingsEstimateResult {
  // Rule-of-thumb sizing: a system generating roughly as much as the
  // household consumes over a year, rounded to the nearest 0.5 kWp.
  const recommendedKwp = Math.max(1, roundTo(input.annualConsumptionKwh / 1000, 0.5));

  const orientationFactor = ORIENTATION_FACTOR[input.orientation] ?? ORIENTATION_FACTOR.unbekannt;
  const annualGenerationKwh = recommendedKwp * YIELD_KWH_PER_KWP * orientationFactor;

  const selfConsumptionShare = input.hasBattery
    ? SELF_CONSUMPTION_SHARE_WITH_BATTERY
    : SELF_CONSUMPTION_SHARE_NO_BATTERY;
  const selfConsumedKwh = annualGenerationKwh * selfConsumptionShare;
  const exportedKwh = annualGenerationKwh - selfConsumedKwh;

  const baseSavingsEur =
    selfConsumedKwh * ELECTRICITY_PRICE_EUR_PER_KWH + exportedKwh * FEED_IN_TARIFF_EUR_PER_KWH;

  return {
    recommendedKwp,
    annualGenerationKwh: Math.round(annualGenerationKwh),
    // Shown as a range, not a false-precision single number — this is a
    // rough estimate and should read like one.
    lowEstimateEur: roundTo(baseSavingsEur * 0.85, 50),
    highEstimateEur: roundTo(baseSavingsEur * 1.15, 50),
  };
}
