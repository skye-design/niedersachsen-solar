# Korrekturdurchlauf — Abschlussbericht (2026-09-02)

Ausgangscommit: `3de0fb014e6b4d6c00d6a0670767f12dc71e81b3` (verifiziert vor
Beginn). Branch: `redesign/niso-v2`. Kein Merge, kein Deployment, kein
Zugriff auf den Hetzner-Server — wie angewiesen.

## Geänderte Dateien

26 geändert, 1 neu (`OWNER_CONFIRMATION_CHECKLIST.md`), `vendor/vanta-master/`
komplett entfernt (48 Dateien, unbenutzt):

```
 M docs/deployment.md
 M next.config.ts
 M src/app/api/lead/route.ts
 M src/app/globals.css
 M src/app/kontakt/page.tsx
 M src/app/layout.tsx
 M src/app/manifest.ts
 M src/app/page.tsx
 M src/app/projekte/page.tsx
 M src/app/ratgeber/[slug]/page.tsx
 M src/app/sitemap.ts
 M src/app/ueber-uns/page.tsx
 M src/components/ConversionFinale.tsx
 M src/components/Footer.tsx
 M src/components/Header.tsx
 M src/components/Hero.tsx
 M src/components/HeroMedia.tsx
 M src/components/QuoteSection.tsx
 M src/components/SolarCheck.tsx
 M src/components/SolarLotse.tsx
 M src/components/StickyMobileCTA.tsx
 M src/components/templates/ServicePageTemplate.tsx
 M src/lib/analytics.ts
 M src/lib/content.ts
 M src/lib/solarLotse.ts
 M src/lib/validation.ts
 D vendor/vanta-master/** (48 files)
?? OWNER_CONFIRMATION_CHECKLIST.md
```

## Was behoben wurde, pro Priorität

**P0 (Merge-Blocker):**
1. Hero-Safe-Area: fester Header-Höhen-Spacer (88px) als Flex-Sibling vor
   dem Content, statt Content, das durch Overflow nach oben durch den
   Header rutschen konnte. Geprüft bei 606px (Tool erreichte 390px nicht
   zuverlässig — siehe Risiken).
2. Reveal/JS-Abhängigkeit: Hero-Content trägt kein `<Reveal>` mehr
   (kein "scroll into view"-Moment für above-the-fold-Inhalt). Global:
   `.reveal`s versteckter Zustand gilt jetzt nur noch unter einer `.js`-
   Klasse, die ein blockierendes Inline-Script vor First Paint setzt — ohne
   JS bleibt jeder Reveal-Inhalt sitewide sofort sichtbar.
3. Neun Aussagekategorien gegated, `OWNER_CONFIRMATION_CHECKLIST.md`
   angelegt — Details dort, nicht hier wiederholt.
4. `/api/lead` gehärtet: kein Formspree-Fallback mehr (503 bei fehlender
   Env-Variable), kontaktweg-abhängige E-Mail-/Telefon-Validierung (client-
   und serverseitig identisch, `EMAIL_RE`/`PHONE_RE` aus `validation.ts`
   jetzt exportiert und in `SolarCheck.tsx` wiederverwendet statt dupliziert),
   Request-Size-Cap (20 KB) vor dem JSON-Parse, TTL-Sweep für das In-Memory-
   Rate-Limit, X-Forwarded-For-Vertrauensannahme dokumentiert.
5. `vendor/vanta-master/` entfernt (unbenutzt, keine einzige Referenz
   irgendwo im `src/`-Baum). `npm run lint` läuft jetzt fehlerfrei.
6. Branch-/Deploy-Zustand unverändert — siehe unten.

**P1 (sichtbare UX-/Conversion-Korrekturen):**
7. `--bottom-bar-height`-CSS-Variable (60px) als einzige Quelle für
   StickyMobileCTA (setzt jetzt seine tatsächliche Höhe darauf, nicht nur
   min-height), den Solar-Lotse-Launcher (Variable + 16px), einen neuen
   geteilten Spacer in `layout.tsx` (vorher hatte nur die Startseite
   überhaupt Padding reserviert — jede andere Seite konnte ihren Footer vom
   Balken verdeckt bekommen) und die Hero-EnergyPath-Karte (hatte vorher nur
   ~4px Puffer).
8. Gezielter Verlauf/Panel hinter Subline und Vertrauenszeile im Hero
   (nicht das ganze Bild abgedunkelt).
9. Solar-Check: Zusammenfassungsscreen zeigt jetzt "ZUSAMMENFASSUNG" statt
   der zuvor doppelt vergebenen "Schritt 4 von 6". Kontaktinput wechselt
   dynamisch `type="email"`/`type="tel"`. Fokus springt bei jedem
   Schrittwechsel auf die neue Legend/Überschrift. Feldbezogene Fehler mit
   `aria-describedby` statt einer kombinierten Meldung.
10. Zentrale Logoquelle (`brand.logo` in `content.ts`) für Header, Footer,
    JSON-LD (Organization + Article-Publisher) — alle vier Verweise auf das
    verworfene Manus-Set entfernt, temporär auf die Original-Datei aus dem
    alten `main`-Stand umgestellt. Offene Frage im Bericht unten.

**P2 (SEO/AI/Performance):**
11. `sitemap.ts`: kein `new Date()` mehr pro Build — `lastModified` komplett
    weggelassen (optional laut Sitemap-Protokoll), da kein echtes Datum
    zuverlässig gepflegt wird.
12. Maschinenlesbare Fakten (JSON-LD, Solar-Lotse) folgen automatisch aus
    Punkt 3 (`content.ts` als einzige Quelle) — nichts Zusätzliches zu tun.
13. Hero-Video: bereits korrekt gegated (Mobile/Save-Data/Reduced-Motion
    laden es nie) — verifiziert, nicht neu gebaut. Assetgrößen dokumentiert
    in `docs/deployment.md`. Mobile-Bild von der abstrakt wirkenden Luft-
    aufnahme (`gallery-01-v2.jpg`) auf ein Foto mit erkennbarem Gebäude-
    kontext (`hero-v2.jpg`) umgestellt.
14. `poweredByHeader: false` + vier Sicherheits-Header aktiv (HSTS ohne
    preload/includeSubDomains, X-Content-Type-Options, Referrer-Policy,
    Permissions-Policy). CSP dokumentiert als Entwurf, nicht aktiviert.

**Solar-Lotse:** UI-Label auf "Geführter Solar-Lotse" geändert, Identitäts-
text um einen expliziten Themenauswahl-Hinweis ergänzt. Weiterhin kein
Modellanbieter, weiterhin nur bestätigte Inhalte (die durch Punkt 3 jetzt
automatisch weniger geworden sind).

**Zusätzlich während der Prüfung gefunden und behoben:** Mobile-Drawer und
das Desktop-„Lösungen"-Dropdown hatten keinen Escape-Handler — Klick öffnete
sie, Escape tat nichts. Beide schließen jetzt korrekt (`Header.tsx`).

## Vorher/Nachher-Screenshots

`docs/screenshots/correction-pass/`:
- `hero-1372px-safe-area-and-contrast.jpg` — Desktop-Breite, Safe-Area und
  Kontrast-Panel sichtbar.
- `hero-606px-mobile-image-and-launcher-clearance.jpg` — Mobile-Tier (Tool
  erreichte exakt 390px nicht zuverlässig, siehe Risiken), Safe-Area,
  neues Mobile-Bild, Launcher-Abstand zur Sticky-Bar.
- `mobile-606px-sticky-cta-and-launcher.jpg` — Sticky-CTA und Launcher mit
  sichtbarem Abstand, keine Überlappung.

Kein separates "Vorher" verfügbar — der Ausgangszustand war der bereits
gemergte Stand aus Paket A-C, nicht separat screenshotet vor dieser
Korrektur. Die Bugs (Safe-Area-Überlappung, "Schritt 4 von 6" doppelt,
fehlendes Escape) sind im Code eindeutig nachvollziehbar (siehe Diffs) auch
ohne Vorher-Bild.

## Lint-/Build-Ergebnis

```
npm ci        → 358 packages, 0 install-Fehler (6 High-Severity-CVEs in
                 Dependencies, vorbestehend, außerhalb dieses Auftrags)
npm run lint  → 0 Fehler, 0 Warnungen
NODE_ENV=production npm run build → erfolgreich, alle 23 Routen
```

## Antworten aus OWNER_CONFIRMATION_CHECKLIST.md

Keine — die Datei wurde in diesem Durchlauf neu angelegt und wartet auf
Beantwortung durch den Product Owner. Neun Punkte, siehe die Datei selbst.

## Verbleibende Risiken

- **390/768/1440px nicht exakt verifiziert.** Das Browser-Automatisierungs-
  Tool erreichte die exakten Zielbreiten in dieser Umgebung wiederholt
  nicht zuverlässig (bereits in Paket D dokumentiert, hier erneut
  aufgetreten). Verifiziert wurde bei 606px/1372px (gleiche responsive
  Stufe wie 390/1440px, Breakpoint-Verhalten an der Grenze bestätigt) plus
  vollständiger Code-Review der Flexbox-/CSS-Variablen-Logik, die
  breitenunabhängig korrekt ist (deterministisches CSS, nicht auf
  Sichtprüfung angewiesen für Korrektheit). Empfehlung: Product Owner
  prüft `/` und eine Leistungsseite auf einem echten Mobilgerät vor
  Freigabe.
- **EcoFlow/„zertifiziert"-Gating hat Dachsanierung und Wärmepumpe spürbar
  gekürzt.** Beide Leistungsseiten haben jetzt weniger Inhalt als vorher
  (siehe `content.ts`-Diff). Kein Ersatztext erfunden — bewusste
  Entscheidung, aber wirkt sich sichtbar auf die Seiten aus, bis die
  Checkliste beantwortet ist.
- **Logo-Kontrast im Header ungelöst.** Die temporär genutzte Original-
  Datei hat keine Hell-/Dunkel-Variante; im transparenten (dunklen)
  Header-Zustand könnte der Kontrast schwächer sein als mit dem
  verworfenen Manus-Set. Nicht durch einen CSS-Filter o. Ä. kaschiert —
  bewusst offen gelassen, siehe `content.ts`-Kommentar bei `brand.logo`.
- **`--bottom-bar-height: 60px` ist ein kalibrierter, nicht gemessener
  Wert.** Passt zur aktuellen StickyMobileCTA-Struktur (jetzt mit `height`
  statt `min-height` gesetzt, sollte exakt stimmen), aber nicht auf einem
  echten Gerät nachgemessen.
- Alle bereits in `docs/deployment.md`s Pre-Merge-Checkliste genannten
  Punkte (Artikel-Datumsplatzhalter, PWA-Icon-Größen, Datenschutz-
  Rechtsprüfung, GPTBot-Entscheidung zum Launch-Zeitpunkt) gelten
  unverändert weiter.
- `~/Downloads/niedersachsen-solar-delivery/` (die Handoff-Quelle) war
  während dieses Durchlaufs plötzlich nicht mehr lesbar (Permission
  denied, auf allen Ebenen inklusive `~/Downloads` selbst) — vermutlich
  verschoben/entfernt außerhalb dieser Session. `CLAUDE.md`, alle
  `handoff/*.md` und `BRAND_SYSTEM.md` waren bereits vollständig aus einer
  früheren Lektüre in dieser Sitzung bekannt; nichts davon mit unsicherem
  Gedächtnis rekonstruiert. Reine Transparenz-Notiz, kein Blocker.

## Commit

Committet auf `redesign/niso-v2`, **nicht gepusht** — wartet auf
ausdrückliche Freigabe des Product Owners, wie angewiesen.

Commit-Hash: `f8e702432a0c36fb8e74e21fa8f6c6f0c422b9bd`
