import { useState } from "react";
import { CalendarDays } from "lucide-react";

type DateInputProps = {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
};

const inputClass =
  "h-[56px] w-[240px] rounded border border-[color:var(--text-color)] bg-transparent px-3 outline-none";

function DateInput({ value, onChange, placeholder }: DateInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <input
      type={focused || value ? "date" : "text"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholder={placeholder}
      aria-label={placeholder}
      className={inputClass}
    />
  );
}

type DateFieldsProps = {
  birth: string;
  expiry: string;
  onBirthChange: (v: string) => void;
  onExpiryChange: (v: string) => void;
};

export default function DateFields({
  birth,
  expiry,
  onBirthChange,
  onExpiryChange,
}: DateFieldsProps) {
  return (
    <div className="flex items-center gap-4">
      <CalendarDays size={20} className="shrink-0 text-[var(--page-color)]" />
      <DateInput value={birth} onChange={onBirthChange} placeholder="Date of Birth" />
      <span>-</span>
      <DateInput value={expiry} onChange={onExpiryChange} placeholder="Date of Expiry" />
    </div>
  );
}