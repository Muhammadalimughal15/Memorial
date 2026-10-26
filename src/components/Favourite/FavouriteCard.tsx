import { Quote, Trash2 } from "lucide-react";
import type { FavouriteItem } from "./types";

type FavouriteCardProps = {
  item: FavouriteItem;
  onChange: (patch: Partial<Omit<FavouriteItem, "id">>) => void;
  onDelete: () => void;
};

const fieldClass =
  "w-full border border-[color:color-mix(in_srgb,var(--text-color)_30%,transparent)] bg-transparent px-3 text-sm outline-none focus:border-[color:var(--text-color)]";

export default function FavouriteCard({ item, onChange, onDelete }: FavouriteCardProps) {
  return (
    <li className="flex min-w-0 flex-col gap-3 p-5 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onDelete}
          aria-label="Delete favourite"
          className="cursor-pointer p-1 text-red-500 hover:bg-black/10"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <Quote size={14} className="shrink-0" />
        <input
          value={item.question}
          onChange={(e) => onChange({ question: e.target.value })}
          placeholder="What's your favourite"
          aria-label="Question"
          className={`h-[36px] ${fieldClass}`}
        />
      </div>

      <textarea
        value={item.answer}
        onChange={(e) => onChange({ answer: e.target.value })}
        placeholder="Your Response Here"
        aria-label="Response"
        className={`h-[110px] resize-y py-2 ${fieldClass}`}
      />
    </li>
  );
}