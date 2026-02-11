import { StatusBar } from "expo-status-bar";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { BackTitle } from "@/components/BackTitle";
import { WoodenButton } from "@/components/Buttons/WoodenButton";
import { ScreenBackgroundContainer } from "@/components/Containers/BackgroundContainer";
import { Header } from "@/components/Header";
import { getSelectedTree } from "@/application/selection/state/selectedTree";
import { useHeaderProfile } from "@/hooks/useHeaderProfile";
import { useRouterNavigation } from "@/hooks/useRouter";
import { styles } from "@/features/treeAction/components/TreeActionContainer/styles";

export const TreeActionContainer = () => {
  const { name, userId, avatarSource } = useHeaderProfile();
  const {
    goToForestAction,
    goToProfile,
    goToSetting,
    goToTreeDetail,
    goToTreeAddition,
    goToTreeSelection,
  } = useRouterNavigation();
  const selectedTree = getSelectedTree();

  const handleConfirmTree = () => {
    if (selectedTree?.id) {
      goToTreeDetail(selectedTree.id);
      return;
    }
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
          <BackTitle title="ホーム" onPress={goToForestAction} style={styles.backTitle} />

          <View style={styles.cardsWrapper}>
            <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={handleConfirmTree}>
              <View style={styles.cardRow}>
                <Image source={require("@/../assets/tree2.png")} style={styles.cardIcon} />
                <Text style={styles.cardText}>木を確認する</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cardAccent}
              activeOpacity={0.85}
              onPress={goToTreeAddition}
            >
              <View style={styles.cardRow}>
                <Text style={styles.cardText}>木を植える</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </ScreenBackgroundContainer>
  );
};
