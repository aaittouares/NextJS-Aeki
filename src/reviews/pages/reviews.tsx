import SectionTitle from '@/shared/ui/SectionTitle'
import CookieToastListener from '@/shared/ui/CookieToastListener'
import { getUserReviews } from '../actions/reviews.actions'
import ReviewCard from '../components/ReviewCard'
import DeleteReview from '../components/DeleteReviewButton'

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
