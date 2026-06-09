'use server'

import { FormResponse } from '@/shared/types/action-function'

export const createProductAction = async (
  prevState: FormResponse,
  formData: FormData,
): Promise<{ message: string }> => {
  return { message: 'product created' }
}
