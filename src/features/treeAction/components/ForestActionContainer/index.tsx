import { StatusBar } from "expo-status-bar";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { ScreenBackgroundContainer } from "@/components/Containers/BackgroundContainer";
import { Header } from "@/components/Header";
import { useHeaderProfile } from "@/hooks/useHeaderProfile";
import { useRouterNavigation } from "@/hooks/useRouter";
import { styles } from "./styles";

export const ForestActionContainer = () => {
  const { name, userId, avatarSource } = useHeaderProfile();
  const { goToHome, goToProfile, goToSetting, goToForestSelection, goToForestAddition } =
    useRouterNavigation();

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
          <View style={styles.cardsWrapper}>
            <TouchableOpacity style={styles.card} activeOpacity={0.85} onPress={goToForestSelection}>
              <View style={styles.cardRow}>
                <Image source={require("@/../assets/tree2.png")} style={styles.cardIcon} />
                <Text style={styles.cardText}>森を選択する</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cardAccent}
              activeOpacity={0.85}
              onPress={goToForestAddition}
            >
              <View style={styles.cardRow}>
                <Text style={styles.cardText}>森を作成する</Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </ScreenBackgroundContainer>
  );
};
