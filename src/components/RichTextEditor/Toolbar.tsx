"use client";

import type { Editor } from "@tiptap/core"; // ✅ Editor type comes from core
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Link,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ToolbarProps {
  editor: Editor;
}

export function Toolbar({ editor }: ToolbarProps) {
  if (!editor) return null;

  const addImage = (editor: Editor) => {
    const url = window.prompt("Enter the URL of the image:");
    if (url) editor.commands.setImage({ src: url });
  };

  const setLink = (editor: Editor) => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.commands.unsetLink();
      return;
    }
    editor.commands.setLink({ href: url });
  };

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50">
      <Button
        type="button"
        variant="ghost"
        aria-label="Bold"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        data-active={editor.isActive("bold") ? "true" : undefined}
      >
        <Bold className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        aria-label="Bold"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        data-active={editor.isActive("italic") ? "true" : undefined}
      >
        <Italic className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        aria-label="Bold"
        size="sm"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        data-active={editor.isActive("strike") ? "true" : undefined}
      >
        <Strikethrough className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        aria-label="Bold"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        data-active={editor.isActive("bulletList") ? "true" : undefined}
      >
        <List className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        aria-label="Bold"
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        data-active={editor.isActive("orderedList") ? "true" : undefined}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        aria-label="Bold"
        size="sm"
        onClick={() => setLink(editor)}
        data-active={editor.isActive("link") ? "true" : undefined}
      >
        <Link className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        aria-label="Bold"
        size="sm"
        onClick={() => addImage(editor)}
      >
        <ImageIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
