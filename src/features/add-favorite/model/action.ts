'use server'

import prisma from '@/shared/api/prisma/prisma.provider'
import { getAuthUser, renderError } from '@/shared/lib/helpers'
import { revalidatePath } from 'next/cache'

export const fetchFavoriteId = async ({ productId }: { productId: string }) => {
  const user = await getAuthUser()
  const favorite = await prisma.favorite.findFirst({
    where: {
      productId,
      clerkId: user.id,
    },
    select: {
      id: true,
    },
  })
  return favorite?.id || null
}

export const toggleFavoriteAction = async (prevState: {
  productId: string
  favoriteId: string | null
  pathname: string
  message: string
}) => {
  const user = await getAuthUser()
  let { productId, favoriteId, pathname } = prevState
  try {
    if (favoriteId) {
      await prisma.favorite.delete({
        where: {
          id: favoriteId,
        },
      })

      favoriteId = null
    } else {
      const favorite = await prisma.favorite.create({
        data: {
          productId,
          clerkId: user.id,
        },
      })

      favoriteId = favorite.id
    }
    revalidatePath(pathname)
    return {
      productId,
      favoriteId,
      pathname,
      message: favoriteId ? 'Added to Faves' : 'Removed from Faves',
    }
  } catch (err) {
    const error = await renderError(err)

    return {
      productId: '',
      favoriteId: '',
      pathname: '',
      message: error.message,
    }
  }
}
