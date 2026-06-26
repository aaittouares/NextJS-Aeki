'use server'

import { revalidatePath } from 'next/cache'
import { deleteImage } from '@/entities/image/api/image.repository'
import { renderError } from '@/shared/lib/render-error'
import {
  deleteProduct,
  fetchAllProducts,
} from '@/entities/product/api/product.prisma.repository'
import { cookies } from 'next/headers'
import { adminGuard } from '@/shared/lib/guards'

export const getAdminProductsAction = async () => {
  await adminGuard()

  return await fetchAllProducts()
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
