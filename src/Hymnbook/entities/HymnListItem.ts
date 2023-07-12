export interface HymnListItem {
  id: number;
  title: string;
  topic: number;
  release_date: string;
  pdf_file: string;
  audio_set?: number[];
}
