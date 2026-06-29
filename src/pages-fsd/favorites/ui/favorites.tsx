import SectionTitle from '@/shared/ui/SectionTitle'
import { ProductsGrid } from '@/product'
import { fetchUserFavorites } from '../model/favorites.actions'

export async function FavoritesPage() {
  const favorites = await fetchUserFavorites()
  if (favorites.length === 0)
    return <SectionTitle text="You have no favorites yet." />
  return (
    <div>
      <SectionTitle text="Favorites" />
      <ProductsGrid products={favorites.map((favorite) => favorite.product)} />
    </div>
  )
}
