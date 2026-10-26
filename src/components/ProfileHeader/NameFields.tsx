type NameFieldsProps = {
  values: { first: string; middle: string; last: string };
  onChange: (key: "first" | "middle" | "last", value: string) => void;
};

const FIELDS = [
  { key: "first", placeholder: "F Name" },
  { key: "middle", placeholder: "M Name" },
  { key: "last", placeholder: "L Name" },
] as const;

export default function NameFields({ values, onChange }: NameFieldsProps) {
  return (
    <div className="flex flex-wrap gap-6">
      {FIELDS.map(({ key, placeholder }) => (
        <input
          key={key}
          value={values[key]}
          onChange={(e) => onChange(key, e.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
        className="h-[72px] w-[173px] border border-dashed border-(--text-color)] bg-transparent px-3 font-['Cormorant_Garamond',serif] text-[34px] outline-none"
        />
      ))}
    </div>
  );
}