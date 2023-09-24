"use client";
import { SendHorizonal } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { customQA } from "@/lib/hf/ai";
import { Editor } from "@tiptap/react";

interface ChatMsg {
  role: string
  content: string
  id:number
  src: number[] | null
}

interface DCProps {
  context: string,
  editor: Editor
}
export default function DocChat(props: DCProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{role: string, content: string, id:number, src: number[] | null}[]>([])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevents the default form submission behavior

    // You can send the input value to your server or perform any other desired action here.
    const NewQuestion = {role: 'user', content: input, id: messages.length, src: null}
    setMessages([
      ...messages,
      NewQuestion,
    ])
    const msg = await customQA(input, props.context)
    const ans = msg.answer
    if (ans !== null || ans !== undefined) {
      const newAns = {role: 'ai', content: ans, id: messages.length+1, src: [msg.start, msg.end]}
      setMessages([
        ...messages,
        NewQuestion, // Workaround
        newAns,
      ])
    }
    setInput("")
  };

  const highlightSource = (m: ChatMsg) => {
    if (m.src !== null) {
      console.log('from: ' + m.src[0] + ' to ' + m.src[1])
      props.editor.commands.focus(m.src[0], {scrollIntoView: true})
      props.editor.commands.setTextSelection({ from:  m.src[0]+1, to: m.src[1]+1 })
    }
  }

  // useEffect(() => {
  //   console.log(text)
  // }, [text])

  return (
    <div className="mx-auto w-full max-w-md h-full flex flex-col py-3 px-1 overflow-clip">
      <div className="grow overflow-scroll flex-col gap-1">
        {messages.map((m: any) => (
          <div
            key={m.id}
            onClick={() => {highlightSource(m)}}
            className={`font-semibold hover:cursor-pointer rounded-xl hover:bg-neutral-100 px-2 py-1
            ${ m.role === "user" ? "text-purple-500" : "text-red-500"}`}
          >
            {m.role === "user" ? "User: " : "AI: "}
            <p className="font-normal text-neutral-800">{m.content}</p>
          </div>
        ))}
      </div>
      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-1">
            <input
              className="grow w-full max-w-md border border-neutral-200 rounded shadow-xl p-2"
              type="text"
              id="inputField"
              placeholder="Ask a question..."
              value={input}
              onChange={handleInputChange}
            />
            <div>
              <button
                type="submit"
                className="h-full border-2 border-neutral-800 rounded-xl px-1 active:text-neutral-100 active:border-neutral-100 active:bg-neutral-800"
              >
                <SendHorizonal size={28} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
