import { mkdir } from 'node:fs/promises'
import { basename, extname, join } from 'node:path'

const uploadContentTypes: Record<string, string> = {
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp'
}

export const getUploadsDir = () =>
  process.env.UPLOAD_DIR || join(process.cwd(), '.data/uploads')

export const getUploadReadDirs = () => [
  getUploadsDir(),
  join(process.cwd(), '.output/public/uploads'),
  join(process.cwd(), 'public/uploads')
]

export const ensureUploadsDir = async () => {
  const uploadsDir = getUploadsDir()

  await mkdir(uploadsDir, {
    recursive: true
  })

  return uploadsDir
}

export const sanitizeUploadFileName = (fileName: string) =>
  basename(fileName)
    .replace(/[^\p{Letter}\p{Number}._-]+/gu, '-')
    .replace(/^-+|-+$/g, '') || 'upload'

export const getUploadContentType = (fileName: string) =>
  uploadContentTypes[extname(fileName).toLowerCase()]
