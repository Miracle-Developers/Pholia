import * as api from "@/infrastructure/api";
import type { ApiLeafResponse } from "@/infrastructure/api";

export type LeafFile = {
  uri: string;
  name: string;
  type: string;
};

export async function uploadLeaf(file: LeafFile, treeId?: number): Promise<ApiLeafResponse> {
  try {
    return await api.uploadLeaf(file, treeId);
  } catch (error) {
    throw error;
  }
}
