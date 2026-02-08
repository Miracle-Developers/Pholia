import * as api from "@/infrastructure/api";
import * as auth from "@/infrastructure/auth";

import type { TreeOption } from "@/application/structure/usecases/loadUserStructure";
import { collectTrees } from "@/application/structure/usecases/loadUserStructure";

export const loadUserTrees = async (forestId?: number): Promise<TreeOption[]> => {
  await auth.restoreToken();

  let userId = auth.getUserId();
  if (!userId) {
    userId = await auth.restoreUserId();
  }
  if (!userId) return [];

  const structure = await api.getUserStructure(userId, {
    filter: "trees",
    forestId,
  });
  let trees = collectTrees(structure, forestId);
  if (forestId && trees.length === 0) {
    const full = await api.getUserStructure(userId);
    trees = collectTrees(full, forestId).filter((tree) => tree.forestId === forestId);
    if (typeof __DEV__ !== "undefined" && __DEV__) {
      console.log("loadUserTrees fallback", {
        userId,
        forestId,
        fallbackCount: trees.length,
        fullType: Array.isArray(full) ? "array" : typeof full,
      });
    }
  }
  if (typeof __DEV__ !== "undefined" && __DEV__) {
    console.log("loadUserTrees", {
      userId,
      forestId,
      responseType: Array.isArray(structure) ? "array" : typeof structure,
      treeCount: trees.length,
    });
  }
  return trees;
};
