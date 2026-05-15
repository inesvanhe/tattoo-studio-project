import { createHash } from 'node:crypto'

import type { Express } from 'express'
import { Types } from 'mongoose'

import { env } from '../../../shared/config/env.js'

export const allowedReferenceImageMimeTypes = ['image/jpeg', 'image/png', 'image/webp']
export const maxReferenceImageSize = 5 * 1024 * 1024
export const maxReferenceImages = 5

export type UploadedReferenceImage = {
  url: string
  publicId: string
  originalName: string
  mimeType: string
  size: number
  width?: number
  height?: number
  uploadedAt: Date
}

type CloudinaryUploadResponse = {
  secure_url: string
  public_id: string
  width?: number
  height?: number
}

type CloudinaryDestroyResponse = {
  result?: string
}

export class ReferenceImageUploadError extends Error {
  statusCode = 400

  constructor(message: string) {
    super(message)
    this.name = 'ReferenceImageUploadError'
  }
}

export function validateReferenceImages(files: Express.Multer.File[]) {
  if (files.length > maxReferenceImages) {
    throw new ReferenceImageUploadError('Du kannst maximal 5 Referenzbilder hochladen.')
  }

  for (const file of files) {
    if (!allowedReferenceImageMimeTypes.includes(file.mimetype)) {
      throw new ReferenceImageUploadError('Bitte lade nur JPG, PNG oder WEBP Dateien hoch.')
    }

    if (!hasValidImageSignature(file)) {
      throw new ReferenceImageUploadError('Bitte lade nur JPG, PNG oder WEBP Dateien hoch.')
    }

    if (file.size > maxReferenceImageSize) {
      throw new ReferenceImageUploadError('Ein Bild darf maximal 5 MB groß sein.')
    }
  }
}

export async function uploadReferenceImages(
  files: Express.Multer.File[],
  requestId: Types.ObjectId,
) {
  validateReferenceImages(files)

  if (files.length === 0) {
    return []
  }

  ensureCloudinaryConfigured()

  const folder = `tattoo-studio/reference-images/${requestId.toString()}`
  const uploadedImages: UploadedReferenceImage[] = []

  try {
    for (const file of files) {
      const uploadedImage = await uploadReferenceImage(file, folder)

      uploadedImages.push(uploadedImage)
    }
  } catch (error) {
    await deleteReferenceImages(uploadedImages)
    throw error
  }

  return uploadedImages
}

export async function deleteReferenceImages(images: UploadedReferenceImage[]) {
  if (images.length === 0 || !isCloudinaryConfigured()) {
    return
  }

  await Promise.allSettled(images.map((image) => destroyCloudinaryImage(image.publicId)))
}

function ensureCloudinaryConfigured() {
  if (!isCloudinaryConfigured()) {
    throw new ReferenceImageUploadError('Referenzbilder können gerade nicht hochgeladen werden.')
  }
}

function isCloudinaryConfigured() {
  return Boolean(env.CLOUDINARY_CLOUD_NAME && env.CLOUDINARY_API_KEY && env.CLOUDINARY_API_SECRET)
}

async function uploadReferenceImage(file: Express.Multer.File, folder: string) {
  const timestamp = Math.floor(Date.now() / 1000).toString()
  const signature = createCloudinarySignature({ folder, timestamp })
  const formData = new FormData()
  const fileBlob = new Blob([new Uint8Array(file.buffer)], { type: file.mimetype })

  formData.set('file', fileBlob, file.originalname)
  formData.set('folder', folder)
  formData.set('timestamp', timestamp)
  formData.set('api_key', env.CLOUDINARY_API_KEY ?? '')
  formData.set('signature', signature)

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      body: formData,
      method: 'POST',
    },
  )

  if (!response.ok) {
    const responseBody = await response.text().catch(() => '')

    console.error('Cloudinary upload failed', {
      bodyLength: responseBody.length,
      status: response.status,
    })

    throw new ReferenceImageUploadError('Referenzbilder konnten nicht hochgeladen werden.')
  }

  const responseBody = (await response.json()) as CloudinaryUploadResponse

  return {
    height: responseBody.height,
    mimeType: file.mimetype,
    originalName: file.originalname,
    publicId: responseBody.public_id,
    size: file.size,
    uploadedAt: new Date(),
    url: responseBody.secure_url,
    width: responseBody.width,
  } satisfies UploadedReferenceImage
}

async function destroyCloudinaryImage(publicId: string) {
  const timestamp = Math.floor(Date.now() / 1000).toString()
  const signature = createCloudinarySignature({ public_id: publicId, timestamp })
  const formData = new FormData()

  formData.set('public_id', publicId)
  formData.set('timestamp', timestamp)
  formData.set('api_key', env.CLOUDINARY_API_KEY ?? '')
  formData.set('signature', signature)

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/image/destroy`,
    {
      body: formData,
      method: 'POST',
    },
  )

  if (!response.ok) {
    const responseBody = await response.text().catch(() => '')

    console.error('Cloudinary cleanup failed', {
      bodyLength: responseBody.length,
      publicId,
      status: response.status,
    })
    return
  }

  const responseBody = (await response.json()) as CloudinaryDestroyResponse

  if (responseBody.result !== 'ok') {
    console.warn('Cloudinary cleanup returned non-ok result', {
      publicId,
      result: responseBody.result,
    })
  }
}

function hasValidImageSignature(file: Express.Multer.File) {
  if (file.mimetype === 'image/jpeg') {
    return file.buffer[0] === 0xff && file.buffer[1] === 0xd8 && file.buffer[2] === 0xff
  }

  if (file.mimetype === 'image/png') {
    return (
      file.buffer[0] === 0x89 &&
      file.buffer[1] === 0x50 &&
      file.buffer[2] === 0x4e &&
      file.buffer[3] === 0x47 &&
      file.buffer[4] === 0x0d &&
      file.buffer[5] === 0x0a &&
      file.buffer[6] === 0x1a &&
      file.buffer[7] === 0x0a
    )
  }

  if (file.mimetype === 'image/webp') {
    return file.buffer.subarray(0, 4).toString('ascii') === 'RIFF'
      && file.buffer.subarray(8, 12).toString('ascii') === 'WEBP'
  }

  return false
}

function createCloudinarySignature(params: Record<string, string>) {
  const payload = Object.entries(params)
    .sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey))
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

  return createHash('sha1')
    .update(`${payload}${env.CLOUDINARY_API_SECRET ?? ''}`)
    .digest('hex')
}
