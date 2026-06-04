import { mkdir, writeFile } from 'node:fs/promises'
import { basename, join } from 'node:path'

const getUploadsDir = () => {
  if (process.env.NODE_ENV === 'production') {
    return join(process.cwd(), '.output/public/uploads')
  }

  return join(process.cwd(), 'public/uploads')
}

const sanitizeFileName = (fileName: string) =>
  basename(fileName)
    .replace(/[^\p{Letter}\p{Number}._-]+/gu, '-')
    .replace(/^-+|-+$/g, '') || 'upload'

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

  const uploadsDir = getUploadsDir()
  const fileName = `${Date.now()}-${sanitizeFileName(file.filename)}`

  await mkdir(uploadsDir, {
    recursive: true
  })

  const filePath = join(uploadsDir, fileName)
  await writeFile(filePath, file.data)

  return {
    url: `/uploads/${fileName}`
  }

})
