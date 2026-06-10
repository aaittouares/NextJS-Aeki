'use server'

import prisma from '@/shared/api/prisma/prisma.provider'

export const fetchAllProducts = async () => {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
  return products
}

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

export const fetchSingleProduct = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  })
  return product
}

export type createProductRequest = {
  name: string
  company: string
  description: string
  featured: boolean
  image: string
  price: number
  clerkId: string
}

export const createProduct = async (data: createProductRequest) => {
  await prisma.product.create({
    data: {
      ...data,
    },
  })
}

export const deleteProduct = async (productId: string) => {
  const product = await prisma.product.delete({
    where: {
      id: productId,
    },
  })

  return product
}
