import type { ApiStatsResponse, ApiUserResponse } from "@/infrastructure/api";
import { extractFileKeyFromUrl } from "@/utils/fileKeyExtractor";
import type { UserProfileData } from "../types";

export const formatUserProfile = (
  apiData: ApiUserResponse,
  stats: ApiStatsResponse = {},
): UserProfileData => {
  return {
    id: apiData.id,
    name: apiData.name || "ユーザー",
    userId: apiData.user_handle || "",
    email: apiData.email || "",
    avatarFileKey: apiData.avatar_url ? extractFileKeyFromUrl(apiData.avatar_url) : null,
    joinDate: apiData.created_at
      ? `${new Date(apiData.created_at).getFullYear()}年${new Date(apiData.created_at).getMonth() + 1}月${new Date(apiData.created_at).getDate()}日から利用しています`
      : "取得できませんでした",
    forestCount: stats.friends_count || 0,
    treeCount: stats.tree_count || 0,
  };
};
