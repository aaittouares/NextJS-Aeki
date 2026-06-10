'use client'

import { startTransition, useActionState, useEffect } from 'react'
import { deleteProductAction } from '../model/actions'
import { toast } from 'sonner'
import { LuTrash2 } from 'react-icons/lu'
import { Button } from '@/shared/ui/shadcn/button'
import { ReloadIcon } from '@radix-ui/react-icons'

export default function DeleteProduct({ productId }: { productId: string }) {
  const [state, deleteAction, isPending] = useActionState(deleteProductAction, {
    productId,
    message: '',
  })

  useEffect(() => {
    if (state.message) {
      toast(state.message)
    }
  }, [state])

  return (
    <Button
      size="icon"
      variant="link"
      className="p-2 cursor-pointer"
      onClick={() => {
        startTransition(() => deleteAction())
      }}
    >
      {isPending ? <ReloadIcon className=" animate-spin" /> : <LuTrash2 />}
    </Button>
  )
}
