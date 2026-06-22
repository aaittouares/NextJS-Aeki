'use server'

import { reviewSchema } from '@/entities/review/model/review.schema'
import prisma from '@/shared/api/prisma/prisma.provider'
import { getAuthUser, renderError } from '@/shared/lib/helpers'
import { validateWithZodSchema } from '@/shared/lib/validate-with-zod-schema'
import { revalidatePath } from 'next/cache'

export const createReviewAction = async (
  prevState: any,
  formData: FormData,
) => {
  const user = await getAuthUser()
  try {
    const rawData = Object.fromEntries(formData)

    const validatedFields = validateWithZodSchema(reviewSchema, rawData)

    await prisma.review.create({
      data: {
        ...validatedFields,
        clerkId: user.id,
      },
    })
    revalidatePath(`/products/${validatedFields.productId}`)
    return { message: 'Review submitted successfully' }
  } catch (error) {
    return renderError(error)
  }
}
