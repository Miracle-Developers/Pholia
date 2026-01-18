import * as ImagePicker from "expo-image-picker";
import { useCallback, useState } from "react";

import { uploadLeaf } from "@/application/leaves/usecases";
import { useToast } from "@/hooks/useToast";
import * as auth from "@/infrastructure/auth";

const getFileName = (asset: ImagePicker.ImagePickerAsset) => {
  if (asset.fileName) return asset.fileName;
  const uriParts = asset.uri.split("/");
  const name = uriParts[uriParts.length - 1];
  if (name && name.includes(".")) return name;
  return `leaf-${Date.now()}.jpg`;
};

export function useLeafUpload() {
  const { showToast } = useToast();
  const [selectedPhoto, setSelectedPhoto] = useState<ImagePicker.ImagePickerAsset | null>(null);
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
    });

    if (!result.canceled && result.assets?.[0]) {
      setSelectedPhoto(result.assets[0]);
    }
  }, [showToast]);

  const upload = useCallback(
    async (treeId?: number) => {
      if (!selectedPhoto) {
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

      const name = getFileName(selectedPhoto);
      const type = selectedPhoto.mimeType || "image/jpeg";

      setIsUploading(true);
      try {
        await uploadLeaf(
          {
            uri: selectedPhoto.uri,
            name,
            type,
          },
          treeId,
        );
        showToast({ title: "アップロード完了", message: "写真を追加しました。" });
        setSelectedPhoto(null);
        return true;
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
    [isUploading, selectedPhoto, showToast],
  );

  return {
    selectedPhoto,
    isUploading,
    selectPhoto,
    upload,
  };
}
