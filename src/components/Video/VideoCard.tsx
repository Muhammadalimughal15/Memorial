import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { getVideo } from "../../utils/videoDB";
import type { VideoItem } from "./types";

type VideoCardProps = {
  video: VideoItem;
  onDelete: () => void;
};

export default function VideoCard({ video, onDelete }: VideoCardProps) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let url: string | null = null;
    let cancelled = false;

    getVideo(video.id)
      .then((blob) => {
        if (!blob || cancelled) return;
        url = URL.createObjectURL(blob);
        setSrc(url);
      })
      .catch(() => setSrc(null));

    return () => {
      cancelled = true;
      if (url) URL.revokeObjectURL(url);
    };
  }, [video.id]);

  return (
    <li className="min-w-0 shadow-[0_8px_24px_rgba(0,0,0,0.18)]">
      <div className="relative aspect-video bg-black">
        {src ? (
          <video src={src} controls preload="metadata" className="h-full w-full" />
        ) : (
          <p className="flex h-full items-center justify-center text-sm text-white">
            Loading...
          </p>
        )}
        <button
          type="button"
          onClick={onDelete}
          aria-label={`Delete ${video.name}`}
          className="absolute right-2 top-2 flex h-8 w-8 cursor-pointer items-center justify-center bg-white/90 text-red-500 hover:bg-white"
        >
          <Trash2 size={16} />
        </button>
      </div>
      <p className="truncate px-3 py-2 text-sm">{video.name}</p>
    </li>
  );
}