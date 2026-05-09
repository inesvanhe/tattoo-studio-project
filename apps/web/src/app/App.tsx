import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AdminBookingRequestDetailPage } from '../features/admin/AdminBookingRequestDetailPage'
import { AdminBookingRequestsPage } from '../features/admin/AdminBookingRequestsPage'
import { AdminPage } from '../features/admin/AdminPage'
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
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/booking-requests" element={<AdminBookingRequestsPage />} />
        <Route path="/admin/booking-requests/:id" element={<AdminBookingRequestDetailPage />} />
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
