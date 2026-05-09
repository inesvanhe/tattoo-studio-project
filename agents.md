# AI Agent Guidelines

Diese Guidelines beschreiben, wie AI im Projekt HONEY | BEEZ ink eingesetzt werden darf. Sie gelten für produktseitige AI-Funktionen und für agentic-coding Arbeit am Code.

## Grundsatz

Im MVP gibt es kein komplexes Multi-Agent-System. Stattdessen gibt es klar getrennte AI-Funktionen hinter einfachen Services.

AI unterstützt. Menschen entscheiden.

Business-Logik bleibt deterministisch im Backend. AI darf keine Daten akzeptieren, Statuswerte setzen, Termine bestätigen, Preise festlegen oder medizinische Aussagen treffen.

## Produkt-AI im MVP

AI-Funktionen werden zuerst als Mock-Services umgesetzt. Sie simulieren spätere AI-Fähigkeiten, ohne von einer echten externen API abzuhängen.

Ziele:

- Nutzer durch Ideenfindung und Anfragevorbereitung führen
- fehlende Informationen erkennen
- sinnvolle Rückfragen stellen
- vorsichtige, unverbindliche Hinweise geben
- Terminanfragen für Studio und Artists zusammenfassen

Nicht-Ziele:

- autonome Buchung
- automatische Anfrageannahme
- Preisberechnung
- medizinische Einschätzung
- Generierung von Tattoo-Bildern
- Kontrolle über Business-Logik

## AI Booking Assistant

Der AI Booking Assistant hilft Nutzern, eine Terminanfrage vollständiger und klarer zu formulieren.

Darf:

- nach fehlenden Angaben fragen
- Motividee, Stil, Körperstelle und Größe strukturieren
- optionale Angaben wie Budgetrahmen, Referenzen, Terminwunsch oder Artist-Wunsch einordnen
- eine unverbindliche Zusammenfassung erzeugen

Darf nicht:

- eine Anfrage automatisch annehmen
- einen Termin bestätigen
- Verfügbarkeit zusagen
- verbindliche Preise nennen
- Statuswerte einer Anfrage setzen
- Pflichtvalidierung ersetzen

## AI Tattoo Advisor

Der AI Tattoo Advisor hilft bei Stilfindung, Motivklärung und allgemeiner Vorbereitung.

Darf:

- Stilrichtungen allgemein erklären
- Rückfragen zu Motiv, Stimmung, Platzierung und Größe stellen
- vorsichtige Empfehlungen für passende Stilrichtungen geben
- auf Artists oder Portfolio-Einträge hinweisen, wenn diese Daten vorhanden sind

Darf nicht:

- medizinische Beratung geben
- Heilung garantieren
- Hautzustände beurteilen
- Schmerz, Risiko oder Heilverlauf verbindlich einschätzen
- Tattoo-Bilder generieren
- geschmackliche Entscheidungen als objektiv richtig darstellen

## Studio FAQ Assistant

Der Studio FAQ Assistant beantwortet häufige Fragen zum Studio, zum Anfrageprozess und zu allgemeinen Abläufen.

Darf:

- öffentliche Studio-Informationen wiedergeben
- den Anfrageprozess erklären
- auf Portfolio, Artists oder Terminanfrage verweisen
- allgemeine Hinweise zur Vorbereitung geben

Darf nicht:

- verbindliche Preis-, Rechts- oder Medizinberatung geben
- interne Entscheidungen treffen
- interne Notizen oder Admin-Daten offenlegen
- Termine bestätigen

## Sicherheitsregeln für Produkt-AI

- AI-Ausgaben sind Hinweise, keine Entscheidungen.
- AI-Ausgaben müssen im UI als unterstützend erkennbar sein.
- Backend-Validierung entscheidet immer über gespeicherte Daten.
- Statuswechsel dürfen nur über explizite Backend-Logik erfolgen.
- AI darf keine Admin-Aktionen auslösen.
- AI darf keine medizinischen Diagnosen, Heilversprechen oder Risiko-Freigaben geben.
- AI darf keine Tattoo-Bilder generieren.

## Agentic-Coding Regeln

AI kann bei Planung, Implementierung, Review und Dokumentation helfen. Der Mensch bleibt Projektinhaber und trifft Produktentscheidungen.

Arbeitsweise:

- spec-first arbeiten
- kleine, nachvollziehbare Schritte machen
- vor größeren Änderungen bestehende Dokumente und Code lesen
- Feature-Grenzen respektieren
- einfache Lösungen bevorzugen
- keine unnötige Abstraktion einführen
- Entscheidungen im passenden Dokument festhalten

Coding-Agenten sollen:

- bestehende Architektur respektieren
- Backend-Validierung ernst nehmen
- Business-Logik nicht ins Frontend oder in AI-Services verschieben
- Mock-Services klar als Mock kennzeichnen
- keine echten Secrets erzeugen oder eintragen
- `.env.template` leer lassen, bis bewusst Variablen definiert werden
- keine Tattoo-Bildgenerierung einbauen

## Menschliche Kontrolle

Folgende Dinge brauchen bewusstes menschliches Review:

- Änderungen an Product Spec, Vision oder Architektur
- neue Datenmodelle
- neue API-Endpunkte
- Statuslogik für Anfragen
- Authentifizierung und Rollen
- AI-Verhalten mit Einfluss auf Nutzerentscheidungen
- Texte, die Preise, Termine, Gesundheit oder rechtliche Fragen berühren

## Akzeptanzkriterien

- AI-Funktionen sind im MVP als Mock-Service umsetzbar.
- AI kann Nutzer unterstützen, ohne Entscheidungen zu treffen.
- Backend-Validierung bleibt massgeblich.
- AI darf keine Termine, Preise, medizinischen Aussagen oder Statuswechsel kontrollieren.
- Coding-Agenten arbeiten entlang von `vision.md`, `spec.md`, `architecture.md` und `implementation-plan.md`.
