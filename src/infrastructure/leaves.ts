import * as api from "@/infrastructure/api";
import type { ApiLeafResponse } from "@/infrastructure/api";

export async function getLeaf(id: number): Promise<ApiLeafResponse | null> {
  try {
    return (await api.getLeaf(id)) as ApiLeafResponse;
  } catch (error) {
    console.warn("Failed to load leaf:", error);
    return null;
  }
}

export async function getLeaves(ids: number[]): Promise<ApiLeafResponse[]> {
  const results = await Promise.all(ids.map((id) => getLeaf(id)));
  return results.filter((leaf): leaf is ApiLeafResponse => Boolean(leaf));
}
