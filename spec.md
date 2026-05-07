# Product Spec

Diese Spec beschreibt den ersten umsetzbaren Produktumfang fuer HONEY | BEEZ ink. Sie soll klar genug sein, um daraus Frontend-Routen, Backend-Endpunkte, Datenmodelle und spaetere Implementierungsschritte abzuleiten.

## MVP-Priorisierung

### MVP 1: Oeffentliche Website und Terminanfrage

Der erste MVP konzentriert sich auf die sichtbare Website und den wichtigsten Kundenfluss.

- Startseite
- Artist-Uebersicht
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
- Statusverwaltung fuer Anfragen
- einfache Filter nach Status

### MVP 3: AI-Simulationen

Der dritte MVP fuegt AI-gestuetzte Hilfsfunktionen als deterministische Mock-Services hinzu.

- AI Tattoo Advisor als Simulation
- AI Booking Assistant als Simulation
- Zusammenfassung einer Terminanfrage
- Rueckfragen und Hinweise ohne verbindliche Entscheidungen

## Nicht im MVP

- autonome Terminbuchung
- Online-Zahlungen
- echte Preisberechnung
- medizinische Beratung
- Tattoo-Bildgenerierung
- Multi-Agent-System
- vollstaendiges CMS
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

### Artist-Uebersicht

Die Artist-Uebersicht zeigt alle Artists des Studios als Einstieg in deren Profile.

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
- ausgewaehlte Portfolio-Arbeiten
- CTA zur Terminanfrage mit optionalem Artist-Wunsch

## Portfolio-Galerie

Die Portfolio-Galerie zeigt Arbeiten des Studios und hilft Nutzern, Stil, Qualitaet und Richtung einzuordnen.

Ein Portfolio-Eintrag enthaelt:

- Bild oder Platzhalterbild
- Titel
- Stilrichtung
- Artist
- Koerperstelle
- Tags
- optionale Beschreibung

MVP-Funktionen:

- Galerieansicht aller Portfolio-Eintraege
- Detailansicht fuer einzelne Portfolio-Eintraege
- Filter nach Stilrichtung
- Filter nach Artist

## Terminanfrage-Flow

Das Terminanfrage-Formular ist der wichtigste interaktive Kundenfluss im MVP 1. Es soll Kunden helfen, eine vollstaendige und fuer das Studio gut pruefbare Anfrage zu stellen.

Der Flow besteht aus fuenf Schritten:

1. Kontakt
   - Name
   - E-Mail oder Telefonnummer

2. Motividee
   - Beschreibung der Tattoo-Idee
   - gewuenschte Stilrichtung

3. Platzierung und Groesse
   - Koerperstelle
   - ungefaehre Groesse

4. Zusatzinformationen
   - optionale Referenzen
   - optionaler Artist-Wunsch
   - optionaler Budgetrahmen
   - optionaler Terminwunsch

5. Zusammenfassung und Absenden
   - Nutzer sieht seine Angaben vor dem Absenden
   - Anfrage wird erst nach finaler Bestaetigung gespeichert

Nach dem Absenden erhaelt der Nutzer eine einfache Erfolgsmeldung. Es wird kein Termin bestaetigt und kein Preis zugesagt.

## Datenmodell: BookingRequest

Eine Terminanfrage wird als `BookingRequest` gespeichert.

Pflichtfelder:

- `name`: Name des Kunden
- `contact`: E-Mail oder Telefonnummer
- `idea`: Beschreibung der Motividee
- `style`: gewuenschte Stilrichtung
- `bodyPlacement`: Koerperstelle
- `approxSize`: ungefaehre Groesse
- `status`: Bearbeitungsstatus

Optionale Felder:

- `references`: Referenzbilder oder Referenzlinks
- `preferredArtistId`: gewuenschter Artist
- `budgetRange`: grober Budgetrahmen
- `preferredDate`: Terminwunsch
- `aiSummary`: spaetere AI-Zusammenfassung
- `notes`: interne Notizen fuer Admins oder Artists

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

Frontend-Validierung hilft Nutzern, Fehler frueh zu erkennen und Formulare angenehmer auszufuellen.

Backend-Validierung entscheidet, ob Daten akzeptiert und gespeichert werden. Zod wird an API-Grenzen verwendet.

Business-Logik bleibt deterministisch im Backend. AI darf keine Statuswerte setzen, keine Termine bestaetigen, keine Preise berechnen und keine medizinischen Aussagen treffen.

## Akzeptanzkriterien

### Oeffentliche Website

- Die Startseite zeigt HONEY | BEEZ ink als klar erkennbare Marke.
- Die Farben Schwarz, Weiss und `#ffc105` werden als visuelle Grundlage genutzt.
- Nutzer koennen von der Startseite zu Artists, Portfolio und Terminanfrage navigieren.
- Die Website wirkt urban, hochwertig und underground, bleibt aber gut bedienbar.

### Artists

- Nutzer koennen eine Liste von Artists sehen.
- Nutzer koennen eine Detailseite fuer einen Artist oeffnen.
- Eine Artist-Detailseite zeigt Spezialisierungen und passende Portfolio-Arbeiten.
- Nutzer koennen von einer Artist-Detailseite aus eine Terminanfrage starten.

### Portfolio

- Nutzer koennen Portfolio-Eintraege in einer Galerie sehen.
- Nutzer koennen einzelne Portfolio-Eintraege genauer ansehen.
- Nutzer koennen Portfolio-Eintraege nach Stilrichtung filtern.
- Nutzer koennen Portfolio-Eintraege nach Artist filtern.

### Terminanfrage

- Eine Anfrage kann nur gespeichert werden, wenn alle Pflichtfelder vorhanden sind.
- Kontakt muss mindestens eine E-Mail oder Telefonnummer enthalten.
- Der Nutzer sieht vor dem Absenden eine Zusammenfassung seiner Angaben.
- Nach dem Absenden wird die Anfrage mit Status `new` gespeichert.
- Nach dem Absenden wird kein Termin bestaetigt.
- Nach dem Absenden wird kein verbindlicher Preis genannt.

### Admin

- Admins koennen alle Anfragen sehen.
- Admins koennen einzelne Anfragen oeffnen.
- Admins koennen den Status einer Anfrage aendern.
- Erlaubte Statuswerte sind `new`, `reviewed`, `contacted` und `archived`.

### AI Simulation

- AI-Funktionen laufen im MVP als Mock-Service.
- AI darf Rueckfragen, Hinweise und Zusammenfassungen erzeugen.
- AI darf keine Termine bestaetigen.
- AI darf keine verbindlichen Preise zusagen.
- AI darf keine Statuswerte kontrollieren.
