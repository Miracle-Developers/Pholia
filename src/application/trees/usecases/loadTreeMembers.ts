import * as api from "@/infrastructure/api";

export type TreeMember = {
  id?: number;
  userId?: number;
  role?: string;
  createdAt?: string;
};

export const loadTreeMembers = async (treeId: number): Promise<TreeMember[]> => {
  const data = await api.getTreeMembers(treeId);
  if (!Array.isArray(data)) return [];
  return data.map((item) => ({
    id: item.id,
    userId: item.user_id,
    role: item.role,
    createdAt: item.created_at,
  }));
};
