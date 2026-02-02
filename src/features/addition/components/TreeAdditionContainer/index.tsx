import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { addTreeMember } from "@/application/trees/usecases/addTreeMember";
import { createTree } from "@/application/trees/usecases/createTree";
import { loadTreeMembers, type TreeMember } from "@/application/trees/usecases/loadTreeMembers";
import { BackTitle } from "@/components/BackTitle";
import { WoodenButton } from "@/components/Buttons/WoodenButton";
import { ScreenBackgroundContainer } from "@/components/Containers/BackgroundContainer";
import { KeyboardAvoidingContainer } from "@/components/Containers/KeyboardAvoidingContainer";
import { Header } from "@/components/Header";
import { ForestPickerModal } from "@/features/addition/components/ForestPickerModal";
import { styles } from "@/features/addition/components/TreeAdditionContainer/styles";
import { useForestSelection } from "@/features/addition/hooks/useForestSelection";
import { useHeaderProfile } from "@/hooks/useHeaderProfile";
import { useRouterNavigation } from "@/hooks/useRouter";
import { useToast } from "@/hooks/useToast";

export const TreeAdditionContainer = () => {
  const { name, userId, avatarSource } = useHeaderProfile();
  const { goBack, goToProfile, goToSetting, goToTreeSelection } = useRouterNavigation();
  const { showToast } = useToast();
  const [treeName, setTreeName] = useState("");
  const [createdTreeId, setCreatedTreeId] = useState<number | null>(null);
  const [memberUserId, setMemberUserId] = useState("");
  const [memberRole, setMemberRole] = useState("");
  const [members, setMembers] = useState<TreeMember[]>([]);
  const {
    forests,
    selectedForest,
    selectedForestId,
    isLoading,
    isPickerOpen,
    openPicker,
    closePicker,
    selectForest,
  } = useForestSelection();

  const handleCreate = async () => {
    const trimmedName = treeName.trim();
    if (!trimmedName) {
      showToast({ title: "木の名前を入力してください", message: "木の名前を入力してください。" });
      return;
    }
    if (!selectedForestId) {
      showToast({ title: "森を選択してください", message: "追加する森を選んでください。" });
      return;
    }

    try {
      const created = await createTree({ forestId: selectedForestId, name: trimmedName });
      setCreatedTreeId(created.id ?? null);
      if (created.id) {
        const list = await loadTreeMembers(created.id);
        setMembers(list);
      } else {
        setMembers([]);
      }
      showToast({ title: "作成しました", message: "木を作成しました。" });
      setTreeName("");
      goToTreeSelection();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      showToast({ title: "作成に失敗しました", message });
    }
  };

  const handleAddMember = async () => {
    if (!createdTreeId) {
      showToast({ title: "先に木を作成してください", message: "木の作成後に追加できます。" });
      return;
    }
    const trimmedUserId = memberUserId.trim();
    const trimmedRole = memberRole.trim();
    const parsedUserId = Number(trimmedUserId);
    if (!trimmedUserId || Number.isNaN(parsedUserId)) {
      showToast({ title: "ユーザーIDを入力してください", message: "数字のIDを入力してください。" });
      return;
    }
    if (!trimmedRole) {
      showToast({ title: "役割を入力してください", message: "役割を入力してください。" });
      return;
    }

    try {
      await addTreeMember({ treeId: createdTreeId, userId: parsedUserId, role: trimmedRole });
      const list = await loadTreeMembers(createdTreeId);
      setMembers(list);
      showToast({ title: "追加しました", message: "ユーザーを追加しました。" });
      setMemberUserId("");
      setMemberRole("");
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      showToast({ title: "追加に失敗しました", message });
    }
  };

  return (
    <ScreenBackgroundContainer>
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
          <BackTitle title="ホーム" onPress={goBack} style={styles.backTitle} />

          <View style={styles.bannerWrapper}>
            <ImageBackground
              source={require("@/../assets/nameplate.png")}
              style={styles.nameplate}
              resizeMode="stretch"
            >
              <Text style={styles.nameplateText}>新規木作成</Text>
            </ImageBackground>
          </View>

          <View style={styles.treeWrapper}>
            <Image source={require("@/../assets/tree2.png")} style={styles.treeImage} />
          </View>

          <View style={styles.card}>
            <TouchableOpacity style={styles.fieldRow} activeOpacity={0.85} onPress={openPicker}>
              <View style={styles.iconBadge}>
                <Image source={require("@/../assets/leaf_icon.png")} style={styles.iconImage} />
              </View>
              <View style={styles.fieldContent}>
                <Text style={styles.fieldPlaceholder}>
                  {selectedForest?.name ?? (isLoading ? "読み込み中..." : "追加する森を選択")}
                </Text>
              </View>
              <View style={styles.actionButton}>
                <MaterialIcons name="add" size={18} color="#7A4B2A" />
              </View>
            </TouchableOpacity>

            <View style={styles.fieldRow}>
              <View style={styles.iconBadge}>
                <Image source={require("@/../assets/tag.png")} style={styles.iconImage} />
              </View>
              <TextInput
                placeholder="木の名前を入力"
                placeholderTextColor="#B5906E"
                style={styles.fieldInput}
                value={treeName}
                onChangeText={setTreeName}
              />
              <TouchableOpacity style={styles.actionButton} activeOpacity={0.85}>
                <MaterialIcons name="create" size={18} color="#7A4B2A" />
              </TouchableOpacity>
            </View>

            <View style={[styles.fieldRow, styles.fieldRowLast]}>
              <View style={styles.iconBadge}>
                <Image source={require("@/../assets/user_icon.png")} style={styles.iconImage} />
              </View>
              <View style={styles.fieldContent}>
                <TextInput
                  placeholder="ユーザーID"
                  placeholderTextColor="#B5906E"
                  style={[styles.fieldInput, styles.memberInput]}
                  value={memberUserId}
                  onChangeText={setMemberUserId}
                  keyboardType="number-pad"
                />
              </View>
              <TouchableOpacity
                style={styles.actionButton}
                activeOpacity={0.85}
                onPress={handleAddMember}
              >
                <MaterialIcons name="person-add" size={18} color="#7A4B2A" />
              </TouchableOpacity>
            </View>
          </View>

          {createdTreeId ? (
            <View style={styles.memberList}>
              <Text style={styles.memberListTitle}>メンバー</Text>
              {members.length === 0 ? (
                <Text style={styles.memberListEmpty}>まだメンバーがいません</Text>
              ) : (
                members.map((member, index) => (
                  <View
                    key={`${member.userId ?? "unknown"}-${index}`}
                    style={styles.memberListItem}
                  >
                    <Text style={styles.memberListText}>ID: {member.userId ?? "-"}</Text>
                    <Text style={styles.memberListText}>役割: {member.role ?? "-"}</Text>
                  </View>
                ))
              )}
            </View>
          ) : null}

          <WoodenButton title="作成" onPress={handleCreate} style={styles.submitButton} />
        </ScrollView>
      </KeyboardAvoidingContainer>

      <ForestPickerModal
        visible={isPickerOpen}
        forests={forests}
        onClose={closePicker}
        onSelectForest={selectForest}
      />
    </ScreenBackgroundContainer>
  );
};
