import EmptyList from '@/shared/ui/EmptyList'
import SectionTitle from '@/shared/ui/SectionTitle'
import ProductsGrid from '../widgets/ProductsGrid'
import { getFeaturedProducts } from '../actions/product-featured.actions'

async function FeaturedProducts() {
  const products = await getFeaturedProducts()
  if (products.length === 0)
    return (
      <section className="pt-24">
        <SectionTitle text="featured products" />
        <EmptyList />
      </section>
    )
  return (
    <section className="pt-24">
      <SectionTitle text="featured products" />
      <ProductsGrid products={products} />
    </section>
  )
}
export default FeaturedProducts
