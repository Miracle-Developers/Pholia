import * as ImagePicker from "expo-image-picker";
import { useCallback, useState } from "react";

import { uploadLeaf } from "@/application/leaves/usecases";
import { useToast } from "@/hooks/useToast";
import * as auth from "@/infrastructure/auth";

const getFileName = (asset: ImagePicker.ImagePickerAsset) => {
  if (asset.fileName) return asset.fileName;
  const uriParts = asset.uri.split("/");
  const name = uriParts[uriParts.length - 1];
  if (name?.includes(".")) return name;
  return `leaf-${Date.now()}.jpg`;
};

export const useLeafUpload = () => {
  const { showToast } = useToast();
  const [selectedPhotos, setSelectedPhotos] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const selectPhoto = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      showToast({
        title: "写真へのアクセスが必要です",
        message: "フォトライブラリの許可をオンにしてください。",
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.9,
      allowsMultipleSelection: true,
      selectionLimit: 10,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedPhotos(result.assets);
      if (result.assets.length > 1) {
        showToast({ title: "選択完了", message: `${result.assets.length}枚の写真を選択しました` });
      }
    }
  }, [showToast]);

  const upload = useCallback(
    async (treeId?: number) => {
      if (selectedPhotos.length === 0) {
        showToast({
          title: "写真が未選択です",
          message: "アップロードする写真を選んでください。",
        });
        return false;
      }
      if (isUploading) return false;

      await auth.restoreToken();
      const token = auth.getToken();
      if (!token) {
        showToast({
          title: "ログインが必要です",
          message: "再ログインしてからアップロードしてください。",
        });
        return false;
      }

      setIsUploading(true);
      let successCount = 0;
      let failureCount = 0;

      try {
        for (const photo of selectedPhotos) {
          const name = getFileName(photo);
          const type = photo.mimeType || "image/jpeg";
          try {
            await uploadLeaf(
              {
                uri: photo.uri,
                name,
                type,
              },
              treeId,
            );
            successCount++;
          } catch (error) {
            console.warn(`Leaf upload failed for ${name}:`, error);
            failureCount++;
          }
        }

        if (successCount === 0) {
          showToast({ title: "アップロード失敗", message: "全てのアップロードに失敗しました。" });
          return false;
        } else if (failureCount > 0) {
          showToast({ title: "完了", message: `${successCount}枚成功、${failureCount}枚失敗しました` });
          setSelectedPhotos([]); // 部分的成功でもクリア
          return true;
        } else {
          showToast({ title: "アップロード完了", message: `${successCount}枚の写真を追加しました。` });
          setSelectedPhotos([]);
          return true;
        }

      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (message.includes("401")) {
          showToast({ title: "認証エラー", message: "ログインが切れています。" });
        } else {
          showToast({ title: "アップロード失敗", message: "時間をおいて再度お試しください。" });
        }
        console.warn("Leaf upload failed:", error);
        return false;
      } finally {
        setIsUploading(false);
      }
    },
    [isUploading, selectedPhotos, showToast],
  );

  return {
    selectedPhotos,
    photoCount: selectedPhotos.length,
    isUploading,
    selectPhoto,
    upload,
  };
};
