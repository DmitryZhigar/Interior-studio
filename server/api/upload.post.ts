import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import {
  ensureUploadsDir,
  getUploadContentType,
  sanitizeUploadFileName
} from '~~/server/utils/uploads'

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

  const uploadsDir = await ensureUploadsDir()
  const fileName = `${Date.now()}-${safeFileName}`

  const filePath = join(uploadsDir, fileName)
  await writeFile(filePath, file.data)

  return {
    url: `/uploads/${fileName}`
  }

})
