'use server'

import { revalidatePath } from 'next/cache'
import { deleteImage } from '@/entities/image/api/image.repository'
import { getAdminUser, renderError } from '@/shared/lib/helpers'
import {
  deleteProduct,
  fetchAllProducts,
} from '@/entities/product/api/product.prisma.repository'

export const getAdminProductsAction = async () => {
  await getAdminUser()

  return await fetchAllProducts()
}

export const deleteProductAction = async (prevState: {
  itemId: string
  message: string
}) => {
  const { itemId } = prevState
  getAdminUser()

  try {
    const product = await deleteProduct(itemId)

    await deleteImage(product.image)

    revalidatePath('/admin/products')
    return { itemId: '', message: 'product deleted' }
  } catch (err) {
    const error = await renderError(err)

    return { itemId: '', message: error.message }
  }
}
