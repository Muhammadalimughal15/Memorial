import { Trash2 } from "lucide-react";
import type { GalleryImage } from "./types";

type ImageGridProps = {
  images: GalleryImage[];
  onDelete: (id: string) => void;
};

export default function ImageGrid({ images, onDelete }: ImageGridProps) {
  if (images.length === 0) return null;

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {images.map((img) => (
        <li
          key={img.id}
          className="relative aspect-square overflow-hidden border border-[color:var(--text-color)]"
        >
          <img src={img.src} alt="" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={() => onDelete(img.id)}
            aria-label="Delete image"
            className="absolute right-2 top-2 flex h-8 w-8 cursor-pointer items-center justify-center bg-white/90 text-red-500 hover:bg-white"
          >
            <Trash2 size={16} />
          </button>
        </li>
      ))}
    </ul>
  );
}