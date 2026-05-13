import prisma from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  const category = await prisma.category.create({
    data: {
      name: body.name,
      slug: body.name
        .toLowerCase()
        .replace(/\s+/g, '-')
    }
  })

  return category

})