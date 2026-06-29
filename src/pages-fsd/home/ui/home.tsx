import { Suspense } from 'react'
import Hero from './Hero'
import { LoadingProductsContainer, FeaturedProducts } from '@/product'

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
