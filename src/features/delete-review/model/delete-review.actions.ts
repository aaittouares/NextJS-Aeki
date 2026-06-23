'use server'

import { deleteReviewByIdAndUser } from '@/entities/review/api/review.prisma.repository'

import { getAuthUser, renderError } from '@/shared/lib/helpers'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export const deleteReviewAction = async (prevState: {
  itemId: string
  message: string
}) => {
  const { itemId } = prevState
  const user = await getAuthUser()

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
