import { MapPin, Trash2 } from "lucide-react";
import type { TimelineEntry } from "./types";

type TimelineItemProps = {
  entry: TimelineEntry;
  onChange: (patch: Partial<Omit<TimelineEntry, "id">>) => void;
  onDelete: () => void;
};

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: currentYear - 1899 }, (_, i) => String(currentYear - i));
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));

const selectBase =
  "cursor-pointer border border-neutral-200 bg-white px-2 text-[color:var(--page-color)] outline-none focus:border-[color:var(--page-color)]";

const textField =
  "w-full border border-dashed border-[color:color-mix(in_srgb,var(--page-color)_40%,transparent)] bg-transparent px-3 outline-none focus:border-[color:var(--page-color)]";

export default function TimelineItem({ entry, onChange, onDelete }: TimelineItemProps) {
  return (
    <li className="flex flex-wrap items-start gap-x-6 gap-y-4">
      {/* Year / Month / Day */}
      <div className="flex w-[95px] shrink-0 flex-col gap-2">
        <select
          value={entry.year}
          onChange={(e) => onChange({ year: e.target.value })}
          aria-label="Year"
          className={`h-[46px] text-xl ${selectBase}`}
        >
          <option value="" disabled>
            Year
          </option>
          {YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select
          value={entry.month}
          onChange={(e) => onChange({ month: e.target.value })}
          aria-label="Month"
          className={`h-[36px] text-sm ${selectBase}`}
        >
          <option value="" disabled>
            Month
          </option>
          {MONTHS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <select
          value={entry.day}
          onChange={(e) => onChange({ day: e.target.value })}
          aria-label="Day"
          className={`h-[36px] text-sm ${selectBase}`}
        >
          <option value="" disabled>
            Day
          </option>
          {DAYS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* Dot */}
      <span
        aria-hidden="true"
        className="mt-3 h-[22px] w-[22px] shrink-0 rounded-full border-[6px] border-[color:var(--page-color)]"
      />

      {/* Headline / Description / Delete */}
      <div className="w-full max-w-[300px] min-w-0 space-y-3">
        <input
          value={entry.headline}
          onChange={(e) => onChange({ headline: e.target.value })}
          placeholder="Headline"
          aria-label="Headline"
          maxLength={60}
          className={`h-[46px] text-xl text-[color:var(--page-color)] placeholder:text-[color:var(--page-color)] placeholder:opacity-70 ${textField}`}
        />

        <div className="flex items-center gap-3">
          <MapPin size={16} className="shrink-0 text-[color:var(--page-color)]" />
          <input
            value={entry.description}
            onChange={(e) => onChange({ description: e.target.value })}
            placeholder="Description"
            aria-label="Description"
            className={`h-[36px] text-sm ${textField}`}
          />
        </div>

        <button
          type="button"
          onClick={onDelete}
          aria-label="Delete timeline entry"
          className="themed-btn flex h-10 w-10 cursor-pointer items-center justify-center rounded-md"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </li>
  );
}