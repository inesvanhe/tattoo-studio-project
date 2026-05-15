import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

import dotenv from 'dotenv'
import { z } from 'zod'

const envFileCandidates = [resolve(process.cwd(), '.env'), resolve(process.cwd(), '../../.env')]

for (const envFilePath of envFileCandidates) {
  if (existsSync(envFilePath)) {
    dotenv.config({ path: envFilePath, quiet: true })
  }
}

const emptyStringToUndefined = (value: unknown) => (value === '' ? undefined : value)

const envSchema = z.object({
  CLOUDINARY_API_KEY: z.preprocess(emptyStringToUndefined, z.string().trim().min(1).optional()),
  CLOUDINARY_API_SECRET: z.preprocess(emptyStringToUndefined, z.string().trim().min(1).optional()),
  CLOUDINARY_CLOUD_NAME: z.preprocess(emptyStringToUndefined, z.string().trim().min(1).optional()),
  CLERK_PUBLISHABLE_KEY: z.preprocess(emptyStringToUndefined, z.string().trim().min(1).optional()),
  CLERK_SECRET_KEY: z.preprocess(emptyStringToUndefined, z.string().trim().min(1).optional()),
  MONGODB_URI: z.preprocess(emptyStringToUndefined, z.string().trim().min(1).optional()),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
})

export const env = envSchema.parse(process.env)
