import { Suspense } from 'react'
import FeaturedProducts from './FeaturedProducts'
import Hero from './Hero'
import LoadingProductsContainer from '@/widgets/products-grid/ui/LoadingProductsContainer'

export function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<LoadingProductsContainer />}>
        <FeaturedProducts />
      </Suspense>
    </>
  )
}
