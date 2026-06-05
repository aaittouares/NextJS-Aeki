import { Button } from '@/shared/shadcn/ui/button'
import Link from 'next/link'
import { VscCode } from 'react-icons/vsc'

function Logo() {
  return (
    <Button size="icon" nativeButton={false} render={<Link href="/" />}>
      <VscCode className="w-6 h-6" />
    </Button>
  )
}

export default Logo
