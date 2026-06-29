import { Show, SignInButton, SignUpButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { LuAlignLeft } from 'react-icons/lu'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/shared/ui/shadcn/dropdown-menu'
import { Button } from '@/shared/ui/shadcn/button'
import { links } from '@/shared/config/links'
import UserIcon from './UserIcon'
import SignOutLink from './SignOutLink'

async function LinksDropdown() {
  const { userId } = await auth()
  const isAdmin = userId === process.env.ADMIN_USER_ID

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" className="flex gap-4 max-w-[100px]" />
        }
      >
        <LuAlignLeft className="w-6 h-6" />
        <UserIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start" sideOffset={10}>
        <Show when={'signed-out'}>
          <DropdownMenuItem>
            <SignInButton mode="modal">
              <button className="w-full text-left">Login</button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignUpButton mode="modal">
              <button className="w-full text-left">Register</button>
            </SignUpButton>
          </DropdownMenuItem>
        </Show>
        <Show when={'signed-in'}>
          {links.map((link) => {
            if (link.label === 'dashboard' && !isAdmin) return null
            return (
              <DropdownMenuItem key={link.href}>
                <Link href={link.href} className="capitalize w-full">
                  {link.label}
                </Link>
              </DropdownMenuItem>
            )
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutLink />
          </DropdownMenuItem>
        </Show>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default LinksDropdown
