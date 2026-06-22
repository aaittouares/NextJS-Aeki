import { getCartByUser } from '@/entities/cart/api/cart.prisma.repository'
import prisma from '@/shared/api/prisma/prisma.provider'
import { auth } from '@clerk/nextjs/server'

export const getNumberOfCartItems = async () => {
  const { userId } = await auth()

  const cart = await getCartByUser(userId)

  return cart?.numItemsInCart || 0
}
