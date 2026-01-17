import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

import { styles } from "@/features/setting/components/EditPasswordModal/styles";
import * as profile from "@/infrastructure/profile";

export type EditPasswordModalProps = {
    visible: boolean;
    onClose: () => void;
    onSave: (password: string) => void;
    userId: string;
};

export const EditPasswordModal = ({ visible, onClose, onSave, userId }: EditPasswordModalProps) => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
        if (password.trim()) {
            try {
                setIsLoading(true);

                await profile.changePassword(userId, password);

                Alert.alert("成功", "パスワードが変更されました");
                onSave(password);
                setPassword("");
                setShowPassword(false);
            } catch (error) {
                console.error("Password change error:", error);
                Alert.alert("エラー", "パスワード変更に失敗しました");
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>パスワード変更</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>パスワード</Text>
                        <View style={styles.passwordInput}>
                            <TextInput
                                style={styles.input}
                                placeholder="※英数記号のみ。8文字以上"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                placeholderTextColor="#CCC"
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                                style={styles.eyeIcon}
                            >
                                <MaterialIcons
                                    name={showPassword ? "visibility" : "visibility-off"}
                                    size={20}
                                    color="#999"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={onClose}
                        >
                            <Text style={styles.cancelButtonText}>キャンセル</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleSave}
                        >
                            <Text style={styles.saveButtonText}>保存</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
