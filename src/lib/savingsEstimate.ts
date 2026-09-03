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

// 2026-09-03 (Skye): NISO sizes for autarky and amortization, not bare
// annual-consumption matching — a naive "kWp = kWh/1000" formula recommended
// only 2 kWp for a 2-person household, far below what NISO would actually
// propose (Skye: at least 8 kWp). Sizing per household bucket doesn't follow
// a clean formula from consumption alone (it's a business judgment call, not
// a physics one), so the buckets in SolarCheck.tsx's CONSUMPTION_OPTIONS
// carry their own recommendedKwp directly rather than this module deriving
// one.
//
// That means these systems are usually generating well beyond the
// household's own annual consumption — self-consumption share can't stay a
// flat constant as system size grows relative to consumption (a bigger
// share of an oversized system's output gets exported, at the much lower
// Einspeisevergütung, not "saved" at the high retail price). Self-consumption
// quota is modeled here as declining with the coverage ratio (generation ÷
// consumption), per the well-established general pattern in German PV
// self-consumption data (see e.g. HTW Berlin's storage-inspection
// publications) — the specific curve below is NISO's own approximation of
// that trend, not one single cited table, and is worth revisiting against
// real installed-base data if that becomes available. The "with battery"
// curve stays meaningfully higher at every point (Skye: most customers pair
// PV with a Speicher), since a battery captures much of what an
// undersized-relative-to-generation household can't use the instant it's
// produced.
const SELF_CONSUMPTION_CURVE: {
  ratio: number;
  noBattery: number;
  withBattery: number;
}[] = [
  { ratio: 0.5, noBattery: 0.55, withBattery: 0.75 },
  { ratio: 1.0, noBattery: 0.35, withBattery: 0.6 },
  { ratio: 1.5, noBattery: 0.27, withBattery: 0.5 },
  { ratio: 2.0, noBattery: 0.22, withBattery: 0.42 },
  { ratio: 3.0, noBattery: 0.16, withBattery: 0.32 },
  { ratio: 4.0, noBattery: 0.13, withBattery: 0.26 },
  { ratio: 5.0, noBattery: 0.11, withBattery: 0.22 },
];

function selfConsumptionShare(coverageRatio: number, hasBattery: boolean): number {
  const points = SELF_CONSUMPTION_CURVE;
  const ratio = Math.max(points[0].ratio, Math.min(points[points.length - 1].ratio, coverageRatio));

  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    if (ratio >= a.ratio && ratio <= b.ratio) {
      const t = (ratio - a.ratio) / (b.ratio - a.ratio);
      const aValue = hasBattery ? a.withBattery : a.noBattery;
      const bValue = hasBattery ? b.withBattery : b.noBattery;
      return aValue + t * (bValue - aValue);
    }
  }
  const last = points[points.length - 1];
  return hasBattery ? last.withBattery : last.noBattery;
}

export interface SavingsEstimateInput {
  recommendedKwp: number;
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
  const orientationFactor = ORIENTATION_FACTOR[input.orientation] ?? ORIENTATION_FACTOR.unbekannt;
  const annualGenerationKwh = input.recommendedKwp * YIELD_KWH_PER_KWP * orientationFactor;

  const coverageRatio = annualGenerationKwh / input.annualConsumptionKwh;
  const share = selfConsumptionShare(coverageRatio, input.hasBattery);
  const selfConsumedKwh = annualGenerationKwh * share;
  const exportedKwh = annualGenerationKwh - selfConsumedKwh;

  const baseSavingsEur =
    selfConsumedKwh * ELECTRICITY_PRICE_EUR_PER_KWH + exportedKwh * FEED_IN_TARIFF_EUR_PER_KWH;

  return {
    recommendedKwp: input.recommendedKwp,
    annualGenerationKwh: Math.round(annualGenerationKwh),
    // Shown as a range, not a false-precision single number — this is a
    // rough estimate and should read like one.
    lowEstimateEur: roundTo(baseSavingsEur * 0.85, 50),
    highEstimateEur: roundTo(baseSavingsEur * 1.15, 50),
  };
}
