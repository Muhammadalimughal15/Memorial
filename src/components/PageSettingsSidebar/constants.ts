export const ITEMS = [
  "Re-order Sections",
  "Page Color",
  "Background Color",
  "Text Color",
  "Font Weight",
] as const;

export type ItemName = (typeof ITEMS)[number];

export const COLORS = [
  "#FF0000", "#008000", "#0000FF", "#FFFF00", "#FFA500", "#800080",
  "#FFC0CB", "#B22222", "#808080", "#00FFFF", "#FF00FF", "#000000",
  "#FFD700", "#008B8B", "#4B0082", "#E61945", "#ADFF2F", "#8B0000",
  "#556B2F", "#DA70D6", "#ADD8E6", "#4682B4", "#D2691E", "#1CA4C9",
  "#FFB6C1", "#80C9D8", "#96C8B5", "#8BC3B5", "#C5D2A9", "#343A40",
  "#FCE4EC", "#FFF1DC", "#2C3E50", "#1F2933", "#FFFFFF", "#A78BFA",
];

export const FONT_WEIGHTS = [
  { label: "Light", value: 300 },
  { label: "Bold", value: 700 },
];