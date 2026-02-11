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
import { createForest } from "@/application/forests/usecases/createForest";
import { BackTitle } from "@/components/BackTitle";
import { WoodenButton } from "@/components/Buttons/WoodenButton";
import { ScreenBackgroundContainer } from "@/components/Containers/BackgroundContainer";
import { KeyboardAvoidingContainer } from "@/components/Containers/KeyboardAvoidingContainer";
import { Header } from "@/components/Header";
import { styles } from "@/features/addition/components/ForestAdditionContainer/styles";
import { useHeaderProfile } from "@/hooks/useHeaderProfile";
import { useRouterNavigation } from "@/hooks/useRouter";
import { useToast } from "@/hooks/useToast";

export const ForestAdditionContainer = () => {
  const { name, userId, avatarSource } = useHeaderProfile();
  const { goToForestSelection, goToHome, goToProfile, goToSetting } = useRouterNavigation();
  const { showToast } = useToast();
  const [forestName, setForestName] = useState("");

  const handleCreate = async () => {
    const trimmedName = forestName.trim();
    if (!trimmedName) {
      showToast({ title: "森の名前を入力してください", message: "森の名前を入力してください。" });
      return;
    }
    try {
      await createForest({ name: trimmedName });
      showToast({ title: "作成しました", message: "森を作成しました。" });
      setForestName("");
      goToForestSelection();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      showToast({ title: "作成に失敗しました", message });
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
          <BackTitle title="ホーム" onPress={goToHome} style={styles.backTitle} />

          <View style={styles.bannerWrapper}>
            <ImageBackground
              source={require("@/../assets/nameplate.png")}
              style={styles.nameplate}
              resizeMode="stretch"
            >
              <Text style={styles.nameplateText}>新規森作成</Text>
            </ImageBackground>
          </View>

          <View style={styles.treeWrapper}>
            <Image source={require("@/../assets/forest1.png")} style={styles.treeImage} />
          </View>

          <View style={styles.inputCard}>
            <View style={styles.inputIconBadge}>
              <Image source={require("@/../assets/tag.png")} style={styles.inputIcon} />
            </View>
            <TextInput
              placeholder="森の名前を入力"
              placeholderTextColor="#B5906E"
              style={styles.inputField}
              value={forestName}
              onChangeText={setForestName}
            />
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.85}>
              <MaterialIcons name="create" size={18} color="#7A4B2A" />
            </TouchableOpacity>
          </View>

          <WoodenButton title="作成" onPress={handleCreate} style={styles.submitButton} />
        </ScrollView>
      </KeyboardAvoidingContainer>
    </ScreenBackgroundContainer>
  );
};
