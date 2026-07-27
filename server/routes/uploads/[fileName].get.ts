import { readFile } from 'node:fs/promises'
import { basename, join } from 'node:path'
import {
  getUploadContentType,
  getUploadReadDirs
} from '~~/server/utils/uploads'
import prisma from '~~/server/utils/prisma'

const getPrismaErrorCode = (error: unknown) =>
  typeof error === 'object' && error && 'code' in error
    ? String((error as { code?: string }).code)
    : ''

const sendImage = (event: any, contentType: string, file: Uint8Array) => {
  setHeader(event, 'Content-Type', contentType)
  setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')

  return file
}

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

      return sendImage(event, contentType, file)
    } catch (error: any) {
      if (error?.code !== 'ENOENT') {
        throw error
      }
    }
  }

  try {
    const upload = await prisma.upload.findUnique({
      where: {
        fileName
      }
    })

    if (upload) {
      return sendImage(event, upload.contentType, upload.data)
    }
  } catch (error) {
    const code = getPrismaErrorCode(error)

    if (code !== 'P2021' && code !== 'P2022') {
      throw error
    }
  }

  throw createError({
    statusCode: 404,
    statusMessage: 'File not found'
  })
})
