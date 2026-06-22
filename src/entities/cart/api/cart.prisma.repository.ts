import prisma from '@/shared/api/prisma/prisma.provider'

export const getCartByUser = async (userId: string | null) => {
  const cart = await prisma.cart.findFirst({
    where: {
      clerkId: userId ?? '',
    },
    select: {
      numItemsInCart: true,
    },
  })

  return cart
}
