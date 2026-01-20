import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Sanvya Software',
  description: 'Hospital Management System',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/black.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/white.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/color.png',
        type: 'image/png',
      },
    ],
    apple: '/color.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}

      </body>
    </html>
  )
}
