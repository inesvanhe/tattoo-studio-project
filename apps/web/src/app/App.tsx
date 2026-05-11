import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AdminBookingRequestDetailPage } from '../features/admin/AdminBookingRequestDetailPage'
import { AdminBookingRequestsPage } from '../features/admin/AdminBookingRequestsPage'
import { AdminPage } from '../features/admin/AdminPage'
import { InkGuidePage } from '../features/ai/InkGuidePage'
import { ArtistBookingRequestsPage } from '../features/artistAdmin/ArtistBookingRequestsPage'
import { ArtistDetailPage } from '../features/artists/ArtistDetailPage'
import { ArtistsPage } from '../features/artists/ArtistsPage'
import { BookingPage } from '../features/booking/BookingPage'
import { HomePage } from '../features/home/HomePage'
import { PortfolioDetailPage } from '../features/portfolio/PortfolioDetailPage'
import { PortfolioPage } from '../features/portfolio/PortfolioPage'
import { PlaceholderPage } from '../shared/components/PlaceholderPage'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/artists" element={<ArtistsPage />} />
        <Route path="/artists/:slug" element={<ArtistDetailPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/portfolio/:slug" element={<PortfolioDetailPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/ink-guide" element={<InkGuidePage />} />
        <Route
          path="/studio"
          element={
            <PlaceholderPage
              eyebrow="Studio"
              title="Studio Seite"
              description="Hier entsteht später die Studio-Seite mit Interior, Vibe und Ablauf."
            />
          }
        />
        <Route
          path="/impressum"
          element={
            <PlaceholderPage
              eyebrow="Legal"
              title="Impressum"
              description="Das Impressum wird ergänzt, sobald die finalen Projektdaten feststehen."
            />
          }
        />
        <Route
          path="/datenschutz"
          element={
            <PlaceholderPage
              eyebrow="Legal"
              title="Datenschutz"
              description="Die Datenschutzhinweise werden ergänzt, sobald Tracking, Hosting und produktive Dienste feststehen."
            />
          }
        />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/booking-requests" element={<AdminBookingRequestsPage />} />
        <Route path="/admin/booking-requests/:id" element={<AdminBookingRequestDetailPage />} />
        <Route path="/artist/booking-requests" element={<ArtistBookingRequestsPage />} />
        <Route
          path="*"
          element={
            <PlaceholderPage
              eyebrow="404"
              title="Page not found"
              description="Diese Route existiert noch nicht. Zurück zur Startseite und weiter durch die klickbare Projektstruktur."
            />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
