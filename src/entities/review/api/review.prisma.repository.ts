'use server'

import prisma from '@/shared/api/prisma/prisma.provider'

export const createReview = async ({
  productId,
  authorName,
  authorImageUrl,
  rating,
  comment,
  clerkId,
}: {
  productId: string
  authorName: string
  authorImageUrl: string
  rating: number
  comment: string
  clerkId: string
}) => {
  await prisma.review.create({
    data: {
      productId,
      authorName,
      authorImageUrl,
      rating,
      comment,
      clerkId,
    },
  })
}

export const deleteReviewByIdAndUser = async (
  reviewId: string,
  userId: string,
) => {
  await prisma.review.delete({
    where: {
      id: reviewId,
      clerkId: userId,
    },
  })
}

export const fetchProductReviewsByUser = async (userId: string) => {
  const reviews = await prisma.review.findMany({
    where: {
      clerkId: userId,
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

export const findFirstReview = async (userId: string, productId: string) => {
  return prisma.review.findFirst({
    where: {
      clerkId: userId,
      productId,
    },
  })
}

export const groupReviewsByProduct = async (productId: string) => {
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

  return result
}

export const fetchProductReviews = async (productId: string) => {
  const reviews = await prisma.review.findMany({
    where: {
      productId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return reviews
}
