import { useState } from "react";
import SectionHeader from "../SectionHeader";
import ThemedButton from "../ui/ThemedButton";
import ContributeModal, { type ContributePayload } from "./ContributeModal";
import MemoryCard from "./MemoryCard";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import type { MemoryWallData } from "./types";

const DEFAULT_DATA: MemoryWallData = { enabled: false, title: "Memory Wall", memories: [] };

export default function MemoryWall() {
  const [data, setData] = useLocalStorage<MemoryWallData>("memory-wall-section", DEFAULT_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addMemory = (memory: ContributePayload) => {
    setData((prev) => ({
      ...prev,
      memories: [
        {
          id: crypto.randomUUID(),
          ...memory,
          date: new Date().toLocaleDateString(),
        },
        ...prev.memories, 
      ],
    }));
    setIsModalOpen(false);
  };

  const deleteMemory = (id: string) =>
    setData((prev) => ({ ...prev, memories: prev.memories.filter((m) => m.id !== id) }));

  return (
    <section aria-label="Memory Wall">
      <SectionHeader
        title={data.title}
        onTitleChange={(title) => setData((prev) => ({ ...prev, title }))}
        enabled={data.enabled}
        onToggle={(enabled) => setData((prev) => ({ ...prev, enabled }))}
      />

      {data.enabled && (
        <div className="mt-10 space-y-12">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <p className="text-[15px] leading-6 text-[color:var(--page-color)]">
              To live in the hearts we leave behind is not to die.
              <br />
              Please share your Photos and Memories about the beloved
            </p>

            <ThemedButton size="md" onClick={() => setIsModalOpen(true)}>
              Contribute
            </ThemedButton>
          </div>

          {data.memories.length > 0 && (
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.memories.map((memory) => (
                <MemoryCard
                  key={memory.id}
                  memory={memory}
                  onDelete={() => deleteMemory(memory.id)}
                />
              ))}
            </ul>
          )}
        </div>
      )}

      {isModalOpen && (
        <ContributeModal onClose={() => setIsModalOpen(false)} onSubmit={addMemory} />
      )}
    </section>
  );
}