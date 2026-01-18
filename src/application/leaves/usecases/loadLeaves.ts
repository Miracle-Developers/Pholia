import type { LeafData } from "@/application/leaves/types";
import * as leaves from "@/infrastructure/leaves";

import { formatLeaf } from "@/application/leaves/usecases/formatLeaf";

export async function loadLeaves(leafIds: number[]): Promise<LeafData[]> {
  const ids = Array.from(new Set(leafIds)).filter((id) => Number.isFinite(id));
  if (!ids.length) return [];

  const apiLeaves = await leaves.getLeaves(ids);
  return apiLeaves.map(formatLeaf);
}
