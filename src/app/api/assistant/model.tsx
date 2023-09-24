import { useCompletion } from "ai/react";
import { Editor } from "@tiptap/react"
import { getPrevText } from "@/lib/editor";
import { useEffect, useRef } from "react";
import { backtickInputRegex, tildeInputRegex } from "@tiptap/extension-code-block";

interface AIAssistantProps {
  editor: Editor
}
export default function Assistant(props: AIAssistantProps) {
  const { complete, completion, isLoading, stop } = useCompletion({
    id: 'notes',
    api: '/api/assistant',
    onFinish: (_prompt, completion) => {
      // props.editor?.commands.setTextSelection({
      //   from: props.editor.state.selection.from - completion.length,
      //   to: props.editor.state.selection.from,
      // });
      console.log(`<|prompter|>${_prompt}<|endoftext|><|assistant|>${completion}`)
    },
    onError: (err) => {
      console.log('Error! ', err)
    },
  })

  const prev = useRef("");
  
  // Insert chunks of the generated text
  useEffect(() => {

    const diff = completion.slice(prev.current.length);
    prev.current = completion;
    let even = true
    if (diff === '\n') {
      if (even) {
        props.editor?.commands.enter()
      }
      even = !even
    } else {
      props.editor?.commands.insertContent(`${diff}`);
    }
  
  }, [isLoading, props.editor, completion]);

  return (
    <button className="border px-2 rounded bg-neutral-100 active:bg-neutral-200"
      onClick={() => { 
      props.editor.chain().focus().run()
      complete(getPrevText(props.editor, {chars: 5000}))}
      }
    >
        Prompt!
    </button>
  )

}