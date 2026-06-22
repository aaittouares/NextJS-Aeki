'use server'

import { fetchProductReviewsByUser } from '@/entities/review/api/review.prisma.repository'
import { getAuthUser } from '@/shared/lib/helpers'

export const getUserReviews = async () => {
  const user = await getAuthUser()

  const reviews = await fetchProductReviewsByUser(user.id)
  return reviews
}
