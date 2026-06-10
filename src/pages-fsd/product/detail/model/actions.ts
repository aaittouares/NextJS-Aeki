'use server'

import prisma from '@/shared/api/prisma/prisma.provider'
import { redirect } from 'next/navigation'

export const fetchSingleProduct = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  })
  if (!product) {
    redirect('/products')
  }
  return product
}
