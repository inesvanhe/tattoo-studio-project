# Tattoo Studio Project

Moderne Website und Webplattform fuer HONEY | BEEZ ink, ein halb-fiktives Tattoo-Studio mit urbaner, edgy Ausrichtung und Fokus auf Blackwork und Neo-Traditional.

Das Projekt entsteht als erstes agentic-coding Projekt im Rahmen einer Webdev-Weiterbildung. Ziel ist nicht nur eine funktionierende Anwendung, sondern auch eine wartbare Codebasis, die spec-first, iterativ und bewusst unter menschlicher Kontrolle entwickelt wird.

## Ziel

Die Plattform soll ein Tattoo-Studio digital abbilden: von der oeffentlichen Praesentation ueber Artist-Profile und Portfolio bis hin zu strukturierten Terminanfragen, Admin-Verwaltung und AI-gestuetzter Beratung.

AI unterstuetzt Nutzer beim Strukturieren ihrer Ideen, stellt Rueckfragen und erzeugt hilfreiche Zusammenfassungen. Geschaeftliche Entscheidungen, Terminbestaetigungen, verbindliche Preise und medizinische Aussagen bleiben immer menschlich kontrolliert und deterministisch im Backend abgesichert.

## Marke

- Name: HONEY | BEEZ ink
- Stil: cool, fancy, underground, amerikanisch inspirierte Tattoo- und Lowrider-Aesthetik
- Farben: Schwarz, Weiss, `#ffc105`

## Plattformbereiche

- Oeffentliche Studio-Website
- Artist-Profile
- Portfolio-Galerie
- Terminanfrage-System
- Admin-Dashboard
- AI Tattoo Advisor
- AI Booking Assistant

## Stack

- Frontend: React, Vite, TypeScript, Tailwind CSS
- Backend: Express, TypeScript
- Datenbank: MongoDB Atlas mit Mongoose, einsehbar ueber MongoDB Compass
- Validierung: Zod
- Auth: spaeter Clerk
- AI: zunaechst Mock-Service, spaeter echte API moeglich

## Entwicklungsprinzipien

- Spec-first Entwicklung
- Sokratischer Dialog
- Kleine iterative Schritte
- Feature-based Architektur
- Von Menschen ueberwachte AI
- Wartbare Codebasis
- Keine unnoetige Komplexitaet
- Business-Logik deterministisch im Backend
- AI unterstuetzt nur, entscheidet nicht

## Lokale Entwicklung

Abhaengigkeiten installieren:

```bash
npm install
```

Frontend starten:

```bash
npm run dev:web
```

Backend starten:

```bash
npm run dev:api
```

Qualitaetschecks:

```bash
npm run check
npm run lint
npm run build
```

Lokale URLs:

- Web: `http://localhost:5173`
- API: `http://localhost:4000`
- Health Check: `http://localhost:4000/api/health`

## Lokale Konfiguration

Admin-Authentifizierung wird mit Clerk vorbereitet.

Lokale Secrets gehoeren in eine nicht versionierte `.env`:

```bash
CLERK_SECRET_KEY=
VITE_CLERK_PUBLISHABLE_KEY=
```

Echte Clerk-Keys duerfen nicht ins Repository geschrieben werden.

## Dokumente

- [Vision](./vision.md)
- [Spec](./spec.md)
- [AI Agent Guidelines](./agents.md)
- [Architecture Notes](./architecture.md)
- [Roadmap](./roadmap.md)
- [Implementation Plan](./implementation-plan.md)
