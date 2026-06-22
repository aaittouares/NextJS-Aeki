'use server'

import prisma from '@/shared/api/prisma/prisma.provider'
import { getAuthUser } from '@/shared/lib/helpers'

export const fetchProductReviewsByUser = async () => {
  const user = await getAuthUser()
  const reviews = await prisma.review.findMany({
    where: {
      clerkId: user.id,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      product: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  })
  return reviews
}
