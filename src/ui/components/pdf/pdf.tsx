import PDFView, { PDFProps } from "@/lib/pdf-view";

export default function PDF(props: PDFProps) {
  return (
    <div className='flex w-full h-full'>
      <PDFView src={props.src} title={props.title} />
    </div>
  )
}