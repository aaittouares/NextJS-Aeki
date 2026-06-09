'use server'

import prisma from '@/shared/lib/prisma/prisma.provider'

export const fetchProductsBySearch = async ({
  search = '',
}: {
  search: string
}) => {
  return prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { company: { contains: search, mode: 'insensitive' } },
      ],
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}
