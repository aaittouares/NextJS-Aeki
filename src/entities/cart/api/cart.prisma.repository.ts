'use server'

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

const includeProductClause = {
  cartItems: {
    include: {
      product: true,
    },
  },
}

export const findCartByUser = async (userId: string) => {
  const cart = await prisma.cart.findFirst({
    where: {
      clerkId: userId,
    },
    include: includeProductClause,
  })

  return cart
}

export const createCart = async (userId: string) => {
  const cart = await prisma.cart.create({
    data: {
      clerkId: userId,
    },
    include: includeProductClause,
  })

  return cart
}

export const updateCartValue = async (
  cartId: string,
  data: {
    numItemsInCart: number
    cartTotal: number
    tax: number
    orderTotal: number
  },
) => {
  const updatedCart = await prisma.cart.update({
    where: {
      id: cartId,
    },

    data,
    include: includeProductClause,
  })

  return updatedCart
}

export const deleteCartItem = async (cartItemId: string, cartId: string) => {
  await prisma.cartItem.delete({
    where: {
      id: cartItemId,
      cartId: cartId,
    },
  })
}

export const createCartItem = async (data: {
  productId: string
  cartId: string
  amount: number
}) => {
  await prisma.cartItem.create({
    data,
  })
}

export const findCartItem = async (productId: string, cartId: string) => {
  const cartItem = await prisma.cartItem.findFirst({
    where: {
      productId,
      cartId,
    },
  })

  return cartItem
}

export const updateCartItemAmount = async (
  cartItemId: string,
  amount: number,
) => {
  await prisma.cartItem.update({
    where: {
      id: cartItemId,
    },
    data: {
      amount: amount,
    },
  })
}

export const getCartItems = async (cartId: string) => {
  const cartItems = await prisma.cartItem.findMany({
    where: {
      cartId,
    },
    include: {
      product: true, // Include the related product
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  return cartItems
}
