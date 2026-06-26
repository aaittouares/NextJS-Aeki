'use server'

import prisma from '@/shared/api/prisma/prisma.provider'
import { userGuard } from '@/shared/lib/guards'

export const fetchUserFavorites = async () => {
  const user = await userGuard()
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
