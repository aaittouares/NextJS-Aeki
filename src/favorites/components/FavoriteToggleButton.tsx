'use client'

import { usePathname } from 'next/navigation'
import { startTransition, useActionState, useEffect } from 'react'
import { ReloadIcon } from '@radix-ui/react-icons'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { toast } from 'sonner'
import { Button } from '@/shared/ui/shadcn/button'

import { toggleFavoriteAction } from '../actions/add-favorite.actions'

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
