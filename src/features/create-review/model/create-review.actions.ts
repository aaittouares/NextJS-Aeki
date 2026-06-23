'use server'

import { createReview } from '@/entities/review/api/review.prisma.repository'
import { reviewSchema } from '@/entities/review/model/review.schema'
import { getAuthUser, renderError } from '@/shared/lib/helpers'
import { validateWithZodSchema } from '@/shared/lib/validate-with-zod-schema'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const createReviewAction = async (
  prevState: any,
  formData: FormData,
) => {
  const user = await getAuthUser()
  try {
    const rawData = Object.fromEntries(formData)

    const validatedFields = validateWithZodSchema(reviewSchema, rawData)

    await createReview({
      ...validatedFields,
      clerkId: user.id,
    })

    const cookie = await cookies()

    cookie.set('toast', 'Review submitted successfully')
    revalidatePath(`/products/${validatedFields.productId}`)

    return { message: 'useless here cause of revalidatePath' } // useless here cause of revalidatePath and the fact that FormContainer is not rendered again
  } catch (error) {
    return renderError(error)
  }
}
