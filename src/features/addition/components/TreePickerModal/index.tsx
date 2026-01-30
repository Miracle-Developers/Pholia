import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import type { TreeOption } from "@/application/structure/usecases";

import { styles } from "./styles";

type TreePickerModalProps = {
  visible: boolean;
  trees: TreeOption[];
  onClose: () => void;
  onSelectTree: (treeId: number) => void;
};

export const TreePickerModal = ({
  visible,
  trees,
  onClose,
  onSelectTree,
}: TreePickerModalProps) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>木を選択</Text>
          <ScrollView style={styles.modalList} showsVerticalScrollIndicator={false}>
            {trees.length === 0 ? (
              <Text style={styles.modalEmpty}>選択できる木がありません</Text>
            ) : (
              trees.map((tree) => (
                <TouchableOpacity
                  key={tree.id}
                  style={styles.modalItem}
                  onPress={() => onSelectTree(tree.id)}
                >
                  <Text style={styles.modalItemText}>{tree.label}</Text>
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
