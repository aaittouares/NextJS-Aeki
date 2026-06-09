'use server'

import { FormResponse } from '@/shared/types/action-function'
import { getAuthUser, renderError } from './helpers'
import prisma from '@/shared/lib/prisma/prisma.provider'

export const createProductAction = async (
  prevState: FormResponse,
  formData: FormData,
): Promise<{ message: string }> => {
  const user = await getAuthUser()

  try {
    const name = formData.get('name') as string
    const company = formData.get('company') as string
    const price = Number(formData.get('price') as string)
    const image = formData.get('image') as File
    const description = formData.get('description') as string
    const featured = Boolean(formData.get('featured') as string)

    await prisma.product.create({
      data: {
        name,
        company,
        price,
        image: '/images/hero1.jpg',
        description,
        featured,
        clerkId: user.id,
      },
    })
    return { message: 'product created' }
  } catch (error) {
    return await renderError(error)
  }
}
