'use server'

import prisma from '@/shared/api/prisma/prisma.provider'
import { FormResponse } from '@/shared/api/action-function.type'
import { validateWithZodSchema } from '@/shared/lib/validate-with-zod-schema'
import { imageSchema } from '@/shared/model/image.schema'
import { productSchema } from '@/entities/product/model/product.schema'
import { getAuthUser, renderError } from '@/shared/model/helpers'
import { uploadImage } from '@/shared/api/supabase-bucket/bucket-client'
import { redirect } from 'next/navigation'

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
  } catch (error) {
    return await renderError(error)
  }
  redirect('/admin/products')
}
