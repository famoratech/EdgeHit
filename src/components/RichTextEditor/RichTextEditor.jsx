"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import LinkExtension from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { Toolbar } from "./Toolbar";

export default function RichTextEditor({ content = "<p></p>", onChange }) {
  const [mounted, setMounted] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      BulletList.configure({ HTMLAttributes: { class: "list-disc pl-5" } }),
      OrderedList.configure({ HTMLAttributes: { class: "list-decimal pl-5" } }),
      ListItem.configure({ HTMLAttributes: { class: "leading-relaxed" } }),
      Placeholder.configure({ placeholder: "Start writing..." }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-blue-600 underline" },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: { class: "rounded-lg max-w-full h-auto" },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      if (onChange) {
        onChange(editor.getHTML());
      }
    },
    editorProps: {
      attributes: {
        class: "min-h-[300px] p-4 prose prose-sm max-w-none focus:outline-none",
      },
    },
  });

  useEffect(() => setMounted(true), []);

  if (!mounted || !editor) {
    return (
      <div className="border rounded-lg min-h-[300px] p-4 bg-gray-50 animate-pulse" />
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
