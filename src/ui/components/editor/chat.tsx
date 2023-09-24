import { Editor } from "@tiptap/react"
import DocChat from "../chat/doc-chat"

interface ChatProps {
  editor: Editor
}

export default function Chat(props: ChatProps) {
  return (
    <div className="flex flex-col justify-end h-full basis-1/3 border-l border-neutral-200">
      <DocChat context={props.editor.getText()} editor={props.editor}/>
    </div>
  )
}
