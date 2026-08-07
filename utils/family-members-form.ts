import {
  IFamilyMembersDTO,
  IFamilyMembersFormValues,
} from "@/types/family-members";

export const formFamilyMembersDefault = {
  user_id: "",
  parent_couple_id: "",
};
export function familyMembersToFormValues(
  familyMembers: IFamilyMembersDTO,
): IFamilyMembersFormValues {
  return {
    user_id: familyMembers.user_id,
    parent_couple_id: familyMembers.parent_couple_id,
  };
}
