import { useEffect, useState } from "react";
import { X, ExternalLink, ArrowRight } from "lucide-react";
import { ITEMS, type ItemName } from "./constants";
import type { PageSettings, UpdateSetting } from "../../hooks/usePageSettings";
import AccordionItem from "./AccordionItem";
import ColorPicker from "./ColorPicker";
import SectionReorder from "./SectionReorder";
import FontWeightPicker from "./FontWeightPicker";

type PageSettingsSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  settings: PageSettings;
  onChange: UpdateSetting;
  onViewLive?: () => void;
  onRegister?: () => void;
};

export default function PageSettingsSidebar({
  isOpen,
  onClose,
  settings,
  onChange,
  onViewLive,
  onRegister,
}: PageSettingsSidebarProps) {
  const [openItem, setOpenItem] = useState<ItemName | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const renderContent = (item: ItemName) => {
    switch (item) {
      case "Re-order Sections":
        return (
          <SectionReorder
            sections={settings.sections}
            onChange={(v) => onChange("sections", v)}
          />
        );
      case "Page Color":
        return (
          <ColorPicker
            label="Page Color"
            value={settings.pageColor}
            onChange={(v) => onChange("pageColor", v)}
          />
        );
      case "Background Color":
        return (
          <ColorPicker
            label="Background Color"
            value={settings.bgColor}
            onChange={(v) => onChange("bgColor", v)}
          />
        );
      case "Text Color":
        return (
          <ColorPicker
            label="Text Color"
            value={settings.textColor}
            onChange={(v) => onChange("textColor", v)}
          />
        );
      case "Font Weight":
        return (
          <FontWeightPicker
            value={settings.fontWeight}
            onChange={(v) => onChange("fontWeight", v)}
          />
        );
    }
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 left-0 z-50 flex w-100 max-w-full flex-col bg-white px-6 py-4 font-['Poppins',sans-serif] transition-[transform,visibility] duration-300 ${
          isOpen ? "visible translate-x-0" : "invisible -translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-['Cormorant_Garamond',serif] text-2xl font-medium text-black">
              Page Configurations
            </h2>
            <div className="mt-2 h-0.5 w-14 bg-black" />
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="p-1 text-black hover:bg-stone-200"
          >
            <X size={28} strokeWidth={1.5} />
          </button>
        </div>

        <div className="mt-6 min-h-0 flex-1 overflow-y-auto">
          {ITEMS.map((item) => (
            <AccordionItem
              key={item}
              title={item}
              isOpen={openItem === item}
              onToggle={() => setOpenItem((cur) => (cur === item ? null : item))}
            >
              {renderContent(item)}
            </AccordionItem>
          ))}
        </div>

        <div className="mt-auto space-y-6 pt-6">
          <button
            type="button"
            onClick={onViewLive}
            className="flex h-11 w-full items-center justify-center gap-2 bg-black text-[15px] font-medium text-fuchsia-600 hover:bg-neutral-900"
          >
            <ExternalLink size={16} />
            View Live Page
          </button>

          <button
            type="button"
            onClick={onRegister}
            className="flex h-11 w-full items-center justify-center gap-2 bg-black text-[15px] font-medium text-fuchsia-600 hover:bg-neutral-900"
          >
            Register Page
            <ArrowRight size={16} />
          </button>
        </div>
      </aside>
    </>
  );
}