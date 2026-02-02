import * as api from "@/infrastructure/api";

export const loadForest = async (forestId: number) => {
  return api.getForest(forestId);
};
