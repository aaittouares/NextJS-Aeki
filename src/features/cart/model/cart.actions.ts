'use server'

import { getCartByUser } from '@/entities/cart/api/cart.prisma.repository'
import { Cart } from '@/shared/api/prisma/generated/client'
import prisma from '@/shared/api/prisma/prisma.provider'
import { getAuthUser, renderError } from '@/shared/lib/helpers'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export const getNumberOfCartItems = async () => {
  const { userId } = await auth()

  const cart = await getCartByUser(userId)

  return cart?.numItemsInCart || 0
}

const fetchProduct = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  })

  if (!product) {
    throw new Error('Product not found')
  }
  return product
}
const includeProductClause = {
  cartItems: {
    include: {
      product: true,
    },
  },
}

export const fetchOrCreateCart = async ({
  userId,
  errorOnFailure = false,
}: {
  userId: string
  errorOnFailure?: boolean
}) => {
  let cart = await prisma.cart.findFirst({
    where: {
      clerkId: userId,
    },
    include: includeProductClause,
  })

  if (!cart && errorOnFailure) {
    throw new Error('Cart not found')
  }

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        clerkId: userId,
      },
      include: includeProductClause,
    })
  }

  return cart
}

const updateOrCreateCartItem = async ({
  productId,
  cartId,
  amount,
}: {
  productId: string
  cartId: string
  amount: number
}) => {
  let cartItem = await prisma.cartItem.findFirst({
    where: {
      productId,
      cartId,
    },
  })

  if (cartItem) {
    cartItem = await prisma.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        amount: cartItem.amount + amount,
      },
    })
  } else {
    cartItem = await prisma.cartItem.create({
      data: { amount, productId, cartId },
    })
  }
}

export const updateCart = async (cart: Cart) => {
  const cartItems = await prisma.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      product: true, // Include the related product
    },
  })

  let numItemsInCart = 0
  let cartTotal = 0

  for (const item of cartItems) {
    numItemsInCart += item.amount
    cartTotal += item.amount * item.product.price
  }
  const tax = cart.taxRate * cartTotal
  const shipping = cartTotal ? cart.shipping : 0
  const orderTotal = cartTotal + tax + shipping

  await prisma.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      numItemsInCart,
      cartTotal,
      tax,
      orderTotal,
    },
  })
}

export const addToCartAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser()
  try {
    const productId = formData.get('productId') as string
    const amount = Number(formData.get('amount'))
    await fetchProduct(productId)
    const cart = await fetchOrCreateCart({ userId: user.id })
    await updateOrCreateCartItem({ productId, cartId: cart.id, amount })
    await updateCart(cart)
  } catch (error) {
    return renderError(error)
  }
  redirect('/cart')
}
