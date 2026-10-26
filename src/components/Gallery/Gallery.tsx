import { useRef, useState, type ChangeEvent } from "react";
import { ImageIcon } from "lucide-react";
import SectionHeader from "../SectionHeader";
import ThemedButton from "../ui/ThemedButton";
import FolderBar from "./FolderBar";
import ImageGrid from "./ImageGrid";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { compressImage } from "../../utils/compressImage";
import type { GalleryData } from "./types";

const DEFAULT_DATA: GalleryData = {
  enabled: false,
  title: "Gallery",
  folders: [],
  images: [],
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function Gallery() {
  const [data, setData] = useLocalStorage<GalleryData>("gallery-section", DEFAULT_DATA);
  const [activeFolder, setActiveFolder] = useState<string | null>(null); // null = All
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const visibleImages =
    activeFolder === null
      ? data.images
      : data.images.filter((img) => img.folderId === activeFolder);

  const addFolder = () => {
    const folder = { id: crypto.randomUUID(), name: "New Folder" };
    setData((prev) => ({ ...prev, folders: [...prev.folders, folder] }));
    setActiveFolder(folder.id);
  };

  const renameFolder = (id: string, name: string) =>
    setData((prev) => ({
      ...prev,
      folders: prev.folders.map((f) => (f.id === id ? { ...f, name } : f)),
    }));

  // Folder delete hone par us ki images delete nahi hotin, "All" mein chali jati hain
  const deleteFolder = (id: string) => {
    setData((prev) => ({
      ...prev,
      folders: prev.folders.filter((f) => f.id !== id),
      images: prev.images.map((img) =>
        img.folderId === id ? { ...img, folderId: null } : img
      ),
    }));
    setActiveFolder((current) => (current === id ? null : current));
  };

  const deleteImage = (id: string) =>
    setData((prev) => ({ ...prev, images: prev.images.filter((img) => img.id !== id) }));

  const onFilesChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (files.length === 0) return;

    const valid = files.filter(
      (f) => f.type.startsWith("image/") && f.size <= MAX_FILE_SIZE
    );
    setError(
      valid.length !== files.length
        ? "Only image files up to 5 MB can be added."
        : ""
    );

    try {
      const sources = await Promise.all(valid.map((f) => compressImage(f, 900, 0.7)));
      const newImages = sources.map((src) => ({
        id: crypto.randomUUID(),
        folderId: activeFolder,
        src,
      }));
      setData((prev) => ({ ...prev, images: [...prev.images, ...newImages] }));
    } catch {
      setError("Could not load an image. Please try another one.");
    }
  };

  return (
    <section aria-label="Gallery">
      <SectionHeader
        title={data.title}
        onTitleChange={(title) => setData((prev) => ({ ...prev, title }))}
        enabled={data.enabled}
        onToggle={(enabled) => setData((prev) => ({ ...prev, enabled }))}
      />

      {data.enabled && (
        <div className="mt-10 space-y-12">
          <FolderBar
            folders={data.folders}
            activeId={activeFolder}
            onSelect={setActiveFolder}
            onRename={renameFolder}
            onDelete={deleteFolder}
            onAdd={addFolder}
          />

          <div className="space-y-3">
            <ThemedButton
              size="md"
              onClick={() => fileRef.current?.click()}
              icon={<ImageIcon size={16} />}
            >
              Add Image
            </ThemedButton>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={onFilesChange}
            />
            {error && (
              <p role="alert" className="text-sm">
                {error}
              </p>
            )}
          </div>

          <ImageGrid images={visibleImages} onDelete={deleteImage} />
        </div>
      )}
    </section>
  );
}