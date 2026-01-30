import type { UserProfile } from "@/application/profile/types";
import type { ApiStatsResponse, ApiUserResponse } from "@/infrastructure/api";
import * as api from "@/infrastructure/api";
import { getApiBaseUrl } from "@/utils/apiBaseUrl";

/**
 * ユーザープロフィール情報を取得
 */
export const loadUserProfile = async (userId: string): Promise<ApiUserResponse | null> => {
  try {
    const userData = (await api.getUser(userId)) as ApiUserResponse;
    if (!userData) return null;
    return userData;
  } catch (error) {
    console.error("Failed to load user profile:", error);
    return null;
  }
};

/**
 * ユーザーの統計情報を取得
 */
export const getUserStats = async (userId: string): Promise<ApiStatsResponse> => {
  try {
    return (await api.getUserStats(userId)) as ApiStatsResponse;
  } catch (error) {
    console.warn("Failed to load user stats:", error);
    return {};
  }
};

/**
 * ユーザー情報を更新
 */
export const updateUser = async (userId: string, data: Record<string, unknown>): Promise<void> => {
  try {
    await api.updateUser(userId, data);
  } catch (error) {
    console.error("Failed to update user:", error);
    throw error;
  }
};

/**
 * プロフィール画像をアップロード
 */
export const uploadProfileAvatar = async (
  userId: string,
  file: {
    uri: string;
    name: string;
    type: string;
  },
): Promise<string | null> => {
  try {
    const response = await api.uploadAvatar(userId, file);
    return response.file_key || null;
  } catch (error) {
    console.error("Failed to upload avatar:", error);
    throw error;
  }
};

/**
 * アカウントを削除
 */
export const deleteAccount = async (userId: string): Promise<boolean> => {
  try {
    await api.deleteUser(userId);
    return true;
  } catch (error) {
    console.error("Failed to delete account:", error);
    throw error;
  }
};

/**
 * プロフィール画像のURLを取得
 */
export const getAvatarUrl = (avatarFileKey: string | null): string | null => {
  if (!avatarFileKey) return null;
  const baseUrl = getApiBaseUrl();
  if (!baseUrl) return null;
  return `${baseUrl}/files/${avatarFileKey}`;
};

export default {
  loadUserProfile,
  getUserStats,
  updateUser,
  uploadProfileAvatar,
  deleteAccount,
  getAvatarUrl,
};

export type { UserProfile };
