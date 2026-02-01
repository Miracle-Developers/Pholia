import * as api from "@/infrastructure/api";

export type CreateTreeInput = {
  forestId: number;
  name: string;
};

export const createTree = async ({ forestId, name }: CreateTreeInput) => {
  return api.createTree({ forest_id: forestId, name });
};
