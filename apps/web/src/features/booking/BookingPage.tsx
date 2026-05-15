import { type ChangeEvent, type DragEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { AppShell } from '../../app/AppShell'
import bookingHeroImage from '../../assets/studio/sketches1.jpg'
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

type BookingConsentData = {
  isAdult: boolean
  acceptedLegal: boolean
}

type ReferenceImageFile = {
  file: File
  id: string
  previewUrl: string
}

type BookingFeedback =
  | { type: 'consent-error'; messages: string[] }
  | { type: 'success' }
  | { type: 'error' }
  | { type: 'saving' }
  | null

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

const initialConsentData: BookingConsentData = {
  isAdult: false,
  acceptedLegal: false,
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
  1: ['ideaDescription', 'preferredStyle', 'references'],
  2: ['bodyPlacement', 'approximateSize'],
  3: ['artistSlug', 'budgetRange', 'availabilityNotes'],
  4: [],
}

const allFormFields = Object.keys(initialFormData) as Array<keyof BookingFormData>
const requiredFields = new Set(Object.values(requiredFieldsByStep).flat())
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phonePattern = /^[\d\s()+/-]+$/
const allowedReferenceImageTypes = ['image/jpeg', 'image/png', 'image/webp']
const maxReferenceImageSize = 5 * 1024 * 1024
const maxReferenceImages = 5

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

function getConsentErrors(consents: BookingConsentData) {
  const errors: string[] = []

  if (!consents.isAdult) {
    errors.push('Bitte bestätige, dass du mindestens 18 Jahre alt bist.')
  }

  if (!consents.acceptedLegal) {
    errors.push('Bitte akzeptiere AGB und Datenschutzerklärung.')
  }

  return errors
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

function getReferenceImageId(file: File) {
  return `${file.name}-${file.size}-${file.lastModified}`
}

function formatFileSize(size: number) {
  if (size < 1024 * 1024) {
    return `${Math.max(1, Math.round(size / 1024))} KB`
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

export function BookingPage() {
  const [searchParams] = useSearchParams()
  const [formData, setFormData] = useState<BookingFormData>({
    ...initialFormData,
    artistSlug: searchParams.get('artist') ?? '',
  })
  const [currentStep, setCurrentStep] = useState(0)
  const [consents, setConsents] = useState<BookingConsentData>(initialConsentData)
  const [bookingFeedback, setBookingFeedback] = useState<BookingFeedback>(null)
  const [referenceImages, setReferenceImages] = useState<ReferenceImageFile[]>([])
  const [referenceImageError, setReferenceImageError] = useState('')
  const [isReferenceDropActive, setIsReferenceDropActive] = useState(false)
  const [touchedStep, setTouchedStep] = useState(false)
  const referenceImagesRef = useRef<ReferenceImageFile[]>([])
  const visibleFields = currentStep === steps.length - 1 ? allFormFields : fieldsByStep[currentStep]

  const currentStepErrors = useMemo(
    () => getFormErrors(formData, visibleFields),
    [formData, visibleFields],
  )

  const visibleFieldErrors = touchedStep ? currentStepErrors : []

  useEffect(() => {
    referenceImagesRef.current = referenceImages
  }, [referenceImages])

  useEffect(() => {
    return () => {
      referenceImagesRef.current.forEach((image) => URL.revokeObjectURL(image.previewUrl))
    }
  }, [])

  function updateField(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setBookingFeedback(null)
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
    setBookingFeedback(null)
    setCurrentStep((step) => Math.min(step + 1, steps.length - 1))
  }

  function goToPreviousStep() {
    setTouchedStep(false)
    setBookingFeedback(null)
    setCurrentStep((step) => Math.max(step - 1, 0))
  }

  function updateConsent(field: keyof BookingConsentData, checked: boolean) {
    setBookingFeedback(null)
    setConsents((current) => ({
      ...current,
      [field]: checked,
    }))
  }

  function addReferenceImages(files: File[]) {
    setReferenceImageError('')

    if (files.length === 0) {
      return
    }

    const nextErrors = new Set<string>()
    const nextImages: ReferenceImageFile[] = []
    const existingIds = new Set(referenceImages.map((image) => image.id))
    let availableSlots = maxReferenceImages - referenceImages.length

    if (availableSlots <= 0 || files.length > availableSlots) {
      nextErrors.add('Du kannst maximal 5 Referenzbilder hochladen.')
    }

    for (const file of files) {
      if (!allowedReferenceImageTypes.includes(file.type)) {
        nextErrors.add('Bitte lade nur JPG, PNG oder WEBP Dateien hoch.')
        continue
      }

      if (file.size > maxReferenceImageSize) {
        nextErrors.add('Ein Bild darf maximal 5 MB groß sein.')
        continue
      }

      const id = getReferenceImageId(file)

      if (existingIds.has(id) || nextImages.some((image) => image.id === id)) {
        continue
      }

      if (availableSlots <= 0) {
        continue
      }

      nextImages.push({
        file,
        id,
        previewUrl: URL.createObjectURL(file),
      })
      availableSlots -= 1
    }

    if (nextImages.length > 0) {
      setReferenceImages((current) => [...current, ...nextImages])
    }

    setReferenceImageError(Array.from(nextErrors)[0] ?? '')
  }

  function removeReferenceImage(id: string) {
    setReferenceImages((current) => {
      const imageToRemove = current.find((image) => image.id === id)

      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.previewUrl)
      }

      return current.filter((image) => image.id !== id)
    })
    setReferenceImageError('')
  }

  function handleReferenceInputChange(event: ChangeEvent<HTMLInputElement>) {
    addReferenceImages(Array.from(event.target.files ?? []))
    event.target.value = ''
  }

  function handleReferenceDragOver(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault()
    setIsReferenceDropActive(true)
  }

  function handleReferenceDragLeave(event: DragEvent<HTMLLabelElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsReferenceDropActive(false)
    }
  }

  function handleReferenceDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault()
    setIsReferenceDropActive(false)
    addReferenceImages(Array.from(event.dataTransfer.files))
  }

  async function handleFinalSubmit() {
    const nextFieldErrors = getFormErrors(formData, allFormFields)
    const nextConsentErrors = getConsentErrors(consents)

    if (nextFieldErrors.length > 0 || nextConsentErrors.length > 0) {
      setTouchedStep(true)
      setBookingFeedback(
        nextConsentErrors.length > 0
          ? { type: 'consent-error', messages: nextConsentErrors }
          : null,
      )
      return
    }

    setBookingFeedback({ type: 'saving' })

    try {
      // Phase 2: upload referenceImages to Cloudinary and persist the returned metadata.
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
      setBookingFeedback({ type: 'success' })
    } catch {
      setBookingFeedback({ type: 'error' })
    }
  }

  return (
    <AppShell>
      <section className="booking-stage px-5 py-12 sm:px-8 lg:px-12">
        <img className="booking-stage-image" src={bookingHeroImage} alt="" />
        {bookingFeedback?.type === 'success' ? (
          <div className="booking-success-panel" role="status">
            <p className="eyebrow">Anfrage gesendet</p>
            <h1>Deine Anfrage wird vom Studio geprüft.</h1>
            <p>
              Sobald sie bearbeitet wurde, melden wir uns persönlich bei dir. Termine und Preise
              werden individuell abgestimmt.
            </p>
          </div>
        ) : (
          <>
            <p className="eyebrow">Booking Request</p>
            <h1 className="page-hero-title page-hero-title-narrow mt-8">
              <span>Turn your</span>
              <span>idea into</span>
              <span>something</span>
              <span>permanent</span>
            </h1>
          </>
        )}
      </section>

      {bookingFeedback?.type === 'success' ? null : (
        <form
          className="booking-shell py-12"
          onSubmit={(event) => {
            event.preventDefault()
          }}
        >
        <nav aria-label="Booking Schritte" className="booking-steps">
          {steps.map((step, index) => (
            <button
              className={index === currentStep ? 'booking-step booking-step-active' : 'booking-step'}
              key={step}
              onClick={() => {
                if (index <= currentStep) {
                  setCurrentStep(index)
                  setTouchedStep(false)
                  setBookingFeedback(null)
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
            <BookingStep eyebrow="Kontakt" title="First things first">
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
            <BookingStep eyebrow="Motividee" title="Your vision">
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
              <BookingTextarea
                label="Referenzen"
                name="references"
                onChange={updateField}
                placeholder="Links, Bilder oder kreative Referenzen..."
                value={formData.references}
              />
              <ReferenceImageUpload
                error={referenceImageError}
                images={referenceImages}
                isDragActive={isReferenceDropActive}
                onDragLeave={handleReferenceDragLeave}
                onDragOver={handleReferenceDragOver}
                onDrop={handleReferenceDrop}
                onInputChange={handleReferenceInputChange}
                onRemove={removeReferenceImage}
              />
            </BookingStep>
          ) : null}

          {currentStep === 2 ? (
            <BookingStep eyebrow="Platzierung" title="The right placement">
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
            <BookingStep eyebrow="Zusatzinfos" title="Tell us more">
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
            <BookingStep eyebrow="Zusammenfassung" title="Ready when you are">
              <div className="booking-summary">
                {Object.entries(formData).map(([field, value]) => (
                  <div className="booking-summary-row" key={field}>
                    <span>{fieldLabels[field as keyof BookingFormData]}</span>
                    <strong>{getSummaryValue(field as keyof BookingFormData, value)}</strong>
                  </div>
                ))}
              </div>
              <div className="booking-consents">
                <label className="booking-consent">
                  <input
                    checked={consents.isAdult}
                    onChange={(event) => updateConsent('isAdult', event.target.checked)}
                    type="checkbox"
                  />
                  <span>Ich bestätige, dass ich mindestens 18 Jahre alt bin.</span>
                </label>
                <label className="booking-consent">
                  <input
                    checked={consents.acceptedLegal}
                    onChange={(event) => updateConsent('acceptedLegal', event.target.checked)}
                    type="checkbox"
                  />
                  <span>
                    Ich habe die <a href="/agb">AGB</a> und{' '}
                    <a href="/datenschutz">Datenschutzerklärung</a> gelesen und akzeptiere diese.
                  </span>
                </label>
              </div>
            </BookingStep>
          ) : null}

          {visibleFieldErrors.length > 0 ? (
            <div className="booking-error" role="alert">
              {visibleFieldErrors.map((message) => (
                <p key={message}>{message}</p>
              ))}
            </div>
          ) : null}

          {bookingFeedback?.type === 'consent-error' ? (
            <div className="booking-error" role="alert">
              {bookingFeedback.messages.map((message) => (
                <p key={message}>{message}</p>
              ))}
            </div>
          ) : null}

          {bookingFeedback?.type === 'error' ? (
            <div className="booking-error" role="alert">
              Die Anfrage konnte gerade nicht gespeichert werden.
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
              <Button
                disabled={bookingFeedback?.type === 'saving'}
                onClick={handleFinalSubmit}
                type="button"
              >
                {bookingFeedback?.type === 'saving' ? 'Wird gesendet' : 'Anfrage senden'}
              </Button>
            )}
          </div>
        </section>
        </form>
      )}
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

function ReferenceImageUpload({
  error,
  images,
  isDragActive,
  onDragLeave,
  onDragOver,
  onDrop,
  onInputChange,
  onRemove,
}: {
  error: string
  images: ReferenceImageFile[]
  isDragActive: boolean
  onDragLeave: (event: DragEvent<HTMLLabelElement>) => void
  onDragOver: (event: DragEvent<HTMLLabelElement>) => void
  onDrop: (event: DragEvent<HTMLLabelElement>) => void
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void
  onRemove: (id: string) => void
}) {
  return (
    <div className="reference-upload">
      <label
        className={
          isDragActive
            ? 'reference-upload-zone reference-upload-zone-active'
            : 'reference-upload-zone'
        }
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <input
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={onInputChange}
          type="file"
        />
        <span>Ziehe Referenzbilder hier hinein</span>
        <strong>oder wähle Dateien aus</strong>
        <small>JPG, PNG oder WEBP · max. 5 MB pro Bild · bis zu 5 Bilder</small>
      </label>

      {error ? (
        <p className="reference-upload-error" role="alert">
          {error}
        </p>
      ) : null}

      {images.length > 0 ? (
        <div className="reference-preview-grid">
          {images.map((image) => (
            <article className="reference-preview-card" key={image.id}>
              <img alt="" src={image.previewUrl} />
              <div>
                <p>{image.file.name}</p>
                <span>{formatFileSize(image.file.size)}</span>
              </div>
              <button onClick={() => onRemove(image.id)} type="button">
                Entfernen
              </button>
            </article>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function BookingStep({
  children,
  description,
  eyebrow,
  title,
}: {
  children: React.ReactNode
  description?: string
  eyebrow?: string
  title: string
}) {
  return (
    <div>
      <p className="eyebrow">{eyebrow ?? title}</p>
      <h2 className="mt-4 text-3xl font-black uppercase leading-none sm:text-5xl">{title}</h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--color-muted)]">{description}</p>
      ) : null}
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
