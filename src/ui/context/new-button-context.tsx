"use client";
import { File, Pencil, Trash2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

interface NewContextProps {
  state: string;
  close: () => void;
  newNote: () => void;
}
export default function NewButtonContext(props: NewContextProps) {
  const ref = useRef(null);
  const router = useRouter()

  const handleClickOutside = () => {
    props.close();
  };

  useOnClickOutside(ref, handleClickOutside);
  const menu = JSON.parse(props.state);
  const target = menu.target;

  return (
    <div
      ref={ref}
      onClick={handleClickOutside}
      className="w-[150px] h-fit fixed inset-0 mt-20 ml-6 z-20 p-1 bg-neutral-100 border border-neutral-200 rounded-xl shadow-md"
      // Set it to appear next to the cursor: style={{ top: `${menu.y}px`, left: `${menu.x}px` }}
    >
      <div className="flex flex-col gap-1">
        <div
          onClick={() => {
            props.newNote()
          }}
          className="flex z-100 flex-row items-center hover:bg-neutral-300 hover:cursor-pointer rounded-lg px-2"
        >
          <File size={14} />
          <p className="px-2">Note</p>
        </div>

        <div
          onClick={() => {
            router.push('/doc/new')
          }}
          className="flex z-100 flex-row items-center hover:bg-neutral-300 hover:cursor-pointer rounded-lg px-2"
        >
          <Upload size={14} />
          <p className="ml-2">File Upload</p>
        </div>
      </div>
    </div>
  );
}
