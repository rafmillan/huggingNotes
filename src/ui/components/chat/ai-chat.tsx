import { useChat } from "ai/react";
import { MessagesSquare, Send, SendHorizonal } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";

export default function AiChat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [text, setText] = useState("") 

  useEffect(() => {
    console.log(text)
  }, [text])
  return (
    <div className="mx-auto w-full max-w-md h-full flex flex-col py-3 px-3 overflow-clip">
      <div className="grow overflow-scroll">
        {messages.map((m: any) => (
          <div
            key={m.id}
            className={`font-semibold ${
              m.role === "user" ? "text-purple-500" : "text-red-500"
            }`}
          >
            {m.role === "user" ? "User: " : "AI: "}
            <p className="font-normal text-neutral-800">{m.content}</p>
          </div>
        ))}
      </div>
      <div className="">
        <form onSubmit={handleSubmit} className="flex px-1 gap-1">
          <input
            className="grow w-full max-w-md border border-neutral-200 rounded shadow-xl p-2"
            value={input}
            onChange={(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
              handleInputChange(e)
              setText(input)
            }}
            placeholder="Ask a question"
          />
          <button
            type="submit"
            className="max-h-[2.67rem] border-2 border-neutral-800 rounded-xl px-1 active:text-neutral-100 active:border-neutral-100 active:bg-neutral-800"
          >
            <SendHorizonal size={28}/>
          </button>
        </form>
      </div>
    </div>
  );
}
