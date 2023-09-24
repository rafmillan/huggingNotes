"use client"
import { createNote, createNoteFromFile } from "@/lib/note";
import { removeAndReturnFirstH1Contents, removeFileExtension } from "@/lib/util";
import { Inbox, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useDropzone } from 'react-dropzone'

interface PUProps {
  fp: string
}
export default function FileUpload(props: PUProps) {
  const router = useRouter()

  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result as ArrayBuffer
        const str = new TextDecoder().decode(binaryStr);
        if (file?.type === 'text/plain') {
          const newStr = str.replace(/\n/g, '<br/>');
          const id = createNoteFromFile(newStr, removeFileExtension(file.name))
          router.refresh()
          router.push(`/doc/${id}`)
        } else if (file?.type === 'text/html') {
          const parsedHTML  = removeAndReturnFirstH1Contents(str)
          const id = createNoteFromFile(parsedHTML?.updatedHtml as string, parsedHTML.h1 as string)
          router.refresh()
          router.push(`/doc/${id}`)
        } else if (file?.type === 'text/javascript' || file?.type === 'application/json') {
          const newStr = '<pre><code>' + str.replace(/\n/g, '<br/>') + '</codeblock></pre>'
          const id = createNoteFromFile(newStr, file.name)
          router.refresh()
          router.push(`/doc/${id}`)
        }
      }
      reader.readAsArrayBuffer(file)
    })
    
  }, [router])

  const { getRootProps, getInputProps, acceptedFiles} = useDropzone({
    // accept: {'application/pdf': ['.pdf']},
    accept: {
      // 'application/pdf': ['.pdf'],
      'text/html': ['.html', '.htm'],
      'text/plain': ['.txt'],
      'text/javascript': ['.js'],
      'application/json': ['.json'],
    },
    maxFiles: 1,
    onDrop: onDrop
  })

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      console.log(acceptedFiles)
      if (acceptedFiles[0].type === 'text/plain' || acceptedFiles[0].type === 'text/html') {
        console.log('--- Supported file type: Text')
      } else if (acceptedFiles[0].type === 'text/javascript' || acceptedFiles[0].type === 'application/json') { 
        console.log('--- Supported file type: Code')
      } else {
        console.log('--- Unsopported file type')
      }
    }
  }, [acceptedFiles])

  return (
    <div className="flex w-full h-full flex-wrap p-[10rem] text-lg">
      <div 
        {...getRootProps({
          className: "flex rounded-xl bg-neutral-50 w-full border-2 p-2 border-dashed border-neutral-300 justify-center items-center"
        })}
        >
          <input {...getInputProps()}/>
        <div className="flex flex-col justify-center items-center gap-2">
          <Inbox size={48} className=""/>
          <p className="text-md tracking-wide text-neutral-300 text-center"> Drop your file here! </p>
          {/* <button className="bg-neutral-800 rounded-xl p-2 w-[200px] text-neutral-100"
                  onClick={() => {
                    console.log('file upload ', props.fp)
                    router.push(`/upload/${fp}`)
                  }}>
            Select file
          </button> */}
        </div>
      </div>
    </div>
  )
}