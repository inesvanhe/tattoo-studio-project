import type { InkGuideRequest, InkGuideResponse } from './inkGuide.schema.js'

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
  'Was sollte ich vor dem Termin beachten?',
  'Welche Pflegehinweise sind allgemein wichtig?',
  'Welche Infos braucht ihr für eine Anfrage?',
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
      'Für eine gute Terminanfrage helfen Motivrichtung, Stil, Körperstelle, ungefähre Größe, Budgetrahmen, Wunschzeitraum und Referenzen. Der Ink Guide kann die Infos sortieren, aber keinen Termin bestätigen und keine Anfrage automatisch annehmen.',
    suggestions: [
      'Welche Infos braucht ihr für eine Anfrage?',
      'Kann ich einen Artist wünschen?',
      'Wie nutze ich Referenzbilder richtig?',
    ],
  },
  {
    keywords: ['preis', 'kosten', 'budget', 'teuer'],
    reply:
      'Preise hängen von Größe, Platzierung, Detailgrad, Stil und Artist ab. Der Ink Guide kann erklären, welche Faktoren den Aufwand beeinflussen, aber verbindliche Preise legt das Studio erst nach Prüfung fest.',
    suggestions: [
      'Welche Angaben beeinflussen den Aufwand?',
      'Welche Infos braucht ihr für eine Anfrage?',
      'Wie schätze ich die Größe grob ein?',
    ],
  },
  {
    keywords: ['heilung', 'pflege', 'entzündet', 'schmerz', 'risiko', 'haut', 'aftercare'],
    reply:
      'Pflege und Heilung sind wichtig, aber ich gebe nur allgemeine Orientierung. Halte dich an die Pflegehinweise deines Studios, halte das Tattoo sauber und frage bei Rötung, starker Schwellung, Schmerzen oder Unsicherheit direkt beim Studio oder einer Fachperson nach.',
    suggestions: [
      'Was sollte ich vor dem Termin beachten?',
      'Was sollte ich vor dem Termin vermeiden?',
      'Wie kontaktiere ich das Studio bei Rückfragen?',
    ],
  },
  {
    keywords: ['style', 'stil', 'blackwork', 'fine line', 'flash', 'ornamental', 'traditional'],
    reply:
      'Bei Styles geht es vor allem um Wirkung und Machbarkeit: Blackwork wirkt grafisch und kontrastreich, Fine Line eher leicht und filigran, Flash ist oft kompakter und direkter, Ornamental arbeitet stärker mit Rhythmus und Symmetrie. Die finale Richtung klärt das Studio mit dir.',
    suggestions: [
      'Wie wähle ich einen passenden Artist?',
      'Welche Infos braucht ihr für eine Anfrage?',
      'Was ist der Unterschied zwischen Flash und Custom?',
    ],
  },
  {
    keywords: ['größe', 'groß', 'klein', 'cm', 'zentimeter', 'detailgrad', 'details'],
    reply:
      'Bei der Größe zählt vor allem der Detailgrad. Feine Details brauchen genug Fläche, damit sie später lesbar bleiben. Für die Anfrage reichen eine grobe Zentimeterangabe, die Körperstelle und ein Hinweis, ob das Motiv eher fein, bold oder sehr detailreich werden soll.',
    suggestions: [
      'Wie schätze ich die Größe grob ein?',
      'Welche Körperstelle passt zu kleinen Motiven?',
      'Was ist bei vielen Details wichtig?',
    ],
  },
  {
    keywords: ['platzierung', 'stelle', 'körperstelle', 'arm', 'bein', 'rippe', 'rücken', 'hand'],
    reply:
      'Für Platzierungen helfen drei Fragen: Soll das Tattoo sichtbar sein, bewegt sich die Stelle stark und wie viel Fläche braucht das Motiv? Arme und Beine funktionieren oft gut für einzelne Motive, Rücken und Oberschenkel geben mehr Raum für größere Kompositionen.',
    suggestions: [
      'Welche Körperstelle passt zu kleinen Motiven?',
      'Welche Stelle passt zu einem floralen Motiv?',
      'Welche Infos braucht ihr zur Platzierung?',
    ],
  },
  {
    keywords: ['vorbereitung', 'vorbereiten', 'essen', 'trinken', 'alkohol', 'schlafen', 'mitbringen'],
    reply:
      'Für die Vorbereitung sind Schlaf, Essen, Wasser und bequeme Kleidung sinnvoll. Bring Referenzen, Ausweis, genug Zeit und bei längeren Sessions etwas zu trinken oder einen kleinen Snack mit. Alkohol und Sonnenbrand kurz vor dem Termin sind keine gute Idee.',
    suggestions: [
      'Was sollte ich zum Termin mitbringen?',
      'Wie nutze ich Referenzbilder richtig?',
      'Welche Infos gehören in die Anfrage?',
    ],
  },
  {
    keywords: ['artist', 'künstler', 'künstlerin', 'ivy', 'kade', 'luna', 'maya', 'nova', 'rico'],
    reply:
      'Für die Artist-Auswahl sind Stil, Motiv, Körperstelle und Umfang entscheidend. Du kannst einen Wunsch-Artist angeben, aber die finale Zuordnung hängt von Stil, Verfügbarkeit und Machbarkeit ab.',
    suggestions: [
      'Welcher Artist passt zu Blackwork?',
      'Kann ich mehrere Artists angeben?',
      'Wo finde ich die Artist-Profile?',
    ],
  },
  {
    keywords: ['referenz', 'bild', 'bilder', 'inspiration', 'vorlage'],
    reply:
      'Referenzen sind super hilfreich, solange sie als Richtung verstanden werden. Gut ist, wenn du dazu sagst, was dir gefällt: Stimmung, Linien, Platzierung, Details, Komposition oder Farbigkeit. Eins-zu-eins-Kopien sind nicht das Ziel.',
    suggestions: [
      'Wie viele Referenzen sind sinnvoll?',
      'Darf ich bestehende Tattoos als Inspiration nutzen?',
      'Was sollte ich zusätzlich angeben?',
    ],
  },
]

export function createInkGuideResponse(input: InkGuideRequest): InkGuideResponse {
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
      'Der Ink Guide beantwortet typische Studio-Fragen zu Vorbereitung, Pflege, Referenzen, Anfrageinfos und Artist-Auswahl. Wähle am besten eine der vorgeschlagenen Fragen aus.',
    suggestions: defaultSuggestions,
  }
}

function createArtistRecommendation(message: string): InkGuideResponse | null {
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
    reply: `${artistText}. Das ist keine finale Zuweisung, sondern nur eine Orientierung. In der Anfrage helfen Stilrichtung, Körperstelle, ungefähre Größe und Referenzen, damit das Studio passend prüfen kann.`,
    suggestions: [
      `Termin mit ${topMatches[0].name} anfragen`,
      'Welche Infos braucht der Artist?',
      'Wie wähle ich einen passenden Artist?',
    ],
  }
}
