export type FormResponse = {
  message: string
}

export type ActionFunction = (
  prevState: FormResponse,
  formData: FormData,
) => Promise<{ message: string }>
