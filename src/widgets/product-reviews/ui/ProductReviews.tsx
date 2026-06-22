import ReviewCard from '@/entities/review/ui/ReviewCard'
import SectionTitle from '@/shared/ui/SectionTitle'
import { fetchProductReviews } from '../model/actions'

async function ProductReviews({ productId }: { productId: string }) {
  const reviews = await fetchProductReviews(productId)

  return (
    <div className="mt-16">
      <SectionTitle text="product reviews" />

      <div className="grid md:grid-cols-2 gap-8 my-8">
        {reviews.map((review) => {
          const { comment, rating, authorImageUrl, authorName } = review
          const reviewInfo = {
            comment,
            rating,
            image: authorImageUrl,
            name: authorName,
          }
          return <ReviewCard key={review.id} reviewInfo={reviewInfo} />
        })}
      </div>
    </div>
  )
}
export default ProductReviews
