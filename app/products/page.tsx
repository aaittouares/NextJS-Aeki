import { ProductsPage } from '@/pages-fsd/product/list'

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{ layout?: string; search?: string }>
}) {
  return <ProductsPage searchParams={searchParams} />
}
