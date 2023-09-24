import Nav from '@/ui/nav/nav'
import '../globals.css'
import '../prosemirror.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen flex flex-col scroll-hidden">
      <Nav>{children}</Nav>
    </div>
  )
}
