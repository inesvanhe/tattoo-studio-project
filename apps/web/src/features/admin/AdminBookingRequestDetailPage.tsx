import { useParams } from 'react-router-dom'

import { PlaceholderPage } from '../../shared/components/PlaceholderPage'

export function AdminBookingRequestDetailPage() {
  const { id = 'booking-request' } = useParams()

  return (
    <PlaceholderPage
      eyebrow="Admin Request Detail"
      title={`Request ${id}`}
      description="Diese Detailansicht wird spaeter eine einzelne Terminanfrage mit Motividee, Kontakt, Status und internen Admin-Aktionen zeigen."
      primaryHref="/admin/booking-requests"
      primaryLabel="Zur Anfragenliste"
    />
  )
}
