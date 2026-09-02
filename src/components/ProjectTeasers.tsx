import Image from "next/image";
import { projectTeasers, site } from "@/lib/content";
import Reveal from "@/components/Reveal";
import SignalTag from "@/components/SignalTag";

export default function ProjectTeasers() {
  return (
    <section id="projekte" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal className="max-w-2xl">
          <SignalTag index={4}>Projekte</SignalTag>
          <h2 id="projects-heading" className="mt-4 text-3xl font-semibold text-foreground sm:text-4xl">
            Installationen aus der Region
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Anlagen in und um {site.cities.join(", ")}.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {projectTeasers.map((image, i) => (
            <Reveal key={image.src} delay={i * 60}>
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-background-alt">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
