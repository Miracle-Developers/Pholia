import * as api from "@/infrastructure/api";

export type AddTreeMemberInput = {
  treeId: number;
  userId: number;
  role: string;
};

export const addTreeMember = async ({ treeId, userId, role }: AddTreeMemberInput) => {
  return api.addTreeMember(treeId, { user_id: userId, role });
};
