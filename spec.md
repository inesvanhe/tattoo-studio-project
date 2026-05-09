# Product Spec

Diese Spec beschreibt den ersten umsetzbaren Produktumfang für HONEY | BEEZ ink. Sie soll klar genug sein, um daraus Frontend-Routen, Backend-Endpunkte, Datenmodelle und spätere Implementierungsschritte abzuleiten.

## MVP-Priorisierung

### MVP 1: Öffentliche Website und Terminanfrage

Der erste MVP konzentriert sich auf die sichtbare Website und den wichtigsten Kundenfluss.

- Startseite
- Artist-Übersicht
- Artist-Detailseiten
- Portfolio-Galerie
- Portfolio-Detailansicht
- strukturiertes Terminanfrage-Formular
- Speichern von Terminanfragen im Backend
- Backend-Validierung mit Zod

### MVP 2: Admin und Anfrageverwaltung

Der zweite MVP macht eingehende Anfragen intern bearbeitbar.

- Admin-Dashboard
- Liste aller Terminanfragen
- Detailansicht einer Terminanfrage
- Statusverwaltung für Anfragen
- einfache Filter nach Status

### MVP 3: AI-Simulationen

Der dritte MVP fügt AI-gestützte Hilfsfunktionen als deterministische Mock-Services hinzu.

- AI Tattoo Advisor als Simulation
- AI Booking Assistant als Simulation
- Zusammenfassung einer Terminanfrage
- Rückfragen und Hinweise ohne verbindliche Entscheidungen

## Nicht im MVP

- autonome Terminbuchung
- Online-Zahlungen
- echte Preisberechnung
- medizinische Beratung
- Tattoo-Bildgenerierung
- Multi-Agent-System
- vollständiges CMS
- echte Authentifizierung mit Clerk
- echte AI-API-Anbindung

## Startseite

Die Startseite ist der erste Kontaktpunkt mit HONEY | BEEZ ink. Sie soll Marke, Stil und Handlungswege sofort sichtbar machen.

Inhalte:

- Hero-Bereich mit Studio-Name, starkem visuellen Eindruck und CTA zur Terminanfrage
- kurzes Studio-Intro mit urbaner, underground und lowrider-inspirierter Haltung
- Stilrichtungen: Blackwork und Neo-Traditional
- Artist-Vorschau
- Portfolio-Vorschau
- klarer CTA zur Terminanfrage

Gestaltungsrichtung:

- dunkle Grundstimmung mit Schwarz und Weiss
- Akzentfarbe `#ffc105`
- edgy, hochwertig, nicht generisch
- klare Bedienbarkeit trotz starkem Look

## Artists

### Artist-Übersicht

Die Artist-Übersicht zeigt alle Artists des Studios als Einstieg in deren Profile.

Jeder Artist-Eintrag zeigt:

- Name
- Rolle oder Spezialisierung
- Kurzbeschreibung
- Stilrichtungen
- Profilbild oder Platzhalterbild
- Link zur Detailseite

### Artist-Detailseite

Die Detailseite stellt einen Artist genauer vor.

Inhalte:

- Name
- Bio
- Spezialisierungen
- bevorzugte Stilrichtungen
- ausgewählte Portfolio-Arbeiten
- CTA zur Terminanfrage mit optionalem Artist-Wunsch

## Portfolio-Galerie

Die Portfolio-Galerie zeigt Arbeiten des Studios und hilft Nutzern, Stil, Qualität und Richtung einzuordnen.

Ein Portfolio-Eintrag enthält:

- Bild oder Platzhalterbild
- Titel
- Stilrichtung
- Artist
- Körperstelle
- Tags
- optionale Beschreibung

MVP-Funktionen:

- Galerieansicht aller Portfolio-Einträge
- Detailansicht für einzelne Portfolio-Einträge
- Filter nach Stilrichtung
- Filter nach Artist

## Terminanfrage-Flow

Das Terminanfrage-Formular ist der wichtigste interaktive Kundenfluss im MVP 1. Es soll Kunden helfen, eine vollständige und für das Studio gut prüfbare Anfrage zu stellen.

Der Flow besteht aus fünf Schritten:

1. Kontakt
   - Name
   - E-Mail oder Telefonnummer

2. Motividee
   - Beschreibung der Tattoo-Idee
   - gewünschte Stilrichtung

3. Platzierung und Größe
   - Körperstelle
   - ungefähre Größe

4. Zusatzinformationen
   - optionale Referenzen
   - optionaler Artist-Wunsch
   - optionaler Budgetrahmen
   - optionaler Terminwunsch

5. Zusammenfassung und Absenden
   - Nutzer sieht seine Angaben vor dem Absenden
   - Anfrage wird erst nach finaler Bestätigung gespeichert

Nach dem Absenden erhält der Nutzer eine einfache Erfolgsmeldung. Es wird kein Termin bestätigt und kein Preis zugesagt.

## Datenmodell: BookingRequest

Eine Terminanfrage wird als `BookingRequest` gespeichert.

Pflichtfelder:

- `name`: Name des Kunden
- `contact`: E-Mail oder Telefonnummer
- `idea`: Beschreibung der Motividee
- `style`: gewünschte Stilrichtung
- `bodyPlacement`: Körperstelle
- `approxSize`: ungefähre Größe
- `status`: Bearbeitungsstatus

Optionale Felder:

- `references`: Referenzbilder oder Referenzlinks
- `preferredArtistId`: gewünschter Artist
- `budgetRange`: grober Budgetrahmen
- `preferredDate`: Terminwunsch
- `aiSummary`: spätere AI-Zusammenfassung
- `notes`: interne Notizen für Admins oder Artists

Statuswerte:

- `new`
- `reviewed`
- `contacted`
- `archived`

## API-Skizze

### Health

- `GET /api/health`

### Artists

- `GET /api/artists`
- `GET /api/artists/:id`

### Portfolio

- `GET /api/portfolio`
- `GET /api/portfolio/:id`

### Booking Requests

- `POST /api/booking-requests`

### Admin

- `GET /api/admin/booking-requests`
- `GET /api/admin/booking-requests/:id`
- `PATCH /api/admin/booking-requests/:id/status`

### AI Simulation

- `POST /api/ai/advisor/message`
- `POST /api/ai/booking-summary`

## Validierungsprinzip

Frontend-Validierung hilft Nutzern, Fehler früh zu erkennen und Formulare angenehmer auszufüllen.

Backend-Validierung entscheidet, ob Daten akzeptiert und gespeichert werden. Zod wird an API-Grenzen verwendet.

Business-Logik bleibt deterministisch im Backend. AI darf keine Statuswerte setzen, keine Termine bestätigen, keine Preise berechnen und keine medizinischen Aussagen treffen.

## Akzeptanzkriterien

### Öffentliche Website

- Die Startseite zeigt HONEY | BEEZ ink als klar erkennbare Marke.
- Die Farben Schwarz, Weiss und `#ffc105` werden als visuelle Grundlage genutzt.
- Nutzer können von der Startseite zu Artists, Portfolio und Terminanfrage navigieren.
- Die Website wirkt urban, hochwertig und underground, bleibt aber gut bedienbar.

### Artists

- Nutzer können eine Liste von Artists sehen.
- Nutzer können eine Detailseite für einen Artist öffnen.
- Eine Artist-Detailseite zeigt Spezialisierungen und passende Portfolio-Arbeiten.
- Nutzer können von einer Artist-Detailseite aus eine Terminanfrage starten.

### Portfolio

- Nutzer können Portfolio-Einträge in einer Galerie sehen.
- Nutzer können einzelne Portfolio-Einträge genauer ansehen.
- Nutzer können Portfolio-Einträge nach Stilrichtung filtern.
- Nutzer können Portfolio-Einträge nach Artist filtern.

### Terminanfrage

- Eine Anfrage kann nur gespeichert werden, wenn alle Pflichtfelder vorhanden sind.
- Kontakt muss mindestens eine E-Mail oder Telefonnummer enthalten.
- Der Nutzer sieht vor dem Absenden eine Zusammenfassung seiner Angaben.
- Nach dem Absenden wird die Anfrage mit Status `new` gespeichert.
- Nach dem Absenden wird kein Termin bestätigt.
- Nach dem Absenden wird kein verbindlicher Preis genannt.

### Admin

- Admins können alle Anfragen sehen.
- Admins können einzelne Anfragen öffnen.
- Admins können den Status einer Anfrage ändern.
- Erlaubte Statuswerte sind `new`, `reviewed`, `contacted` und `archived`.

### AI Simulation

- AI-Funktionen laufen im MVP als Mock-Service.
- AI darf Rückfragen, Hinweise und Zusammenfassungen erzeugen.
- AI darf keine Termine bestätigen.
- AI darf keine verbindlichen Preise zusagen.
- AI darf keine Statuswerte kontrollieren.
