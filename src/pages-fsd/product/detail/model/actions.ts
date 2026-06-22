import { fetchSingleProduct } from '@/entities/product/api/product.prisma.repository'
import prisma from '@/shared/api/prisma/prisma.provider'
import { redirect } from 'next/navigation'

export const getSingleProductAction = async (productId: string) => {
  const product = await fetchSingleProduct(productId)
  if (!product) {
    redirect('/products')
  }
  return product
}

export const findExistingReview = async (userId: string, productId: string) => {
  return prisma.review.findFirst({
    where: {
      clerkId: userId,
      productId,
    },
  })
}
