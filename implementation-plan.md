# Implementation Plan

Dieser Plan beschreibt die naechsten konkreten Coding-Schritte. Er ist kleinteiliger als `roadmap.md` und soll beim agentic-coding als Arbeitsanleitung dienen.

## Arbeitsweise

- Spec zuerst lesen
- kleinen Task auswaehlen
- Akzeptanzkriterien beachten
- minimal und nachvollziehbar implementieren
- lokal testen
- Ergebnis kurz dokumentieren
- nach stabilen Schritten committen
- erst dann den naechsten Task starten

Bei Unsicherheit gilt:

- erst bestehende Dokumente lesen
- einfache Loesung bevorzugen
- Business-Logik ins Backend legen
- AI nur unterstuetzend behandeln
- keine Secrets in Dateien schreiben

## Definition of Done

Ein Task gilt als erledigt, wenn:

- der Code lauffaehig ist
- TypeScript keine bekannten Fehler wirft
- der relevante Flow manuell getestet wurde
- neue Struktur zur Architektur passt
- keine echten Secrets committed werden
- Scope-Grenzen aus `spec.md` und `roadmap.md` eingehalten werden

## Git-Workflow

Nach wichtigen stabilen Schritten wird committed.

Beispiele:

- `docs: refine project specification`
- `chore: scaffold fullstack workspace`
- `chore: add api health check`
- `feat: add branded landing page`
- `feat: add artist mock pages`
- `feat: add portfolio mock gallery`
- `feat: add booking request flow`
- `feat: add booking request api`
- `feat: persist booking requests in atlas`
- `feat: add admin booking dashboard`
- `feat: add ai advisor mock`

## Task 1 - Projektstruktur vorbereiten

Ziel: Der Projektordner ist bereit fuer ein Fullstack-Setup.

Enthalten:

- Root-`package.json` anlegen
- sinnvolle npm scripts planen
- `apps/` Ordner anlegen
- `apps/web` und `apps/api` als Zielstruktur vorbereiten
- `.gitignore` pruefen
- `.env.template` leer lassen

Nicht enthalten:

- installierte Frontend-App
- installierte API-App
- MongoDB Atlas Verbindung

Akzeptanzkriterien:

- Projektstruktur folgt grob `architecture.md`.
- `.env.template` bleibt leer.
- Es werden keine Secrets erzeugt.

## Task 2 - Frontend-App scaffolden

Ziel: `apps/web` laeuft mit React, Vite, TypeScript und Tailwind CSS.

Enthalten:

- React/Vite/TypeScript Setup
- Tailwind CSS einrichten
- Startseite als einfache Platzhalteransicht
- Grundstruktur unter `src/app`, `src/features`, `src/shared`
- lokaler Start ueber npm script

Nicht enthalten:

- finale Landing Page
- Routing fuer alle Seiten
- API-Anbindung

Akzeptanzkriterien:

- Frontend startet lokal.
- Eine einfache HONEY | BEEZ ink Startansicht wird angezeigt.
- Tailwind-Klassen funktionieren.

## Task 3 - Backend-App scaffolden

Ziel: `apps/api` laeuft mit Express und TypeScript.

Enthalten:

- Express/TypeScript Setup
- `src/app/app.ts`
- `src/app/server.ts`
- Health Feature
- `GET /api/health`
- einfache Fehlerstruktur vorbereiten

Nicht enthalten:

- MongoDB Atlas Verbindung
- Booking API
- Auth
- AI

Akzeptanzkriterien:

- Backend startet lokal.
- `GET /api/health` liefert eine erfolgreiche Antwort.
- API-Struktur folgt grob `architecture.md`.

## Task 4 - Workspace-Scripts verbinden

Ziel: Frontend und Backend lassen sich komfortabel aus dem Root starten.

Enthalten:

- Root-Scripts fuer Web und API
- optional Script fuer parallelen Dev-Start
- klare README-Ergaenzung fuer lokale Starts

Nicht enthalten:

- Deployment
- Datenbankverbindung

Akzeptanzkriterien:

- Web kann aus dem Root gestartet werden.
- API kann aus dem Root gestartet werden.
- Startbefehle sind dokumentiert.

## Task 5 - Brand Foundation vorbereiten

Ziel: Die visuelle Basis fuer HONEY | BEEZ ink ist im Frontend angelegt.

Enthalten:

- Farbwerte definieren: Schwarz, Weiss, `#ffc105`
- globale Grundstyles
- Layout-Grundgeruest
- Navigation fuer Start, Artists, Portfolio und Anfrage vorbereiten
- responsive Basis pruefen

Nicht enthalten:

- vollstaendige Landing Page
- echte Bildergalerie
- Booking-Formular

Akzeptanzkriterien:

- Die App wirkt erkennbar nach HONEY | BEEZ ink.
- Navigation ist sichtbar und bedienbar.
- Grundlayout funktioniert auf Desktop und Mobile.

## Task 6 - Landing Page MVP

Ziel: Die Startseite erfuellt Phase 2 der Roadmap.

Enthalten:

- Hero-Bereich
- Studio-Intro
- Stilrichtungen Blackwork und Neo-Traditional
- Artist-Vorschau mit Mock-Daten
- Portfolio-Vorschau mit Mock-Daten
- CTAs zu Artists, Portfolio und Terminanfrage

Nicht enthalten:

- echte API-Daten
- Booking-Formular
- Admin
- AI

Akzeptanzkriterien:

- HONEY | BEEZ ink ist als Marke klar erkennbar.
- Nutzer koennen zu den wichtigsten Bereichen navigieren.
- Die Seite bleibt trotz starkem Look gut bedienbar.

## Task 7 - Artists MVP

Ziel: Artist-Uebersicht und Artist-Detailseiten funktionieren mit Mock-Daten.

Enthalten:

- Artist-Datentyp definieren
- Artist-Mock-Daten anlegen
- Artist-Uebersicht
- Artist-Detailseite
- CTA zur Terminanfrage mit optionalem Artist-Wunsch vorbereiten

Nicht enthalten:

- Persistenz in MongoDB Atlas
- Admin-Verwaltung

Akzeptanzkriterien:

- Nutzer koennen Artists sehen.
- Nutzer koennen ein Artist-Profil oeffnen.
- Artist-Profile zeigen Spezialisierungen und passende Inhalte.

## Task 8 - Portfolio MVP

Ziel: Portfolio-Galerie und Detailseiten funktionieren mit Mock-Daten.

Enthalten:

- Portfolio-Datentyp definieren
- Portfolio-Mock-Daten anlegen
- Galerieansicht
- Detailansicht
- Filter nach Stilrichtung
- Filter nach Artist

Nicht enthalten:

- Uploads
- Persistenz in MongoDB Atlas
- Admin-Verwaltung

Akzeptanzkriterien:

- Nutzer koennen Portfolio-Eintraege sehen.
- Nutzer koennen nach Stil und Artist filtern.
- Nutzer koennen Details zu einer Arbeit oeffnen.

## Task 9 - Booking Flow Frontend

Ziel: Der 5-Schritte-Terminanfrage-Flow ist im Frontend nutzbar.

Enthalten:

- Kontakt
- Motividee
- Platzierung und Groesse
- Zusatzinformationen
- Zusammenfassung und Absenden
- Frontend-Validierung
- Erfolgsmeldung nach simuliertem Absenden

Nicht enthalten:

- Speicherung in MongoDB Atlas
- echte API-Anbindung
- Terminbestaetigung
- Preiszusage
- AI-Zusammenfassung

Akzeptanzkriterien:

- Nutzer koennen alle fuenf Schritte durchlaufen.
- Pflichtfelder werden im Frontend sichtbar validiert.
- Vor dem Absenden erscheint eine Zusammenfassung.
- Es wird kein Termin und kein Preis zugesagt.

## Task 10 - Backend Booking API

Ziel: Das Backend akzeptiert valide Booking Requests.

Enthalten:

- `BookingRequest` Type
- Zod-Schema
- `POST /api/booking-requests`
- Controller
- Service
- initialer Status `new`
- strukturierte Validierungsfehler

Nicht enthalten:

- MongoDB Atlas Persistenz
- Admin
- AI

Akzeptanzkriterien:

- Valide Anfragen werden akzeptiert.
- Ungueltige Anfragen werden abgelehnt.
- Status wird im Backend gesetzt.
- Pflichtvalidierung liegt im Backend.

## Task 11 - MongoDB Atlas Persistenz

Ziel: Booking Requests werden in MongoDB Atlas gespeichert.

Enthalten:

- lokale `.env` fuer Atlas-Connection-String
- Mongoose-Verbindung
- `BookingRequest` Mongoose Model
- Persistenz im Booking Service
- Compass-Pruefung

Nicht enthalten:

- echte Secrets im Repository
- echte Zugangsdaten in `.env.template`
- Artist- oder Portfolio-Persistenz

Akzeptanzkriterien:

- Neue Booking Requests werden in Atlas gespeichert.
- Gespeicherte Daten sind in Compass sichtbar.
- Ohne gueltige lokale `.env` startet die API kontrolliert oder gibt eine klare Fehlermeldung.

## Naechster konkreter Schritt

Task 1 ist umgesetzt.

Task 2 ist umgesetzt.

Task 3 ist umgesetzt.

Task 4 ist umgesetzt.

Als naechstes wird Task 5 umgesetzt: Brand Foundation vorbereiten.
