'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { adminGuard, userGuard } from '@/shared/lib/guards'
import { renderError } from '@/shared/lib/render-error'
import { deleteCart, findCartByUser } from '@/cart'
import {
  createOrder,
  fetchAllPaidOrders,
  fetchUserOrders,
} from '../infrastructure/order.prisma.repository'

export const createOrderAction = async (prevState: any, formData: FormData) => {
  const user = await userGuard()
  try {
    const cart = await findCartByUser(user.id)

    if (!cart) {
      throw new Error('Cart not found')
    }

    await createOrder({
      clerkId: user.id,
      numberOfProducts: cart.numItemsInCart,
      orderTotal: cart.orderTotal,
      tax: cart.tax,
      shipping: cart.shipping,
      email: user.emailAddresses[0].emailAddress,
    })

    await deleteCart(cart.id)
  } catch (error) {
    return renderError(error)
  }
  revalidatePath('/orders') // revalidate so the "mini cart" number refresh to zero
  redirect('/orders')
}

export const getUserOrders = async () => {
  const user = await userGuard()
  const orders = await fetchUserOrders(user.id)
  return orders
}

export const getAdminOrders = async () => {
  await adminGuard()

  const orders = await fetchAllPaidOrders()
  return orders
}
