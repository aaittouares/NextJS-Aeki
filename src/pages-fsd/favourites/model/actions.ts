'use server'

import prisma from '@/shared/api/prisma/prisma.provider'
import { getAuthUser } from '@/shared/lib/helpers'

export const fetchUserFavorites = async () => {
  const user = await getAuthUser()
  const favorites = await prisma.favorite.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
    },
  })
  return favorites
}
