import { ZodType } from 'zod'

export function validateWithZodSchema<T>(schema: ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data)
  if (!result.success) {
    const errors = result.error.issues.map((issue) => issue.message)
    throw new Error(errors.join(' '))
  }
  return result.data
}
