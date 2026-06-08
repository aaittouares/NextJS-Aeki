import { SingleProductPage } from '@/pages-fsd/product/detail'

export async function singleProduct({
  params,
}: {
  params: Promise<{ productId: string }>
}) {
  return <SingleProductPage params={params} />
}

export default singleProduct
