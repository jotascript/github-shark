import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import { ThemeProvider } from '@/contexts/theme-provider'

import Navbar from './_components/navbar'

import './globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
})

export const metadata: Metadata = {
  title: 'Github Shark',
  description: 'Obtenha informações sobre usuários e repos do github',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
