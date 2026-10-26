import { Folder as FolderIcon, Plus, Trash2 } from "lucide-react";
import ThemedButton from "../ui/ThemedButton";
import type { Folder } from "./types";

type FolderBarProps = {
  folders: Folder[];
  activeId: string | null;
  onSelect: (id: string | null) => void;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
};

const ACTIVE = "ring-2 ring-[color:var(--text-color)]";

export default function FolderBar({
  folders,
  activeId,
  onSelect,
  onRename,
  onDelete,
  onAdd,
}: FolderBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <button
        type="button"
        onClick={() => onSelect(null)}
        aria-pressed={activeId === null}
        className={`flex h-[46px] cursor-pointer items-center gap-2 border border-[color:var(--text-color)] px-6 text-sm ${
          activeId === null ? ACTIVE : ""
        }`}
      >
        <FolderIcon size={16} />
        All
      </button>

      {folders.map((folder) => (
        <div
          key={folder.id}
          onClick={() => onSelect(folder.id)}
          className={`flex h-[46px] cursor-pointer items-center gap-2 border border-[color:var(--text-color)] pl-3 pr-2 ${
            activeId === folder.id ? ACTIVE : ""
          }`}
        >
          <input
            value={folder.name}
            onChange={(e) => onRename(folder.id, e.target.value)}
            onFocus={() => onSelect(folder.id)}
            placeholder="New Folder"
            aria-label="Folder name"
            maxLength={24}
            className="w-[150px] bg-transparent text-sm outline-none"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(folder.id);
            }}
            aria-label={`Delete folder ${folder.name}`}
            className="cursor-pointer p-1 text-red-500 hover:bg-black/10"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}

      <ThemedButton size="md" onClick={onAdd} icon={<Plus size={16} />}>
        Add Folder
      </ThemedButton>
    </div>
  );
}