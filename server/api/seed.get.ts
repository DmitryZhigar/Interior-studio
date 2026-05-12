import prisma from '../utils/prisma'

export default defineEventHandler(async () => {

  // categories
  const hotel = await prisma.category.create({
    data: {
      name: 'Hotel',
      slug: 'hotel',
    },
  })

  const office = await prisma.category.create({
    data: {
      name: 'Office',
      slug: 'office',
    },
  })

  const house = await prisma.category.create({
    data: {
      name: 'Private House',
      slug: 'private-house',
    },
  })

  // projects
  await prisma.project.createMany({
    data: [
      {
        title: 'Luxury Hotel Interior',
        slug: 'luxury-hotel',
        description: 'Luxury hospitality interior project.',
        coverImage:
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
        categoryId: hotel.id,
      },

      {
        title: 'Modern Workspace',
        slug: 'modern-office',
        description: 'Minimal office workspace.',
        coverImage:
          'https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop',
        categoryId: office.id,
      },

      {
        title: 'Private Villa',
        slug: 'private-villa',
        description: 'Modern private villa.',
        coverImage:
          'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop',
        categoryId: house.id,
      },
    ],
  })

  return {
    success: true,
  }
})