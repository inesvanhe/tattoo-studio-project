import { PlaceholderPage } from '../../shared/components/PlaceholderPage'

export function AdminPage() {
  return (
    <PlaceholderPage
      eyebrow="Admin"
      title="Studio dashboard"
      description="Dieser Bereich wird spaeter geschuetzt und fuehrt zu eingehenden Terminanfragen, Statuspflege und interner Studio-Arbeit."
      primaryHref="/admin/booking-requests"
      primaryLabel="Anfragen ansehen"
    />
  )
}
