"use client"

import Pdf from "@/ui/components/pdf/pdf"
import AIDocumentMenu from "@/ui/components/pdf/pdf-menu"

export default function page({ params }: { params: { fd: string } }) {
  console.log(params)
  const src = `/${params.fd}`
  return (
    <div className="h-full w-full">
      <AIDocumentMenu doc={src} />
      <Pdf src={src} title={'pdf'}/>
    </div>

  )
}