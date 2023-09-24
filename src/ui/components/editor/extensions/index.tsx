import StarterKit from "@tiptap/starter-kit";
import Document from '@tiptap/extension-document'
import Placeholder from "@tiptap/extension-placeholder";
import TiptapUnderline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import { NoNewLine } from "./enter";


export const TiptapExtensions = [
  StarterKit.configure({
    heading: false,
    codeBlock: {
      HTMLAttributes: {
        class: "rounded-xl bg-neutral-800 px-10 py-4 font-mono text-neutral-200",
      },
    },
    code: {
      HTMLAttributes: {
        class: "rounded-xl bg-neutral-800 px-10 py-4 font-mono text-neutral-200",
      },
    },
  }),
  Heading.configure({
    HTMLAttributes: {
      class: 'font-bold'
    }
  }),
  Placeholder.configure({
    includeChildren: true,
    showOnlyCurrent: false,
    placeholder: ({ node, editor}) => {
      // @ts-ignore
      if (node.type.name === 'paragraph' && editor.getJSON().content.length < 2) {
        return "Start typing to get started"
      } else {
        return ""
      }
    },
  }),
  TiptapUnderline,
  TextStyle,
  Color,
];

export const TiptapExtensionsTitle = [
  StarterKit.configure({
    document: false,
    heading: false,
  }),
  Document.extend({
    content: 'heading block*',
  }),
  Heading.configure({
    HTMLAttributes: {
      class: 'font-bold'
    }
  }),
  Placeholder.configure({
    includeChildren: true,
    showOnlyCurrent: false,
    placeholder: ({ node }) => {
      if (node.type.name === 'heading') {
        return 'Write a title'
      // @ts-ignore
      } else {
        return ""
      }
    },
  }),
  TiptapUnderline,
  TextStyle,
  Color,
  NoNewLine,
];
