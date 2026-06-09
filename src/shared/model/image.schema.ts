import { z } from 'zod'

export const imageSchema = z.object({
  image: validateImageFile(),
})

function validateImageFile() {
  const maxUploadSize = 1024 * 1024
  const acceptedFileTypes = ['image/']
  return z
    .instanceof(File)
    .refine((file) => {
      return !file || file.size <= maxUploadSize
    }, `File size must be less than 1 MB`)
    .refine((file) => {
      return (
        !file || acceptedFileTypes.some((type) => file.type.startsWith(type))
      )
    }, 'File must be an image')
}
