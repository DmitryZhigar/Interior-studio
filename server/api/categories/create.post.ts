import { Prisma } from '@prisma/client'
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
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Category already exists'
      })
    }

    throw error
  }
})
