import { Plus } from "lucide-react";
import SectionHeader from "../SectionHeader";
import ThemedButton from "../ui/ThemedButton";
import FavouriteCard from "./FavouriteCard";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import type { FavouriteData, FavouriteItem } from "./types";

const DEFAULT_DATA: FavouriteData = {
  enabled: false,
  title: "Favourite",
  items: [{ id: "fav-1", question: "", answer: "" }],
};

export default function Favourite() {
  const [data, setData] = useLocalStorage<FavouriteData>("favourite-section", DEFAULT_DATA);

  const addItem = () =>
    setData((prev) => ({
      ...prev,
      items: [...prev.items, { id: crypto.randomUUID(), question: "", answer: "" }],
    }));

  const updateItem = (id: string, patch: Partial<Omit<FavouriteItem, "id">>) =>
    setData((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));

  const deleteItem = (id: string) =>
    setData((prev) => ({ ...prev, items: prev.items.filter((item) => item.id !== id) }));

  return (
    <section aria-label="Favourite">
      <SectionHeader
        title={data.title}
        onTitleChange={(title) => setData((prev) => ({ ...prev, title }))}
        enabled={data.enabled}
        onToggle={(enabled) => setData((prev) => ({ ...prev, enabled }))}
      />

      {data.enabled && (
        <div className="mt-10 space-y-12">
          {/* 3 box ek row mein, 4th neeche agli row mein pehle box ke neeche */}
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.items.map((item) => (
              <FavouriteCard
                key={item.id}
                item={item}
                onChange={(patch) => updateItem(item.id, patch)}
                onDelete={() => deleteItem(item.id)}
              />
            ))}
          </ul>

          <ThemedButton size="md" onClick={addItem} icon={<Plus size={16} />}>
            Add More
          </ThemedButton>
        </div>
      )}
    </section>
  );
}