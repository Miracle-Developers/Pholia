import { StatusBar } from "expo-status-bar";
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { WoodenButton } from "@/components/Buttons/WoodenButton";
import { ScreenBackgroundContainer } from "@/components/Containers/BackgroundContainer";
import { Header } from "@/components/Header";
import { getSelectedTree } from "@/application/selection/state/selectedTree";
import { useHeaderProfile } from "@/hooks/useHeaderProfile";
import { useRouterNavigation } from "@/hooks/useRouter";
import { styles } from "@/features/home/components/HomeContainer/styles";

const DEFAULT_TREE_IMAGE = require("@/../assets/tree1.png");

export const HomeContainer = () => {
  const { name, userId, avatarSource } = useHeaderProfile();
  const { goToProfile, goToSetting, goToTreeAction, goToTreeSelection } = useRouterNavigation();
  const selectedTree = getSelectedTree();
  const treeName = selectedTree?.name ? `${selectedTree.name}の木` : "○○の木";
  const treeImage = selectedTree?.image ?? DEFAULT_TREE_IMAGE;

  const handleOpenTreeSelection = () => {
    goToTreeSelection();
  };

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
                onPress={handleOpenTreeSelection}
                activeOpacity={0.85}
              >
                <Ionicons name="chevron-back" size={40} color="#7A4A2B" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.treeWrapper}
                onPress={handleOpenTreeSelection}
                activeOpacity={0.9}
              >
                <Image source={treeImage} style={styles.treeImage} resizeMode="contain" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.arrowButton}
                onPress={handleOpenTreeSelection}
                activeOpacity={0.85}
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
