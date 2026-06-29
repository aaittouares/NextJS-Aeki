import { deleteProductAction } from '../actions/product-admin-actions'

import DeleteActionButton from '@/shared/ui/DeleteActionButton'

export default function DeleteProduct({ productId }: { productId: string }) {
  return (
    <DeleteActionButton
      itemId={productId}
      deleteItemAction={deleteProductAction}
    />
  )
}
