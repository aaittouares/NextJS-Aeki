import { z } from 'zod'

export const productSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(100, {
      message: 'Name must be less than 100 characters.',
    }),
  company: z.string(),
  featured: z.preprocess(
    (val) => val === 'on', // "on" → true, undefined → false
    z.boolean(),
  ),
  price: z.coerce.number().int().min(0, {
    message: 'Price must be a positive number.',
  }),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(' ').length
      return wordCount >= 10 && wordCount <= 1000
    },
    {
      message: 'Description must be between 10 and 1000 words.',
    },
  ),
})
