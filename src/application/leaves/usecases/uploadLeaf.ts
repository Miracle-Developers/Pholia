import * as api from "@/infrastructure/api";
import type { ApiLeafResponse } from "@/infrastructure/api";

export type LeafFile = {
  uri: string;
  name: string;
  type: string;
};

export async function uploadLeaf(file: LeafFile): Promise<ApiLeafResponse> {
  try {
    return await api.uploadLeaf(file);
  } catch (error) {
    throw error;
  }
}
