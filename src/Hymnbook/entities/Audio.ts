import AudioVoiceTypeKeys from "./AudioVoiceTypes";

export default interface Audio {
  id: number;
  voice_type: (typeof AudioVoiceTypeKeys)[number];
  audio_file: string;
}
