import { MaterialIcons } from "@expo/vector-icons";
import { Modal, Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";

export type LogoutConfirmModalProps = {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

export const LogoutConfirmModal = ({
    visible,
    onClose,
    onConfirm,
}: LogoutConfirmModalProps) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
            statusBarTranslucent
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.iconContainer}>
                        <MaterialIcons name="logout" size={48} color="#8B6F47" />
                    </View>

                    <Text style={styles.modalTitle}>ログアウトしますか？</Text>

                    <Text style={styles.modalDescription}>
                        再度ログインするにはメールアドレスとパスワードが必要です。
                    </Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelButtonText}>キャンセル</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.logoutButton} onPress={onConfirm}>
                            <Text style={styles.logoutButtonText}>ログアウト</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
