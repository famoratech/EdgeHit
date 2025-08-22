/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    image: {
      setImage: (options: { src: string }) => ReturnType;
    };
  }

  export function useEditor(arg0: {
    extensions: (
      | Mark<LinkOptions, any>
      | Node<ImageOptions, any>
      | Extension<StarterKitOptions, any>
      | Node<BulletListOptions, any>
      | Node<ListItemOptions, any>
      | Extension<PlaceholderOptions, any>
    )[];
    content: string;
    onUpdate: ({ editor }: { editor: any }) => void;
    editorProps: { attributes: { class: string } };
  }) {
    throw new Error("Function not implemented.");
  }
}
