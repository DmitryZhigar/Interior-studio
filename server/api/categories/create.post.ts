import prisma from '../../utils/prisma'

const createSlug = (value: string) => {
  const slug = value
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '')

  return slug || 'category'
}

const getPrismaErrorCode = (error: unknown) =>
  typeof error === 'object' && error && 'code' in error
    ? String((error as { code?: string }).code)
    : ''

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const name = String(body.name ?? '').trim()
  const description = String(body.description ?? '').trim()

  if (!name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Category name is required'
    })
  }

  try {
    const category = await prisma.category.create({
      data: {
        name,
        description: description || null,
        slug: createSlug(name)
      }
    })

    return category
  } catch (error) {
    const code = getPrismaErrorCode(error)

    console.error('Failed to create category', {
      code,
      message: error instanceof Error ? error.message : String(error)
    })

    if (code === 'P2002') {
      throw createError({
        statusCode: 409,
        statusMessage: 'Category already exists'
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
      statusMessage: 'Failed to create category'
    })
  }
})
