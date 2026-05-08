import mongoose, { Schema, type InferSchemaType } from 'mongoose'

const tattooWorkSchema = new Schema(
  {
    title: {
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
    artistSlug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    styles: {
      type: [String],
      required: true,
      default: [],
      index: true,
    },
    bodyPlacement: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
      default: '',
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    isPublished: {
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
    collection: 'tattooWorks',
    timestamps: true,
  },
)

tattooWorkSchema.index({ isPublished: 1, isFeatured: -1, sortOrder: 1, title: 1 })
tattooWorkSchema.index({ isPublished: 1, artistSlug: 1, sortOrder: 1 })

export type TattooWorkDocument = InferSchemaType<typeof tattooWorkSchema>

export const TattooWorkModel =
  mongoose.models.TattooWork ?? mongoose.model('TattooWork', tattooWorkSchema)
