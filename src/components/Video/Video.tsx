import { useRef, useState, type ChangeEvent } from "react";
import SectionHeader from "../SectionHeader";
import ThemedButton from "../ui/ThemedButton";
import VideoCard from "./VideoCard";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { saveVideo, deleteVideo } from "../../utils/videoDB";
import type { VideoData, VideoItem } from "./types";

const DEFAULT_DATA: VideoData = { enabled: false, title: "Video", videos: [] };
const MAX_SIZE = 200 * 1024 * 1024; // 200 MB

export default function Video() {
  const [data, setData] = useLocalStorage<VideoData>("video-section", DEFAULT_DATA);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const onFilesChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (files.length === 0) return;

    const valid = files.filter((f) => f.type.startsWith("video/") && f.size <= MAX_SIZE);
    setError(
      valid.length !== files.length ? "Only video files up to 200 MB can be added." : ""
    );

    try {
      const added: VideoItem[] = [];
      for (const file of valid) {
        const id = crypto.randomUUID();
        await saveVideo(id, file);
        added.push({ id, name: file.name });
      }
      setData((prev) => ({ ...prev, videos: [...prev.videos, ...added] }));
    } catch {
      setError("Could not save the video. Your browser storage may be full.");
    }
  };

  const removeVideo = async (id: string) => {
    try {
      await deleteVideo(id);
    } catch {
      /* agar delete na ho to bhi list se hata do */
    }
    setData((prev) => ({ ...prev, videos: prev.videos.filter((v) => v.id !== id) }));
  };

  return (
    <section aria-label="Video">
      <SectionHeader
        title={data.title}
        onTitleChange={(title) => setData((prev) => ({ ...prev, title }))}
        enabled={data.enabled}
        onToggle={(enabled) => setData((prev) => ({ ...prev, enabled }))}
      />

      {data.enabled && (
        <div className="mt-10 space-y-12">
          <div className="space-y-3">
            <ThemedButton size="md" onClick={() => fileRef.current?.click()}>
              Add Videos
            </ThemedButton>
            <input
              ref={fileRef}
              type="file"
              accept="video/*"
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

          {data.videos.length > 0 && (
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.videos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onDelete={() => removeVideo(video.id)}
                />
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}