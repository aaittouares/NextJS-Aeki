'use client'

import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { ActionFunction } from '@/shared/api/action-function.type'

const initialState = {
  message: '',
}

function FormContainer({
  action,
  children,
}: {
  action: ActionFunction
  children: React.ReactNode
}) {
  const [state, formAction] = useActionState(action, initialState)
  useEffect(() => {
    if (state.message) {
      toast(state.message)
    }
  }, [state])
  return <form action={formAction}>{children}</form>
}
export default FormContainer
