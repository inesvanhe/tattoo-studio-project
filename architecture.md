# Architecture Notes

Diese Architektur beschreibt die geplante technische Struktur für HONEY | BEEZ ink. Sie soll einfach genug für ein Weiterbildungsprojekt bleiben, aber klar genug sein, um wartbar und feature-basiert zu wachsen.

## Grundrichtung

Das Projekt wird als kleine Fullstack-Plattform mit getrenntem Frontend und Backend aufgebaut.

- `apps/web`: React, Vite, TypeScript, Tailwind CSS
- `apps/api`: Node.js, Express, TypeScript, Zod, Mongoose, dotenv
- MongoDB Atlas als primäre Entwicklungsdatenbank, einsehbar über MongoDB Compass

Frontend und Backend kommunizieren über HTTP-JSON-APIs.

## Architekturprinzipien

- spec-first entwickeln
- kleine, nachvollziehbare Iterationen
- feature-basierte Struktur statt technischer Sammelordner als Standard
- Business-Logik deterministisch im Backend
- Frontend für Darstellung, Interaktion und nutzerfreundliche Validierung
- Backend für Validierung, Persistenz und Statuslogik
- AI hinter klaren Service-Interfaces kapseln
- Mock-Services zuerst, echte externe Services später
- keine unnötige Abstraktion

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

Das Frontend ist die öffentliche Website und später der Einstieg in Admin- und AI-Funktionen.

Geplante Bereiche:

- Startseite
- Artist-Übersicht
- Artist-Detailseite
- Portfolio-Galerie
- Portfolio-Detailseite
- Terminanfrage-Flow
- später Admin-Dashboard
- später AI Advisor und AI Booking Assistant

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

Ein größeres Backend-Feature kann intern so aufgebaut werden:

```txt
features/bookingRequests/
  bookingRequest.model.ts
  bookingRequest.schema.ts
  bookingRequest.routes.ts
  bookingRequest.controller.ts
  bookingRequest.service.ts
  bookingRequest.types.ts
```

Kleine Features dürfen kleiner bleiben. Die Struktur soll helfen, nicht beeindrucken.

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

MongoDB Atlas ist die primäre Entwicklungsdatenbank. Dadurch kann von mehreren Geräten auf dieselbe Entwicklungsdatenbank zugegriffen werden.

MongoDB Compass bleibt die bevorzugte GUI, um Daten einzusehen und zu prüfen.

Eine lokale MongoDB-Instanz ist optional möglich, aber nicht der Standard für dieses Projekt.

Mongoose dient als Modellschicht für:

- Booking Requests
- später Artists
- später Portfolio-Einträge

Für frühe MVP-Schritte dürfen Artists und Portfolio auch als Seed- oder Mock-Daten starten. Sobald sie bearbeitbar werden oder dauerhaft gespeichert werden müssen, wandern sie in MongoDB Atlas.

## BookingRequest-Datenfluss

Der wichtigste MVP-Datenfluss ist die Terminanfrage.

1. Nutzer füllt das Formular im Frontend aus.
2. Frontend prüft nutzerfreundlich auf fehlende Angaben.
3. Nutzer bestätigt die Zusammenfassung.
4. Frontend sendet `POST /api/booking-requests`.
5. Backend validiert die Daten mit Zod.
6. Backend setzt den initialen Status `new`.
7. Backend speichert die Anfrage in MongoDB Atlas.
8. Frontend zeigt eine Erfolgsmeldung.

Wichtig:

- Das Frontend setzt keinen finalen Status.
- AI setzt keinen Status.
- Der Server entscheidet, ob eine Anfrage gespeichert wird.
- Es wird kein Termin bestätigt und kein Preis genannt.

## API-Grenzen

Die API orientiert sich an `spec.md`.

Öffentliche Endpunkte:

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

Öffentliche Seiten bleiben ohne Login erreichbar.

Clerk wird für Admin- und eventuell spätere Artist-Bereiche verwendet.

Der nächste Auth-Schritt ist backend-first: Admin-API-Endpunkte werden zuerst serverseitig geschützt, bevor Admin-UI-Arbeit vertieft wird.

Vorgehen:

- Clerk wird im API-Server als Express-Middleware eingebunden.
- Öffentliche API-Endpunkte bleiben ohne Login erreichbar.
- Admin-Endpunkte werden über eine eigene Admin-Auth-Middleware geschützt.
- Ungültige oder fehlende Authentifizierung führt bei API-Routen zu JSON-Fehlern, nicht zu Redirects.
- Rollen- oder Rechteprüfung wird nach der Grundauthentifizierung bewusst separat entschieden.

Bis Auth eingeführt ist, dürfen Admin-Funktionen nur als Entwicklungsfunktion betrachtet werden.

## AI-Schicht

AI wird hinter klaren Interfaces gekapselt.

Im MVP wird zuerst ein Mock-Service gebaut. Dieser kann feste oder regelbasierte Antworten erzeugen, damit UI und Datenfluss ohne echte AI-API entwickelt werden können.

Regeln:

- AI-Services liefern Texte, Hinweise oder Zusammenfassungen.
- AI-Services kontrollieren keine Business-Logik.
- AI-Services setzen keine Statuswerte.
- AI-Services bestätigen keine Termine.
- AI-Services nennen keine verbindlichen Preise.
- AI-Services geben keine medizinische Beratung.
- AI-Services generieren keine Tattoo-Bilder.

## Fehlerbehandlung

Das Backend soll Fehler konsistent beantworten.

Geplante Kategorien:

- Validierungsfehler
- Nicht gefunden
- Serverfehler

Validierungsfehler sollen für das Frontend so strukturiert sein, dass Formularfelder sinnvoll markiert werden können.

## Konfiguration

`.env.template` bleibt zunächst leer.

Umgebungsvariablen werden erst eingetragen, wenn sie bewusst im Projekt benötigt und dokumentiert werden.

Echte Secrets dürfen nicht in Repository-Dateien eingetragen werden.

Wenn die Datenbankanbindung umgesetzt wird, wird voraussichtlich eine lokale `.env` mit einem Atlas-Connection-String benötigt. Der echte Connection-String darf nicht committed werden.

## Architekturentscheidungen

Noch bewusst offen:

- konkrete Workspace-Struktur: npm workspaces oder getrennte Paketverwaltung
- konkrete Routing-Library im Frontend
- genaue UI-Komponentenstruktur
- ob Artists und Portfolio im ersten Schritt statisch oder direkt aus MongoDB Atlas kommen
- konkretes Clerk-Rollenmodell für Admins und eventuell Artists

Diese Entscheidungen sollen getroffen werden, wenn sie für die nächste Implementierungsphase relevant sind.
