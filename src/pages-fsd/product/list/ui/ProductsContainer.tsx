import { Button } from '@/shared/ui/shadcn/button'
import { Separator } from '@/shared/ui/shadcn/separator'
import { fetchProductsBySearch } from '@/entities/product/api/product.prisma.repository'
import ProductsGrid from '@/widgets/products-grid/ui/ProductsGrid'
import Link from 'next/link'
import { LuLayoutGrid, LuList } from 'react-icons/lu'
import ProductsList from './ProductsList'

async function ProductsContainer({
  layout,
  search,
}: {
  layout: string
  search: string
}) {
  const products = await fetchProductsBySearch({ search })
  const totalProducts = products.length
  const searchTerm = search ? `&search=${search}` : ''
  return (
    <>
      {/* HEADER */}
      <section>
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-lg">
            {totalProducts} product{totalProducts > 1 && 's'}
          </h4>
          <div className="flex gap-x-4">
            <Button
              variant={layout === 'grid' ? 'default' : 'ghost'}
              size="icon"
              render={
                <Link href={`/products?layout=grid${searchTerm}`}>
                  <LuLayoutGrid />
                </Link>
              }
              nativeButton={false}
            ></Button>
            <Button
              variant={layout === 'list' ? 'default' : 'ghost'}
              size="icon"
              render={
                <Link href={`/products?layout=list${searchTerm}`}>
                  <LuList />
                </Link>
              }
              nativeButton={false}
            ></Button>
          </div>
        </div>
        <Separator className="mt-4" />
      </section>
      {/* PRODUCTS */}
      <div className="lg:w-192">
        {totalProducts === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, no products matched your search...
          </h5>
        ) : layout === 'grid' ? (
          <ProductsGrid products={products} />
        ) : (
          <ProductsList products={products} />
        )}
      </div>
    </>
  )
}
export default ProductsContainer
