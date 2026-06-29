import { auth } from '@clerk/nextjs/server'
import { SignInButton } from '@clerk/nextjs'
import { FaRegHeart } from 'react-icons/fa'
import { Button } from '@/shared/ui/shadcn/button'
import { findFavoriteId } from '../actions/add-favorite.actions'
import FavoriteToggleButton from './FavoriteToggleButton'

async function FavoriteToggleContainer({ productId }: { productId: string }) {
  const { userId } = await auth()
  if (!userId)
    return (
      <SignInButton mode="modal">
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="p-2 cursor-pointer"
          nativeButton={false}
          render={<FaRegHeart />}
        ></Button>
      </SignInButton>
    )
  const favoriteId = await findFavoriteId({ productId })

  return <FavoriteToggleButton favoriteId={favoriteId} productId={productId} />
}

export default FavoriteToggleContainer
