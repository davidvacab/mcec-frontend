export const AudioVoiceTypeList = [
  { key: "S0", value: "Soprano" },
  { key: "S1", value: "Soprano 1" },
  { key: "S2", value: "Soprano 2" },
  { key: "A0", value: "Alto" },
  { key: "A1", value: "Alto 1" },
  { key: "A2", value: "Alto 2" },
  { key: "T0", value: "Tenor" },
  { key: "T1", value: "Tenor 1" },
  { key: "T2", value: "Tenor 2" },
  { key: "B0", value: "Bass" },
  { key: "B1", value: "Bass 1" },
  { key: "B2", value: "Bass 2" },
  { key: "I0", value: "Solo" },
  { key: "I1", value: "Solo 1" },
  { key: "I2", value: "Solo 2" },
  { key: "EV", value: "SATB" },
] as const;

const AudioVoiceTypeKeys = AudioVoiceTypeList.map((voiceType) => voiceType.key);

export default AudioVoiceTypeKeys;
