export interface PDFProps {
  src: string,
  title: string
}
export default function PDFView(props: PDFProps) {
  return (
    <iframe className='h-full w-full border border-black' src={props.src} title={props.title} />
  )
}