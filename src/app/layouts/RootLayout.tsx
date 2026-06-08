import type { Metadata } from 'next'
import { Geist, Geist_Mono, Figtree } from 'next/font/google'
import '@/app/styles/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { cn } from '@/shared/lib/shadcn/utils'
import Container from '@/shared/ui/Container'
import Navbar from '@/widgets/navbar/ui/Navbar'
import Providers from '@/app/providers/providers'

const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans' })

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Next store frontend',
  description: 'An elegant store built with Next.js',
}

export function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        figtree.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <Providers>
            <Navbar />
            <Container className="py-20">{children}</Container>
          </Providers>
        </ClerkProvider>
      </body>
    </html>
  )
}
