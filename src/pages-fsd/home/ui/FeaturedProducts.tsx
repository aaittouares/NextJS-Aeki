import EmptyList from '@/shared/ui/EmptyList'
import SectionTitle from '@/shared/ui/SectionTitle'
import ProductsGrid from '@/widgets/products-grid/ui/ProductsGrid'
import { fetchFeaturedProducts } from '../model/home.actions'

async function FeaturedProducts() {
  const products = await fetchFeaturedProducts()
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
