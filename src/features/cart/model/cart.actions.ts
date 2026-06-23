'use server'

import {
  createCart,
  createCartItem,
  deleteCartItem,
  findCartByUser,
  findCartItem,
  getCartByUser,
  getCartItems,
  updateCartItemAmount,
  updateCartValue,
} from '@/entities/cart/api/cart.prisma.repository'
import { fetchSingleProduct } from '@/entities/product/api/product.prisma.repository'
import { Cart } from '@/shared/api/prisma/generated/client'
import { getAuthUser, renderError } from '@/shared/lib/helpers'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const getNumberOfCartItems = async () => {
  const { userId } = await auth()

  const cart = await getCartByUser(userId)

  return cart?.numItemsInCart || 0
}

export const getOrCreateCart = async ({
  userId,
  errorOnFailure = false,
}: {
  userId: string
  errorOnFailure?: boolean
}) => {
  let cart = await findCartByUser(userId)

  if (!cart && errorOnFailure) {
    throw new Error('Cart not found')
  }

  if (!cart) {
    cart = await createCart(userId)
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
  let cartItem = await findCartItem(productId, cartId)

  if (cartItem) {
    await updateCartItemAmount(cartItem.id, cartItem.amount + amount)
  } else {
    await createCartItem({ amount, productId, cartId })
  }
}

export const updateCartItemAction = async ({
  amount,
  cartItemId,
}: {
  amount: number
  cartItemId: string
}) => {
  const user = await getAuthUser()

  try {
    await updateCartItemAmount(cartItemId, amount)

    const cart = await getOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    })

    await updateCart(cart)
    revalidatePath('/cart')
    return { message: 'cart updated' }
  } catch (error) {
    return renderError(error)
  }
}

export const updateCart = async (cart: Cart) => {
  const cartItems = await getCartItems(cart.id)

  let numItemsInCart = 0
  let cartTotal = 0

  for (const item of cartItems) {
    numItemsInCart += item.amount
    cartTotal += item.amount * item.product.price
  }

  const tax = cart.taxRate * cartTotal
  const shipping = cartTotal ? cart.shipping : 0
  const orderTotal = cartTotal + tax + shipping

  const currentCart = await updateCartValue(cart.id, {
    numItemsInCart,
    cartTotal,
    tax,
    orderTotal,
  })

  return { currentCart, cartItems }
}

export const addToCartAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser()
  try {
    const productId = formData.get('productId') as string
    const amount = Number(formData.get('amount'))
    //check if product exist
    await fetchSingleProduct(productId)
    const cart = await getOrCreateCart({ userId: user.id })
    await updateOrCreateCartItem({ productId, cartId: cart.id, amount })
    await updateCart(cart)
  } catch (error) {
    return renderError(error)
  }
  revalidatePath('/cart')
  redirect('/cart')
}

export const removeCartItemAction = async (
  prevState: any,
  formData: FormData,
) => {
  const user = await getAuthUser()
  try {
    const cartItemId = formData.get('id') as string
    const cart = await getOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    })

    await deleteCartItem(cartItemId, cart.id)

    await updateCart(cart)
    revalidatePath('/cart')
    return { message: 'Item removed from cart' }
  } catch (error) {
    return renderError(error)
  }
}
