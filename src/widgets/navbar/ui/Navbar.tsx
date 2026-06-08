import Container from '@/shared/ui/Container'
import Logo from './Logo'
import NavSearch from './NavSearch'
import CartButton from './CartButton'
import ToggleTheme from './ToggleTheme'
import LinksDropdown from './LinksDropdown'
import { Suspense } from 'react'

function Navbar() {
  return (
    <nav className="border-b">
      <Container className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap gap-4 py-8">
        <Logo />
        {/* 
          Using Suspense because useSearchParams() should be wrapped in a suspense boundary during build.
          Read more: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
        */}
        <Suspense>
          <NavSearch />
        </Suspense>
        <div className="flex items-center gap-4">
          <CartButton />
          <ToggleTheme />
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  )
}
export default Navbar
