import { CANVAS, LINES } from "./layout";

export default function TreeLines() {
  return (
    <svg
      aria-hidden="true"
      width={CANVAS.width}
      height={CANVAS.height}
      className="pointer-events-none absolute left-0 top-0"
    >
      {LINES.map((d) => (
        <path key={d} d={d} fill="none" strokeWidth={2} style={{ stroke: "var(--text-color)" }} />
      ))}
    </svg>
  );
}