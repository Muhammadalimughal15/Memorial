export type Person = { id: string; name: string; photo: string | null };

export type SlotKey = "lt1" | "lt2" | "lp" | "rt1" | "rt2" | "rp" | "self" | "spouse";

export type FamilyTreeData = {
  enabled: boolean;
  title: string;
  slots: Partial<Record<SlotKey, Person>>;
  siblings: Person[];
  children: Person[];
};