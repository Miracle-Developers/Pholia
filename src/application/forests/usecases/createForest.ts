import * as api from "@/infrastructure/api";
import * as auth from "@/infrastructure/auth";

export type CreateForestInput = {
  name: string;
  sortOrder?: number;
};

export const createForest = async ({ name, sortOrder }: CreateForestInput) => {
  await auth.restoreToken();
  let userId = auth.getUserId();
  if (!userId) {
    userId = await auth.restoreUserId();
  }
  if (!userId) {
    throw new Error("ユーザーIDが見つかりません");
  }
  return api.createForest(userId, { name, sort_order: sortOrder });
};
