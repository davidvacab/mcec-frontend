export const MemberVoiceTypeList = [
  { key: "S1", value: "Soprano 1" },
  { key: "S2", value: "Soprano 2" },
  { key: "A1", value: "Alto 1" },
  { key: "A2", value: "Alto 2" },
  { key: "T1", value: "Tenor 1" },
  { key: "T2", value: "Tenor 2" },
  { key: "B1", value: "Bajo 1" },
  { key: "B2", value: "Bajo 2" },
] as const;

const MemberVoiceTypes = MemberVoiceTypeList.map((voiceType) => voiceType.key);

export default MemberVoiceTypes;
