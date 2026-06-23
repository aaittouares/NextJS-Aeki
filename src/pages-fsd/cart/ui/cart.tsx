import {
  getCartItems,
  getOrCreateCart,
} from '@/features/cart/model/cart.actions'
import SectionTitle from '@/shared/ui/SectionTitle'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import CartItemsList from './CartItemsList'
import CartTotals from './CartTotals'

export async function CartPage() {
  const { userId } = await auth()
  if (!userId) redirect('/')
  const cart = await getOrCreateCart({ userId })
  const cartItems = await getCartItems(cart.id)

  if (cartItems.length === 0) {
    return <SectionTitle text="Empty cart" />
  }
  return (
    <>
      <SectionTitle text="Shopping Cart" />
      <div className="mt-8 grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList cartItems={cartItems} />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals cart={cart} />
        </div>
      </div>
    </>
  )
}
