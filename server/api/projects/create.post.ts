import prisma from '../../utils/prisma'

const parseCategoryId = (value: unknown) => {
  const categoryId = Number(value)

  return Number.isInteger(categoryId) && categoryId > 0
    ? categoryId
    : null
}

const createSlug = (value: string) => {
  const slug = value
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '')

  return slug || 'project'
}

const getPrismaErrorCode = (error: unknown) =>
  typeof error === 'object' && error && 'code' in error
    ? String((error as { code?: string }).code)
    : ''

export default defineEventHandler(async (event) => {

  const body = await readBody(event)
  const title = String(body.title ?? '').trim()
  const slug = String(body.slug ?? '').trim() || createSlug(title)
  const description = String(body.description ?? '').trim()
  const coverImage = String(body.coverImage ?? '').trim()

  if (!title || !description || !coverImage) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Title, description and cover image are required'
    })
  }

  try {
    const project = await prisma.project.create({
      data: {
        title,
        slug: createSlug(slug),
        description,
        coverImage,
        categoryId: parseCategoryId(body.categoryId)
      }
    })

    return project
  } catch (error) {
    const code = getPrismaErrorCode(error)

    console.error('Failed to create project', {
      code,
      message: error instanceof Error ? error.message : String(error)
    })

    if (code === 'P2002') {
      throw createError({
        statusCode: 409,
        statusMessage: 'Project slug already exists'
      })
    }

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
      statusMessage: 'Failed to create project'
    })
  }
})
