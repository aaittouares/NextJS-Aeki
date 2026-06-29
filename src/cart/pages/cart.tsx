import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import SectionTitle from '@/shared/ui/SectionTitle'
import CookieToastListener from '@/shared/ui/CookieToastListener'
import { getCartItems, getOrCreateCart } from '../actions/cart.actions'
import CartItemsList from '../components/CartItemsList'
import CartTotals from '../components/CartTotals'

export async function CartPage() {
  const { userId } = await auth()
  if (!userId) redirect('/')
  const cart = await getOrCreateCart({ userId })
  const cartItems = await getCartItems(cart.id)

  if (cartItems.length === 0) {
    return (
      <>
        <SectionTitle text="Empty cart" />
        <CookieToastListener />
      </>
    )
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
      <CookieToastListener />
    </>
  )
}
