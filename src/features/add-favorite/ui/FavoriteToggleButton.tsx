'use client'

import { usePathname } from 'next/navigation'
import { toggleFavoriteAction } from '../model/action'
import { startTransition, useActionState, useEffect } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { Button } from '@/shared/ui/shadcn/button'
import { ReloadIcon } from '@radix-ui/react-icons'
import { toast } from 'sonner'

type FavoriteToggleFormProps = {
  productId: string
  favoriteId: string | null
}

function FavoriteToggleButton({
  productId,
  favoriteId,
}: FavoriteToggleFormProps) {
  const [state, toggleAction, isPending] = useActionState(
    toggleFavoriteAction,
    {
      productId,
      favoriteId,
      pathname: usePathname(),
      message: '',
    },
  )

  useEffect(() => {
    if (state.message) {
      toast(state.message)
    }
  }, [state])

  return (
    <Button
      size="icon"
      variant="outline"
      className=" p-2 cursor-pointer"
      onClick={() => {
        startTransition(() => toggleAction())
      }}
    >
      {isPending ? (
        <ReloadIcon className=" animate-spin" />
      ) : favoriteId ? (
        <FaHeart />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  )
}
export default FavoriteToggleButton
