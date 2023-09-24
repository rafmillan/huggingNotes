import { Menu, Settings } from "lucide-react";

interface HeaderProps {
  toggleLeft: () => void
  toggleRight: () => void
  left: boolean
  right: boolean
}
export default function Header(props: HeaderProps) {
  const clickHandlerL = (e: any) => {
    props.toggleLeft()
  }

  const clickHandlerR = (e: any) => {
    props.toggleRight()
  }
  return (
    // Why h-[5.25%]???
    <div className="flex bg-neutral-100 h-[5.25%] border-neutral-200 border-b">
      <div className="flex items-center gap-2 px-2 basis-[100%]">
        {!props.left && 
          <div className="flex gap-2">
            <button onClick={clickHandlerL}>
              <Menu size={18}/>
            </button>
            <h1>Notes</h1>
          </div>
        }
      </div>
      <div className="flex items-center gap-2 px-2">
        <button onClick={clickHandlerR}>
          <Settings size={18}/>
        </button>
      </div>
    </div>
  )
}