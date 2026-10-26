export type Memory = {
  id: string;
  name: string;
  email: string;
  message: string;
  photos: string[];
  date: string;
};

export type MemoryWallData = {
  enabled: boolean;
  title: string;
  memories: Memory[];
};