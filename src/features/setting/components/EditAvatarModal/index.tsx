import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";

import { styles } from "@/features/setting/components/EditAvatarModal/styles";

export type EditAvatarModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
};

export const EditAvatarModal = ({ visible, onClose, onSave }: EditAvatarModalProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleSelectPhoto = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets.length > 0) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("エラー", "画像の選択に失敗しました");
    }
  };

  const handleTakePhoto = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("権限が必要", "カメラへのアクセスが許可されていません");
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
    } catch (error) {
      Alert.alert("エラー", "カメラの起動に失敗しました");
    }
  };

  const handleSave = () => {
    if (selectedImage) {
      console.log("Avatar updated:", selectedImage);
      setSelectedImage(null);
      onSave();
    } else {
      Alert.alert("選択してください", "画像を選択してください");
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

          <View style={styles.optionContainer}>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={handleTakePhoto}
            >
              <MaterialIcons name="camera-alt" size={32} color="#333" />
              <Text style={styles.optionText}>カメラで撮影</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.optionButton}
              onPress={handleSelectPhoto}
            >
              <MaterialIcons name="image" size={32} color="#333" />
              <Text style={styles.optionText}>ギャラリーから選択</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setSelectedImage(null);
                onClose();
              }}
            >
              <Text style={styles.cancelButtonText}>キャンセル</Text>
            </TouchableOpacity>
            {selectedImage && (
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSave}
              >
                <Text style={styles.saveButtonText}>保存</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};
