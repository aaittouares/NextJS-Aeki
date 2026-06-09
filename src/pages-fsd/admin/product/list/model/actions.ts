'use server'

import prisma from '@/shared/lib/prisma/prisma.provider'
import { getAdminUser } from '@/shared/model/helpers'

export const fetchAdminProducts = async () => {
  await getAdminUser()
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
  return products
}
