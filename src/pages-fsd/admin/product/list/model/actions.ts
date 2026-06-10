'use server'

import prisma from '@/shared/lib/prisma/prisma.provider'
import { deleteImage } from '@/shared/api/supabase-bucket/bucket-client'
import { getAdminUser, renderError } from '@/shared/model/helpers'
import { revalidatePath } from 'next/cache'

export const fetchAdminProducts = async () => {
  await getAdminUser()
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
  return products
}

export const deleteProductAction = async (prevState: {
  productId: string
  message: string
}) => {
  const { productId } = prevState
  getAdminUser()

  try {
    const product = await prisma.product.delete({
      where: {
        id: productId,
      },
    })

    await deleteImage(product.image)

    revalidatePath('/admin/products')
    return { productId: '', message: 'product deleted' }
  } catch (err) {
    const error = await renderError(err)

    return { productId: '', message: error.message }
  }
}
