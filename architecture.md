# Architecture Notes

Diese Architektur beschreibt die geplante technische Struktur fuer HONEY | BEEZ ink. Sie soll einfach genug fuer ein Weiterbildungsprojekt bleiben, aber klar genug sein, um wartbar und feature-basiert zu wachsen.

## Grundrichtung

Das Projekt wird als kleine Fullstack-Plattform mit getrenntem Frontend und Backend aufgebaut.

- `apps/web`: React, Vite, TypeScript, Tailwind CSS
- `apps/api`: Node.js, Express, TypeScript, Zod, Mongoose, dotenv
- MongoDB Atlas als primaere Entwicklungsdatenbank, einsehbar ueber MongoDB Compass

Frontend und Backend kommunizieren ueber HTTP-JSON-APIs.

## Architekturprinzipien

- spec-first entwickeln
- kleine, nachvollziehbare Iterationen
- feature-basierte Struktur statt technischer Sammelordner als Standard
- Business-Logik deterministisch im Backend
- Frontend fuer Darstellung, Interaktion und nutzerfreundliche Validierung
- Backend fuer Validierung, Persistenz und Statuslogik
- AI hinter klaren Service-Interfaces kapseln
- Mock-Services zuerst, echte externe Services spaeter
- keine unnoetige Abstraktion

## Geplante Ordnerstruktur

```txt
tattoo-studio-project/
  apps/
    web/
      src/
        app/
        features/
        shared/
    api/
      src/
        app/
        features/
        shared/
  README.md
  vision.md
  spec.md
  agents.md
  architecture.md
  roadmap.md
  implementation-plan.md
```

Die genaue Struktur darf beim Setup leicht abweichen, solange die fachlichen Grenzen erhalten bleiben.

## Frontend: apps/web

Das Frontend ist die oeffentliche Website und spaeter der Einstieg in Admin- und AI-Funktionen.

Geplante Bereiche:

- Startseite
- Artist-Uebersicht
- Artist-Detailseite
- Portfolio-Galerie
- Portfolio-Detailseite
- Terminanfrage-Flow
- spaeter Admin-Dashboard
- spaeter AI Advisor und AI Booking Assistant

Empfohlene Struktur:

```txt
apps/web/src/
  app/
    App.tsx
    routes.tsx
  features/
    home/
    artists/
    portfolio/
    booking/
    admin/
    ai/
  shared/
    components/
    api/
    types/
    utils/
```

Regeln:

- Feature-spezifische Komponenten bleiben im jeweiligen Feature.
- Wiederverwendbare UI-Bausteine liegen in `shared/components`.
- API-Aufrufe werden nicht direkt in tiefen UI-Komponenten verstreut.
- Frontend-Validierung verbessert UX, ersetzt aber nie Backend-Validierung.

## Backend: apps/api

Das Backend stellt API-Endpunkte bereit, validiert eingehende Daten und persistiert Daten in MongoDB Atlas.

Geplante Features:

- `health`
- `artists`
- `portfolio`
- `bookingRequests`
- `admin`
- `ai`

Empfohlene Struktur:

```txt
apps/api/src/
  app/
    server.ts
    app.ts
  features/
    health/
    artists/
    portfolio/
    bookingRequests/
    admin/
    ai/
  shared/
    db/
    middleware/
    errors/
    validation/
    types/
```

Ein groesseres Backend-Feature kann intern so aufgebaut werden:

```txt
features/bookingRequests/
  bookingRequest.model.ts
  bookingRequest.schema.ts
  bookingRequest.routes.ts
  bookingRequest.controller.ts
  bookingRequest.service.ts
  bookingRequest.types.ts
```

Kleine Features duerfen kleiner bleiben. Die Struktur soll helfen, nicht beeindrucken.

## Backend-Schichten

### Routes

Routes definieren HTTP-Endpunkte und verbinden Request/Response mit Controllern.

### Controller

Controller lesen Request-Daten, rufen Validierung und Services auf und erzeugen HTTP-Antworten.

### Schemas

Zod-Schemas validieren eingehende Daten an API-Grenzen.

### Services

Services enthalten deterministische Business-Logik und koordinieren Datenzugriff.

### Models

Mongoose-Models bilden gespeicherte Daten in MongoDB Atlas ab.

## Datenbank

MongoDB Atlas ist die primaere Entwicklungsdatenbank. Dadurch kann von mehreren Geraeten auf dieselbe Entwicklungsdatenbank zugegriffen werden.

MongoDB Compass bleibt die bevorzugte GUI, um Daten einzusehen und zu pruefen.

Eine lokale MongoDB-Instanz ist optional moeglich, aber nicht der Standard fuer dieses Projekt.

Mongoose dient als Modellschicht fuer:

- Booking Requests
- spaeter Artists
- spaeter Portfolio-Eintraege

Fuer fruehe MVP-Schritte duerfen Artists und Portfolio auch als Seed- oder Mock-Daten starten. Sobald sie bearbeitbar werden oder dauerhaft gespeichert werden muessen, wandern sie in MongoDB Atlas.

## BookingRequest-Datenfluss

Der wichtigste MVP-Datenfluss ist die Terminanfrage.

1. Nutzer fuellt das Formular im Frontend aus.
2. Frontend prueft nutzerfreundlich auf fehlende Angaben.
3. Nutzer bestaetigt die Zusammenfassung.
4. Frontend sendet `POST /api/booking-requests`.
5. Backend validiert die Daten mit Zod.
6. Backend setzt den initialen Status `new`.
7. Backend speichert die Anfrage in MongoDB Atlas.
8. Frontend zeigt eine Erfolgsmeldung.

Wichtig:

- Das Frontend setzt keinen finalen Status.
- AI setzt keinen Status.
- Der Server entscheidet, ob eine Anfrage gespeichert wird.
- Es wird kein Termin bestaetigt und kein Preis genannt.

## API-Grenzen

Die API orientiert sich an `spec.md`.

Oeffentliche Endpunkte:

- `GET /api/health`
- `GET /api/artists`
- `GET /api/artists/:id`
- `GET /api/portfolio`
- `GET /api/portfolio/:id`
- `POST /api/booking-requests`

Admin-Endpunkte:

- `GET /api/admin/booking-requests`
- `GET /api/admin/booking-requests/:id`
- `PATCH /api/admin/booking-requests/:id/status`

AI-Endpunkte:

- `POST /api/ai/advisor/message`
- `POST /api/ai/booking-summary`

## Auth

Oeffentliche Seiten bleiben ohne Login erreichbar.

Clerk wird spaeter fuer Admin- und eventuell Artist-Bereiche vorbereitet, aber nicht im ersten MVP umgesetzt.

Bis Auth eingefuehrt ist, duerfen Admin-Funktionen nur als Entwicklungsfunktion betrachtet werden. Vor echter Nutzung muessen Admin-Endpunkte geschuetzt werden.

## AI-Schicht

AI wird hinter klaren Interfaces gekapselt.

Im MVP wird zuerst ein Mock-Service gebaut. Dieser kann feste oder regelbasierte Antworten erzeugen, damit UI und Datenfluss ohne echte AI-API entwickelt werden koennen.

Regeln:

- AI-Services liefern Texte, Hinweise oder Zusammenfassungen.
- AI-Services kontrollieren keine Business-Logik.
- AI-Services setzen keine Statuswerte.
- AI-Services bestaetigen keine Termine.
- AI-Services nennen keine verbindlichen Preise.
- AI-Services geben keine medizinische Beratung.
- AI-Services generieren keine Tattoo-Bilder.

## Fehlerbehandlung

Das Backend soll Fehler konsistent beantworten.

Geplante Kategorien:

- Validierungsfehler
- Nicht gefunden
- Serverfehler

Validierungsfehler sollen fuer das Frontend so strukturiert sein, dass Formularfelder sinnvoll markiert werden koennen.

## Konfiguration

`.env.template` bleibt zunaechst leer.

Umgebungsvariablen werden erst eingetragen, wenn sie bewusst im Projekt benoetigt und dokumentiert werden.

Echte Secrets duerfen nicht in Repository-Dateien eingetragen werden.

Wenn die Datenbankanbindung umgesetzt wird, wird voraussichtlich eine lokale `.env` mit einem Atlas-Connection-String benoetigt. Der echte Connection-String darf nicht committed werden.

## Architekturentscheidungen

Noch bewusst offen:

- konkrete Workspace-Struktur: npm workspaces oder getrennte Paketverwaltung
- konkrete Routing-Library im Frontend
- genaue UI-Komponentenstruktur
- ob Artists und Portfolio im ersten Schritt statisch oder direkt aus MongoDB Atlas kommen
- wann Clerk eingefuehrt wird

Diese Entscheidungen sollen getroffen werden, wenn sie fuer die naechste Implementierungsphase relevant sind.
