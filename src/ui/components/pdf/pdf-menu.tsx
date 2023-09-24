// 'use client'
// import { documentQuestionAnswering } from "@/lib/hf/ai"
// // import { extractText } from "@/lib/util/pdf-extract"

// async function generateAnswerFromContext(q: string, src: string) {
//   console.log('generating answer...')
//   const ans = await documentQuestionAnswering(q, src)
//   console.log(ans)
// }

const DOC = `https://assets-global.website-files.com/5d249063a5dbec3c6f57a8d4/6440690dcaffd45110ff9a56_tpas6JXEh9InUXpxJSmIuKKn3OMZxp07q67gfGofGmnl5cjcHZnS5yRW9tTcxF_WVY8xmuqtPgivHnbroHmuizXNYG-M9NLLu01F00VyTxSK0LJwFdM-pdC29ihnvWc-J1AwuXaUiqMbgVvBKJ7DL3c.png`
const QUERY = 'title?'
interface AIDMProps {
  doc: string
}
export default function AIDocumentMenu(props: AIDMProps) {

  return (
    <div className="flex gap-2 p-1 items-center px-5">
      {/* <button onClick={() => extractText}>
        click me 
      </button> */}
    </div>
  )
}