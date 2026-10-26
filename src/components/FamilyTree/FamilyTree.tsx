import SectionHeader from "../SectionHeader";
import PersonCard from "./PersonCard";
import PeopleBox from "./PeopleBox";
import TreeLines from "./TreeLines";
import { CANVAS, SLOTS, SIBLINGS_BOX, CHILDREN_BOX } from "./layout";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useFitScale } from "../../hooks/useFitScale";
import type { FamilyTreeData, Person, SlotKey } from "./types";

const DEFAULT_DATA: FamilyTreeData = {
  enabled: false,
  title: "Family Tree",
  slots: {},
  siblings: [],
  children: [],
};

const newPerson = (): Person => ({ id: crypto.randomUUID(), name: "", photo: null });

type Patch = Partial<Omit<Person, "id">>;
type ListKey = "siblings" | "children";

export default function FamilyTree() {
  const [data, setData] = useLocalStorage<FamilyTreeData>("family-tree-section", DEFAULT_DATA);
  const { setRef, scale } = useFitScale(CANVAS.width);

  // Single cards
  const addSlot = (key: SlotKey) =>
    setData((prev) => ({ ...prev, slots: { ...prev.slots, [key]: newPerson() } }));

  const changeSlot = (key: SlotKey, patch: Patch) =>
    setData((prev) => {
      const current = prev.slots[key];
      return current ? { ...prev, slots: { ...prev.slots, [key]: { ...current, ...patch } } } : prev;
    });

  const deleteSlot = (key: SlotKey) =>
    setData((prev) => {
      const slots = { ...prev.slots };
      delete slots[key];
      return { ...prev, slots };
    });

  // Siblings / children ki list
  const addToList = (list: ListKey) =>
    setData((prev) => ({ ...prev, [list]: [...prev[list], newPerson()] }));

  const changeInList = (list: ListKey, id: string, patch: Patch) =>
    setData((prev) => ({
      ...prev,
      [list]: prev[list].map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }));

  const deleteFromList = (list: ListKey, id: string) =>
    setData((prev) => ({ ...prev, [list]: prev[list].filter((p) => p.id !== id) }));

  return (
    <section aria-label="Family Tree">
      <SectionHeader
        title={data.title}
        onTitleChange={(title) => setData((prev) => ({ ...prev, title }))}
        enabled={data.enabled}
        onToggle={(enabled) => setData((prev) => ({ ...prev, enabled }))}
      />

      {data.enabled && (
        // Poori screen ki chorai: section se bahar nikal kar left se right tak
        <div
          ref={setRef}
          className="relative mt-10 w-screen overflow-hidden"
          style={{
            marginLeft: "calc(50% - 50vw)",
            height: CANVAS.height * scale,
          }}
        >
          <div
            className="relative origin-top-left"
            style={{
              width: CANVAS.width,
              height: CANVAS.height,
              transform: `scale(${scale})`,
            }}
          >
            <TreeLines />

            {SLOTS.map(({ key, x, y, boxed }) => {
              const card = (
                <PersonCard
                  person={data.slots[key] ?? null}
                  onAdd={() => addSlot(key)}
                  onChange={(patch) => changeSlot(key, patch)}
                  onDelete={() => deleteSlot(key)}
                />
              );

              return boxed ? (
                <div
                  key={key}
                  className="absolute box-border border border-[color:var(--text-color)] p-[8px]"
                  style={{ left: x - 9, top: y - 9 }}
                >
                  {card}
                </div>
              ) : (
                <div key={key} className="absolute" style={{ left: x, top: y }}>
                  {card}
                </div>
              );
            })}

            <PeopleBox
              label="Siblings"
              style={SIBLINGS_BOX}
              people={data.siblings}
              onAdd={() => addToList("siblings")}
              onChange={(id, patch) => changeInList("siblings", id, patch)}
              onDelete={(id) => deleteFromList("siblings", id)}
            />

            <PeopleBox
              label="Children"
              style={CHILDREN_BOX}
              people={data.children}
              onAdd={() => addToList("children")}
              onChange={(id, patch) => changeInList("children", id, patch)}
              onDelete={(id) => deleteFromList("children", id)}
            />
          </div>
        </div>
      )}
    </section>
  );
}