import type { LeafData } from "@/application/leaves/types";
import { formatLeaf } from "@/application/leaves/usecases/formatLeaf";
import * as api from "@/infrastructure/api";
import * as auth from "@/infrastructure/auth";
import type { ApiLeafResponse } from "@/infrastructure/api";
import { toNumber } from "@/utils/number";
import { toRecord } from "@/utils/record";

type ApiStructureLike = {
  forests?: unknown;
  trees?: unknown;
  leaves?: unknown;
};

const toLeafResponse = (
  item: Record<string, unknown>,
  treeId?: number,
  treeName?: string,
): (ApiLeafResponse & { tree_name?: string }) | null => {
  const id = toNumber(item.leaf_id ?? item.id);
  const resolvedTreeId = toNumber(item.tree_id ?? item.treeId ?? treeId);

  if (typeof id !== "number" || typeof resolvedTreeId !== "number") return null;

  const createdAt =
    typeof item.created_at === "string"
      ? item.created_at
      : typeof item.createdAt === "string"
        ? item.createdAt
        : "";
  const takenAt =
    typeof item.taken_at === "string"
      ? item.taken_at
      : typeof item.takenAt === "string"
        ? item.takenAt
        : createdAt;

  const fileKey =
    typeof item.file_key === "string"
      ? item.file_key
      : typeof item.fileKey === "string"
        ? item.fileKey
        : typeof item.r2_key === "string"
          ? item.r2_key
          : "";

  const r2Url =
    typeof item.r2_url === "string"
      ? item.r2_url
      : typeof item.cover_image_url === "string"
        ? item.cover_image_url
      : typeof item.image_url === "string"
        ? item.image_url
      : typeof item.imageUrl === "string"
          ? item.imageUrl
          : typeof item.url === "string"
            ? item.url
            : null;

  const caption =
    typeof item.caption === "string"
      ? item.caption
      : typeof item.title === "string"
        ? item.title
        : typeof item.name === "string"
          ? item.name
        : "";
  const locationText =
    typeof item.location_text === "string"
      ? item.location_text
      : typeof item.locationText === "string"
        ? item.locationText
        : undefined;

  const uploaderId = toNumber(item.uploader_id ?? item.uploaded_by);

  return {
    id,
    tree_id: resolvedTreeId,
    uploader_id: uploaderId,
    file_key: fileKey,
    r2_key: typeof item.r2_key === "string" ? item.r2_key : undefined,
    r2_url: r2Url,
    caption,
    taken_at: takenAt,
    created_at: createdAt,
    tree_name: treeName,
    location_text: locationText,
  };
};

const collectLeaves = (data: unknown): LeafData[] => {
  const map = new Map<number, LeafData>();

  const addLeaf = (item: unknown, treeId?: number, treeName?: string) => {
    const record = toRecord(item);
    if (!record) return;
    const response = toLeafResponse(record, treeId, treeName);
    if (!response) return;
    const leaf = formatLeaf(response);
    map.set(leaf.id, leaf);
  };

  const parseTree = (tree: unknown) => {
    const record = toRecord(tree);
    if (!record) return;
    const treeId = toNumber(record.tree_id ?? record.id);
    const treeName =
      typeof record.name === "string"
        ? record.name
        : typeof record.tree_name === "string"
          ? record.tree_name
          : undefined;
    const treeLeaves = record.leaves ?? record.leaf_list ?? record.leafList;
    if (Array.isArray(treeLeaves)) {
      treeLeaves.forEach((leaf: unknown) => {
        addLeaf(leaf, treeId, treeName);
      });
    }
  };

  const parseForest = (forest: unknown) => {
    const record = toRecord(forest);
    if (!record) return;
    const forestTrees = record.trees ?? record.tree_list ?? record.treeList;
    if (Array.isArray(forestTrees)) {
      forestTrees.forEach((tree: unknown) => {
        parseTree(tree);
      });
    }
  };

  if (Array.isArray(data)) {
    data.forEach((item: unknown) => {
      const record = toRecord(item);
      if (!record) return;
      if (record.trees || record.tree_list || record.treeList) {
        parseForest(record);
        return;
      }
      if (record.leaves || record.leaf_list || record.leafList) {
        parseTree(record);
        return;
      }
      addLeaf(record);
    });
    return Array.from(map.values());
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
        parseTree(tree);
      });
    }
    if (Array.isArray(structure.leaves)) {
      structure.leaves.forEach((leaf: unknown) => {
        addLeaf(leaf);
      });
    }
  }

  return Array.from(map.values());
};

export const loadLeavesFromStructure = async (treeId?: number): Promise<LeafData[]> => {
  await auth.restoreToken();

  let userId = auth.getUserId();
  if (!userId) {
    userId = await auth.restoreUserId();
  }
  if (!userId) return [];

  const structure = treeId
    ? await api.getUserStructure(userId, { filter: "leaves", treeId })
    : await api.getUserStructure(userId);
  return collectLeaves(structure);
};
