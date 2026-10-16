export type Platform = 'instagram' | 'facebook' | 'youtube';

export interface ReelItem {
  id: string;
  originalUrl: string;
  embedUrl: string;
  platform: Platform;
  code: string;
  title: string;
  date: string;
  caption?: string;
  isFavorite?: boolean;
}

export type FilterCategory = 'all' | 'instagram' | 'facebook' | 'youtube' | 'favorites';

export type ColumnCount = 2 | 3 | 4 | 5;

export type SortMode = 'newest' | 'oldest' | 'default';
