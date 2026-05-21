import { defineEventHandler, readBody } from 'h3'
import prisma from '~~/server/utils/prisma'

const parseCategoryId = (value: unknown) => {
  const categoryId = Number(value)

  return Number.isInteger(categoryId) && categoryId > 0
    ? categoryId
    : null
}

export default defineEventHandler(async (event) => {

  const id = Number(event.context.params?.id)

  const body = await readBody(event)

  const project = await prisma.project.update({
    where: {
      id
    },
    data: {

      title: body.title,

      slug: body.slug,

      description: body.description,

      coverImage: body.coverImage,

      categoryId: parseCategoryId(body.categoryId)

    }
  })

  await prisma.projectImage.deleteMany({
    where: {
      projectId: id
    }
  })

  if (body.galleryImages?.length) {

    await prisma.projectImage.createMany({
      data: body.galleryImages.map((url: string) => ({
        url,
        projectId: id
      }))
    })

  }

  return project

})
