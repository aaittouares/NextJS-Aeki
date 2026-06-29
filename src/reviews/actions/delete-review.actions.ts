'use server'

import { deleteReviewByIdAndUser } from '@/reviews/infrastructure/review.prisma.repository'
import { userGuard } from '@/shared/lib/guards'
import { renderError } from '@/shared/lib/render-error'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const deleteReviewAction = async (prevState: {
  itemId: string
  message: string
}) => {
  const { itemId } = prevState
  const user = await userGuard()

  try {
    await deleteReviewByIdAndUser(itemId, user.id)

    const cookieStore = await cookies()
    cookieStore.set('toast', 'Review deleted successfully')

    revalidatePath('/reviews')
    return { itemId: '', message: 'Useless Here cause of revalidatepath' }
  } catch (err) {
    const error = await renderError(err)

    return { itemId: '', message: error.message }
  }
}
