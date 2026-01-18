import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

import { styles } from "@/features/setting/components/CommonModal/styles";

export type CommonModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (value: string) => void;
  title: string;
  placeholder?: string;
  initialValue?: string;
  multiline?: boolean;
  maxLength?: number;
  isDanger?: boolean;
  description?: string;
};

export const CommonModal = ({
  visible,
  onClose,
  onSave,
  title,
  placeholder = "",
  initialValue = "",
  multiline = false,
  maxLength,
  isDanger = false,
  description,
}: CommonModalProps) => {
  const [value, setValue] = useState(initialValue);

  const handleSave = () => {
    if (value.trim()) {
      onSave(value);
      setValue(initialValue);
    }
  };

  const handleClose = () => {
    setValue(initialValue);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {isDanger && (
            <View style={{ marginBottom: 16 }}>
              <MaterialIcons name="warning" size={48} color="#E74C3C" />
            </View>
          )}

          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
          </View>

          {description && (
            <Text style={{ fontSize: 14, color: "#666", textAlign: "center", marginBottom: 20, lineHeight: 20 }}>
              {description}
            </Text>
          )}

          {!isDanger && (
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  multiline && { minHeight: 80, paddingTop: 10, textAlignVertical: "top" },
                ]}
                placeholder={placeholder}
                value={value}
                onChangeText={setValue}
                placeholderTextColor="#CCC"
                multiline={multiline}
                maxLength={maxLength}
              />
              {maxLength && (
                <Text style={styles.charCount}>
                  {value.length}/{maxLength}
                </Text>
              )}
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleClose}
            >
              <Text style={styles.cancelButtonText}>キャンセル</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.saveButton, isDanger && styles.dangerButton]}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>{isDanger ? "削除" : "保存"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
