'use server'

import { redirect } from 'next/navigation'
import { FormResponse } from '@/shared/api/action-function.type'
import { validateWithZodSchema } from '@/shared/lib/validate-with-zod-schema'
import { getAuthUser, renderError } from '@/shared/lib/helpers'
import { uploadImage } from '@/entities/image/api/image.repository'
import { productSchema } from '@/entities/product/model/product.schema'
import { createProduct } from '@/entities/product/api/product.prisma.repository'
import { imageSchema } from '@/entities/image/model/image.schema'

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

    await createProduct({
      ...validatedFields,
      image: fullPath!,
      clerkId: user.id,
    })
  } catch (error) {
    return await renderError(error)
  }
  redirect('/admin/products')
}
