'use server'

import { uploadImage, deleteImage } from '@/entities/image/api/image.repository'
import { imageSchema } from '@/entities/image/model/image.schema'
import {
  fetchSingleProduct,
  updateProduct,
  updateProductImageUrl,
} from '@/entities/product/api/product.prisma.repository'
import { productSchema } from '@/entities/product/model/product.schema'
import { adminGuard } from '@/shared/lib/guards'
import { renderError } from '@/shared/lib/render-error'
import { validateWithZodSchema } from '@/shared/lib/validate-with-zod-schema'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const getAdminSingleProductAction = async (productId: string) => {
  await adminGuard()

  const product = await fetchSingleProduct(productId)

  if (!product) redirect('/admin/products')
  return product
}

export const updateProductAction = async (
  prevState: any,
  formData: FormData,
) => {
  await adminGuard()
  try {
    const productId = formData.get('id') as string
    const rawData = Object.fromEntries(formData)

    const validatedFields = validateWithZodSchema(productSchema, rawData)

    await updateProduct(productId, { ...validatedFields })

    revalidatePath(`/admin/products/${productId}/edit`)
    return { message: 'Product updated successfully' }
  } catch (error) {
    return renderError(error)
  }
}

export const updateProductImageAction = async (
  prevState: any,
  formData: FormData,
) => {
  await adminGuard()
  try {
    const image = formData.get('image') as File
    const productId = formData.get('id') as string
    const oldImageUrl = formData.get('url') as string

    const validatedFile = validateWithZodSchema(imageSchema, { image })
    const fullPath = await uploadImage(validatedFile.image)
    await deleteImage(oldImageUrl)

    await updateProductImageUrl(productId, fullPath!)

    revalidatePath(`/admin/products/${productId}/edit`)
    return { message: 'Product Image updated successfully' }
  } catch (error) {
    return renderError(error)
  }
}
