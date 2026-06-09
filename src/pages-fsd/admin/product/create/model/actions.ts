'use server'

import prisma from '@/shared/lib/prisma/prisma.provider'
import { FormResponse } from '@/shared/api/action-function.type'
import { validateWithZodSchema } from '@/shared/lib/validate-with-zod-schema'
import { imageSchema } from '@/shared/model/image.schema'
import { productSchema } from '@/entities/product/model/product.schema'
import { getAuthUser, renderError } from './helpers'
import { uploadImage } from '@/shared/lib/supabase-bucket/bucket-client'

export const createProductAction = async (
  prevState: FormResponse,
  formData: FormData,
): Promise<{ message: string }> => {
  const user = await getAuthUser()

  try {
    const rawData = Object.fromEntries(formData)
    const file = formData.get('image') as File
    const validatedFields = validateWithZodSchema(productSchema, rawData)

    const validatedFile = validateWithZodSchema(imageSchema, { image: file })

    const fullPath = await uploadImage(validatedFile.image)

    await prisma.product.create({
      data: {
        ...validatedFields,
        image: fullPath!,
        clerkId: user.id,
      },
    })
    return { message: 'product created' }
  } catch (error) {
    return await renderError(error)
  }
}
