import { faker } from '@faker-js/faker'
import FormInput from '@/shared/ui/form/FormInput'
import PriceInput from '@/shared/ui/form/PriceInput'
import ImageInput from '@/shared/ui/form/ImageInput'
import TextAreaInput from '@/shared/ui/form/TextAreaInput'
import CheckboxInput from '@/shared/ui/form/CheckBoxInput'
import FormContainer from '@/shared/ui/form/FormContainer'
import { SubmitButton } from '@/shared/ui/form/SubmitButton'
import { createProductAction } from '../model/actions'

export function CreateProductPage() {
  const fakeName = faker.commerce.productName()
  const company = faker.company.name()
  const description = faker.lorem.paragraph({ min: 10, max: 12 })

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">create product</h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createProductAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <FormInput
              type="text"
              name="name"
              label="Product name"
              defaultValue={fakeName}
            />
            <FormInput
              type="text"
              name="company"
              label="company"
              defaultValue={company}
            />
            <PriceInput />
            <ImageInput />
          </div>
          <TextAreaInput
            name="description"
            labelText="product description"
            defaultValue={description}
          />
          <div className="mt-6">
            <CheckboxInput name="featured" label="featured" />
          </div>
          <SubmitButton text="Create Product" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  )
}
