import { readFile } from 'node:fs/promises'
import { basename, join } from 'node:path'
import {
  getUploadContentType,
  getUploadReadDirs
} from '~~/server/utils/uploads'

export default defineEventHandler(async (event) => {
  const requestedFileName = getRouterParam(event, 'fileName') || ''
  const fileName = basename(requestedFileName)
  const contentType = getUploadContentType(fileName)

  if (fileName !== requestedFileName || !contentType) {
    throw createError({
      statusCode: 404,
      statusMessage: 'File not found'
    })
  }

  for (const uploadsDir of getUploadReadDirs()) {
    try {
      const file = await readFile(join(uploadsDir, fileName))

      setHeader(event, 'Content-Type', contentType)
      setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')

      return file
    } catch (error: any) {
      if (error?.code !== 'ENOENT') {
        throw error
      }
    }
  }

  throw createError({
    statusCode: 404,
    statusMessage: 'File not found'
  })
})
