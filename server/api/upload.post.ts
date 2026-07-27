import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import {
  ensureUploadsDir,
  getUploadContentType,
  sanitizeUploadFileName
} from '~~/server/utils/uploads'
import prisma from '../utils/prisma'

const getPrismaErrorCode = (error: unknown) =>
  typeof error === 'object' && error && 'code' in error
    ? String((error as { code?: string }).code)
    : ''

export default defineEventHandler(async (event) => {

  const formData = await readMultipartFormData(event)

  if (!formData) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No file uploaded'
    })
  }

  const file = formData[0]

  if (!file || !file.filename) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid file'
    })
  }

  const safeFileName = sanitizeUploadFileName(file.filename)
  const contentType = getUploadContentType(safeFileName)

  if (!contentType) {
    throw createError({
      statusCode: 415,
      statusMessage: 'Only AVIF, GIF, JPEG, PNG and WebP images are allowed'
    })
  }

  const fileName = `${Date.now()}-${safeFileName}`

  try {
    await prisma.upload.create({
      data: {
        fileName,
        contentType,
        data: file.data
      }
    })
  } catch (error) {
    const code = getPrismaErrorCode(error)

    console.error('Failed to store uploaded file in database', {
      code,
      message: error instanceof Error ? error.message : String(error)
    })

    if (code === 'P2021' || code === 'P2022') {
      throw createError({
        statusCode: 500,
        statusMessage: 'Database migration is not applied'
      })
    }

    if (code === 'P1000' || code === 'P1001' || code === 'P1003') {
      throw createError({
        statusCode: 500,
        statusMessage: 'Database connection is not configured'
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to store uploaded file'
    })
  }

  try {
    const uploadsDir = await ensureUploadsDir()
    const filePath = join(uploadsDir, fileName)

    await writeFile(filePath, file.data)
  } catch (error) {
    console.warn('Failed to cache uploaded file on disk', {
      message: error instanceof Error ? error.message : String(error)
    })
  }

  return {
    url: `/uploads/${fileName}`
  }

})
