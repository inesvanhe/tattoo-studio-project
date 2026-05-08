import mongoose, { Schema, type InferSchemaType } from 'mongoose'

export const bookingRequestStatuses = ['new', 'reviewed', 'contacted', 'archived'] as const

const bookingRequestSchema = new Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    customerEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    customerPhone: {
      type: String,
      trim: true,
      default: '',
    },
    ideaDescription: {
      type: String,
      required: true,
      trim: true,
    },
    preferredStyle: {
      type: String,
      required: true,
      trim: true,
    },
    bodyPlacement: {
      type: String,
      required: true,
      trim: true,
    },
    approximateSize: {
      type: String,
      required: true,
      trim: true,
    },
    artistSlug: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
      index: true,
    },
    budgetRange: {
      type: String,
      trim: true,
      default: '',
    },
    availabilityNotes: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: bookingRequestStatuses,
      default: 'new',
      index: true,
    },
  },
  {
    collection: 'bookingRequests',
    timestamps: true,
  },
)

bookingRequestSchema.index({ status: 1, createdAt: -1 })

export type BookingRequestDocument = InferSchemaType<typeof bookingRequestSchema>

export const BookingRequestModel =
  mongoose.models.BookingRequest ?? mongoose.model('BookingRequest', bookingRequestSchema)
