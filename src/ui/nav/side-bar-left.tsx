"use client";
import { ChevronsLeft, Plus } from "lucide-react";
import NewButtonContext from "../context/new-button-context";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createNote, getNotes } from "@/lib/note";
import NoteList from "./note-list";

export const initialContextMenu = {
  show: false,
  target: -1,
  x: 0,
  y: 0,
};

interface SLProps {
  toggle: () => void;
}
export default function SideBarLeft(props: SLProps) {
  const [isPending, startTransition] = useTransition();
  const [contextMenu, setContextMenu] = useState(initialContextMenu);
  const handleContentMenuClose = () => setContextMenu(initialContextMenu);

  const router = useRouter();
  const notes = getNotes();

  async function handleNewNote() {
    createNote()
    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  }

  if (notes === null) {
    return null
  }

  return (
    <div className="flex flex-col w-[200px] min-w-[200px] border-r border-neutral-200 bg-neutral-100">
      <div className="h-[5%] border-b border-neutral-200 flex items-center px-3 justify-between">
        <p className=""> Notes </p>
        <button className="" onClick={props.toggle}>
          <ChevronsLeft size={18} />
        </button>
      </div>
      <div className="grow flex flex-col px-3 py-2">
        {contextMenu.show && (
          <NewButtonContext
            state={JSON.stringify(contextMenu)}
            close={handleContentMenuClose}
            newNote={handleNewNote}
          />
        )}
        <button
          className="flex rounded-xl hover:bg-neutral-300 w-full items-center px-3 py-1 text-neutral-700"
          onClick={(e) => {
            const pageId = parseInt((e.target as HTMLElement).id);
            const { pageX, pageY } = e;
            setContextMenu({ show: true, target: pageId, x: pageX, y: pageY });
          }}
        >
          <Plus className="mr-2" size={18} />
          New
        </button>
        <NoteList notes={JSON.stringify(notes as string)}/>
      </div>
    </div>
  );
}
