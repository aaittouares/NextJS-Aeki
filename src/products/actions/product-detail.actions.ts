'use server'

import { fetchSingleProduct } from '../infrastructure/product.prisma.repository'
import { findFirstReview, groupReviewsByProduct } from '@/reviews'
import { redirect } from 'next/navigation'

export const getSingleProductAction = async (productId: string) => {
  const product = await fetchSingleProduct(productId)
  if (!product) {
    redirect('/products')
  }
  return product
}

export const findExistingReview = async (userId: string, productId: string) => {
  return (await findFirstReview(userId, productId)) ? true : false
}

export const getProductRating = async (productId: string) => {
  const result = await groupReviewsByProduct(productId)

  // empty array if no reviews
  return {
    rating: result[0]?._avg.rating?.toFixed(1) ?? 0,
    count: result[0]?._count.rating ?? 0,
  }
}
