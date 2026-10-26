import { FONT_WEIGHTS } from "./constants";

type FontWeightPickerProps = {
  value: number;
  onChange: (weight: number) => void;
};

export default function FontWeightPicker({ value, onChange }: FontWeightPickerProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-fuchsia-600">Choose Font Weight:</p>

      <div className="grid grid-cols-2 gap-2">
        {FONT_WEIGHTS.map((font) => (
          <button
            key={font.value}
            type="button"
            onClick={() => onChange(font.value)}
            aria-pressed={value === font.value}
            className={`cursor-pointer rounded border px-3 py-2.5 text-left text-sm transition-colors ${
              value === font.value
                ? "border-black bg-black text-white"
                : "border-stone-300 bg-white text-black hover:bg-stone-100"
            }`}
            style={{ fontWeight: font.value }}
          >
            {font.label}
          </button>
        ))}
      </div>

      <p className="text-lg text-black" style={{ fontWeight: value }}>
        Preview Text
      </p>
    </div>
  );
}