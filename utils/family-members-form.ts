import {
  FamilyMembersDTO,
  FamilyMembersFormValues,
} from "@/types/family-members";

export const formFamilyMembersDefault = {
  user_id: "",
  father_id: "",
};
export function familyMembersToFormValues(
  familyMembers: FamilyMembersDTO,
): FamilyMembersFormValues {
  return {
    user_id: familyMembers.user_id,
    father_id: familyMembers.father_id,
  };
}
