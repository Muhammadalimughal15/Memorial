import { ChevronDown, ChevronUp } from "lucide-react";

type SectionReorderProps = {
  sections: string[];
  onChange: (sections: string[]) => void;
};

export default function SectionReorder({ sections, onChange }: SectionReorderProps) {
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= sections.length) return;

    const next = [...sections];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <ul className="space-y-2">
      {sections.map((section, i) => (
        <li
          key={section}
          className="flex items-center justify-between border border-black px-3 py-2 text-sm"
        >
          {section}

          <span className="flex gap-1">
            <button
              type="button"
              onClick={() => move(i, -1)}
              disabled={i === 0}
              aria-label={`${section} up`}
              className="cursor-pointer p-1 hover:bg-stone-200 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronUp size={16} />
            </button>

            <button
              type="button"
              onClick={() => move(i, 1)}
              disabled={i === sections.length - 1}
              aria-label={`${section} down`}
              className="cursor-pointer p-1 hover:bg-stone-200 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronDown size={16} />
            </button>
          </span>
        </li>
      ))}
    </ul>
  );
}