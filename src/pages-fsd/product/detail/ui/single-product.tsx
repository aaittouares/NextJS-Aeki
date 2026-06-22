import { formatCurrency } from '@/shared/lib/format-currency'
import FavoriteToggleContainer from '@/features/add-favorite/ui/FavoriteToggleContainer'
import Image from 'next/image'
import BreadCrumbs from './BreadCrumbs'
import AddToCart from '@/features/cart/ui/AddToCart'
import ProductRating from './ProductRatings'
import {
  getSingleProductAction,
  findExistingReview,
} from '../model/product-detail.actions'
import SubmitReview from '@/features/create-review/ui/SubmitReview'
import ProductReviews from '@/widgets/product-reviews/ui/ProductReviews'

import { auth } from '@clerk/nextjs/server'

export async function SingleProductPage({
  params,
}: {
  params: Promise<{ productId: string }>
}) {
  const { productId } = await params
  const product = await getSingleProductAction(productId)
  const { name, image, company, description, price } = product
  const dollarsAmount = formatCurrency(price)

  const { userId } = await auth()
  const reviewDoesNotExist =
    userId && !(await findExistingReview(userId, product.id))

  return (
    <section>
      <BreadCrumbs name={product.name} />
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* IMAGE FIRST COL */}
        <div className="relative h-full">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
            priority
            className="w-full rounded-md object-cover"
          />
        </div>
        {/* PRODUCT INFO SECOND COL */}
        <div>
          <div className="flex gap-x-8 items-center">
            <h1 className="capitalize text-3xl font-bold">{name}</h1>
            <FavoriteToggleContainer productId={productId} />
          </div>
          <ProductRating productId={productId} />
          <h4 className="text-xl mt-2">{company}</h4>
          <p className="mt-3 text-md bg-muted inline-block p-2 rounded-md">
            {dollarsAmount}
          </p>
          <p className="mt-6 leading-8 text-muted-foreground">{description}</p>
          <AddToCart productId={productId} />
        </div>
      </div>

      <ProductReviews productId={productId} />
      {reviewDoesNotExist && <SubmitReview productId={productId} />}
    </section>
  )
}
