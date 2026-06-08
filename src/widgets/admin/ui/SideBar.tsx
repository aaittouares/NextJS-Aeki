'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/shared/ui/shadcn/button'
import { adminLinks } from '@/shared/config/links'

function Sidebar() {
  const pathname = usePathname()

  return (
    <aside>
      {adminLinks.map((link) => {
        const isActivePage = pathname === link.href
        const variant = isActivePage ? 'default' : 'ghost'
        return (
          <Button
            className="w-full mb-2 capitalize font-normal justify-start"
            key={link.href}
            variant={variant}
            render={<Link href={link.href} />}
            nativeButton={false}
          >
            {link.label}
          </Button>
        )
      })}
    </aside>
  )
}
export default Sidebar
