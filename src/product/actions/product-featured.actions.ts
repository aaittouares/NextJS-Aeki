'use server'

import { fetchFeaturedProducts } from '../infrastructure/product.prisma.repository'

export const getFeaturedProducts = async () => {
  const products = await fetchFeaturedProducts()

  return products
}
