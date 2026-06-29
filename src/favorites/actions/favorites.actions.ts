'use server'

import { userGuard } from '@/shared/lib/guards'
import { fetchUserFavorites } from '../infrastructure/favorite.prisma.repository'

export const getUserFavorites = async () => {
  const user = await userGuard()
  const favorites = await fetchUserFavorites(user.id)
  return favorites
}
