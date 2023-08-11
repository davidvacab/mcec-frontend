export const MemberRoleList = [
  { key: "CM", value: "Choir member" },
  { key: "LD", value: "Local director" },
  { key: "SD", value: "State Director" },
  { key: "NM", value: "Non choir member" },
] as const;

const MemberRoles = MemberRoleList.map((role) => role.key);

export default MemberRoles;
