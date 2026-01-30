import { MaterialIcons } from "@expo/vector-icons";
import { Modal, Text, TouchableOpacity, View } from "react-native";

import { styles } from "@/features/setting/components/DeleteAccountModal/styles";

export type DeleteAccountModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export const DeleteAccountModal = ({ visible, onClose, onConfirm }: DeleteAccountModalProps) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="warning" size={48} color="#E74C3C" />
          </View>

          <Text style={styles.modalTitle}>アカウントを削除しますか？</Text>

          <Text style={styles.modalDescription}>
            このアクションは取り消すことができません。{"\n"}
            すべてのデータが削除されます。
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>キャンセル</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={onConfirm}>
              <Text style={styles.deleteButtonText}>削除</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
