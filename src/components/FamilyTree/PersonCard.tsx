import { useRef, useState, type ChangeEvent } from "react";
import { Plus, Trash2, User } from "lucide-react";
import { compressImage } from "../../utils/compressImage";
import { CARD } from "./layout";
import type { Person } from "./types";

type PersonCardProps = {
  person: Person | null; 
  onAdd: () => void;
  onChange: (patch: Partial<Omit<Person, "id">>) => void;
  onDelete: () => void;
};

export default function PersonCard({ person, onAdd, onChange, onDelete }: PersonCardProps) {
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
      setError("Image only, max 5 MB");
      return;
    }

    try {
      onChange({ photo: await compressImage(file, 300, 0.7) });
      setError("");
    } catch {
      setError("Could not load image");
    }
  };

  return (
    <div
      className="relative shrink-0 bg-[color:var(--page-color)]"
      style={{ width: CARD.width, height: CARD.height }}
    >
      {!person ? (
        <button
          type="button"
          onClick={onAdd}
          aria-label="Add person"
          className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-black shadow hover:scale-110"
        >
          <Plus size={20} />
        </button>
      ) : (
        <>
          <button
            type="button"
            onClick={onDelete}
            aria-label="Delete person"
            className="absolute right-1.5 top-1.5 flex h-5 w-5 cursor-pointer items-center justify-center bg-red-600 text-white hover:bg-red-700"
          >
            <Trash2 size={12} />
          </button>

          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            title="Change photo"
            aria-label="Change photo"
            className="absolute left-1/2 top-[34px] h-[100px] w-[100px] -translate-x-1/2 cursor-pointer overflow-hidden rounded-full border-4 border-white bg-neutral-400"
          >
            {person.photo ? (
              <img src={person.photo} alt={person.name} className="h-full w-full object-cover" />
            ) : (
              <User size={64} className="mx-auto mt-3 text-white" />
            )}
          </button>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFileChange} />

          <input
            value={person.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="full name"
            aria-label="Full name"
            maxLength={30}
            className="absolute bottom-2 left-1/2 h-[22px] w-[110px] -translate-x-1/2 border border-dashed border-[color:var(--text-color)] bg-transparent px-1 text-center text-xs text-[color:var(--text-color)] outline-none"
          />

          {error && (
            <p role="alert" className="absolute inset-x-1 bottom-[30px] bg-black/80 text-center text-[10px] text-white">
              {error}
            </p>
          )}
        </>
      )}
    </div>
  );
}