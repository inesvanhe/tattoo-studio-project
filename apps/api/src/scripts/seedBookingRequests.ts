import mongoose from 'mongoose'

import { BookingRequestModel } from '../features/bookingRequests/bookingRequest.model.js'
import { env } from '../shared/config/env.js'
import { connectToDatabase } from '../shared/database/database.js'

const demoBookingRequests = [
  {
    approximateSize: '10 cm',
    artistSlug: 'rico-chrome',
    availabilityNotes: 'Am liebsten freitags ab 15 Uhr.',
    bodyPlacement: 'Oberarm',
    budgetRange: '300-600',
    customerEmail: 'maya.demo@example.com',
    customerName: 'Maya Demo',
    customerPhone: '+49 151 12345678',
    ideaDescription: 'Neo-Traditional Panther mit gelben Akzenten.',
    preferredStyle: 'Neo-Traditional',
    status: 'new',
  },
  {
    approximateSize: 'handflächengroß',
    artistSlug: 'maya-black',
    availabilityNotes: 'Keine Samstage. Referenzen: florale Blackwork-Ornamente.',
    bodyPlacement: 'Rippen',
    budgetRange: 'nach Absprache',
    customerEmail: 'lina.demo@example.com',
    customerName: 'Lina Demo',
    customerPhone: '',
    ideaDescription: 'Florales Blackwork mit feinen Ornamenten.',
    preferredStyle: 'Blackwork',
    status: 'reviewed',
  },
  {
    approximateSize: 'kleines Lettering',
    artistSlug: 'luna-vex',
    availabilityNotes: 'Flexible Termine unter der Woche.',
    bodyPlacement: 'Schulterblatt',
    budgetRange: '200-350',
    customerEmail: 'toni.demo@example.com',
    customerName: 'Toni Demo',
    customerPhone: '+49 160 7654321',
    ideaDescription: 'Grafisches Dotwork-Motiv mit Halo-Element.',
    preferredStyle: 'Dotwork',
    status: 'contacted',
  },
  {
    approximateSize: 'Sleeve-Start',
    artistSlug: '',
    availabilityNotes: 'Erstberatung gewünscht.',
    bodyPlacement: 'Unterarm',
    budgetRange: '',
    customerEmail: 'sam.demo@example.com',
    customerName: 'Sam Demo',
    customerPhone: '',
    ideaDescription: 'Blackwork-Konzept als erster Teil eines Sleeves.',
    preferredStyle: 'Blackwork',
    status: 'archived',
  },
] as const

async function seedBookingRequests() {
  if (!env.MONGODB_URI) {
    throw new Error('MONGODB_URI is required to seed booking requests.')
  }

  await connectToDatabase(env.MONGODB_URI)

  const existingDemoRequests = await BookingRequestModel.countDocuments({
    customerEmail: { $in: demoBookingRequests.map((request) => request.customerEmail) },
  })

  if (existingDemoRequests > 0) {
    console.log('Demo booking requests already exist. No new records created.')
    return
  }

  await BookingRequestModel.insertMany(demoBookingRequests)

  console.log(`Seeded ${demoBookingRequests.length} demo booking requests.`)
}

seedBookingRequests()
  .catch((error: unknown) => {
    console.error('Failed to seed booking requests.')
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await mongoose.disconnect()
  })
