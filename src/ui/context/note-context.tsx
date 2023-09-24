"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal, Trash2 } from "lucide-react";

interface PDDProps {
  note: string
  removeHandler: (id:string) => void,
}
function NoteContext(props: PDDProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className="flex items-center w-[20px] h-[20px] group">
          <MoreHorizontal
            size={16}
            className="invisible group-hover:visible"
          />
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[150px] bg-neutral-100 border border-neutral-200 shadow-md rounded-xl p-[5px]"
          sideOffset={5}
        >
          <DropdownMenu.Item
            id="delete"
            onClick={(e) => {
              e.preventDefault()
              props.removeHandler(props.note)
            }}
            className="group text-sm leading-none text-light-100 rounded-lg flex items-center h-[25px] px-[5px] relative pl-[10px] hover:cursor-pointer select-none outline-none data-[disabled]:text-white data-[disabled]:pointer-events-none data-[highlighted]:bg-red-400 data-[highlighted]:text-neutral-100"
          >
            <div className="pr-2">
              <Trash2 size={18}/>
            </div>
            Delete
          </DropdownMenu.Item>
          {/* <DropdownMenu.Separator className="h-[0.5px] bg-light-100 m-[5px]" />
          {
            <div>
              <DropdownMenu.Label className="pl-[10px] text-xs leading-[20px] text-dark-100">
                created
              </DropdownMenu.Label>
            </div>
          } */}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export default NoteContext;