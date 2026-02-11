import { MaterialIcons } from "@expo/vector-icons";
import { Modal, Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";

export type DeleteConfirmModalProps = {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
};

export const DeleteConfirmModal = ({
    visible,
    onClose,
    onConfirm,
    title,
    message,
}: DeleteConfirmModalProps) => {
    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.iconContainer}>
                        <MaterialIcons name="warning" size={48} color="#E74C3C" />
                    </View>

                    <Text style={styles.modalTitle}>{title}</Text>

                    <Text style={styles.modalDescription}>{message}</Text>

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
