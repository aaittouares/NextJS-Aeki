'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import FormContainer from '@/shared/ui/form/FormContainer'
import SubmitButton from '@/shared/ui/form/SubmitButton'
import {
  removeCartItemAction,
  updateCartItemAction,
} from '../actions/cart.actions'
import SelectProductAmount, { Mode } from './SelectProductAmount'

function ThirdColumn({ quantity, id }: { quantity: number; id: string }) {
  const [amount, setAmount] = useState(quantity)

  const [isLoading, setIsLoading] = useState(false)

  const handleAmountChange = async (value: number) => {
    setIsLoading(true)
    toast('Calculating...')
    const result = await updateCartItemAction({
      amount: value,
      cartItemId: id,
    })
    setAmount(value)
    toast(result.message)
    setIsLoading(false)
  }

  return (
    <div className="md:ml-8">
      <SelectProductAmount
        amount={amount}
        setAmount={handleAmountChange}
        mode={Mode.CartItem}
        isLoading={isLoading}
      />
      <FormContainer action={removeCartItemAction}>
        <input type="hidden" name="id" value={id} />
        <SubmitButton size="sm" className="mt-4" text="remove" />
      </FormContainer>
    </div>
  )
}
export default ThirdColumn
