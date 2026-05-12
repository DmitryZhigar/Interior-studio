import prisma from '~~/server/utils/prisma'

export default defineEventHandler(async () => {

  const categories = await prisma.category.findMany()

  return categories
})