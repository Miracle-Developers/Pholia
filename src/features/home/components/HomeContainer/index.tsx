import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { WoodenButton } from "@/components/Buttons/WoodenButton";
import { ScreenBackgroundContainer } from "@/components/Containers/BackgroundContainer";
import { Header } from "@/components/Header";
import { useHeaderProfile } from "@/hooks/useHeaderProfile";
import { useRouterNavigation } from "@/hooks/useRouter";
import { useHomeTrees } from "@/features/home/hooks/useHomeTrees";
import { styles } from "@/features/home/components/HomeContainer/styles";

const DEFAULT_TREE_IMAGE = require("@/../assets/tree1.png");

export const HomeContainer = () => {
  const { name, userId, avatarSource } = useHeaderProfile();
  const { goToProfile, goToSetting, goToTreeAction } = useRouterNavigation();
  const { currentTree, hasTrees, isLoading, handleNext, handlePrevious } = useHomeTrees();
  const treeName = currentTree?.name
    ? `${currentTree.name}の木`
    : isLoading
      ? "読み込み中..."
      : "○○の木";
  const treeImage = currentTree?.image ?? DEFAULT_TREE_IMAGE;

  return (
    <ScreenBackgroundContainer>
      <View style={styles.container}>
        <StatusBar style="dark" />

        <Header
          name={name}
          userId={userId}
          avatarSource={avatarSource}
          style={styles.topHeader}
          onPressProfile={goToProfile}
          onPressSetting={goToSetting}
        />

        <View style={styles.content}>
          <View style={styles.nameplateWrapper}>
            <ImageBackground
              source={require("@/../assets/nameplate.png")}
              style={styles.nameplate}
              resizeMode="stretch"
            >
              <Text style={styles.nameplateText}>{treeName}</Text>
            </ImageBackground>
          </View>

          <View style={styles.treeArea}>
            <View style={styles.treeRow}>
              <TouchableOpacity
                style={styles.arrowButton}
                onPress={handlePrevious}
                activeOpacity={0.85}
                disabled={!hasTrees}
              >
                <Ionicons name="chevron-back" size={40} color="#7A4A2B" />
              </TouchableOpacity>

              <View style={styles.treeWrapper}>
                <Image source={treeImage} style={styles.treeImage} resizeMode="contain" />
              </View>

              <TouchableOpacity
                style={styles.arrowButton}
                onPress={handleNext}
                activeOpacity={0.85}
                disabled={!hasTrees}
              >
                <Ionicons name="chevron-forward" size={40} color="#7A4A2B" />
              </TouchableOpacity>
            </View>
          </View>

          <WoodenButton title="お世話へ" onPress={goToTreeAction} style={styles.careButton} />
        </View>
      </View>
    </ScreenBackgroundContainer>
  );
};
