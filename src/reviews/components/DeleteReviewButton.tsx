import DeleteActionButton from '@/shared/ui/DeleteActionButton'
import { deleteReviewAction } from '../actions/delete-review.actions'

const DeleteReview = ({ reviewId }: { reviewId: string }) => {
  return (
    <DeleteActionButton
      itemId={reviewId}
      deleteItemAction={deleteReviewAction}
    />
  )
}

export default DeleteReview
