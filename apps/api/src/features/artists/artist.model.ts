import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const artistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      required: true,
      trim: true,
    },
    styles: {
      type: [String],
      required: true,
      default: [],
    },
    profileImageUrl: {
      type: String,
      trim: true,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
      index: true,
    },
  },
  {
    collection: 'artists',
    timestamps: true,
  },
)

artistSchema.index({ isActive: 1, sortOrder: 1, name: 1 })

export type ArtistDocument = InferSchemaType<typeof artistSchema>

export const ArtistModel = mongoose.models.Artist ?? mongoose.model('Artist', artistSchema)
