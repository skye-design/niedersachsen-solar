import Image from "next/image";
import Reveal from "@/components/Reveal";

const thumbnails = [
  {
    src: "/images/gallery/gallery-02-v2.jpg",
    alt: "PV-Module im Abendlicht auf einem Wohnhausdach",
  },
  {
    src: "/images/gallery/gallery-03-v2.jpg",
    alt: "Solarmodule auf einem Dachgaubendach in Niedersachsen",
  },
  {
    src: "/images/gallery/gallery-04-v2.jpg",
    alt: "PV-Anlage auf einem Reihenhaus mit Klinkerfassade",
  },
];

export default function Gallery() {
  return (
    <section id="projekte">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-32">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-medium text-foreground sm:text-4xl">
            Projekte aus der Region
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Installationen in und um Hannover, Hildesheim und Braunschweig.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-12 space-y-4">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-background">
            <Image
              src="/images/gallery/gallery-01-v2.jpg"
              alt="Luftaufnahme einer großflächigen Photovoltaikanlage auf einem Gewerbedach"
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {thumbnails.map((image) => (
              <div
                key={image.src}
                className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-background"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
