'use client'

import FormContainer from '@/shared/ui/form/FormContainer'
import { Button } from '@/shared/ui/shadcn/button'
import { Card } from '@/shared/ui/shadcn/card'
import RatingInput from './RatingInput'
import TextAreaInput from '@/shared/ui/form/TextAreaInput'
import SubmitButton from '@/shared/ui/form/SubmitButton'
import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { createReviewAction } from '../model/actions'

function SubmitReview({ productId }: { productId: string }) {
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false)
  const { user } = useUser()
  return (
    <div>
      <Button
        size="lg"
        className="capitalize"
        onClick={() => setIsReviewFormVisible((prev) => !prev)}
      >
        leave review
      </Button>
      {isReviewFormVisible && (
        <Card className="p-8 mt-8">
          <FormContainer action={createReviewAction}>
            <input type="hidden" name="productId" value={productId} />
            <input
              type="hidden"
              name="authorName"
              value={user?.firstName || 'user'}
            />
            <input
              type="hidden"
              name="authorImageUrl"
              value={user?.imageUrl || ''}
            />
            <RatingInput name="rating" />
            <TextAreaInput
              name="comment"
              labelText="feedback"
              defaultValue="Outstanding product!!!"
            />
            <SubmitButton className="mt-4" />
          </FormContainer>
        </Card>
      )}
    </div>
  )
}

export default SubmitReview
