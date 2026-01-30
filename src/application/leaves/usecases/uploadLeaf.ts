import type { ApiLeafResponse } from "@/infrastructure/api";
import * as api from "@/infrastructure/api";

export type LeafFile = {
  uri: string;
  name: string;
  type: string;
};

export const uploadLeaf = async (file: LeafFile, treeId?: number): Promise<ApiLeafResponse> => {
  return api.uploadLeaf(file, treeId);
};
