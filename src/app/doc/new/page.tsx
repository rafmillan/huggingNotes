import PDF from "@/ui/components/pdf/pdf";
import PDFUpload from "@/ui/components/pdf/file-upload";
import { Upload } from "lucide-react";

const FP = '100q.pdf'
export default function New() {
  return (
      <PDFUpload fp={FP}/>
  )
}