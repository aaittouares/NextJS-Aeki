'use server'

import {
  createCart,
  createCartItem,
  deleteCartItem,
  fetchCartItems,
  findCartByUser,
  findCartItem,
  getCartWithNumItemsInCart,
  updateCartItemAmount,
  updateCartValue,
} from '../infrastructure/cart.prisma.repository'
import { fetchSingleProduct } from '@/products'

import { Cart } from '@/shared/api/prisma/generated/client'
import { userGuard } from '@/shared/lib/guards'
import { renderError } from '@/shared/lib/render-error'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const getNumberOfCartItems = async () => {
  const { userId } = await auth()

  const cart = await getCartWithNumItemsInCart(userId)

  return cart?.numItemsInCart || 0
}

export const getOrCreateCart = async ({
  userId,
  errorOnGetFailure = false,
}: {
  userId: string
  errorOnGetFailure?: boolean
}) => {
  let cart = await findCartByUser(userId)

  if (!cart && errorOnGetFailure) {
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
  const user = await userGuard()

  try {
    await updateCartItemAmount(cartItemId, amount)

    const cart = await getOrCreateCart({
      userId: user.id,
      errorOnGetFailure: true,
    })

    await updateCart(cart)
    revalidatePath('/cart')
    return { message: 'cart updated' }
  } catch (error) {
    return renderError(error)
  }
}

export const getCartItems = async (cartId: string) => {
  const cartItems = await fetchCartItems(cartId)

  return cartItems
}

export const updateCart = async (cart: Cart) => {
  const cartItems = await fetchCartItems(cart.id)

  let numItemsInCart = 0
  let cartTotal = 0

  for (const item of cartItems) {
    numItemsInCart += item.amount
    cartTotal += item.amount * item.product.price
  }

  const tax = cart.taxRate * cartTotal
  const shipping = cartTotal ? cart.shipping : 0
  const orderTotal = cartTotal + tax + shipping

  await updateCartValue(cart.id, {
    numItemsInCart,
    cartTotal,
    tax,
    orderTotal,
  })
}

export const addToCartAction = async (prevState: any, formData: FormData) => {
  const user = await userGuard()
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
  const user = await userGuard()
  try {
    const cartItemId = formData.get('id') as string
    const cart = await getOrCreateCart({
      userId: user.id,
      errorOnGetFailure: true,
    })

    await deleteCartItem(cartItemId, cart.id)

    await updateCart(cart)
    const cookieStore = await cookies()
    cookieStore.set('toast', 'Item removed from cart')
    revalidatePath('/cart')
    return { message: 'useless here cause of revalidatePath' } // useless here cause of revalidatePath and the fact that FormContainer is not rendered again
  } catch (error) {
    return renderError(error)
  }
}
