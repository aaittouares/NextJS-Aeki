import ProductsContainer from './ProductsContainer'

export async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ layout?: string; search?: string }>
}) {
  // need to await because searchParams is a Promise in Nextjs
  // see https://nextjs.org/docs/messages/sync-dynamic-apis
  const { layout, search } = await searchParams

  return (
    <>
      <ProductsContainer layout={layout || 'grid'} search={search || ''} />
    </>
  )
}
