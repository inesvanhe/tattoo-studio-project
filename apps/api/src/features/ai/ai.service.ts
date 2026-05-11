import type { AiChatRequest, AiChatResponse } from './ai.schema.js'

type MockIntent = {
  keywords: string[]
  reply: string
  suggestions: string[]
}

const defaultSuggestions = [
  'Welche Infos braucht ihr für eine Anfrage?',
  'Kann ich Referenzbilder mitschicken?',
  'Welche Styles macht ihr im Studio?',
]

const mockIntents: MockIntent[] = [
  {
    keywords: ['termin', 'buch', 'anfrage', 'anfragen', 'booking'],
    reply:
      'Für eine gute Terminanfrage helfen Motividee, Stil, Körperstelle, ungefähre Größe, Budgetrahmen, Wunschzeitraum und Referenzen. Ich kann dir helfen, deine Idee klarer zu formulieren, aber ich kann keinen Termin bestätigen.',
    suggestions: [
      'Was soll ich in die Anfrage schreiben?',
      'Kann ich einen Artist wünschen?',
      'Welche Referenzen sind hilfreich?',
    ],
  },
  {
    keywords: ['preis', 'kosten', 'budget', 'teuer'],
    reply:
      'Preise hängen von Motiv, Größe, Platzierung, Detailgrad und Artist ab. Ich kann dir helfen, einen Budgetrahmen für die Anfrage zu formulieren, aber verbindliche Preise legt das Studio erst nach Prüfung fest.',
    suggestions: [
      'Wie formuliere ich meinen Budgetrahmen?',
      'Welche Angaben beeinflussen den Aufwand?',
      'Kann ich erst eine grobe Idee einreichen?',
    ],
  },
  {
    keywords: ['heilung', 'pflege', 'entzündet', 'schmerz', 'risiko', 'haut'],
    reply:
      'Bei Heilung, Hautreaktionen oder medizinischen Fragen sollte immer eine qualifizierte Fachperson draufschauen. Ich kann nur allgemein sagen: Halte dich an die Pflegehinweise deines Studios und frage bei Unsicherheit direkt nach.',
    suggestions: [
      'Welche allgemeinen Vorbereitungen sind sinnvoll?',
      'Was sollte ich vor dem Termin vermeiden?',
      'Wie kontaktiere ich das Studio bei Rückfragen?',
    ],
  },
  {
    keywords: ['style', 'stil', 'blackwork', 'fine line', 'flash', 'ornamental', 'traditional'],
    reply:
      'Ich kann dir bei der Stilfindung helfen. Beschreibe gern Motiv, Stimmung, Körperstelle und ob es eher fein, dunkel, grafisch, ornamental oder flashig wirken soll.',
    suggestions: [
      'Ich möchte etwas Dunkles und Grafisches.',
      'Ich suche etwas Feines mit Pflanzen.',
      'Was ist der Unterschied zwischen Flash und Custom?',
    ],
  },
  {
    keywords: ['artist', 'künstler', 'künstlerin', 'ivy', 'kade', 'luna', 'maya', 'nova', 'rico'],
    reply:
      'Wenn du einen bestimmten Artist im Kopf hast, kannst du das in der Anfrage angeben. Die finale Zuordnung hängt aber von Stil, Motiv, Umfang und Verfügbarkeit ab.',
    suggestions: [
      'Welcher Artist passt zu Blackwork?',
      'Kann ich mehrere Artists angeben?',
      'Wo finde ich die Artist-Profile?',
    ],
  },
  {
    keywords: ['referenz', 'bild', 'bilder', 'inspiration', 'vorlage'],
    reply:
      'Referenzen sind super hilfreich, solange sie als Richtung verstanden werden. Am besten beschreibst du dazu, was dir daran gefällt: Stimmung, Linien, Platzierung, Details oder Komposition.',
    suggestions: [
      'Wie viele Referenzen sind sinnvoll?',
      'Darf ich ein bestehendes Tattoo als Inspiration nutzen?',
      'Was sollte ich zusätzlich beschreiben?',
    ],
  },
]

export function createMockAiChatResponse(input: AiChatRequest): AiChatResponse {
  const normalizedMessage = input.message.toLowerCase()
  const intent = mockIntents.find((item) =>
    item.keywords.some((keyword) => normalizedMessage.includes(keyword)),
  )

  if (intent) {
    return {
      reply: intent.reply,
      suggestions: intent.suggestions,
    }
  }

  return {
    reply:
      'Ich kann dir bei Motividee, Stil, Platzierung und der Vorbereitung deiner Anfrage helfen. Sag mir kurz, was du dir vorstellst, dann strukturieren wir es gemeinsam.',
    suggestions: defaultSuggestions,
  }
}
