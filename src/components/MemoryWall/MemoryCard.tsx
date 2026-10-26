import { Trash2 } from "lucide-react";
import type { Memory } from "./types";

type MemoryCardProps = {
  memory: Memory;
  onDelete: () => void;
};

export default function MemoryCard({ memory, onDelete }: MemoryCardProps) {
  // Purana data (jis mein photos nahi thi) bhi crash na kare
  const photos = memory.photos ?? [];

  return (
    <li className="relative flex min-w-0 flex-col shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
      {photos.length > 0 && (
        <div className={`grid gap-1 ${photos.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
          {photos.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className={`w-full object-cover ${photos.length > 1 ? "aspect-square" : "aspect-[4/3]"}`}
            />
          ))}
        </div>
      )}

      <div className="flex-1 space-y-2 p-4">
        <p className="whitespace-pre-wrap break-words text-sm">{memory.message}</p>
        <p className="text-xs opacity-70">
          {memory.name} · {memory.date}
        </p>
      </div>

      <button
        type="button"
        onClick={onDelete}
        aria-label="Delete memory"
        className="absolute right-2 top-2 flex h-8 w-8 cursor-pointer items-center justify-center bg-white/90 text-red-500 hover:bg-white"
      >
        <Trash2 size={16} />
      </button>
    </li>
  );
}