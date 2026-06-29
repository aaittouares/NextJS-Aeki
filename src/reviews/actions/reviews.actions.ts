'use server'

import { fetchProductReviewsByUser } from '@/reviews/infrastructure/review.prisma.repository'
import { userGuard } from '@/shared/lib/guards'

export const getUserReviews = async () => {
  const user = await userGuard()

  const reviews = await fetchProductReviewsByUser(user.id)
  return reviews
}
