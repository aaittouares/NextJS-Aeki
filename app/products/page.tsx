import { ProductsPage } from '@/pages-fsd/products'

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{ layout?: string; search?: string }>
}) {
  return <ProductsPage searchParams={searchParams} />
}
