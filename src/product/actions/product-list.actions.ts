'use server'

import { fetchProductsBySearch } from '../infrastructure/product.prisma.repository'

export const getProductsBySearch = async (search: string) => {
  const products = await fetchProductsBySearch({ search })

  return products
}
