import Link from 'next/link'
import { LuPen } from 'react-icons/lu'
import { Button } from '@/shared/ui/shadcn/button'
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/shared/ui/shadcn/table'
import { formatCurrency } from '@/shared/lib/format-currency'
import EmptyList from '@/shared/ui/EmptyList'
import CookieToastListener from '@/shared/ui/CookieToastListener'

import { getAdminProductsAction } from '../../actions/product-admin-actions'
import DeleteProduct from '../../components/DeleteProduct'

export async function AdminProductsPage() {
  const items = await getAdminProductsAction()
  if (items.length === 0)
    return (
      <>
        <EmptyList />
        <CookieToastListener />
      </>
    )
  return (
    <section>
      <Table>
        <TableCaption className="capitalize">
          total products : {items.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const { id: productId, name, company, price } = item
            return (
              <TableRow key={productId}>
                <TableCell>
                  <Link
                    href={`/products/${productId}`}
                    className="underline text-muted-foreground tracking-wide capitalize"
                  >
                    {name}
                  </Link>
                </TableCell>
                <TableCell>{company}</TableCell>
                <TableCell>{formatCurrency(price)}</TableCell>

                <TableCell className="flex items-center gap-x-2">
                  <Link href={`/admin/products/${productId}/edit`}>
                    <Button
                      size="icon"
                      variant="link"
                      className="p-2 cursor-pointer"
                    >
                      <LuPen />
                    </Button>
                  </Link>
                  <DeleteProduct productId={productId} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <CookieToastListener />
    </section>
  )
}
