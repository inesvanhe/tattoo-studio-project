import { useMemo, useRef, useState } from 'react'

import { AppShell } from '../../app/AppShell'
import { getInkGuideAnswer } from './inkGuide.api'

type GuideMessage = {
  id: string
  role: 'assistant' | 'user'
  text: string
}

type GuideQuestion = {
  label: string
  message: string
  topic: string
}

const starterQuestions: GuideQuestion[] = [
  {
    label: 'Was sollte ich vor dem Termin beachten?',
    message: 'Was sollte ich vor einem Tattoo-Termin beachten?',
    topic: 'Vorbereitung',
  },
  {
    label: 'Was sollte ich zum Termin mitbringen?',
    message: 'Was sollte ich zu einem Tattoo-Termin mitbringen?',
    topic: 'Termin',
  },
  {
    label: 'Was ist bei der Pflege wichtig?',
    message: 'Welche allgemeinen Pflegehinweise sind nach einem Tattoo wichtig?',
    topic: 'Pflege',
  },
  {
    label: 'Welche Infos braucht ihr für eine Anfrage?',
    message: 'Welche Infos braucht das Studio für eine gute Terminanfrage?',
    topic: 'Anfrage',
  },
  {
    label: 'Wie wähle ich einen passenden Artist?',
    message: 'Wie kann ich einschätzen, welcher Artist zu meinem Tattoo-Wunsch passt?',
    topic: 'Artists',
  },
  {
    label: 'Wie nutze ich Referenzbilder richtig?',
    message: 'Wie nutze ich Referenzbilder sinnvoll für eine Tattoo-Anfrage?',
    topic: 'Referenzen',
  },
]

const thinkingStates = [
  'Studio-Hinweise werden sortiert',
  'Antwort wird vorbereitet',
  'Pflege-Grenzen werden geprüft',
  'Artist-Schwerpunkte werden abgeglichen',
]

const initialMessages: GuideMessage[] = [
  {
    id: 'welcome',
    role: 'assistant',
    text: 'Hi, ich bin der Ink Guide. Ich beantworte typische Studio-Fragen zu Vorbereitung, Pflege, Anfrage, Referenzen und Artist-Auswahl. Keine Sorge: Ich bestätige keine Termine, nenne keine verbindlichen Preise und gebe keine medizinischen Diagnosen.',
  },
]

export function InkGuidePage() {
  const [messages, setMessages] = useState<GuideMessage[]>(initialMessages)
  const [questions, setQuestions] = useState(starterQuestions)
  const [isThinking, setIsThinking] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  const thinkingState = useMemo(() => {
    return thinkingStates[messages.length % thinkingStates.length]
  }, [messages.length])

  async function submitMessage(message: string) {
    const trimmedMessage = message.trim()

    if (!trimmedMessage || isThinking) {
      return
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }

    setQuestions([])
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: crypto.randomUUID(),
        role: 'user',
        text: trimmedMessage,
      },
    ])
    setIsThinking(true)

    try {
      const response = await getInkGuideAnswer(trimmedMessage)

      timeoutRef.current = window.setTimeout(() => {
        setMessages((currentMessages) => [
          ...currentMessages,
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            text: response.data.reply,
          },
        ])
        setQuestions(createFollowUpQuestions(response.data.suggestions))
        setIsThinking(false)
      }, 900)
    } catch {
      timeoutRef.current = window.setTimeout(() => {
        setMessages((currentMessages) => [
          ...currentMessages,
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            text: 'Ich kann gerade keine Antwort laden. Prüfe bitte kurz, ob die API läuft, und versuche es dann erneut.',
          },
        ])
        setQuestions(starterQuestions)
        setIsThinking(false)
      }, 700)
    }
  }

  return (
    <AppShell>
      <section className="ink-guide-stage border-x border-b border-[var(--color-line)] px-5 py-12 sm:px-8 lg:px-12">
        <p className="eyebrow">Ink Guide</p>
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <h1 className="page-hero-title">
              Tattoo ideas, sorted.
            </h1>
          </div>
          <div className="panel-frame ink-guide-intro p-6">
            <p>
              Tattoo-spezifischer Demo-Assistent für Vorbereitung, Pflege,
              Anfrageinfos, Referenzen und Artist-Orientierung.
            </p>
          </div>
        </div>
      </section>

      <section className="ink-guide-shell py-12">
        <div className="ink-guide-panel panel-frame">
          <div className="ink-guide-panel-header">
            <div>
              <p className="eyebrow">Studio Assistant</p>
              <h2>Ink Guide</h2>
            </div>
            <span>FAQ Guide</span>
          </div>

          <div className="ink-guide-messages" aria-live="polite">
            {messages.map((message) => (
              <div className={`ink-guide-message ink-guide-message-${message.role}`} key={message.id}>
                <p>{message.text}</p>
              </div>
            ))}

            {isThinking ? (
              <div className="ink-guide-message ink-guide-message-assistant ink-guide-thinking">
                <span>{thinkingState}</span>
                <div aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            ) : null}
          </div>

          {questions.length > 0 ? (
            <div className="ink-guide-question-grid" aria-label="Vorgeschlagene Fragen">
              {questions.map((question) => (
                <button
                  disabled={isThinking}
                  key={question.label}
                  onClick={() => void submitMessage(question.message)}
                  type="button"
                >
                  <span>{question.topic}</span>
                  {question.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <aside className="ink-guide-rules panel-frame">
          <p className="eyebrow">Kann helfen bei</p>
          <ul>
            <li>Pflege-Tipps als allgemeine Orientierung</li>
            <li>Vorbereitung auf den Tattoo-Termin</li>
            <li>Referenzen und Anfrageinfos sortieren</li>
            <li>Vorbereitung auf Terminanfragen</li>
            <li>Artist-Orientierung nach Stilrichtung</li>
          </ul>
          <p>
            Keine Preise, keine Terminbestätigung, keine medizinische Diagnose.
          </p>
        </aside>
      </section>
    </AppShell>
  )
}

function createFollowUpQuestions(suggestions: string[]): GuideQuestion[] {
  return suggestions.map((suggestion, index) => ({
    label: suggestion,
    message: suggestion,
    topic: index === 0 ? 'Nächster Schritt' : 'Follow-up',
  }))
}
