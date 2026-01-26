import * as auth from "@/infrastructure/auth";
import * as api from "@/infrastructure/api";

export type TreeOption = {
  id: number;
  name: string;
  label: string;
};

type ApiTreeLike = {
  id?: number;
  tree_id?: number;
  name?: string;
  tree_name?: string;
  forest_name?: string;
  forest?: { name?: string };
  trees?: unknown;
};

type ApiStructureLike = {
  forests?: unknown;
  trees?: unknown;
};

const toTreeOption = (item: ApiTreeLike, forestName?: string): TreeOption | null => {
  const id = item.tree_id ?? item.id;
  const name = item.tree_name ?? item.name;
  const resolvedForest = forestName ?? item.forest_name ?? item.forest?.name;
  if (typeof id !== "number" || !name) return null;
  const label = resolvedForest ? `${resolvedForest} / ${name}` : name;
  return { id, name, label };
};

const collectTrees = (data: unknown): TreeOption[] => {
  const trees: TreeOption[] = [];

  const addTree = (item: ApiTreeLike, forestName?: string) => {
    const option = toTreeOption(item, forestName);
    if (option) trees.push(option);
  };

  const parseForest = (forest: any) => {
    const forestName = forest?.name ?? forest?.forest_name;
    const forestTrees = forest?.trees ?? forest?.tree_list;
    if (Array.isArray(forestTrees)) {
      forestTrees.forEach((tree: any) => {
        addTree(tree, forestName);
      });
    }
  };

  if (Array.isArray(data)) {
    data.forEach((item: any) => {
      if (item?.trees || item?.tree_list) {
        parseForest(item);
      } else {
        addTree(item);
      }
    });
    return trees;
  }

  if (data && typeof data === "object") {
    const structure = data as ApiStructureLike;
    if (Array.isArray(structure.forests)) {
      structure.forests.forEach((forest: any) => {
        parseForest(forest);
      });
    }
    if (Array.isArray(structure.trees)) {
      structure.trees.forEach((tree: any) => {
        addTree(tree);
      });
    }
  }

  return trees;
};

export async function loadUserStructure(): Promise<TreeOption[]> {
  await auth.restoreToken();

  let userId = auth.getUserId();
  if (!userId) {
    userId = await auth.restoreUserId();
  }
  if (!userId) return [];

  const structure = await api.getUserStructure(userId);
  return collectTrees(structure);
}
