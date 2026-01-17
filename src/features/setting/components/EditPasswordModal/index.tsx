import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

import { updatePassword } from "@/application/profile/usecases";
import { styles } from "@/features/setting/components/EditPasswordModal/styles";
import { useToast } from "@/hooks/useToast";

export type EditPasswordModalProps = {
    visible: boolean;
    onClose: () => void;
    onSave: (password: string) => void;
    userId: string;
};

export const EditPasswordModal = ({ visible, onClose, onSave, userId }: EditPasswordModalProps) => {
    const { showToast } = useToast();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        if (currentPassword.trim() && newPassword.trim()) {
            try {
                setIsLoading(true);

                await updatePassword(userId, currentPassword, newPassword);

                showToast({ title: "成功", message: "パスワードが変更されました" });
                onSave(newPassword);
                setCurrentPassword("");
                setNewPassword("");
                setShowCurrentPassword(false);
                setShowNewPassword(false);
            } catch (error) {
                console.error("Password change error:", error);
                showToast({ title: "エラー", message: "パスワード変更に失敗しました" });
            } finally {
                setIsLoading(false);
            }
        } else {
            showToast({ title: "入力してください", message: "現在のパスワードと新しいパスワードの両方を入力してください" });
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={() => {
                setCurrentPassword("");
                setNewPassword("");
                setShowCurrentPassword(false);
                setShowNewPassword(false);
                onClose();
            }}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>パスワード変更</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>現在のパスワード</Text>
                        <View style={styles.passwordInput}>
                            <TextInput
                                style={styles.input}
                                placeholder="現在のパスワード"
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                                secureTextEntry={!showCurrentPassword}
                                placeholderTextColor="#CCC"
                                editable={!isLoading}
                            />
                            <TouchableOpacity
                                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                                style={styles.eyeIcon}
                            >
                                <MaterialIcons
                                    name={showCurrentPassword ? "visibility" : "visibility-off"}
                                    size={20}
                                    color="#999"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>新しいパスワード</Text>
                        <View style={styles.passwordInput}>
                            <TextInput
                                style={styles.input}
                                placeholder="※英数記号のみ。8文字以上"
                                value={newPassword}
                                onChangeText={setNewPassword}
                                secureTextEntry={!showNewPassword}
                                placeholderTextColor="#CCC"
                                editable={!isLoading}
                            />
                            <TouchableOpacity
                                onPress={() => setShowNewPassword(!showNewPassword)}
                                style={styles.eyeIcon}
                            >
                                <MaterialIcons
                                    name={showNewPassword ? "visibility" : "visibility-off"}
                                    size={20}
                                    color="#999"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => {
                                setCurrentPassword("");
                                setNewPassword("");
                                setShowCurrentPassword(false);
                                setShowNewPassword(false);
                                onClose();
                            }}
                        >
                            <Text style={styles.cancelButtonText}>キャンセル</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleSave}
                            disabled={isLoading}
                        >
                            <Text style={styles.saveButtonText}>保存</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
