import type { ReactNode } from "react";
import { BookOpen, Star, GitBranch, Images, ListTree, Video, MessageSquare } from "lucide-react";

type Tab = { id: string; label: string; icon: ReactNode };

const TABS: Tab[] = [
  { id: "story", label: "My Story", icon: <BookOpen size={22} /> },
  { id: "favourite", label: "Favourite", icon: <Star size={22} /> },
  { id: "timeline", label: "Timeline", icon: <GitBranch size={22} /> },
  { id: "gallery", label: "Gallery", icon: <Images size={22} /> },
  { id: "family", label: "Family Tree", icon: <ListTree size={22} /> },
  { id: "videos", label: "Videos", icon: <Video size={22} /> },
  { id: "memory", label: "Memory Wall", icon: <MessageSquare size={22} /> },
];

type ProfileTabsProps = {
  active: string;
  onChange: (id: string) => void;
};

export default function ProfileTabs({ active, onChange }: ProfileTabsProps) {
  return (
   
    <nav className="-mx-4 mt-18 flex flex-wrap justify-center gap-x-10 gap-y-3 px-4 py-4 shadow-[0_-4px_8px_-4px_rgba(0,0,0,0.35),0_12px_18px_-6px_rgba(0,0,0,0.55)]">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          aria-current={active === tab.id}
          className={`flex cursor-pointer items-center gap-2 px-1 py-2 text-[15px] ${
            active === tab.id ? "border-b-2 border-current" : "opacity-90 hover:opacity-100"
          }`}
        >
          <span className="text-[var(--page-color)]">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </nav>
  );
}