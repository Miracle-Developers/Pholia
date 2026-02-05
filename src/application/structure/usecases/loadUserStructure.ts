import * as api from "@/infrastructure/api";
import * as auth from "@/infrastructure/auth";
import { toRecord } from "@/utils/record";

export type TreeOption = {
  id: number;
  name: string;
  label: string;
};

type ApiStructureLike = {
  forests?: unknown;
  trees?: unknown;
};

const toTreeOption = (item: Record<string, unknown>, forestName?: string): TreeOption | null => {
  const id =
    typeof item.tree_id === "number"
      ? item.tree_id
      : typeof item.id === "number"
        ? item.id
        : undefined;
  const name =
    typeof item.tree_name === "string"
      ? item.tree_name
      : typeof item.name === "string"
        ? item.name
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
  return { id, name, label };
};

const collectTrees = (data: unknown): TreeOption[] => {
  const trees: TreeOption[] = [];

  const addTree = (item: unknown, forestName?: string) => {
    const record = toRecord(item);
    if (!record) return;
    const option = toTreeOption(record, forestName);
    if (option) trees.push(option);
  };

  const parseForest = (forest: unknown) => {
    const record = toRecord(forest);
    if (!record) return;
    const forestName =
      typeof record.name === "string"
        ? record.name
        : typeof record.forest_name === "string"
          ? record.forest_name
          : undefined;
    const forestTrees = record.trees ?? record.tree_list;
    if (Array.isArray(forestTrees)) {
      forestTrees.forEach((tree: unknown) => {
        addTree(tree, forestName);
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
      addTree(item);
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
        addTree(tree);
      });
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
  return collectTrees(structure);
};
