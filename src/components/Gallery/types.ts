export type Folder = { id: string; name: string };

export type GalleryImage = {
  id: string;
  folderId: string | null; 
  src: string;
};

export type GalleryData = {
  enabled: boolean;
  title: string;
  folders: Folder[];
  images: GalleryImage[];
};