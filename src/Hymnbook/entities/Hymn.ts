import Audio from "./Audio";
import Collaborator from "./Collaborator";

export default interface Hymn {
  slug: string;
  title: string;
  topics: string[];
  authors: Collaborator[];
  arrangers: Collaborator[];
  transcribers: Collaborator[];
  translators: Collaborator[];
  release_date: string;
  pdf_file: string;
  notes?: string;
  audio_files: Audio[];
}
