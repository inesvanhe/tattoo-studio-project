import mongoose from 'mongoose'

export async function connectToDatabase(mongodbUri: string | undefined) {
  if (!mongodbUri) {
    console.warn('MongoDB connection skipped: MONGODB_URI is not configured')
    return
  }

  const connection = await mongoose.connect(mongodbUri)

  console.log(`MongoDB connected: ${connection.connection.name}`)
}
