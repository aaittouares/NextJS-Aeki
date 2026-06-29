import SectionTitle from '@/shared/ui/SectionTitle'
import { ProductsGrid } from '@/products'
import { getUserFavorites } from '../actions/favorites.actions'

export async function FavoritesPage() {
  const favorites = await getUserFavorites()
  if (favorites.length === 0)
    return <SectionTitle text="You have no favorites yet." />
  return (
    <div>
      <SectionTitle text="Favorites" />
      <ProductsGrid products={favorites.map((favorite) => favorite.product)} />
    </div>
  )
}
