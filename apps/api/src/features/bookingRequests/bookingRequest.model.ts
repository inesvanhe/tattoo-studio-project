import mongoose, { Schema, type InferSchemaType } from 'mongoose'

export const bookingRequestStatuses = ['new', 'reviewed', 'contacted', 'archived'] as const

const referenceImageSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
    },
    publicId: {
      type: String,
      required: true,
      trim: true,
    },
    originalName: {
      type: String,
      required: true,
      trim: true,
    },
    mimeType: {
      type: String,
      required: true,
      trim: true,
    },
    size: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    uploadedAt: {
      type: Date,
      required: true,
    },
  },
  {
    _id: false,
  },
)

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
    adminNotes: {
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
    referenceImages: {
      type: [referenceImageSchema],
      default: [],
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
