import prisma from '@/shared/api/prisma/prisma.provider'

export const fetchFirstFavoriteByProductIdAndUserId = async ({
  productId,
  userId,
}: {
  productId: string
  userId: string
}) => {
  const favorite = await prisma.favorite.findFirst({
    where: {
      productId,
      clerkId: userId,
    },
    select: {
      id: true,
    },
  })
  return favorite
}

export const deleteFavoriteById = async (favoriteId: string) => {
  await prisma.favorite.delete({
    where: {
      id: favoriteId,
    },
  })
}

export const createFavorite = async (productId: string, userId: string) => {
  const favorite = await prisma.favorite.create({
    data: {
      productId,
      clerkId: userId,
    },
  })

  return favorite
}
