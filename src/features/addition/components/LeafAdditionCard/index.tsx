import { MaterialIcons } from "@expo/vector-icons";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";

type LeafAdditionCardProps = {
  hasSelectedPhoto: boolean;
  isStructureLoading: boolean;
  selectedTreeLabel: string | null;
  onPressSelectPhoto: () => void;
  onPressTreePicker: () => void;
};

export const LeafAdditionCard = ({
  hasSelectedPhoto,
  isStructureLoading,
  selectedTreeLabel,
  onPressSelectPhoto,
  onPressTreePicker,
}: LeafAdditionCardProps) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.fieldRow} activeOpacity={0.85} onPress={onPressTreePicker}>
        <View style={styles.iconBadge}>
          <Image source={require("@/../assets/leaf_icon.png")} style={styles.iconImage} />
        </View>
        <View style={styles.fieldContent}>
          <Text style={styles.fieldPlaceholder}>
            {isStructureLoading ? "読み込み中..." : selectedTreeLabel || "追加する木を選択"}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.8}
          onPress={onPressTreePicker}
        >
          <MaterialIcons name="add" size={18} color="#7A4B2A" />
        </TouchableOpacity>
      </TouchableOpacity>

      <TouchableOpacity style={styles.fieldRow} activeOpacity={0.85} onPress={onPressSelectPhoto}>
        <View style={styles.iconBadge}>
          <Image source={require("@/../assets/album.png")} style={styles.iconImage} />
        </View>
        <View style={styles.fieldContent}>
          <Text style={styles.fieldPlaceholder}>
            {hasSelectedPhoto ? "写真を選択済み" : "追加する写真を選択"}
          </Text>
        </View>
        <View style={styles.actionButton}>
          <MaterialIcons name="file-upload" size={18} color="#7A4B2A" />
        </View>
      </TouchableOpacity>

      <View style={styles.fieldRow}>
        <View style={styles.iconBadge}>
          <Image source={require("@/../assets/tag.png")} style={styles.iconImage} />
        </View>
        <TextInput
          placeholder="イベント名を入力(任意)"
          placeholderTextColor="#B5906E"
          style={styles.fieldInput}
        />
        <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
          <MaterialIcons name="create" size={18} color="#7A4B2A" />
        </TouchableOpacity>
      </View>

      <View style={[styles.fieldRow, styles.fieldRowLast]}>
        <View style={styles.memoField}>
          <TextInput
            placeholder="メモ(任意)"
            placeholderTextColor="#B5906E"
            style={[styles.fieldInput, styles.memoInput]}
            multiline
            textAlignVertical="top"
          />
          <TouchableOpacity style={styles.memoIconButton} activeOpacity={0.8}>
            <MaterialIcons name="create" size={18} color="#7A4B2A" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
