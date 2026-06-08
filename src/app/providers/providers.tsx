'use client'

import { Toaster } from '@/shared/ui/shadcn/sonner'
import { ThemeProvider } from '@/app/providers/theme-provider'

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </>
  )
}
export default Providers
