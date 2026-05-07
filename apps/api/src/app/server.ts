import 'dotenv/config'

import { createApp } from './app.js'
import { env } from '../shared/config/env.js'
import { connectToDatabase } from '../shared/database/database.js'

const app = createApp()

async function startServer() {
  await connectToDatabase(env.MONGODB_URI)

  app.listen(env.PORT, () => {
    console.log(`HONEY | BEEZ API listening on http://localhost:${env.PORT}`)
  })
}

startServer().catch((error: unknown) => {
  console.error('Failed to start HONEY | BEEZ API')
  console.error(error)
  process.exit(1)
})
