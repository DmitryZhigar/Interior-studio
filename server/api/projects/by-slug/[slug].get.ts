import prisma from '../../../utils/prisma'

export default defineEventHandler(async (event) => {

  const slug = event.context.params?.slug

  const project = await prisma.project.findUnique({
    where: {
      slug
    },
    include: {
      category: true,
      images: true
    }
  })

  return project

})