import { StatusBar } from "expo-status-bar";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { BackTitle } from "@/components/BackTitle";
import { ScreenBackgroundContainer } from "@/components/Containers/BackgroundContainer";
import { Header } from "@/components/Header";
import { styles } from "@/features/treeAction/components/TreeActionContainer/styles";
import { useHeaderProfile } from "@/hooks/useHeaderProfile";
import { useRouterNavigation } from "@/hooks/useRouter";

export const TreeActionContainer = () => {
  const { name, userId, avatarSource } = useHeaderProfile();
  const {
    goToForestSelection,
    goToProfile,
    goToSetting,
    goToTreeAddition,
    goToTreeSelection,
  } = useRouterNavigation();

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
          <BackTitle title="森一覧へ" onPress={goToForestSelection} style={styles.backTitle} />

          <View style={styles.cardsWrapper}>
            <TouchableOpacity style={styles.card} onPressIn={() => goToTreeSelection()} activeOpacity={0.85}>
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
