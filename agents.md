# AI Agent Guidelines

Diese Guidelines beschreiben, wie AI im Projekt HONEY | BEEZ ink eingesetzt werden darf. Sie gelten fuer produktseitige AI-Funktionen und fuer agentic-coding Arbeit am Code.

## Grundsatz

Im MVP gibt es kein komplexes Multi-Agent-System. Stattdessen gibt es klar getrennte AI-Funktionen hinter einfachen Services.

AI unterstuetzt. Menschen entscheiden.

Business-Logik bleibt deterministisch im Backend. AI darf keine Daten akzeptieren, Statuswerte setzen, Termine bestaetigen, Preise festlegen oder medizinische Aussagen treffen.

## Produkt-AI im MVP

AI-Funktionen werden zuerst als Mock-Services umgesetzt. Sie simulieren spaetere AI-Faehigkeiten, ohne von einer echten externen API abzuhaengen.

Ziele:

- Nutzer durch Ideenfindung und Anfragevorbereitung fuehren
- fehlende Informationen erkennen
- sinnvolle Rueckfragen stellen
- vorsichtige, unverbindliche Hinweise geben
- Terminanfragen fuer Studio und Artists zusammenfassen

Nicht-Ziele:

- autonome Buchung
- automatische Anfrageannahme
- Preisberechnung
- medizinische Einschaetzung
- Generierung von Tattoo-Bildern
- Kontrolle ueber Business-Logik

## AI Booking Assistant

Der AI Booking Assistant hilft Nutzern, eine Terminanfrage vollstaendiger und klarer zu formulieren.

Darf:

- nach fehlenden Angaben fragen
- Motividee, Stil, Koerperstelle und Groesse strukturieren
- optionale Angaben wie Budgetrahmen, Referenzen, Terminwunsch oder Artist-Wunsch einordnen
- eine unverbindliche Zusammenfassung erzeugen

Darf nicht:

- eine Anfrage automatisch annehmen
- einen Termin bestaetigen
- Verfuegbarkeit zusagen
- verbindliche Preise nennen
- Statuswerte einer Anfrage setzen
- Pflichtvalidierung ersetzen

## AI Tattoo Advisor

Der AI Tattoo Advisor hilft bei Stilfindung, Motivklaerung und allgemeiner Vorbereitung.

Darf:

- Stilrichtungen allgemein erklaeren
- Rueckfragen zu Motiv, Stimmung, Platzierung und Groesse stellen
- vorsichtige Empfehlungen fuer passende Stilrichtungen geben
- auf Artists oder Portfolio-Eintraege hinweisen, wenn diese Daten vorhanden sind

Darf nicht:

- medizinische Beratung geben
- Heilung garantieren
- Hautzustaende beurteilen
- Schmerz, Risiko oder Heilverlauf verbindlich einschaetzen
- Tattoo-Bilder generieren
- geschmackliche Entscheidungen als objektiv richtig darstellen

## Studio FAQ Assistant

Der Studio FAQ Assistant beantwortet haeufige Fragen zum Studio, zum Anfrageprozess und zu allgemeinen Ablaeufen.

Darf:

- oeffentliche Studio-Informationen wiedergeben
- den Anfrageprozess erklaeren
- auf Portfolio, Artists oder Terminanfrage verweisen
- allgemeine Hinweise zur Vorbereitung geben

Darf nicht:

- verbindliche Preis-, Rechts- oder Medizinberatung geben
- interne Entscheidungen treffen
- interne Notizen oder Admin-Daten offenlegen
- Termine bestaetigen

## Sicherheitsregeln fuer Produkt-AI

- AI-Ausgaben sind Hinweise, keine Entscheidungen.
- AI-Ausgaben muessen im UI als unterstuetzend erkennbar sein.
- Backend-Validierung entscheidet immer ueber gespeicherte Daten.
- Statuswechsel duerfen nur ueber explizite Backend-Logik erfolgen.
- AI darf keine Admin-Aktionen ausloesen.
- AI darf keine medizinischen Diagnosen, Heilversprechen oder Risiko-Freigaben geben.
- AI darf keine Tattoo-Bilder generieren.

## Agentic-Coding Regeln

AI kann bei Planung, Implementierung, Review und Dokumentation helfen. Der Mensch bleibt Projektinhaber und trifft Produktentscheidungen.

Arbeitsweise:

- spec-first arbeiten
- kleine, nachvollziehbare Schritte machen
- vor groesseren Aenderungen bestehende Dokumente und Code lesen
- Feature-Grenzen respektieren
- einfache Loesungen bevorzugen
- keine unnoetige Abstraktion einfuehren
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

- Aenderungen an Product Spec, Vision oder Architektur
- neue Datenmodelle
- neue API-Endpunkte
- Statuslogik fuer Anfragen
- Authentifizierung und Rollen
- AI-Verhalten mit Einfluss auf Nutzerentscheidungen
- Texte, die Preise, Termine, Gesundheit oder rechtliche Fragen beruehren

## Akzeptanzkriterien

- AI-Funktionen sind im MVP als Mock-Service umsetzbar.
- AI kann Nutzer unterstuetzen, ohne Entscheidungen zu treffen.
- Backend-Validierung bleibt massgeblich.
- AI darf keine Termine, Preise, medizinischen Aussagen oder Statuswechsel kontrollieren.
- Coding-Agenten arbeiten entlang von `vision.md`, `spec.md`, `architecture.md` und `implementation-plan.md`.
