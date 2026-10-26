import { useEffect, useState } from "react";

export type PageSettings = {
  sections: string[];
  pageColor: string;
  bgColor: string;
  textColor: string;
  fontWeight: number;
};

export type UpdateSetting = <K extends keyof PageSettings>(
  key: K,
  value: PageSettings[K]
) => void;

const STORAGE_KEY = "page-settings";

const DEFAULTS: PageSettings = {
  sections: ["Header", "About", "Gallery", "Contact"],
  pageColor: "#FFFFFF",
  bgColor: "#F5F5F4",
  textColor: "#000000",
  fontWeight: 300,
};

export function usePageSettings() {
  const [settings, setSettings] = useState<PageSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...DEFAULTS, ...JSON.parse(saved) } : DEFAULTS;
    } catch {
      return DEFAULTS;
    }
  });

  // Har badlaw par browser mein save
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* storage band ho to koi masla nahi */
    }
  }, [settings]);

  // Poori website par lagao (CSS variables ke zariye)
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--page-color", settings.pageColor);
    root.style.setProperty("--bg-color", settings.bgColor);
    root.style.setProperty("--text-color", settings.textColor);
    root.style.setProperty("--font-weight", String(settings.fontWeight));
  }, [settings]);

  const update: UpdateSetting = (key, value) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  return { settings, update };
}