'use server'

export const renderError = async (
  error: unknown,
): Promise<{ message: string }> => {
  console.log(error)
  return {
    message: error instanceof Error ? error.message : 'An error occurred',
  }
}
