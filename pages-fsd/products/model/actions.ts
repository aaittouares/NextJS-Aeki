import prisma from '@/shared/lib/prisma/prisma.provider'

export const fetchAllProducts = () => {
  return prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
}
