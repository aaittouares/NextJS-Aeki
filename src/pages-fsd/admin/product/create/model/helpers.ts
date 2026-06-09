'use server'

import { auth, currentUser } from '@clerk/nextjs/server'

export const renderError = async (
  error: unknown,
): Promise<{ message: string }> => {
  console.log(error)
  return {
    message: error instanceof Error ? error.message : 'An error occurred',
  }
}

export const getAuthUser = async () => {
  const user = await currentUser()
  if (!user) {
    throw new Error('You must be logged in to access this route')
  }
  return user
}
