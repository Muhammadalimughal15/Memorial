export type FavouriteItem = { id: string; question: string; answer: string };

export type FavouriteData = {
  enabled: boolean;
  title: string;
  items: FavouriteItem[];
};