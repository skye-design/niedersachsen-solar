import EnergyPath, { type EnergyPathNode } from "@/components/EnergyPath";
import Reveal from "@/components/Reveal";
import SignalTag from "@/components/SignalTag";

const nodes: EnergyPathNode[] = [
  {
    id: "pv",
    label: "PV-Anlage",
    description: "erzeugt Strom aus Sonne",
    icon: "sonne",
  },
  {
    id: "speicher",
    label: "Speicher",
    description: "hält Überschuss für später bereit",
    icon: "speicher",
  },
  {
    id: "wallbox",
    label: "Wallbox",
    description: "lädt bevorzugt mit Solarstrom",
    icon: "mobilitaet",
  },
  {
    id: "waermepumpe",
    label: "Wärmepumpe",
    description: "heizt bevorzugt mit Solarstrom",
    icon: "waerme",
  },
];

export default function SystemExplainer() {
  return (
    <section className="bg-ink text-on-ink" aria-labelledby="system-heading">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal className="max-w-2xl">
          <SignalTag index={2}>System</SignalTag>
          <h2 id="system-heading" className="mt-4 text-3xl font-semibold text-on-ink sm:text-4xl">
            Ein System, das zusammenspielt
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-on-ink-muted">
            PV-Anlage, Speicher, Wallbox und Wärmepumpe werden nicht einzeln
            geplant, sondern als ein steuerbares Gesamtsystem, in dem jede
            Komponente den Solarstrom der anderen nutzt.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-14 rounded-2xl border border-ink-border bg-ink-alt/50 p-8 sm:p-12">
          <EnergyPath nodes={nodes} dark />
        </Reveal>
      </div>
    </section>
  );
}
