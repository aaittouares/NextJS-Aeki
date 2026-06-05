import { Button } from '@/shared/ui/shadcn/button'
import Link from 'next/link'
import { LuShoppingCart } from 'react-icons/lu'

function CartButton() {
  // temp
  const numItemsInCart = 9
  return (
    <Button
      nativeButton={false}
      render={<Link href="/cart" />}
      variant="outline"
      size="icon"
      className="flex justify-center items-center relative"
    >
      <LuShoppingCart />
      <span className="absolute -top-3 -right-3 bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
        {numItemsInCart}
      </span>
    </Button>
  )
}

export default CartButton
