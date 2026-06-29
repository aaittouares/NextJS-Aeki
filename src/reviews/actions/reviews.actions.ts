'use server'

import { userGuard } from '@/shared/lib/guards'
import { fetchProductReviewsByUser } from '../infrastructure/review.prisma.repository'

export const getUserReviews = async () => {
  const user = await userGuard()

  const reviews = await fetchProductReviewsByUser(user.id)
  return reviews
}
