import prisma from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {

  const id = Number(event.context.params?.id)

  const project = await prisma.project.findUnique({
    where: {
      id
    },
    include: {
      category: true,
      images: true
    }
  })

  return project

})