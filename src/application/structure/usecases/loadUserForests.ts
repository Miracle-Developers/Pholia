import * as api from "@/infrastructure/api";
import * as auth from "@/infrastructure/auth";

export type ForestOption = {
  id: number;
  name: string;
};

type ApiStructureLike = {
  forests?: unknown;
};

const toRecord = (value: unknown): Record<string, unknown> | null => {
  if (!value || typeof value !== "object") return null;
  return value as Record<string, unknown>;
};

const toForestOption = (item: Record<string, unknown>): ForestOption | null => {
  const id =
    typeof item.forest_id === "number"
      ? item.forest_id
      : typeof item.id === "number"
        ? item.id
        : undefined;
  const name =
    typeof item.forest_name === "string"
      ? item.forest_name
      : typeof item.name === "string"
        ? item.name
        : undefined;

  if (typeof id !== "number" || !name) return null;
  return { id, name };
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

  const forests = await api.getUserForests(userId);
  return collectForests(forests);
};
