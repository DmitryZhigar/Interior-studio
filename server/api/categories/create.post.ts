import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  const category = await prisma.category.create({
    data: {

      name: body.name,

      description: body.description,

      slug: body.name
        .toLowerCase()
        .replace(/\s+/g, '-')

    }
  })

  return category

})