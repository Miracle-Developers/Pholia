import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, ImageBackground, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

import { BackTitle } from "@/components/BackTitle";
import { WoodenButton } from "@/components/Buttons/WoodenButton";
import { KeyboardAvoidingContainer } from "@/components/Containers/KeyboardAvoidingContainer";
import { Header } from "@/components/Header";
import { useLeafUpload } from "@/features/addition/hooks/useLeafUpload";
import { useTreeSelection } from "@/features/addition/hooks/useTreeSelection";
import { useHeaderProfile } from "@/hooks/useHeaderProfile";
import { useRouterNavigation } from "@/hooks/useRouter";
import { useToast } from "@/hooks/useToast";

import { styles } from "./styles";

export const AdditionContainer = () => {
  const router = useRouter();
  const { name, userId, avatarSource } = useHeaderProfile();
  const { goToProfile, goToSetting } = useRouterNavigation();
  const { selectedPhoto, isUploading, selectPhoto, upload } = useLeafUpload();
  const { showToast } = useToast();
  const {
    trees,
    selectedTree,
    selectedTreeId,
    isLoading: isStructureLoading,
    isPickerOpen,
    openPicker,
    closePicker,
    selectTree,
  } = useTreeSelection();

  const handleUpload = async () => {
    if (!selectedTreeId) {
      showToast({ title: "木を選択してください", message: "追加する木を選んでください。" });
      return;
    }
    await upload(selectedTreeId);
  };

  return (
    <KeyboardAvoidingContainer style={styles.container}>
      <StatusBar style="dark" />
      <Header
        name={name}
        userId={userId}
        avatarSource={avatarSource}
        onPressProfile={goToProfile}
        onPressSetting={goToSetting}
        style={styles.topHeader}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View pointerEvents="none" style={[styles.cloud, styles.cloudRight]} />
        <View pointerEvents="none" style={[styles.cloud, styles.cloudLeft]} />

        <BackTitle title="木詳細" onPress={() => router.back()} style={styles.backTitle} />

        <View style={styles.bannerWrapper}>
          <ImageBackground
            source={require("@/../assets/nameplate.png")}
            style={styles.nameplate}
            resizeMode="stretch"
          >
            <Text style={styles.nameplateText}>葉追加</Text>
          </ImageBackground>
        </View>

        <View style={styles.leafWrapper}>
          <Image source={require("@/../assets/leaf.png")} style={styles.leafImage} />
        </View>

        <View style={styles.card}>
          <TouchableOpacity style={styles.fieldRow} activeOpacity={0.85} onPress={openPicker}>
            <View style={styles.iconBadge}>
              <Image source={require("@/../assets/leaf_icon.png")} style={styles.iconImage} />
            </View>
            <View style={styles.fieldContent}>
              <Text style={styles.fieldPlaceholder}>
                {isStructureLoading
                  ? "読み込み中..."
                  : selectedTree?.label || "追加する木を選択"}
              </Text>
            </View>
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.8} onPress={openPicker}>
              <MaterialIcons name="add" size={18} color="#7A4B2A" />
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.fieldRow}
            activeOpacity={0.85}
            onPress={selectPhoto}
          >
            <View style={styles.iconBadge}>
              <Image source={require("@/../assets/album.png")} style={styles.iconImage} />
            </View>
            <View style={styles.fieldContent}>
              <Text style={styles.fieldPlaceholder}>
                {selectedPhoto ? "写真を選択済み" : "追加する写真を選択"}
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

        <WoodenButton
          title={isUploading ? "追加中..." : "追加"}
          onPress={handleUpload}
          style={styles.submitButton}
          disabled={isUploading}
        />
      </ScrollView>

      <Modal visible={isPickerOpen} transparent animationType="fade" onRequestClose={closePicker}>
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
                    onPress={() => selectTree(tree.id)}
                  >
                    <Text style={styles.modalItemText}>{tree.label}</Text>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.modalCloseButton} onPress={closePicker}>
                <Text style={styles.modalCloseText}>閉じる</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingContainer>
  );
};
