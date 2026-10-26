type ToggleProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
};

export default function Toggle({ checked, onChange, label = "Enable" }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex cursor-pointer items-center gap-3 text-sm font-medium"
    >
      <span
        className={`relative h-5 w-10 rounded-full border border-[color:var(--text-color)] transition-colors ${
          checked ? "bg-[color:var(--page-color)]" : "bg-transparent"
        }`}
      >
        <span
          className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[color:var(--text-color)] transition-all ${
            checked ? "left-[20px]" : "left-[2px]"
          }`}
        />
      </span>
      {label}
    </button>
  );
}