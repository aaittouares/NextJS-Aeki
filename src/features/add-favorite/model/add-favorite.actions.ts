'use server'

import {
  createFavorite,
  deleteFavoriteById,
  fetchFirstFavoriteByProductIdAndUserId,
} from '@/entities/favorite/api/favorite.prisma.repository'
import { getAuthUser, renderError } from '@/shared/lib/helpers'
import { revalidatePath } from 'next/cache'

export const findFavoriteId = async ({ productId }: { productId: string }) => {
  const user = await getAuthUser()
  const favorite = await fetchFirstFavoriteByProductIdAndUserId({
    productId,
    userId: user.id,
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
      await deleteFavoriteById(favoriteId)

      favoriteId = null
    } else {
      const favorite = await createFavorite(productId, user.id)

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
