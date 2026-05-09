import { z } from 'zod'

import { bookingRequestStatuses } from './bookingRequest.model.js'

const requiredTextSchema = z.string().trim().min(1).max(2000)
const optionalTextSchema = z.string().trim().max(1000).optional().default('')
const phoneSchema = optionalTextSchema.refine(
  (value) => value === '' || /^[\d\s()+/-]+$/.test(value),
  'Phone number can only contain numbers, spaces and common phone symbols.',
)

export const createBookingRequestSchema = z.object({
  customerName: requiredTextSchema.max(120),
  customerEmail: z.string().trim().email().max(180).toLowerCase(),
  customerPhone: phoneSchema,
  ideaDescription: requiredTextSchema,
  preferredStyle: requiredTextSchema.max(120),
  bodyPlacement: requiredTextSchema.max(120),
  approximateSize: requiredTextSchema.max(120),
  artistSlug: optionalTextSchema.transform((value) => value.toLowerCase()),
  budgetRange: optionalTextSchema,
  availabilityNotes: optionalTextSchema,
})

export const bookingRequestResponseSchema = z.object({
  id: z.string(),
  customerName: z.string(),
  customerEmail: z.string(),
  customerPhone: z.string(),
  ideaDescription: z.string(),
  preferredStyle: z.string(),
  bodyPlacement: z.string(),
  approximateSize: z.string(),
  artistSlug: z.string(),
  budgetRange: z.string(),
  availabilityNotes: z.string(),
  status: z.enum(bookingRequestStatuses),
  createdAt: z.string(),
})

export const updateBookingRequestStatusSchema = z.object({
  status: z.enum(bookingRequestStatuses),
})

export const bookingRequestParamsSchema = z.object({
  id: z.string().trim().min(1),
})

export type CreateBookingRequestInput = z.infer<typeof createBookingRequestSchema>
export type UpdateBookingRequestStatusInput = z.infer<typeof updateBookingRequestStatusSchema>
export type BookingRequestResponse = z.infer<typeof bookingRequestResponseSchema>
