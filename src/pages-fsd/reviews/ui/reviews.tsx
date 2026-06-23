import ReviewCard from '@/entities/review/ui/ReviewCard'
import DeleteReview from '@/features/delete-review/ui/DeleteReviewButton'
import SectionTitle from '@/shared/ui/SectionTitle'
import { getUserReviews } from '../model/reviews.actions'
import CookieToastListener from '@/shared/ui/CookieToastListener'

export async function ReviewsPage() {
  const reviews = await getUserReviews()
  if (reviews.length === 0)
    return <SectionTitle text="you have no reviews yet" />

  return (
    <>
      <SectionTitle text="Your Reviews" />
      <section className="grid md:grid-cols-2 gap-8 mt-4 ">
        {reviews.map((review) => {
          const { comment, rating } = review
          const { name, image } = review.product
          const reviewInfo = {
            comment,
            rating,
            name,
            image,
          }
          return (
            <ReviewCard key={review.id} reviewInfo={reviewInfo}>
              <DeleteReview reviewId={review.id} />
            </ReviewCard>
          )
        })}
      </section>
      <CookieToastListener />
    </>
  )
}
