import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import type { ForestOption } from "@/application/structure/usecases";

import { styles } from "./styles";

type ForestPickerModalProps = {
  visible: boolean;
  forests: ForestOption[];
  onClose: () => void;
  onSelectForest: (forestId: number) => void;
};

export const ForestPickerModal = ({
  visible,
  forests,
  onClose,
  onSelectForest,
}: ForestPickerModalProps) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>森を選択</Text>
          <ScrollView style={styles.modalList} showsVerticalScrollIndicator={false}>
            {forests.length === 0 ? (
              <Text style={styles.modalEmpty}>選択できる森がありません</Text>
            ) : (
              forests.map((forest) => (
                <TouchableOpacity
                  key={forest.id}
                  style={styles.modalItem}
                  onPress={() => onSelectForest(forest.id)}
                >
                  <Text style={styles.modalItemText}>{forest.name}</Text>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>
          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
              <Text style={styles.modalCloseText}>閉じる</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
