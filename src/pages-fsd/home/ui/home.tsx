import { Suspense } from 'react'
import Hero from './Hero'
import { LoadingProductsContainer, FeaturedProducts } from '@/products'

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
