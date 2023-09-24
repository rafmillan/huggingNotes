import { propagateServerField } from "next/dist/server/lib/render-server"

interface SaveStatusProps {
  state: string
}
export default function SaveStatus(props: SaveStatusProps) {
  return (
    <div className="flex flex-row-reverse px-2">
      <div
        className={`bg-neutral-100 px-3 py-1 text-sm text-neutral-500 rounded-lg`
        // ${props.state.show ? "visible" : "invisible"}`
      }
      >
        {props.state}
      </div>
    </div>
  )
}