import type { SlotKey } from "./types";

export const CANVAS = { width: 1470, height: 890 };
export const CARD = { width: 130, height: 170 };

export type SlotLayout = { key: SlotKey; x: number; y: number; boxed?: boolean };

// Har card ki jagah (canvas ke andar, px mein)
export const SLOTS: SlotLayout[] = [
  { key: "lt1", x: 66, y: 18 },
  { key: "lt2", x: 348, y: 18 },
  { key: "lp", x: 207, y: 252 },
  { key: "rt1", x: 1047, y: 18 },
  { key: "rt2", x: 1329, y: 18 },
  { key: "rp", x: 1188, y: 252 },
  { key: "self", x: 508, y: 486 },
  { key: "spouse", x: 747, y: 486, boxed: true },
];

// Siblings aur children ke dabbe
export const SIBLINGS_BOX = { x: 8, y: 468, width: 450, height: 188 };
export const CHILDREN_BOX = { x: 338, y: 686, width: 750, height: 188 };

// Kali lines (SVG path)
export const LINES: string[] = [
  "M196 103 H348 M272 103 V252", // left upar ke do cards -> left parent
  "M1177 103 H1329 M1253 103 V252", // right upar ke do cards -> right parent
  "M337 337 H573 V486", // left parent -> self
  "M383 468 V437 H573", // siblings -> self wali line
  "M638 571 H738", // self -> spouse
  "M812 665 V686", // spouse -> children
  "M1188 337 H812 V477", // right parent -> spouse
];