export type VideoItem = { id: string; name: string };

export type VideoData = {
  enabled: boolean;
  title: string;
  videos: VideoItem[];
};
