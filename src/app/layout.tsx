import Nav from '@/ui/nav/nav'
import './globals.css'
import './prosemirror.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Notes with a magic touch',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="h-screen flex flex-col scroll-hidden">
          {children}
        </div>
      </body>
    </html>
  )
}
