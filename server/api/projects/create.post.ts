import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  const project = await prisma.project.create({
    data: {
      title: body.title,
      slug: body.slug,
      description: body.description,
      coverImage: body.coverImage,
      categoryId: Number(body.categoryId)
    }
  })

  return project
})