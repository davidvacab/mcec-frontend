export default interface HymnListItem {
  slug: string;
  title: string;
  topics: string[];
  release_date: string;
  pdf_file: string;
  audios?: number[];
}
