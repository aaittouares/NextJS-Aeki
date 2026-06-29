'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { deleteImage, uploadImage } from '@/entities/image/api/image.repository'
import { imageSchema } from '@/entities/image/model/image.schema'
import { renderError } from '@/shared/lib/render-error'
import { adminGuard } from '@/shared/lib/guards'
import { FormResponse } from '@/shared/api/action-function.type'
import { validateWithZodSchema } from '@/shared/lib/validate-with-zod-schema'
import {
  createProduct,
  deleteProduct,
  fetchAllProducts,
  fetchSingleProduct,
  updateProduct,
  updateProductImageUrl,
} from '../infrastructure/product.prisma.repository'
import { productSchema } from '../validation/product.schema'

export const getAdminProductsAction = async () => {
  await adminGuard()

  return await fetchAllProducts()
}

export const getAdminSingleProductAction = async (productId: string) => {
  await adminGuard()

  const product = await fetchSingleProduct(productId)

  if (!product) redirect('/admin/products')
  return product
}

export const createProductAction = async (
  prevState: FormResponse,
  formData: FormData,
): Promise<{ message: string }> => {
  const user = await adminGuard()

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

export const deleteProductAction = async (prevState: {
  itemId: string
  message: string
}) => {
  const { itemId } = prevState
  adminGuard()

  try {
    const product = await deleteProduct(itemId)

    await deleteImage(product.image)

    const cookieStore = await cookies()
    cookieStore.set('toast', 'product deleted')
    revalidatePath('/admin/products')
    return { itemId: '', message: 'useless here cause of revalidate' }
  } catch (err) {
    const error = await renderError(err)

    return { itemId: '', message: error.message }
  }
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
