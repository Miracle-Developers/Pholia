import * as api from "@/infrastructure/api";
import * as auth from "@/infrastructure/auth";
import { toNumber } from "@/utils/number";
import { toRecord } from "@/utils/record";

export type ForestOption = {
  id: number;
  name: string;
  imageUrl?: string;
};

type ApiStructureLike = {
  forests?: unknown;
};

const toForestOption = (item: Record<string, unknown>): ForestOption | null => {
  const id = toNumber(item.forest_id ?? item.id);
  const name =
    typeof item.forest_name === "string"
      ? item.forest_name
      : typeof item.name === "string"
        ? item.name
        : undefined;
  const imageUrl =
    typeof item.image_url === "string"
      ? item.image_url
      : typeof item.imageUrl === "string"
        ? item.imageUrl
        : undefined;

  if (typeof id !== "number" || !name) return null;
  return { id, name, imageUrl };
};

const collectForests = (data: unknown): ForestOption[] => {
  const forests: ForestOption[] = [];

  const addForest = (item: unknown) => {
    const record = toRecord(item);
    if (!record) return;
    const option = toForestOption(record);
    if (option) forests.push(option);
  };

  if (Array.isArray(data)) {
    data.forEach((item: unknown) => {
      addForest(item);
    });
    return forests;
  }

  if (data && typeof data === "object") {
    const structure = data as ApiStructureLike;
    if (Array.isArray(structure.forests)) {
      structure.forests.forEach((forest: unknown) => {
        addForest(forest);
      });
    }
  }

  return forests;
};

export const loadUserForests = async (): Promise<ForestOption[]> => {
  await auth.restoreToken();

  let userId = auth.getUserId();
  if (!userId) {
    userId = await auth.restoreUserId();
  }
  if (!userId) return [];

  const forests = await api.getUserStructure(userId);
  return collectForests(forests);
};
