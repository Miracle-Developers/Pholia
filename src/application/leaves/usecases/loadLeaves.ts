import type { LeafData } from "@/application/leaves/types";
import { formatLeaf } from "@/application/leaves/usecases/formatLeaf";
import * as leaves from "@/infrastructure/leaves";

export const loadLeaves = async (leafIds: number[]): Promise<LeafData[]> => {
  const ids = Array.from(new Set(leafIds)).filter((id) => Number.isFinite(id));
  if (!ids.length) return [];

  const apiLeaves = await leaves.getLeaves(ids);
  return apiLeaves.map(formatLeaf);
};
