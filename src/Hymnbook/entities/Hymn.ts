import { Arranger } from "./Arranger";
import { Audio } from "./Audio";
import { Author } from "./Author";
import { Topic } from "./Topic";

export interface Hymn {
  id: number;
  title: string;
  topic: Topic;
  author?: Author;
  arranger?: Arranger;
  release_date: string;
  pdf_file: string;
  audio_set: Audio[];
}
