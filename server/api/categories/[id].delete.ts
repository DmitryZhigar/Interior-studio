import prisma from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {

  const id = Number(event.context.params?.id)

  await prisma.category.delete({
    where: {
      id
    }
  })

  return {
    success: true
  }

})