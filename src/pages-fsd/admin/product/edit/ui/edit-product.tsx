import CheckboxInput from '@/shared/ui/form/CheckBoxInput'
import FormContainer from '@/shared/ui/form/FormContainer'
import FormInput from '@/shared/ui/form/FormInput'
import PriceInput from '@/shared/ui/form/PriceInput'
import SubmitButton from '@/shared/ui/form/SubmitButton'
import TextAreaInput from '@/shared/ui/form/TextAreaInput'
import {
  getAdminSingleProductAction,
  updateProductAction,
  updateProductImageAction,
} from '../model/edit-product.actions'
import ImageInputContainer from '@/entities/image/ui/UpdateImageContainer'

export async function EditProductPage({
  params,
}: {
  params: Promise<{ productId: string }>
}) {
  const { productId } = await params
  const product = await getAdminSingleProductAction(productId)
  const { name, company, description, featured, price } = product
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">update product</h1>
      <div className="border p-8 rounded-md">
        {/* Image Input Container */}
        <ImageInputContainer
          action={updateProductImageAction}
          name={name}
          image={product.image}
          text="update image"
        >
          <input type="hidden" name="id" value={productId} />
          <input type="hidden" name="url" value={product.image} />
        </ImageInputContainer>
        <FormContainer action={updateProductAction}>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <input type="hidden" name="id" value={productId} />
            <FormInput
              type="text"
              name="name"
              label="product name"
              defaultValue={name}
            />
            <FormInput
              type="text"
              name="company"
              label="company"
              defaultValue={company}
            />

            <PriceInput defaultValue={price} />
          </div>
          <TextAreaInput
            name="description"
            labelText="product description"
            defaultValue={description}
          />
          <div className="mt-6">
            <CheckboxInput
              name="featured"
              label="featured"
              checked={featured}
            />
          </div>
          <SubmitButton text="update product" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  )
}
