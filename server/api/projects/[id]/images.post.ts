import prisma from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {

  const body = await readBody(event)

  const projectId = Number(event.context.params?.id)

  const image = await prisma.projectImage.create({
    data: {
      url: body.url,
      projectId
    }
  })

  return image

})