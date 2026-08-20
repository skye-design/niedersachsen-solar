"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type NetworkInformation = { saveData?: boolean };

export default function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const isDesktopViewport = window.matchMedia("(min-width: 900px)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const connection = (
      navigator as Navigator & { connection?: NetworkInformation }
    ).connection;
    const saveData = !!connection?.saveData;

    if (!isDesktopViewport || prefersReducedMotion || saveData) return;

    const source = document.createElement("source");
    source.src = "/videos/hero.mp4";
    source.type = "video/mp4";
    video.appendChild(source);

    /* play() must wait for loadedmetadata — calling it right after load()
       races the reset load() triggers and gets silently aborted. */
    video.addEventListener("loadedmetadata", () => {
      video.play().catch(() => {});
    });
    video.load();
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        className="absolute inset-0 hidden h-full w-full object-cover min-[900px]:block"
        muted
        loop
        playsInline
        preload="none"
        poster="/images/gallery/gallery-01-v2.jpg"
      />
      <Image
        src="/images/gallery/gallery-01-v2.jpg"
        alt="Luftaufnahme einer großflächigen Photovoltaikanlage auf einem Gewerbedach"
        fill
        priority
        sizes="100vw"
        className="object-cover min-[900px]:hidden"
      />
    </>
  );
}
