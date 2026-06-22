'use server'

import prisma from '@/shared/api/prisma/prisma.provider'

export const fetchProductRating = async (productId: string) => {
  const result = await prisma.review.groupBy({
    by: ['productId'],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      productId,
    },
  })

  // empty array if no reviews
  return {
    rating: result[0]?._avg.rating?.toFixed(1) ?? 0,
    count: result[0]?._count.rating ?? 0,
  }
}
