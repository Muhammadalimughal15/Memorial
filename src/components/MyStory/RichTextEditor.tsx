import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Undo2,
  Redo2,
  Bold,
  Italic,
  Underline,
  Highlighter,
  ChevronDown,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
} from "lucide-react";

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
};

const HIGHLIGHTS = ["#FFF176", "#FFAB91", "#A5D6A7", "#90CAF9", "#CE93D8"];

type ToolButtonProps = {
  label: string;
  onClick: () => void;
  children: ReactNode;
};

function ToolButton({ label, onClick, children }: ToolButtonProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      // mouseDown rokne se text ka selection nahi hatta
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded text-neutral-700 hover:bg-neutral-200"
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showColors, setShowColors] = useState(false);

  // Shuru mein save hua content dikhao (baad mein browser khud sambhalta hai)
  useEffect(() => {
    if (editorRef.current) editorRef.current.innerHTML = value;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emit = () => {
    const el = editorRef.current;
    if (!el) return;
    const empty = (el.textContent ?? "").trim() === "" && !el.querySelector("li");
    onChange(empty ? "" : el.innerHTML);
  };

  const run = (command: string, arg?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, arg);
    emit();
  };

  const highlight = (color: string) => {
    run("hiliteColor", color);
    setShowColors(false);
  };

  return (
    <div className="overflow-hidden rounded-lg bg-white text-black shadow-[0_4px_16px_rgba(0,0,0,0.15)]">
      <div className="relative flex flex-wrap items-center gap-1 border-b border-neutral-200 px-3 py-2 shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
        <ToolButton label="Undo" onClick={() => run("undo")}>
          <Undo2 size={18} />
        </ToolButton>
        <ToolButton label="Redo" onClick={() => run("redo")}>
          <Redo2 size={18} />
        </ToolButton>

        <span className="mx-2 h-5 w-px bg-neutral-300" />

        <ToolButton label="Bold" onClick={() => run("bold")}>
          <Bold size={18} />
        </ToolButton>
        <ToolButton label="Italic" onClick={() => run("italic")}>
          <Italic size={18} />
        </ToolButton>
        <ToolButton label="Underline" onClick={() => run("underline")}>
          <Underline size={18} />
        </ToolButton>

        <div className="relative flex items-center">
          <ToolButton label="Highlight" onClick={() => highlight(HIGHLIGHTS[0])}>
            <Highlighter size={18} />
          </ToolButton>
          <ToolButton label="Highlight colors" onClick={() => setShowColors((s) => !s)}>
            <ChevronDown size={14} />
          </ToolButton>

          {showColors && (
            <div className="absolute left-0 top-11 z-10 flex gap-2 rounded bg-white p-2 shadow-[0_4px_16px_rgba(0,0,0,0.25)]">
              {HIGHLIGHTS.map((color) => (
                <button
                  key={color}
                  type="button"
                  aria-label={`Highlight ${color}`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => highlight(color)}
                  className="h-6 w-6 cursor-pointer rounded-full border border-neutral-300"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </div>

        <span className="mx-2 h-5 w-px bg-neutral-300" />

        <ToolButton label="Align left" onClick={() => run("justifyLeft")}>
          <AlignLeft size={18} />
        </ToolButton>
        <ToolButton label="Align center" onClick={() => run("justifyCenter")}>
          <AlignCenter size={18} />
        </ToolButton>
        <ToolButton label="Align right" onClick={() => run("justifyRight")}>
          <AlignRight size={18} />
        </ToolButton>
        <ToolButton label="Bullet list" onClick={() => run("insertUnorderedList")}>
          <List size={18} />
        </ToolButton>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-multiline="true"
        aria-label="My Story"
        data-placeholder="Write your story here..."
        onInput={emit}
        // Paste karte waqt sirf text aaye, bahar ki styling nahi
        onPaste={(e) => {
          e.preventDefault();
          document.execCommand("insertText", false, e.clipboardData.getData("text/plain"));
        }}
        className="min-h-[320px] px-5 py-4 text-[15px] outline-none empty:before:text-neutral-400 empty:before:content-[attr(data-placeholder)] [&_ul]:list-disc [&_ul]:pl-6"
      />
    </div>
  );
}