export type Folder = { id: string; name: string };

export type GalleryImage = {
  id: string;
  folderId: string | null; // null = kisi folder mein nahi (sirf "All" mein dikhegi)
  src: string;
};

export type GalleryData = {
  enabled: boolean;
  title: string;
  folders: Folder[];
  images: GalleryImage[];
};