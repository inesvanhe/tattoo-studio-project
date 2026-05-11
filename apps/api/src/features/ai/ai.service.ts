import type { AiChatRequest, AiChatResponse } from './ai.schema.js'

type MockIntent = {
  keywords: string[]
  reply: string
  suggestions: string[]
}

type ArtistMatch = {
  name: string
  slug: string
  keywords: string[]
  focus: string
}

const defaultSuggestions = [
  'Welche Infos braucht ihr für eine Anfrage?',
  'Kann ich Referenzbilder mitschicken?',
  'Welche Styles macht ihr im Studio?',
]

const artistMatches: ArtistMatch[] = [
  {
    name: 'Maya Black',
    slug: 'maya-black',
    keywords: ['blackwork', 'grafisch', 'graphic', 'dunkel', 'kontrast', 'custom'],
    focus: 'Blackwork, grafische Formen und starke Kontraste',
  },
  {
    name: 'Rico Chrome',
    slug: 'rico-chrome',
    keywords: ['chrome', 'black and grey', 'black & grey', 'metall', 'realistisch', 'detail'],
    focus: 'Black & Grey, Chrome-Mood und detailreiche dunkle Pieces',
  },
  {
    name: 'Luna Vex',
    slug: 'luna-vex',
    keywords: ['fine line', 'fineline', 'fein', 'zart', 'botanical', 'pflanze', 'pflanzen'],
    focus: 'Fine Line, botanische Motive und leichte Platzierungen',
  },
  {
    name: 'Ivy Ash',
    slug: 'ivy-ash',
    keywords: ['ornamental', 'ornament', 'floral', 'blume', 'blumen', 'rücken', 'symmetrisch'],
    focus: 'Ornamentals, Florals und ruhige Kompositionen',
  },
  {
    name: 'Nova Wren',
    slug: 'nova-wren',
    keywords: ['flash', 'traditional', 'neo', 'bold', 'laut', 'klassisch'],
    focus: 'Flash, Neo-Traditional und kräftige Motive',
  },
  {
    name: 'Kade Monroe',
    slug: 'kade-monroe',
    keywords: ['lettering', 'schrift', 'script', 'darkwork', 'text', 'typografie'],
    focus: 'Lettering, Darkwork und schwere Schriftbilder',
  },
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
    keywords: ['heilung', 'pflege', 'entzündet', 'schmerz', 'risiko', 'haut', 'aftercare'],
    reply:
      'Pflege und Heilung sind wichtig, aber ich gebe nur allgemeine Orientierung. Halte dich an die Pflegehinweise deines Studios, halte das Tattoo sauber und frage bei Rötung, starker Schwellung, Schmerzen oder Unsicherheit direkt beim Studio oder einer Fachperson nach.',
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
    keywords: ['größe', 'groß', 'klein', 'cm', 'zentimeter', 'detailgrad', 'details'],
    reply:
      'Bei der Größe zählt vor allem der Detailgrad. Feine Details brauchen genug Fläche, damit sie später lesbar bleiben. Für die Anfrage reichen eine grobe Zentimeterangabe, die Körperstelle und ein Hinweis, ob das Motiv eher fein, bold oder sehr detailreich werden soll.',
    suggestions: [
      'Wie beschreibe ich die Größe in der Anfrage?',
      'Welche Körperstelle passt zu kleinen Motiven?',
      'Was ist bei vielen Details wichtig?',
    ],
  },
  {
    keywords: ['platzierung', 'stelle', 'körperstelle', 'arm', 'bein', 'rippe', 'rücken', 'hand'],
    reply:
      'Für Platzierungen helfen drei Fragen: Soll das Tattoo sichtbar sein, soll es sich mit dem Körper bewegen und wie viel Fläche braucht das Motiv? Arme und Beine funktionieren oft gut für einzelne Motive, Rücken und Oberschenkel geben mehr Raum für größere Kompositionen.',
    suggestions: [
      'Ich möchte etwas Sichtbares, aber nicht zu groß.',
      'Welche Stelle passt zu einem floralen Motiv?',
      'Welche Infos braucht ihr zur Platzierung?',
    ],
  },
  {
    keywords: ['vorbereitung', 'vorbereiten', 'essen', 'trinken', 'alkohol', 'schlafen'],
    reply:
      'Für die Vorbereitung sind Schlaf, Essen, Wasser und bequeme Kleidung sinnvoll. Alkohol und spontane Sonnenbrand-Aktionen sind keine gute Idee. Genaue Vorgaben bekommst du vom Studio, besonders wenn dein Termin feststeht.',
    suggestions: [
      'Was sollte ich zum Termin mitbringen?',
      'Wie bereite ich Referenzen vor?',
      'Welche Infos gehören in die Anfrage?',
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
  const artistRecommendation = createArtistRecommendation(normalizedMessage)

  if (artistRecommendation) {
    return artistRecommendation
  }

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

function createArtistRecommendation(message: string): AiChatResponse | null {
  const matchedArtists = artistMatches.filter((artist) =>
    artist.keywords.some((keyword) => message.includes(keyword)),
  )

  if (matchedArtists.length === 0) {
    return null
  }

  const topMatches = matchedArtists.slice(0, 2)
  const artistText = topMatches
    .map((artist) => `${artist.name} könnte passen für ${artist.focus}`)
    .join('. ')

  return {
    reply: `${artistText}. Das ist keine finale Zuweisung, aber ein guter Startpunkt für deine Anfrage. Schreib am besten dazu, welche Stimmung, Körperstelle und Größe du dir vorstellst.`,
    suggestions: [
      `Termin mit ${topMatches[0].name} anfragen`,
      'Welche Infos braucht der Artist?',
      'Ich möchte noch einen anderen Stil vergleichen.',
    ],
  }
}
