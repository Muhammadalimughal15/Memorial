import Toggle from "./ui/Toggle";

type SectionHeaderProps = {
  title: string;
  onTitleChange: (value: string) => void;
  enabled: boolean;
  onToggle: (value: boolean) => void;
};

export default function SectionHeader({
  title,
  onTitleChange,
  enabled,
  onToggle,
}: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          aria-label="Section title"
          maxLength={30}
          className="h-[60px] w-[240px] max-w-full border border-dashed border-[color:color-mix(in_srgb,var(--text-color)_30%,transparent)] bg-transparent px-3 font-['Cormorant_Garamond',serif] text-[34px] outline-none focus:border-[color:var(--text-color)]"
        />
        <div className="mt-3 h-[3px] w-16 bg-[color:var(--text-color)]" />
      </div>

      <Toggle checked={enabled} onChange={onToggle} />
    </div>
  );
}