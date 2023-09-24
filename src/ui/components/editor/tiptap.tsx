"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import TipTapMenu from "./tiptap-menu";
import { TiptapEditorProps } from "./props";
import AIMenu from "./ai-menu";
import { useDebouncedCallback } from "use-debounce";
import { TiptapExtensions, TiptapExtensionsTitle } from "./extensions";
import { useEffect, useState } from "react";
import SaveStatus from "./save-status";
import { useLocalStorage } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { MessagesSquare } from "lucide-react";
import Chat from "./chat";

export const DEFAULT_TITLE_CONTENT = {
  type: "doc",
  content: [{ type: "heading", attrs: { level: 1 } }],
};
export const DEFAULT_EDITOR_CONTENT = { type: "doc", content: [] };
export const DEFAULT_NOTE_CONTENT = {
  title: DEFAULT_TITLE_CONTENT,
  content: DEFAULT_EDITOR_CONTENT,
};

interface TipTapProps {
  id: string;
}
const Tiptap = (props: TipTapProps) => {
  const router = useRouter();
  const local_storage_key = props.id;
  var ls_at_load = window.localStorage.getItem(local_storage_key);
  if (ls_at_load === null) {
    ls_at_load = JSON.stringify(DEFAULT_NOTE_CONTENT);
    window.localStorage.setItem(local_storage_key, ls_at_load);
  }

  const [hydrated, setHydrated] = useState(false);
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [showChat, setShowChat] = useState(false);

  const toggleChat = () => {
    setShowChat(!showChat);
    console.log(showChat);
  };

  const [content, setContent] = useLocalStorage(
    local_storage_key,
    JSON.parse(ls_at_load)
  );

  const onUpdate = (e: Editor) => {
    // e.commands.focus("end");
    setSaveStatus("Unsaved");
    // Simulate a delay in saving.
    setTimeout(() => {
      setSaveStatus("Saved");
    }, 770);
  };

  const debouncedUpdatesE = useDebouncedCallback(async ({ editor }) => {
    const json = editor.getJSON();
    const newContent = {
      ...content,
      content: json,
    };
    setContent(newContent);
    // Simulate a delay in saving.
    setTimeout(() => {}, 500);
  }, 5);

  const debouncedUpdatesT = useDebouncedCallback(async ({ editor }) => {
    const json = editor.getJSON();
    const newContent = {
      ...content,
      title: json,
    };
    setContent(newContent);
    // Simulate a delay in saving.
    setTimeout(() => {}, 500);
  }, 5);

  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    content: "",
    onUpdate: (e: any) => {
      const selection = e.editor.state.selection.content();
      onUpdate(e.editor);
      debouncedUpdatesE(e);
    },
    autofocus: "end",
  });

  const title = useEditor({
    extensions: TiptapExtensionsTitle,
    editorProps: TiptapEditorProps,
    content: "",
    onUpdate: (e: any) => {
      const selection = e.editor.state.selection.content();
      onUpdate(e.editor);
      debouncedUpdatesT(e);
    },
    autofocus: "end",
  });

  // Hydrate the editor with the content from localStorage.
  useEffect(() => {
    if (editor && content && title) {
      const editorJson = editor.getJSON();
      const titleJson = title.getJSON();

      if (
        // @ts-ignore
        editorJson.content[0].content?.length !== undefined &&
        // @ts-ignore
        titleJson.content[0].content?.length !== undefined
      ) {
        const newContent = {
          title: titleJson,
          content: editorJson,
        };
        setContent(newContent);
        router.refresh();
      }

      title.commands.setContent(content.title);
      editor.commands.setContent(content.content);
      setHydrated(true);
    }
  }, [hydrated, editor, title, showChat, content, router, setContent]);

  useEffect(() => {
    async function handleKeyPress(event: any) {
      if (event.key === "Enter" && title?.isFocused) {
        editor?.commands.focus("end");
      } else if (
        event.key === "Tab" &&
        editor?.isFocused &&
        editor?.isActive("codeBlock")
      ) {
        event.preventDefault();
        editor.commands.insertContent("\t");
      }
    }

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [title, editor]);

  if (!editor || typeof window === "undefined") {
    return null;
  }

  return (
    <div className="flex flex-row h-full overflow-clip">
      <div className="flex flex-col w-full h-full">
        <div className="border-b border-neutral-200 flex items-center justify-between px-2">
          <TipTapMenu editor={editor as Editor} />
          <SaveStatus state={saveStatus} />
          <button className="flex" onClick={toggleChat}>
            <MessagesSquare
              className="p-1 rounded-lg hover:bg-neutral-200"
              size={26}
            />
          </button>
        </div>
        <AIMenu editor={editor} />
        <div className="grow h-fit overflow-scroll flex-col">
          <EditorContent className="py-5 pl-[12rem] pr-[4rem]" editor={title} />
          <EditorContent
            className="py-5 pl-[12rem] pr-[4rem]"
            editor={editor}
          />
        </div>
      </div>
      {showChat && <Chat editor={editor} />}
    </div>
  );
};

export default Tiptap;
