"use client";

import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { decisionPaths } from "@/lib/content";
import Reveal from "@/components/Reveal";
import { trackEvent } from "@/lib/analytics";

const accentClasses = {
  primary: "border-primary/30 hover:border-primary/60 group-hover:text-primary",
  green: "border-green/30 hover:border-green/60 group-hover:text-green",
  amber: "border-amber/40 hover:border-amber/70 group-hover:text-amber",
  blue: "border-blue/30 hover:border-blue/60 group-hover:text-blue",
} as const;

export default function DecisionEntry() {
  return (
    <section aria-labelledby="decision-heading">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal className="max-w-2xl">
          <h2 id="decision-heading" className="text-3xl font-semibold text-foreground sm:text-4xl">
            Wobei dürfen wir Sie zuerst unterstützen?
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {decisionPaths.map((path, i) => (
            <Reveal key={path.id} delay={i * 60} className={i === 4 ? "lg:col-span-1" : ""}>
              <Link
                href={path.href}
                onClick={() => trackEvent({ name: "decision_card_click", serviceId: path.id })}
                className={`group flex h-full flex-col justify-between rounded-2xl border-2 bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 ${accentClasses[path.accent]}`}
              >
                <div>
                  <p className="font-data text-xs tracking-wide text-muted-foreground uppercase">
                    {path.label}
                  </p>
                  <p className="mt-3 text-lg leading-snug font-semibold text-foreground">
                    {path.question}
                  </p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground/70 transition-colors">
                  Ansehen
                  <ArrowRight
                    size={16}
                    weight="bold"
                    className="transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
