# Roadmap

Diese Roadmap uebersetzt `vision.md`, `spec.md`, `agents.md` und `architecture.md` in eine sinnvolle Umsetzungsreihenfolge. Ziel ist ein lernfreundliches, spec-first Vorgehen in kleinen, pruefbaren Schritten.

## Phase 0 - Spezifikation und Projektklarheit

Ziel: Die Produktidee, MVP-Grenzen, AI-Regeln und technische Richtung sind dokumentiert.

Enthalten:

- README finalisieren
- Vision fuer HONEY | BEEZ ink schaerfen
- Product Spec mit MVP-Priorisierung definieren
- AI Agent Guidelines festlegen
- Architektur dokumentieren
- MongoDB Atlas als primaere Entwicklungsdatenbank festlegen
- `.env.template` leer lassen, bis Variablen bewusst eingefuehrt werden

Ergebnis:

- Die Dokumente sind die Grundlage fuer alle spaeteren Coding-Schritte.

## Phase 1 - Projektsetup

Ziel: Ein minimales lauffaehiges Fullstack-Grundgeruest steht.

Enthalten:

- Git initialisieren
- Root-Setup fuer das Projekt anlegen
- `apps/web` mit React, Vite, TypeScript und Tailwind CSS erstellen
- `apps/api` mit Express und TypeScript erstellen
- feature-basierte Grundordner anlegen
- Health Check `GET /api/health` bauen
- erste einfache Startansicht anzeigen

Nicht enthalten:

- MongoDB Atlas Verbindung
- echtes Booking-Formular
- Admin-Dashboard
- Clerk
- echte AI

Ergebnis:

- Frontend und Backend koennen lokal gestartet werden.
- Der Health Check funktioniert.
- Die Projektstruktur entspricht grob `architecture.md`.

## Phase 2 - Brand Foundation und Landing Page

Ziel: Die oeffentliche Website zeigt HONEY | BEEZ ink als klare Marke.

Enthalten:

- visuelle Grundlage mit Schwarz, Weiss und `#ffc105`
- Startseite mit Hero-Bereich
- Studio-Intro mit urbaner, underground und lowrider-inspirierter Haltung
- Stilrichtungen Blackwork und Neo-Traditional
- Artist-Vorschau
- Portfolio-Vorschau
- CTAs zu Portfolio, Artists und Terminanfrage
- responsive Grundgestaltung

Ergebnis:

- Die Website wirkt nicht generisch, sondern klar nach HONEY | BEEZ ink.
- Nutzer erkennen sofort, wohin sie navigieren koennen.

## Phase 3 - Artists

Ziel: Artists werden als eigener Plattformbereich sichtbar.

Enthalten:

- Artist-Mock-Daten definieren
- Artist-Uebersicht bauen
- Artist-Detailseite bauen
- Spezialisierungen, Bio und Stilrichtungen anzeigen
- CTA zur Terminanfrage mit optionalem Artist-Wunsch vorbereiten

Nicht enthalten:

- Artist-Verwaltung im Admin
- Persistenz in MongoDB Atlas

Ergebnis:

- Nutzer koennen Artists entdecken und einzelne Profile oeffnen.

## Phase 4 - Portfolio

Ziel: Portfolio-Arbeiten werden als Galerie und Detailansicht nutzbar.

Enthalten:

- Portfolio-Mock-Daten definieren
- Galerieansicht bauen
- Portfolio-Detailansicht bauen
- Filter nach Stilrichtung
- Filter nach Artist
- Verbindung zu Artist-Profilen vorbereiten

Nicht enthalten:

- Upload-Funktion
- vollstaendiges CMS
- Persistenz in MongoDB Atlas

Ergebnis:

- Nutzer koennen Arbeiten ansehen und nach Stil oder Artist filtern.

## Phase 5 - Booking Flow im Frontend

Ziel: Nutzer koennen eine strukturierte Terminanfrage vorbereiten.

Enthalten:

- mehrstufiges Anfrageformular bauen
- Schritt 1: Kontakt
- Schritt 2: Motividee
- Schritt 3: Platzierung und Groesse
- Schritt 4: Zusatzinformationen
- Schritt 5: Zusammenfassung und Absenden
- Frontend-Validierung fuer bessere Nutzerfuehrung
- Erfolgsmeldung nach simuliertem Absenden

Nicht enthalten:

- Speicherung in MongoDB Atlas
- echte Terminbestaetigung
- Preiszusage
- AI-Zusammenfassung

Ergebnis:

- Der wichtigste Kundenfluss ist im Frontend erlebbar.

## Phase 6 - Backend Booking API

Ziel: Terminanfragen koennen serverseitig validiert und angenommen werden.

Enthalten:

- `BookingRequest`-Zod-Schema
- `POST /api/booking-requests`
- Controller und Service fuer Booking Requests
- konsistente Fehlerantworten
- initialer Status `new` wird im Backend gesetzt
- Frontend sendet echte Anfrage an API

Nicht enthalten:

- Persistenz in MongoDB Atlas
- Admin-Dashboard
- AI-Zusammenfassung

Ergebnis:

- Das Backend entscheidet, ob eine Anfrage gueltig ist.
- Keine Anfrage wird ohne Pflichtfelder akzeptiert.

## Phase 7 - MongoDB Atlas und Persistenz

Ziel: Booking Requests werden dauerhaft in MongoDB Atlas gespeichert.

Enthalten:

- Atlas-Projekt und Cluster vorbereiten
- Atlas-Connection-String lokal in `.env` verwenden
- Mongoose-Verbindung einrichten
- `BookingRequest`-Mongoose-Model bauen
- gespeicherte Anfragen in Atlas pruefen
- Compass-Zugriff testen

Nicht enthalten:

- echte Secrets im Repository
- Eintrag echter Zugangsdaten in `.env.template`
- Artist- und Portfolio-Persistenz

Ergebnis:

- Abgesendete Terminanfragen landen dauerhaft in MongoDB Atlas.
- Daten koennen ueber MongoDB Compass eingesehen werden.

## Phase 8 - Admin Dashboard

Ziel: Eingehende Anfragen koennen intern gesichtet und bearbeitet werden.

Enthalten:

- Admin-Uebersicht fuer Booking Requests
- Anfrage-Detailansicht
- Statusfilter
- Statuswechsel fuer `new`, `reviewed`, `contacted`, `archived`
- API-Endpunkte fuer Admin-Anfragen

Nicht enthalten:

- Clerk-Authentifizierung
- Rollen- und Rechteverwaltung
- oeffentliche Nutzung des Admin-Bereichs

Ergebnis:

- Das Studio kann Anfragen strukturiert bearbeiten.
- Admin-Funktionen bleiben bis zur Auth-Einfuehrung Entwicklungsfunktionen.

## Phase 9 - AI Mock Services

Ziel: AI-Funktionen werden als kontrollierte Simulationen eingebaut.

Enthalten:

- AI Tattoo Advisor Mock
- AI Booking Assistant Mock
- `POST /api/ai/advisor/message`
- `POST /api/ai/booking-summary`
- unverbindliche Rueckfragen, Hinweise und Zusammenfassungen
- UI-Kennzeichnung als unterstuetzende AI-Funktion

Nicht enthalten:

- echte AI-API-Anbindung
- Tattoo-Bildgenerierung
- autonome Terminbuchung
- Preisberechnung
- medizinische Beratung
- Statuskontrolle durch AI

Ergebnis:

- AI-Workflows koennen im Produkt getestet werden, ohne Business-Logik an AI abzugeben.

## Phase 10 - Auth und Absicherung

Ziel: Admin-Funktionen werden fuer echte Nutzung vorbereitet.

Enthalten:

- Clerk backend-first integrieren
- Admin-API-Endpunkte serverseitig schuetzen
- JSON-Fehler fuer nicht authentifizierte API-Anfragen liefern
- Admin-Routen im Frontend erst nach Figma/UI-Planung anbinden
- Rollenmodell fuer Admins und eventuell Artists klaeren

Nicht enthalten:

- komplexes Rechte-CMS
- Multi-Tenant-Struktur
- Frontend-Redesign ohne Figma-Freigabe

Ergebnis:

- Der Admin-Bereich ist nicht mehr nur Entwicklungsfunktion.
- Admin-Zugriff haengt nicht nur von Frontend-Navigation ab.

## Phase 11 - Spaetere Erweiterungen

Moegliche Erweiterungen nach dem Kern-MVP:

- Artist- und Portfolio-Verwaltung im Admin
- Persistenz fuer Artists und Portfolio in MongoDB Atlas
- echte AI-API-Anbindung
- bessere Such- und Filterfunktionen
- Uploads fuer Referenzbilder
- Deployment
- Testing-Ausbau
- Accessibility- und Performance-Feinschliff
