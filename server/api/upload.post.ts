import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

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

  const fileName = `${Date.now()}-${file.filename}`

  const filePath = join(process.cwd(), 'public/uploads', fileName)

  await writeFile(filePath, file.data)

  return {
    url: `/uploads/${fileName}`
  }

})