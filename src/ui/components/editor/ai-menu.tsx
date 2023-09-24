'use client'

import Assistant from "@/app/api/assistant/model"
import Completion from "@/app/api/completion/model"
import { Editor } from "@tiptap/react"

interface AIMProps {
  editor: Editor
}
export default function AIMenu(props: AIMProps) {

  return (
    <div className="flex gap-2 p-1 items-center px-5">
      <Assistant editor={props.editor}/>
      <Completion editor={props.editor}/>
    </div>
  )
}