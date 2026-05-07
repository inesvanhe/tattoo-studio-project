import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ArtistsPage } from '../features/artists/ArtistsPage'
import { HomePage } from '../features/home/HomePage'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/artists" element={<ArtistsPage />} />
      </Routes>
    </BrowserRouter>
  )
}
