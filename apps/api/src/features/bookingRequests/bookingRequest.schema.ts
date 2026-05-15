import { z } from 'zod'

import { bookingRequestStatuses } from './bookingRequest.model.js'

export const artistSlugSchema = z
  .string()
  .trim()
  .max(80)
  .regex(/^[a-z0-9-]*$/, 'Artist slug can only contain lowercase letters, numbers and hyphens.')

const requiredTextSchema = z.string().trim().min(1).max(2000)
const optionalTextSchema = z.string().trim().max(1000).optional().default('')
const adminNotesSchema = z.string().trim().max(4000).optional().default('')
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
  artistSlug: artistSlugSchema.optional().default('').transform((value) => value.toLowerCase()),
  budgetRange: optionalTextSchema,
  availabilityNotes: optionalTextSchema,
})

const referenceImageResponseSchema = z.object({
  url: z.string().url(),
  publicId: z.string(),
  originalName: z.string(),
  mimeType: z.string(),
  size: z.number(),
  width: z.number().optional(),
  height: z.number().optional(),
  uploadedAt: z.string(),
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
  adminNotes: z.string(),
  status: z.enum(bookingRequestStatuses),
  referenceImages: z.array(referenceImageResponseSchema),
  createdAt: z.string(),
})

export const updateBookingRequestStatusSchema = z.object({
  status: z.enum(bookingRequestStatuses),
})

export const updateBookingRequestAdminNotesSchema = z.object({
  adminNotes: adminNotesSchema,
})

export const bookingRequestParamsSchema = z.object({
  id: z.string().trim().regex(/^[a-f\d]{24}$/i, 'Invalid booking request id.'),
})

export type CreateBookingRequestInput = z.infer<typeof createBookingRequestSchema>
export type UpdateBookingRequestAdminNotesInput = z.infer<
  typeof updateBookingRequestAdminNotesSchema
>
export type UpdateBookingRequestStatusInput = z.infer<typeof updateBookingRequestStatusSchema>
export type BookingRequestResponse = z.infer<typeof bookingRequestResponseSchema>
