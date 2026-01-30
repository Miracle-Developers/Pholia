import { updateProfile } from "./updateProfile";
import { type AvatarFile, uploadAvatar } from "./uploadAvatar";

export const updateAvatarProfile = async (
  userId: string,
  file: AvatarFile,
): Promise<{ file_key: string }> => {
  // アバター画像をアップロード
  const response = await uploadAvatar(userId, file);

  if (!response?.file_key) {
    throw new Error("画像のアップロードに失敗しました");
  }

  // プロフィールに反映
  await updateProfile(userId, { avatar_url: response.file_key });

  return response;
};
