import * as api from "@/infrastructure/api";
import * as auth from "@/infrastructure/auth";
import { toNumber } from "@/utils/number";
import { toRecord } from "@/utils/record";

export type TreeOption = {
  id: number;
  name: string;
  label: string;
  forestId?: number;
  imageUrl?: string;
  leafCount?: number;
};

type ApiStructureLike = {
  forests?: unknown;
  trees?: unknown;
};

const toTreeOption = (
  item: Record<string, unknown>,
  forestName?: string,
  forestId?: number,
): TreeOption | null => {
  const id = toNumber(item.tree_id ?? item.id);
  const name =
    typeof item.tree_name === "string"
      ? item.tree_name
      : typeof item.name === "string"
        ? item.name
        : undefined;
  const resolvedForestId =
    toNumber(item.forest_id ?? item.forestId) ??
    (() => {
      const forest = toRecord(item.forest);
      return forest ? toNumber(forest.id ?? forest.forest_id) : undefined;
    })() ??
    forestId;
  const imageUrl =
    typeof item.cover_image_url === "string"
      ? item.cover_image_url
      : typeof item.image_url === "string"
        ? item.image_url
        : typeof item.imageUrl === "string"
          ? item.imageUrl
          : undefined;

  let resolvedForest = forestName;
  if (!resolvedForest) {
    resolvedForest =
      typeof item.forest_name === "string"
        ? item.forest_name
        : (() => {
          const forest = toRecord(item.forest);
          return forest && typeof forest.name === "string" ? forest.name : undefined;
        })();
  }

  if (typeof id !== "number" || !name) return null;
  const label = resolvedForest ? `${resolvedForest} / ${name}` : name;
  const leaves = Array.isArray(item.leaves) ? item.leaves : [];
  const leafCount = typeof item.leaf_count === "number" ? item.leaf_count : leaves.length;

  return { id, name, label, forestId: resolvedForestId, imageUrl, leafCount };
};

export const collectTrees = (data: unknown, defaultForestId?: number): TreeOption[] => {
  const trees: TreeOption[] = [];

  const addTree = (item: unknown, forestName?: string, forestId?: number) => {
    const record = toRecord(item);
    if (!record) return;
    const option = toTreeOption(record, forestName, forestId ?? defaultForestId);
    if (option) trees.push(option);
  };

  const parseForest = (forest: unknown) => {
    const record = toRecord(forest);
    if (!record) return;
    const forestId = toNumber(record.forest_id ?? record.id);
    const forestName =
      typeof record.name === "string"
        ? record.name
        : typeof record.forest_name === "string"
          ? record.forest_name
          : undefined;
    const forestTrees = record.trees ?? record.tree_list ?? record.treeList;
    if (Array.isArray(forestTrees)) {
      forestTrees.forEach((tree: unknown) => {
        addTree(tree, forestName, forestId);
      });
      return;
    }
    if (forestTrees && typeof forestTrees === "object") {
      const container = forestTrees as Record<string, unknown>;
      const nested =
        container.results ?? container.items ?? container.data ?? container.list ?? container.trees;
      if (Array.isArray(nested)) {
        nested.forEach((tree: unknown) => {
          addTree(tree, forestName, forestId);
        });
        return;
      }
      Object.values(container).forEach((tree: unknown) => {
        addTree(tree, forestName, forestId);
      });
    }
  };

  if (Array.isArray(data)) {
    data.forEach((item: unknown) => {
      const record = toRecord(item);
      if (record && (record.trees || record.tree_list)) {
        parseForest(record);
        return;
      }
      addTree(item, undefined, defaultForestId);
    });
    return trees;
  }

  if (data && typeof data === "object") {
    const structure = data as ApiStructureLike;
    if (Array.isArray(structure.forests)) {
      structure.forests.forEach((forest: unknown) => {
        parseForest(forest);
      });
    }
    if (Array.isArray(structure.trees)) {
      structure.trees.forEach((tree: unknown) => {
        addTree(tree, undefined, defaultForestId);
      });
    }
    if (structure.trees && typeof structure.trees === "object" && !Array.isArray(structure.trees)) {
      const container = structure.trees as Record<string, unknown>;
      const nested =
        container.results ?? container.items ?? container.data ?? container.list ?? container.trees;
      if (Array.isArray(nested)) {
        nested.forEach((tree: unknown) => {
          addTree(tree, undefined, defaultForestId);
        });
      } else {
        Object.values(container).forEach((tree: unknown) => {
          addTree(tree, undefined, defaultForestId);
        });
      }
    }
  }

  return trees;
};

export const loadUserStructure = async (): Promise<TreeOption[]> => {
  await auth.restoreToken();

  let userId = auth.getUserId();
  if (!userId) {
    userId = await auth.restoreUserId();
  }
  if (!userId) return [];

  const structure = await api.getUserStructure(userId);
  const trees = collectTrees(structure);
  return trees;
};
