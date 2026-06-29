import { fetchProductReviews } from '../infrastructure/review.prisma.repository'

export const getProductReviews = async (productId: string) => {
  const reviews = await fetchProductReviews(productId)
  return reviews
}
