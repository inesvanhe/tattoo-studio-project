import { type ChangeEvent, type FormEvent, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { AppShell } from '../../app/AppShell'
import { Button } from '../../shared/components/Button'
import { formatBudgetRange } from '../../shared/formatters/budget'
import { createBookingRequest } from './booking.api'

type BookingFormData = {
  customerName: string
  customerEmail: string
  customerPhone: string
  ideaDescription: string
  preferredStyle: string
  bodyPlacement: string
  approximateSize: string
  references: string
  artistSlug: string
  budgetRange: string
  availabilityNotes: string
}

const initialFormData: BookingFormData = {
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  ideaDescription: '',
  preferredStyle: '',
  bodyPlacement: '',
  approximateSize: '',
  references: '',
  artistSlug: '',
  budgetRange: '',
  availabilityNotes: '',
}

const steps = [
  'Kontakt',
  'Motividee',
  'Platzierung',
  'Zusatzinfos',
  'Zusammenfassung',
] as const

const requiredFieldsByStep: Record<number, Array<keyof BookingFormData>> = {
  0: ['customerName', 'customerEmail'],
  1: ['ideaDescription', 'preferredStyle'],
  2: ['bodyPlacement', 'approximateSize'],
  3: [],
  4: [],
}

const fieldsByStep: Record<number, Array<keyof BookingFormData>> = {
  0: ['customerName', 'customerEmail', 'customerPhone'],
  1: ['ideaDescription', 'preferredStyle'],
  2: ['bodyPlacement', 'approximateSize'],
  3: ['references', 'artistSlug', 'budgetRange', 'availabilityNotes'],
  4: [],
}

const allFormFields = Object.keys(initialFormData) as Array<keyof BookingFormData>
const requiredFields = new Set(Object.values(requiredFieldsByStep).flat())
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[\d\s()+/-]+$/

const fieldLabels: Record<keyof BookingFormData, string> = {
  customerName: 'Name',
  customerEmail: 'E-Mail',
  customerPhone: 'Telefon',
  ideaDescription: 'Motividee',
  preferredStyle: 'Stilrichtung',
  bodyPlacement: 'Körperstelle',
  approximateSize: 'Ungefähre Größe',
  references: 'Referenzen',
  artistSlug: 'Artist-Wunsch',
  budgetRange: 'Budgetrahmen',
  availabilityNotes: 'Terminwunsch',
}

function getFieldError(field: keyof BookingFormData, value: string) {
  const trimmedValue = value.trim()

  if (requiredFields.has(field) && !trimmedValue) {
    return `${fieldLabels[field]} ist erforderlich.`
  }

  if (field === 'customerEmail' && trimmedValue && !emailPattern.test(trimmedValue)) {
    return 'Bitte gib eine gültige E-Mail-Adresse ein.'
  }

  if (field === 'customerPhone' && trimmedValue && !phonePattern.test(trimmedValue)) {
    return 'Bitte gib eine gültige Telefonnummer ein.'
  }

  return ''
}

function getFormErrors(formData: BookingFormData, fields: Array<keyof BookingFormData>) {
  return fields
    .map((field) => getFieldError(field, formData[field]))
    .filter((message) => message.length > 0)
}

function getSummaryValue(field: keyof BookingFormData, value: string) {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return 'Nicht angegeben'
  }

  if (field === 'budgetRange') {
    return formatBudgetRange(trimmedValue)
  }

  return trimmedValue
}

export function BookingPage() {
  const [searchParams] = useSearchParams()
  const [formData, setFormData] = useState<BookingFormData>({
    ...initialFormData,
    artistSlug: searchParams.get('artist') ?? '',
  })
  const [currentStep, setCurrentStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [touchedStep, setTouchedStep] = useState(false)
  const visibleFields = currentStep === steps.length - 1 ? allFormFields : fieldsByStep[currentStep]

  const currentStepErrors = useMemo(
    () => getFormErrors(formData, visibleFields),
    [formData, visibleFields],
  )

  function updateField(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setSubmitted(false)
    setSubmitError('')
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  function goToNextStep() {
    if (currentStepErrors.length > 0) {
      setTouchedStep(true)
      return
    }

    setTouchedStep(false)
    setCurrentStep((step) => Math.min(step + 1, steps.length - 1))
  }

  function goToPreviousStep() {
    setTouchedStep(false)
    setCurrentStep((step) => Math.max(step - 1, 0))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (getFormErrors(formData, allFormFields).length > 0) {
      setTouchedStep(true)
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    try {
      await createBookingRequest({
        approximateSize: formData.approximateSize,
        artistSlug: formData.artistSlug,
        availabilityNotes: mergeAvailabilityNotes(formData),
        bodyPlacement: formData.bodyPlacement,
        budgetRange: formData.budgetRange,
        customerEmail: formData.customerEmail,
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        ideaDescription: formData.ideaDescription,
        preferredStyle: formData.preferredStyle,
      })
      setSubmitted(true)
    } catch {
      setSubmitError('Die Anfrage konnte gerade nicht gespeichert werden.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AppShell>
      <section className="poster-hero border-x border-b border-[var(--color-line)] px-5 py-12 sm:px-8 lg:px-12">
        <p className="eyebrow">Booking Request</p>
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <h1 className="page-hero-title">
            Termin anfragen
          </h1>
          <div className="panel-frame p-6">
            <p className="text-lg leading-8 text-[var(--color-muted)]">
              Bereite deine Anfrage strukturiert vor. Das Studio prüft sie
              später manuell und bestätigt keinen Termin und keinen Preis.
            </p>
          </div>
        </div>
      </section>

      <form className="booking-shell py-12" onSubmit={handleSubmit}>
        <nav aria-label="Booking Schritte" className="booking-steps">
          {steps.map((step, index) => (
            <button
              className={index === currentStep ? 'booking-step booking-step-active' : 'booking-step'}
              key={step}
              onClick={() => {
                if (index <= currentStep) {
                  setCurrentStep(index)
                  setTouchedStep(false)
                }
              }}
              type="button"
            >
              <span>{(index + 1).toString().padStart(2, '0')}</span>
              {step}
            </button>
          ))}
        </nav>

        <section className="booking-panel">
          {currentStep === 0 ? (
            <BookingStep title="Kontakt" description="Wie darf das Studio dich erreichen?">
              <BookingInput
                label="Name"
                name="customerName"
                onChange={updateField}
                required
                value={formData.customerName}
              />
              <BookingInput
                label="E-Mail"
                name="customerEmail"
                onChange={updateField}
                required
                type="email"
                value={formData.customerEmail}
              />
              <BookingInput
                label="Telefon"
                name="customerPhone"
                onChange={updateField}
                type="tel"
                value={formData.customerPhone}
              />
            </BookingStep>
          ) : null}

          {currentStep === 1 ? (
            <BookingStep title="Motividee" description="Was soll entstehen und in welchem Stil?">
              <BookingTextarea
                label="Motividee"
                name="ideaDescription"
                onChange={updateField}
                required
                value={formData.ideaDescription}
              />
              <BookingInput
                label="Stilrichtung"
                name="preferredStyle"
                onChange={updateField}
                placeholder="Blackwork, Neo-Traditional, Lettering..."
                required
                value={formData.preferredStyle}
              />
            </BookingStep>
          ) : null}

          {currentStep === 2 ? (
            <BookingStep title="Platzierung und Größe" description="Wo soll das Tattoo sitzen?">
              <BookingInput
                label="Körperstelle"
                name="bodyPlacement"
                onChange={updateField}
                placeholder="Oberarm, Rippen, Rücken..."
                required
                value={formData.bodyPlacement}
              />
              <BookingInput
                label="Ungefähre Größe"
                name="approximateSize"
                onChange={updateField}
                placeholder="z.B. 10 cm, handflächengroß, Sleeve..."
                required
                value={formData.approximateSize}
              />
            </BookingStep>
          ) : null}

          {currentStep === 3 ? (
            <BookingStep title="Zusatzinfos" description="Alles, was beim Einschätzen hilft.">
              <BookingTextarea
                label="Referenzen"
                name="references"
                onChange={updateField}
                placeholder="Links oder kurze Beschreibung deiner Referenzen"
                value={formData.references}
              />
              <BookingInput
                label="Artist-Wunsch"
                name="artistSlug"
                onChange={updateField}
                value={formData.artistSlug}
              />
              <BookingInput
                label="Budgetrahmen"
                name="budgetRange"
                onChange={updateField}
                placeholder="z.B. 300-600 € oder nach Absprache"
                value={formData.budgetRange}
              />
              <BookingTextarea
                label="Terminwunsch"
                name="availabilityNotes"
                onChange={updateField}
                placeholder="Zeitraum, Wochentage oder Hinweise zur Verfügbarkeit"
                value={formData.availabilityNotes}
              />
            </BookingStep>
          ) : null}

          {currentStep === 4 ? (
            <BookingStep
              title="Zusammenfassung"
              description="Prüfe deine Angaben. Danach wird die Anfrage an das Studio übermittelt."
            >
              <div className="booking-summary">
                {Object.entries(formData).map(([field, value]) => (
                  <div className="booking-summary-row" key={field}>
                    <span>{fieldLabels[field as keyof BookingFormData]}</span>
                    <strong>{getSummaryValue(field as keyof BookingFormData, value)}</strong>
                  </div>
                ))}
              </div>
            </BookingStep>
          ) : null}

          {touchedStep && currentStepErrors.length > 0 ? (
            <div className="booking-error" role="alert">
              {currentStepErrors.map((message) => (
                <p key={message}>{message}</p>
              ))}
            </div>
          ) : null}

          {submitted ? (
            <div className="booking-success" role="status">
              Anfrage gespeichert. Das Studio prüft deine Angaben und meldet sich
              persönlich. Es wurde kein Termin bestätigt und kein Preis zugesagt.
            </div>
          ) : null}

          {submitError ? (
            <div className="booking-error" role="alert">
              {submitError}
            </div>
          ) : null}

          <div className="booking-actions">
            <Button disabled={currentStep === 0} onClick={goToPreviousStep} type="button" variant="secondary">
              Zurück
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button onClick={goToNextStep} type="button">
                Weiter
              </Button>
            ) : (
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? 'Wird gesendet' : 'Anfrage senden'}
              </Button>
            )}
          </div>
        </section>
      </form>
    </AppShell>
  )
}

function mergeAvailabilityNotes(formData: BookingFormData) {
  const notes = formData.availabilityNotes.trim()
  const references = formData.references.trim()

  if (!references) {
    return notes
  }

  return [notes, `Referenzen: ${references}`].filter(Boolean).join('\n\n')
}

function BookingStep({
  children,
  description,
  title,
}: {
  children: React.ReactNode
  description: string
  title: string
}) {
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <h2 className="mt-4 text-3xl font-black uppercase leading-none sm:text-5xl">{title}</h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-muted)]">{description}</p>
      <div className="mt-8 grid gap-5">{children}</div>
    </div>
  )
}

function BookingInput({
  label,
  name,
  onChange,
  placeholder,
  required = false,
  type = 'text',
  value,
}: {
  label: string
  name: keyof BookingFormData
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  type?: string
  value: string
}) {
  return (
    <label className="booking-field">
      <span>
        {label}
        {required ? ' *' : ''}
      </span>
      <input
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </label>
  )
}

function BookingTextarea({
  label,
  name,
  onChange,
  placeholder,
  required = false,
  value,
}: {
  label: string
  name: keyof BookingFormData
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  required?: boolean
  value: string
}) {
  return (
    <label className="booking-field">
      <span>
        {label}
        {required ? ' *' : ''}
      </span>
      <textarea name={name} onChange={onChange} placeholder={placeholder} rows={5} value={value} />
    </label>
  )
}
