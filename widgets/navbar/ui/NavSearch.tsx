import { Input } from '@/shared/shadcn/ui/input'

function NavSearch() {
  return (
    <Input
      type="search"
      placeholder="search product..."
      className="max-w-xs dark:bg-muted "
    />
  )
}
export default NavSearch
