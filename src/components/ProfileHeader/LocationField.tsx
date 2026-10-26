import { MapPin } from "lucide-react";

type LocationFieldProps = {
  value: string;
  onChange: (v: string) => void;
};

export default function LocationField({ value, onChange }: LocationFieldProps) {
  return (
    <div className="flex items-center gap-4">
      <MapPin size={20} className="shrink-0 text-(--page-color)]" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Location"
        aria-label="Location"
       className="h-[38px] w-[470px] max-w-full border border-[(--text-color)] bg-transparent px-4 outline-none"
      />
    </div>
  );
}