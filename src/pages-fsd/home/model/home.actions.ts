'use server'

import prisma from '@/shared/api/prisma/prisma.provider'

export const fetchFeaturedProducts = async () => {
  const products = await prisma.product.findMany({
    where: {
      featured: true,
    },
  })
  return products
}
