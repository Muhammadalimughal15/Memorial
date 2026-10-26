import PersonCard from "./PersonCard";
import type { Person } from "./types";

type PeopleBoxProps = {
  label: string;
  style: { x: number; y: number; width: number; height: number };
  people: Person[];
  onAdd: () => void;
  onChange: (id: string, patch: Partial<Omit<Person, "id">>) => void;
  onDelete: (id: string) => void;
};

export default function PeopleBox({ label, style, people, onAdd, onChange, onDelete }: PeopleBoxProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className="absolute box-border flex flex-row-reverse items-center gap-3 overflow-x-auto border border-[color:var(--text-color)] p-[8px]"
      style={{ left: style.x, top: style.y, width: style.width, height: style.height }}
    >
      {/* + wala khali card sab se right par, naye log us ke left mein aate hain */}
      <PersonCard person={null} onAdd={onAdd} onChange={() => {}} onDelete={() => {}} />

      {people.map((person) => (
        <PersonCard
          key={person.id}
          person={person}
          onAdd={() => {}}
          onChange={(patch) => onChange(person.id, patch)}
          onDelete={() => onDelete(person.id)}
        />
      ))}
    </div>
  );
}