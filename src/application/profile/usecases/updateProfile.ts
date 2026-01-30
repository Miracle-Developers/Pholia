import * as profile from "@/infrastructure/profile";

export const updateProfile = async (
  userId: string,
  data: {
    name?: string;
    user_handle?: string;
    email?: string;
    avatar_url?: string | null;
  },
): Promise<void> => {
  await profile.updateUser(userId, data);
};

export const updatePassword = async (
  userId: string,
  _currentPassword: string,
  newPassword: string,
): Promise<void> => {
  // バックエンドはBearerトークンで認証し、currentPasswordは不要
  await profile.updateUser(userId, { password: newPassword });
};

export const deleteAccount = async (userId: string): Promise<void> => {
  await profile.deleteAccount(userId);
};

export const getAvatarUrl = (fileKey: string | null): string | null => {
  if (!fileKey) return null;
  return profile.getAvatarUrl(fileKey);
};
