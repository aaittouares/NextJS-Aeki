'use server'

import prisma from '@/shared/api/prisma/prisma.provider'
import { getAuthUser, renderError } from '@/shared/lib/helpers'
import { revalidatePath } from 'next/cache'

export const deleteReviewAction = async (prevState: {
  itemId: string
  message: string
}) => {
  const { itemId } = prevState
  const user = await getAuthUser()

  try {
    await prisma.review.delete({
      where: {
        id: itemId,
        clerkId: user.id,
      },
    })

    revalidatePath('/reviews')
    return { itemId: '', message: 'Review deleted successfully' }
  } catch (err) {
    const error = await renderError(err)

    return { itemId: '', message: error.message }
  }
}
