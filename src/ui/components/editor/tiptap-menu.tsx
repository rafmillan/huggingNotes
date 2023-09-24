'use client'

import { Editor } from "@tiptap/react"
import { Bold, BoldIcon, ChevronRightSquare, FileCode, FileJson, Italic, Underline } from "lucide-react"

interface TTMProps {
  editor: Editor
}
export default function TipTapMenu(props: TTMProps) {

  const toggleBold = (editor: Editor) => {
    return editor.chain().focus().toggleBold().run()
  }
  const toggleItalic = (editor: Editor) => {
    return editor.chain().focus().toggleItalic().run()
  }
  const toggleUnderline = (editor: Editor) => {
    return editor.chain().focus().toggleUnderline().run()
  }
  const toggleCodeBlock = (editor: Editor) => {
    return editor.chain().focus().toggleCodeBlock().run()
  }
  const getHTML = (editor: Editor) => {
    console.log(editor.getHTML())
  }
  const getJSON = (editor: Editor) => {
    console.log(editor.getJSON())
  }

  return (
    <div className="flex gap-1 justify-between w-full h-full py-1">
      <div className="flex w-full h-full borderbasis-3/4 gap-4 px-2">
        <button className="hover:bg-neutral-200 p-1 rounded-lg" onClick={() => toggleBold(props.editor)}>
          <Bold size={18} strokeWidth={2} />
        </button>
        <button className="hover:bg-neutral-200 p-1 rounded-lg" onClick={() => toggleItalic(props.editor)}>
          <Italic size={18} strokeWidth={2} />
        </button>
        <button className="hover:bg-neutral-200 p-1 rounded-lg" onClick={() => toggleUnderline(props.editor)}>
          <Underline size={18} strokeWidth={2}/>
        </button>
        <button className="hover:bg-neutral-200 p-1 rounded-lg" onClick={() => toggleCodeBlock(props.editor)}>
          <ChevronRightSquare size={18} strokeWidth={2} />
        </button>
      </div>
      <div className="flex w-full h-full justify-end gap-2 basis-1/4">
        <button className="px-2 hover:bg-neutral-200 p-1 rounded-lg" onClick={() => getHTML(props.editor)}>
          <FileCode size={18}/>
        </button>
        <button className="px-2 hover:bg-neutral-200 p-1 rounded-lg" onClick={() => getJSON(props.editor)}>
          <FileJson size={18}/>
        </button>
      </div>
    </div>
  )
}