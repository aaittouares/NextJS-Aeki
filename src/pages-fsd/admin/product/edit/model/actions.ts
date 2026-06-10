'use server'

import {
  fetchSingleProduct,
  updateProduct,
} from '@/entities/product/api/product.prisma.repository'
import { productSchema } from '@/entities/product/model/product.schema'
import { getAdminUser, renderError } from '@/shared/lib/helpers'
import { validateWithZodSchema } from '@/shared/lib/validate-with-zod-schema'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const getAdminSingleProductAction = async (productId: string) => {
  await getAdminUser()

  const product = await fetchSingleProduct(productId)

  if (!product) redirect('/admin/products')
  return product
}

export const updateProductAction = async (
  prevState: any,
  formData: FormData,
) => {
  await getAdminUser()
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
  return { message: 'Product Image updated successfully' }
}
