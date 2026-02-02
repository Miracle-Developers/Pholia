import * as api from "@/infrastructure/api";

export const loadTree = async (treeId: number) => {
  return api.getTree(treeId);
};
