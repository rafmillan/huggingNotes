"use client";
import parsePageTitle from "@/lib/util/parse-page-title";
import { File } from "lucide-react";
import Link from "next/link";
import { initialContextMenu } from "./side-bar-left";
import { useEffect, useState, useTransition } from "react";
import { LS_KEY, deleteNote, getNote } from "@/lib/note";
import { useRouter, useParams } from "next/navigation";

import NoteContext from "../context/note-context";
import PageDropDown from "../context/note-context";

interface NLProps {
  notes: string;
}
export default function NoteList(props: NLProps) {
  const router = useRouter();
  const params = useParams();
  const [isPending, startTransition] = useTransition();


  async function handleDeleteNote(id: string) {
    deleteNote(id);
    if (params.id == id) {
      startTransition(() => {
        router.push("/doc/new");
      });
    } else {
      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh();
      });
    }
  }

  const data = JSON.parse(props.notes).notes;
  return (
    <div className="flex flex-col w-full pt-3">
      {data.map((id: string, index: number) => {
        const data =JSON.parse(window.localStorage.getItem(id) as string);
        const title = parsePageTitle(JSON.stringify(data?.title));
        if (data === null) return;
        return (
          <div key={index}>
            <Link href={`/doc/${id}`}>
              <button className="flex group w-full px-3 py-1 text-neutral-700 hover:bg-neutral-300 hover:text-neutral-900 rounded-xl items-center x-3 justify-between">
                <div className="flex items-center gap-2 max-w-[80%]">
                  <File className="flex-none" size={16} />
                  <p className="flex-initial truncate w-max-[50%]">{title}</p>
                </div>
                <div className="group-hover:bg-neutral-300">
                  <NoteContext note={id} removeHandler={handleDeleteNote} />
                </div>
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
