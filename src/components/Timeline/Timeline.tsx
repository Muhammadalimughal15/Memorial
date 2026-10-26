import { Plus } from "lucide-react";
import SectionHeader from "../SectionHeader";
import ThemedButton from "../ui/ThemedButton";
import TimelineItem from "./TimelineItem";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import type { TimelineData, TimelineEntry } from "./types";

const newEntry = (): TimelineEntry => ({
  id: crypto.randomUUID(),
  year: "",
  month: "",
  day: "",
  headline: "",
  description: "",
});

const DEFAULT_DATA: TimelineData = {
  enabled: false,
  title: "Timeline",
  entries: [{ id: "timeline-1", year: "", month: "", day: "", headline: "", description: "" }],
};

export default function Timeline() {
  const [data, setData] = useLocalStorage<TimelineData>("timeline-section", DEFAULT_DATA);

  const addEntry = () =>
    setData((prev) => ({ ...prev, entries: [...prev.entries, newEntry()] }));

  const updateEntry = (id: string, patch: Partial<Omit<TimelineEntry, "id">>) =>
    setData((prev) => ({
      ...prev,
      entries: prev.entries.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }));

  const deleteEntry = (id: string) =>
    setData((prev) => ({ ...prev, entries: prev.entries.filter((e) => e.id !== id) }));

  return (
    <section aria-label="Timeline">
      <SectionHeader
        title={data.title}
        onTitleChange={(title) => setData((prev) => ({ ...prev, title }))}
        enabled={data.enabled}
        onToggle={(enabled) => setData((prev) => ({ ...prev, enabled }))}
      />

      {data.enabled && (
        <div className="mt-10 space-y-12">
          <ul className="space-y-10">
            {data.entries.map((entry) => (
              <TimelineItem
                key={entry.id}
                entry={entry}
                onChange={(patch) => updateEntry(entry.id, patch)}
                onDelete={() => deleteEntry(entry.id)}
              />
            ))}
          </ul>

          <ThemedButton size="md" onClick={addEntry} icon={<Plus size={16} />}>
            Add More Timeline
          </ThemedButton>
        </div>
      )}
    </section>
  );
}