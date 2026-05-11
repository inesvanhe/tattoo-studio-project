import { useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'

import { AppShell } from '../../app/AppShell'
import { sendAiChatMessage } from './aiChat.api'

type ChatMessage = {
  id: string
  role: 'assistant' | 'user'
  text: string
}

const starterSuggestions = [
  'Ich suche einen passenden Stil.',
  'Wie bereite ich eine Anfrage vor?',
  'Welche Platzierung passt zu meinem Motiv?',
]

const thinkingStates = [
  'Motividee wird eingeordnet',
  'Styles werden abgeglichen',
  'Platzierung wird eingeschätzt',
  'Artist-Schwerpunkte werden geprüft',
]

const initialMessages: ChatMessage[] = [
  {
    id: 'welcome',
    role: 'assistant',
    text: 'Hi, ich bin der Ink Guide. Ich helfe dir bei Stil, Platzierung, Größe, Vorbereitung und passenden Artist-Ideen. Entscheidungen trifft am Ende immer das Studio.',
  },
]

export function InkGuidePage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState(starterSuggestions)
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

    setInputValue('')
    setSuggestions([])
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
      const response = await sendAiChatMessage(trimmedMessage)

      timeoutRef.current = window.setTimeout(() => {
        setMessages((currentMessages) => [
          ...currentMessages,
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            text: response.data.reply,
          },
        ])
        setSuggestions(response.data.suggestions)
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
        setSuggestions(starterSuggestions)
        setIsThinking(false)
      }, 700)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void submitMessage(inputValue)
  }

  return (
    <AppShell>
      <section className="ink-guide-stage border-x border-b border-[var(--color-line)] px-5 py-12 sm:px-8 lg:px-12">
        <p className="eyebrow">Ink Guide</p>
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <h1 className="text-5xl font-black uppercase leading-[0.92] sm:text-7xl">
              Tattoo ideas, sorted.
            </h1>
          </div>
          <div className="panel-frame ink-guide-intro p-6">
            <p>
              Tattoo-spezifischer Demo-Assistent für Stilfindung, Platzierung,
              Größengefühl, Terminvorbereitung und Artist-Ideen.
            </p>
          </div>
        </div>
      </section>

      <section className="ink-guide-shell py-12">
        <div className="ink-guide-chat panel-frame">
          <div className="ink-guide-chat-header">
            <div>
              <p className="eyebrow">Studio Assistant</p>
              <h2>Ink Guide</h2>
            </div>
            <span>Mock AI</span>
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

          {suggestions.length > 0 ? (
            <div className="ink-guide-suggestions" aria-label="Vorschläge">
              {suggestions.map((suggestion) => (
                <button
                  disabled={isThinking}
                  key={suggestion}
                  onClick={() => void submitMessage(suggestion)}
                  type="button"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          ) : null}

          <form className="ink-guide-form" onSubmit={handleSubmit}>
            <label htmlFor="ink-guide-message">Nachricht an Ink Guide</label>
            <div>
              <input
                id="ink-guide-message"
                maxLength={1200}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder="Frag nach Stil, Platzierung oder Vorbereitung..."
                type="text"
                value={inputValue}
              />
              <button disabled={isThinking || inputValue.trim().length === 0} type="submit">
                Senden
              </button>
            </div>
          </form>
        </div>

        <aside className="ink-guide-rules panel-frame">
          <p className="eyebrow">Kann helfen bei</p>
          <ul>
            <li>Pflege-Tipps als allgemeine Orientierung</li>
            <li>Stil-Empfehlungen und Motivklärung</li>
            <li>Größengefühl und Platzierungs-Ideen</li>
            <li>Vorbereitung auf Terminanfragen</li>
            <li>Artist-Empfehlung nach Stilrichtung</li>
          </ul>
          <p>
            Keine Preise, keine Terminbestätigung, keine medizinische Diagnose.
          </p>
        </aside>
      </section>
    </AppShell>
  )
}
