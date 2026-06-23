'use client'

import { startTransition, useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { Button } from './shadcn/button'
import { ReloadIcon } from '@radix-ui/react-icons'
import { LuTrash2 } from 'react-icons/lu'

type DeleteItemAction = (prevState: {
  itemId: string
  message: string
}) => Promise<{
  itemId: string
  message: string
}>

export default function DeleteActionButton({
  itemId,
  deleteItemAction,
}: {
  itemId: string
  deleteItemAction: DeleteItemAction
}) {
  const [state, deleteAction, isPending] = useActionState(deleteItemAction, {
    itemId,
    message: '',
  })

  return (
    <Button
      type="submit"
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
