"use client";
import { getNote, setNote } from "@/lib/note";
import Tiptap from "./tiptap";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface MainEditorProps {
  id: string;
}
export default function MainEditor(props: MainEditorProps) {
  const router = useRouter();

  useEffect(() => {
    async function handleKeyPress(event: any) {
      router.refresh();
    }
    
    window.addEventListener("keydown", handleKeyPress);
    
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [props.id]);

  return (
    <div className="overflow-hidden h-full">
      <Tiptap id={props.id} />
    </div>
  );
}
