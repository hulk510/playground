import '@repo/ui/styles.css'
import { Toaster } from '@repo/ui/ui/toaster'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Playground',
  description: 'My first monorepo playground',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang='ja' className='min-h-screen' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class' // MEMO: これはなに？
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
