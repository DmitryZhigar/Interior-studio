import prisma from '../../utils/prisma'

const parseCategoryId = (value: unknown) => {
  const categoryId = Number(value)

  return Number.isInteger(categoryId) && categoryId > 0
    ? categoryId
    : null
}

export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  const project = await prisma.project.create({
    data: {
      title: body.title,
      slug: body.slug,
      description: body.description,
      coverImage: body.coverImage,
      categoryId: parseCategoryId(body.categoryId)
    }
  })

  return project
})
