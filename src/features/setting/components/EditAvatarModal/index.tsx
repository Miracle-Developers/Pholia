import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { ActivityIndicator, Image, Modal, Text, TouchableOpacity, View } from "react-native";

import type { EditAvatarModalProps } from "@/application/profile/types";
import { updateAvatarProfile } from "@/application/profile/usecases";
import { styles } from "@/features/setting/components/EditAvatarModal/styles";
import { useToast } from "@/hooks/useToast";

export const EditAvatarModal = ({ visible, onClose, onSave, userId }: EditAvatarModalProps) => {
  const { showToast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSelectPhoto = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (_error) {
      showToast({ title: "エラー", message: "画像の選択に失敗しました" });
    }
  };

  const handleTakePhoto = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        showToast({ title: "権限が必要", message: "カメラへのアクセスが許可されていません" });
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (_error) {
      showToast({ title: "エラー", message: "カメラの起動に失敗しました" });
    }
  };

  const handleSave = async () => {
    if (selectedImage) {
      setIsUploading(true);
      try {
        const filename = selectedImage.split("/").pop() || "avatar.jpg";
        const mimeType = filename.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg";

        const file = {
          uri: selectedImage,
          name: filename,
          type: mimeType,
        };

        await updateAvatarProfile(userId, file);

        showToast({ title: "成功", message: "プロフィール画像が更新されました" });
        setSelectedImage(null);
        setIsUploading(false);
        onSave();
      } catch (error: unknown) {
        console.error("Avatar upload error:", error);
        const errorMsg =
          error instanceof Error ? error.message : "画像のアップロード中にエラーが発生しました";
        showToast({ title: "エラー", message: errorMsg });
        setIsUploading(false);
      }
    } else {
      showToast({ title: "選択してください", message: "画像を選択してください" });
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => {
        setSelectedImage(null);
        onClose();
      }}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>プロフィール画像を変更</Text>
          </View>

          {selectedImage && (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
            </View>
          )}

          {!selectedImage && (
            <View style={styles.optionContainer}>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={handleTakePhoto}
                disabled={isUploading}
              >
                <MaterialIcons name="camera-alt" size={32} color="#333" />
                <Text style={styles.optionText}>カメラで撮影</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionButton}
                onPress={handleSelectPhoto}
                disabled={isUploading}
              >
                <MaterialIcons name="image" size={32} color="#333" />
                <Text style={styles.optionText}>ギャラリーから選択</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setSelectedImage(null);
                onClose();
              }}
              disabled={isUploading}
            >
              <Text style={styles.cancelButtonText}>キャンセル</Text>
            </TouchableOpacity>
            {selectedImage && (
              <TouchableOpacity
                style={[styles.saveButton, isUploading && { opacity: 0.6 }]}
                onPress={handleSave}
                disabled={isUploading}
              >
                {isUploading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.saveButtonText}>保存</Text>
                )}
              </TouchableOpacity>
            )}
            {selectedImage && !isUploading && (
              <TouchableOpacity style={styles.cancelButton} onPress={() => setSelectedImage(null)}>
                <Text style={styles.cancelButtonText}>やり直す</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};
