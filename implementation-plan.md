# Implementation Plan

Dieser Plan beschreibt die nächsten konkreten Coding-Schritte. Er ist kleinteiliger als `roadmap.md` und soll beim agentic-coding als Arbeitsanleitung dienen.

## Arbeitsweise

- Spec zuerst lesen
- kleinen Task auswählen
- Akzeptanzkriterien beachten
- minimal und nachvollziehbar implementieren
- lokal testen
- Ergebnis kurz dokumentieren
- nach stabilen Schritten committen
- erst dann den nächsten Task starten

Bei Unsicherheit gilt:

- erst bestehende Dokumente lesen
- einfache Lösung bevorzugen
- Business-Logik ins Backend legen
- AI nur unterstützend behandeln
- keine Secrets in Dateien schreiben

## Definition of Done

Ein Task gilt als erledigt, wenn:

- der Code lauffähig ist
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

Ziel: Der Projektordner ist bereit für ein Fullstack-Setup.

Enthalten:

- Root-`package.json` anlegen
- sinnvolle npm scripts planen
- `apps/` Ordner anlegen
- `apps/web` und `apps/api` als Zielstruktur vorbereiten
- `.gitignore` prüfen
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

Ziel: `apps/web` läuft mit React, Vite, TypeScript und Tailwind CSS.

Enthalten:

- React/Vite/TypeScript Setup
- Tailwind CSS einrichten
- Startseite als einfache Platzhalteransicht
- Grundstruktur unter `src/app`, `src/features`, `src/shared`
- lokaler Start über npm script

Nicht enthalten:

- finale Landing Page
- Routing für alle Seiten
- API-Anbindung

Akzeptanzkriterien:

- Frontend startet lokal.
- Eine einfache HONEY | BEEZ ink Startansicht wird angezeigt.
- Tailwind-Klassen funktionieren.

## Task 3 - Backend-App scaffolden

Ziel: `apps/api` läuft mit Express und TypeScript.

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

- Root-Scripts für Web und API
- optional Script für parallelen Dev-Start
- klare README-Ergänzung für lokale Starts

Nicht enthalten:

- Deployment
- Datenbankverbindung

Akzeptanzkriterien:

- Web kann aus dem Root gestartet werden.
- API kann aus dem Root gestartet werden.
- Startbefehle sind dokumentiert.

## Task 5 - Brand Foundation vorbereiten

Ziel: Die visuelle Basis für HONEY | BEEZ ink ist im Frontend angelegt.

Enthalten:

- Farbwerte definieren: Schwarz, Weiss, `#ffc105`
- globale Grundstyles
- Layout-Grundgerüst
- Navigation für Start, Artists, Portfolio und Anfrage vorbereiten
- responsive Basis prüfen

Nicht enthalten:

- vollständige Landing Page
- echte Bildergalerie
- Booking-Formular

Akzeptanzkriterien:

- Die App wirkt erkennbar nach HONEY | BEEZ ink.
- Navigation ist sichtbar und bedienbar.
- Grundlayout funktioniert auf Desktop und Mobile.

## Task 6 - Landing Page MVP

Ziel: Die Startseite erfüllt Phase 2 der Roadmap.

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
- Nutzer können zu den wichtigsten Bereichen navigieren.
- Die Seite bleibt trotz starkem Look gut bedienbar.

## Task 7 - Artists MVP

Ziel: Artist-Übersicht und Artist-Detailseiten funktionieren mit Mock-Daten.

Enthalten:

- Artist-Datentyp definieren
- Artist-Mock-Daten anlegen
- Artist-Übersicht
- Artist-Detailseite
- CTA zur Terminanfrage mit optionalem Artist-Wunsch vorbereiten

Nicht enthalten:

- Persistenz in MongoDB Atlas
- Admin-Verwaltung

Akzeptanzkriterien:

- Nutzer können Artists sehen.
- Nutzer können ein Artist-Profil öffnen.
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

- Nutzer können Portfolio-Einträge sehen.
- Nutzer können nach Stil und Artist filtern.
- Nutzer können Details zu einer Arbeit öffnen.

## Task 9 - Booking Flow Frontend

Ziel: Der 5-Schritte-Terminanfrage-Flow ist im Frontend nutzbar.

Enthalten:

- Kontakt
- Motividee
- Platzierung und Größe
- Zusatzinformationen
- Zusammenfassung und Absenden
- Frontend-Validierung
- Erfolgsmeldung nach simuliertem Absenden

Nicht enthalten:

- Speicherung in MongoDB Atlas
- echte API-Anbindung
- Terminbestätigung
- Preiszusage
- AI-Zusammenfassung

Akzeptanzkriterien:

- Nutzer können alle fünf Schritte durchlaufen.
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
- Ungültige Anfragen werden abgelehnt.
- Status wird im Backend gesetzt.
- Pflichtvalidierung liegt im Backend.

## Task 11 - MongoDB Atlas Persistenz

Ziel: Booking Requests werden in MongoDB Atlas gespeichert.

Enthalten:

- lokale `.env` für Atlas-Connection-String
- Mongoose-Verbindung
- `BookingRequest` Mongoose Model
- Persistenz im Booking Service
- Compass-Prüfung

Nicht enthalten:

- echte Secrets im Repository
- echte Zugangsdaten in `.env.template`
- Artist- oder Portfolio-Persistenz

Akzeptanzkriterien:

- Neue Booking Requests werden in Atlas gespeichert.
- Gespeicherte Daten sind in Compass sichtbar.
- Ohne gültige lokale `.env` startet die API kontrolliert oder gibt eine klare Fehlermeldung.

## Task 12 - Clerk Admin Auth vorbereiten

Ziel: Admin-API-Endpunkte werden backendseitig mit Clerk geschützt.

Enthalten:

- Clerk-Abhängigkeit für die API installieren
- Clerk-Env-Konfiguration vorbereiten
- `clerkMiddleware()` im API-Setup einbinden
- eigene Admin-Auth-Middleware für JSON-APIs anlegen
- geschützten Admin-Testendpunkt ergänzen

Nicht enthalten:

- Admin-UI-Redesign
- Figma-unabhängige Frontend-Arbeit
- komplexes Rollenmodell
- echte Secrets im Repository

Akzeptanzkriterien:

- Öffentliche API-Endpunkte bleiben ohne Login erreichbar.
- Admin-Testendpunkt lehnt nicht authentifizierte Anfragen mit JSON-`401` ab.
- Clerk-Secrets werden nur lokal in `.env` verwendet.
- Rollen- oder Rechteprüfung bleibt als separater Schritt dokumentiert.

## Nächster konkreter Schritt

Task 1 ist umgesetzt.

Task 2 ist umgesetzt.

Task 3 ist umgesetzt.

Task 4 ist umgesetzt.

Frontend-Arbeit wird bis zur Figma-Planung geparkt.

Als nächstes wird Task 12 umgesetzt: Clerk Admin Auth vorbereiten.
