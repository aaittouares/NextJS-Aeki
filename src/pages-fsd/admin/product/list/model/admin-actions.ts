'use server'

import { revalidatePath } from 'next/cache'
import { deleteImage } from '@/entities/image/api/image.repository'
import { getAdminUser, renderError } from '@/shared/lib/helpers'
import {
  deleteProduct,
  fetchAllProducts,
} from '@/entities/product/api/product.prisma.repository'
import { cookies } from 'next/headers'

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

    const cookieStore = await cookies()
    cookieStore.set('toast', 'product deleted')
    revalidatePath('/admin/products')
    return { itemId: '', message: 'useless here cause of revalidate' }
  } catch (err) {
    const error = await renderError(err)

    return { itemId: '', message: error.message }
  }
}
