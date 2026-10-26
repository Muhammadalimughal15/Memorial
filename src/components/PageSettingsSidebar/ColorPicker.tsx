import { COLORS } from "./constants";

type ColorPickerProps = {
  label: string;
  value: string;
  onChange: (color: string) => void;
};

export default function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-fuchsia-600">Select {label}:</p>

      <div className="grid grid-cols-9 gap-x-2 gap-y-2">
        {COLORS.map((color, index) => (
          <button
            key={`${color}-${index}`}
            type="button"
            title={color}
            aria-label={`${label}: ${color}`}
            aria-pressed={value.toUpperCase() === color}
            onClick={() => onChange(color)}
            className={`h-8 w-8 cursor-pointer justify-self-center rounded-full border transition-transform hover:scale-110 ${
              value.toUpperCase() === color
                ? "border-black ring-2 ring-black ring-offset-1"
                : "border-transparent"
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}