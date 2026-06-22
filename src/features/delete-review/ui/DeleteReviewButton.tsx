import { deleteReviewAction } from '../model/actions'
import DeleteActionButton from '@/shared/ui/DeleteActionButton'

const DeleteReview = ({ reviewId }: { reviewId: string }) => {
  return (
    <DeleteActionButton
      itemId={reviewId}
      deleteItemAction={deleteReviewAction}
    />
  )
}

export default DeleteReview
