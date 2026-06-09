'use server'

import { FormResponse } from '@/shared/types/action-function'
import { getAuthUser, renderError } from './helpers'
import prisma from '@/shared/lib/prisma/prisma.provider'
import { productSchema } from '@/entities/product/model/product.schema'

export const createProductAction = async (
  prevState: FormResponse,
  formData: FormData,
): Promise<{ message: string }> => {
  const user = await getAuthUser()

  try {
    const rawData = Object.fromEntries(formData)
    const validatedFields = productSchema.parse(rawData)

    await prisma.product.create({
      data: {
        ...validatedFields,
        image: '/images/hero2.jpg',
        clerkId: user.id,
      },
    })
    return { message: 'product created' }
  } catch (error) {
    return await renderError(error)
  }
}
