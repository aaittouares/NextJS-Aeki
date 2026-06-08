import { SingleProductPage } from '@/pages-fsd/single-product'

export async function singleProduct({
  params,
}: {
  params: Promise<{ productId: string }>
}) {
  return <SingleProductPage params={params} />
}

export default singleProduct
