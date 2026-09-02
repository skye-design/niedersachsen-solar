import {
  House,
  Sun,
  BatteryFull,
  Thermometer,
  Car,
} from "@phosphor-icons/react/dist/ssr";
import type { IconProps } from "@phosphor-icons/react";

export type EnergyPathNode = {
  id: string;
  label: string;
  description?: string;
  icon: "dach" | "sonne" | "speicher" | "waerme" | "mobilitaet";
};

const icons: Record<EnergyPathNode["icon"], React.ComponentType<IconProps>> = {
  dach: House,
  sonne: Sun,
  speicher: BatteryFull,
  waerme: Thermometer,
  mobilitaet: Car,
};

/**
 * Accessible energy-flow diagram: a semantic ordered list with icon nodes.
 * On `sm`+ a single connecting line runs behind the icon row; below `sm` it
 * reflows to a vertical column with a short connector between each step —
 * no separate mobile SVG layout to keep in sync.
 */
export default function EnergyPath({
  nodes,
  compact = false,
  dark = false,
}: {
  nodes: EnergyPathNode[];
  compact?: boolean;
  dark?: boolean;
}) {
  const circleSize = compact ? "h-11 w-11" : "h-14 w-14";

  return (
    <ol
      className="relative flex flex-col gap-0 sm:flex-row sm:items-start sm:justify-between sm:gap-2"
      aria-label="Energiefluss von Dach bis Mobilität"
    >
      {/* single connecting line behind the row, desktop/tablet only */}
      <span
        aria-hidden
        className={`absolute top-0 right-0 left-0 hidden h-px sm:block ${
          dark ? "bg-primary/40" : "bg-primary/30"
        }`}
        style={{
          top: compact ? "22px" : "28px",
          left: `${100 / nodes.length / 2}%`,
          right: `${100 / nodes.length / 2}%`,
        }}
      />

      {nodes.map((node, i) => {
        const Icon = icons[node.icon];
        const isLast = i === nodes.length - 1;
        return (
          <li key={node.id} className="relative flex flex-col sm:flex-1">
            <div className="flex items-start gap-4 sm:flex-col sm:items-center sm:text-center">
              <span
                className={`relative z-10 flex shrink-0 items-center justify-center rounded-full border-2 ${circleSize} ${
                  dark
                    ? "border-primary/50 bg-ink-alt text-on-ink"
                    : "border-primary/30 bg-card text-primary"
                }`}
              >
                <Icon size={compact ? 20 : 26} weight="bold" aria-hidden />
              </span>
              <div className="pb-6 sm:pb-0">
                <p
                  className={`font-heading font-semibold ${
                    compact ? "text-sm" : "text-base"
                  } ${dark ? "text-on-ink" : "text-foreground"}`}
                >
                  {node.label}
                </p>
                {node.description && (
                  <p
                    className={`mt-1 max-w-[16ch] text-sm leading-snug ${
                      dark ? "text-on-ink-muted" : "text-muted-foreground"
                    }`}
                  >
                    {node.description}
                  </p>
                )}
              </div>
            </div>

            {/* mobile-only connector between stacked steps */}
            {!isLast && (
              <span
                aria-hidden
                className={`ml-[22px] block h-6 w-px sm:hidden ${
                  dark ? "bg-primary/40" : "bg-primary/30"
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
