import {
  getCachedProfile,
  setCachedProfile,
} from "@/application/profile/state/cachedProfile";
import * as auth from "@/infrastructure/auth";
import * as profile from "@/infrastructure/profile";
import { UserProfileData } from "../types";
import { formatUserProfile } from "./formatUserProfile";

export { UserProfileData };

export const loadProfile = async (
  forceReload = false,
): Promise<UserProfileData | null> => {
  if (!forceReload) {
    const cached = getCachedProfile();
    if (cached) return cached;
  }

  // トークンを先に復元
  await auth.restoreToken();

  let userId = auth.getUserId();
  if (!userId) {
    userId = await auth.restoreUserId();
  }

  if (!userId) {
    console.warn("ユーザーIDが見つかりません");
    return null;
  }

  const userData = await profile.loadUserProfile(userId);
  if (!userData) {
    return null;
  }

  const stats = await profile.getUserStats(userId);

  const result = formatUserProfile(userData, stats);
  setCachedProfile(result);
  return result;
};
