import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, ScrollView, Text, View } from "react-native";

import { BackTitle } from "@/components/BackTitle";
import { WoodenButton } from "@/components/Buttons/WoodenButton";
import { KeyboardAvoidingContainer } from "@/components/Containers/KeyboardAvoidingContainer";
import { Header } from "@/components/Header";
import { LeafAdditionCard } from "@/features/addition/components/LeafAdditionCard";
import { TreePickerModal } from "@/features/addition/components/TreePickerModal";
import { useLeafUpload } from "@/features/addition/hooks/useLeafUpload";
import { useTreeSelection } from "@/features/addition/hooks/useTreeSelection";
import { useHeaderProfile } from "@/hooks/useHeaderProfile";
import { useRouterNavigation } from "@/hooks/useRouter";
import { useToast } from "@/hooks/useToast";

import { styles } from "./styles";

export const AdditionContainer = () => {
  const { name, userId, avatarSource } = useHeaderProfile();
  const { goToList, goToProfile, goToSetting } = useRouterNavigation();
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
    const uploaded = await upload(selectedTreeId);
    if (uploaded) {
      goToList();
    }
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

        <BackTitle title="葉の一覧" onPress={goToList} style={styles.backTitle} />

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

        <LeafAdditionCard
          hasSelectedPhoto={Boolean(selectedPhoto)}
          isStructureLoading={isStructureLoading}
          selectedTreeLabel={selectedTree?.label ?? null}
          onPressSelectPhoto={selectPhoto}
          onPressTreePicker={openPicker}
        />

        <WoodenButton
          title={isUploading ? "追加中..." : "追加"}
          onPress={handleUpload}
          style={styles.submitButton}
          disabled={isUploading}
        />
      </ScrollView>

      <TreePickerModal
        visible={isPickerOpen}
        trees={trees}
        onClose={closePicker}
        onSelectTree={selectTree}
      />
    </KeyboardAvoidingContainer>
  );
};
