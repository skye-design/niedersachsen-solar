"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);

    // Backstop for instant same-page jumps (clicking a "#solar-check" link,
    // landing directly on a URL with that fragment, browser find-in-page):
    // an instant scroll never renders an intermediate frame where the
    // IntersectionObserver could see an element cross into view, so its
    // ratio appears to stay at 0 throughout and the callback above never
    // fires. Without this, everything between the old and new scroll
    // position stays permanently invisible. A direct geometry check on
    // scroll/hashchange catches what the observer can't.
    function revealIfNeeded() {
      if (!el || el.classList.contains("is-visible")) return;
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add("is-visible");
        observer.unobserve(el);
      }
    }
    revealIfNeeded();
    window.addEventListener("scroll", revealIfNeeded, { passive: true });
    window.addEventListener("hashchange", revealIfNeeded);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", revealIfNeeded);
      window.removeEventListener("hashchange", revealIfNeeded);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
