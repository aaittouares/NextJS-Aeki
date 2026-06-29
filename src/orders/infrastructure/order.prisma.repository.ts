'use server'

import prisma from '@/shared/api/prisma/prisma.provider'

export const createOrder = async (data: {
  clerkId: string
  numberOfProducts: number
  orderTotal: number
  tax: number
  shipping: number
  email: string
}) => {
  await prisma.order.create({
    data,
  })
}

export const fetchUserOrders = async (userId: string) => {
  const orders = await prisma.order.findMany({
    where: {
      clerkId: userId,
      isPaid: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return orders
}

export const fetchAllPaidOrders = async () => {
  const orders = await prisma.order.findMany({
    where: {
      isPaid: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return orders
}
