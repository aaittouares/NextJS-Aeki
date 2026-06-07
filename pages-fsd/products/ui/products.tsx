import ProductsContainer from './ProductsContainer'

export async function ProductsPage({
  searchParams,
}: {
  searchParams: { layout?: string; search?: string }
}) {
  const { layout, search } = await searchParams

  return (
    <>
      <ProductsContainer layout={layout || 'grid'} search={search || ''} />
    </>
  )
}
