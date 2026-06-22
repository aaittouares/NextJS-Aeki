'use client'

import FormContainer from '@/shared/ui/form/FormContainer'
import SubmitButton from '@/shared/ui/form/SubmitButton'
import { SignInButton, useAuth } from '@clerk/nextjs'
import { useState } from 'react'
import SelectProductAmount, { Mode } from './SelectProductAmount'
import { Button } from '@/shared/ui/shadcn/button'
import { addToCartAction } from '../model/cart.actions'

function AddToCart({ productId }: { productId: string }) {
  const [amount, setAmount] = useState(1)
  const { userId } = useAuth()
  return (
    <div className="mt-4">
      <SelectProductAmount
        mode={Mode.SingleProduct}
        amount={amount}
        setAmount={setAmount}
      />
      {userId ? (
        <FormContainer action={addToCartAction}>
          <input type="hidden" name="productId" value={productId} />
          <input type="hidden" name="amount" value={amount} />
          <SubmitButton text="add to cart" size="default" className="mt-8" />
        </FormContainer>
      ) : (
        <SignInButton mode="modal">
          <Button type="button" size="default" className="mt-8">
            Please Sign In
          </Button>
        </SignInButton>
      )}
    </div>
  )
}
export default AddToCart
