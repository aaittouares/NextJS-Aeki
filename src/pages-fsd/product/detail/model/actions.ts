import { fetchSingleProduct } from '@/entities/product/api/product.prisma.repository'
import { redirect } from 'next/navigation'

export const getSingleProductAction = async (productId: string) => {
  const product = await fetchSingleProduct(productId)
  if (!product) {
    redirect('/products')
  }
  return product
}
