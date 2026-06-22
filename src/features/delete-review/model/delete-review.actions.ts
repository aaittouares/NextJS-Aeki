'use server'

import { deleteReviewByIdAndUser } from '@/entities/review/api/review.prisma.repository'

import { getAuthUser, renderError } from '@/shared/lib/helpers'
import { revalidatePath } from 'next/cache'

export const deleteReviewAction = async (prevState: {
  itemId: string
  message: string
}) => {
  const { itemId } = prevState
  const user = await getAuthUser()

  try {
    await deleteReviewByIdAndUser(itemId, user.id)

    revalidatePath('/reviews')
    return { itemId: '', message: 'Review deleted successfully' }
  } catch (err) {
    const error = await renderError(err)

    return { itemId: '', message: error.message }
  }
}
