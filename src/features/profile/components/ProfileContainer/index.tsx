import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { getAvatarUrl } from "@/application/profile/usecases";
import { BackTitle } from "@/components/BackTitle";
import { ScreenBackgroundContainer } from "@/components/Containers/BackgroundContainer";
import { Header } from "@/components/Header";
import { styles } from "@/features/profile/components/ProfileContainer/styles";
import { useLoadProfile } from "@/features/profile/hooks/useLoadProfile";
import { useRouterNavigation } from "@/hooks/useRouter";

export const ProfileContainer = () => {
  const { goBack, goToSetting } = useRouterNavigation();
  const { user } = useLoadProfile();
  const avatarUrl = getAvatarUrl(user.avatarFileKey);
  const avatarSource = avatarUrl ? { uri: avatarUrl } : require("@/../assets/logo.png");

  return (
    <ScreenBackgroundContainer>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <Header
          name={user.name}
          userId={user.userId}
          avatarSource={avatarSource}
          onPressSetting={goToSetting}
        />

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <BackTitle title="ホーム" onPress={goBack} style={styles.backTitle} />
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <Image source={avatarSource} style={styles.avatarImage} resizeMode="contain" />
            </View>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userId}>@{user.userId}</Text>

            <View style={styles.divider} />

            <View style={styles.infoItem}>
              <MaterialIcons name="mail" size={20} color="#8B6F47" />
              <Text style={styles.infoText}>{user.email}</Text>
            </View>

            <View style={styles.infoItem}>
              <MaterialIcons name="calendar-today" size={20} color="#8B6F47" />
              <Text style={styles.infoText}>{user.joinDate}</Text>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statBoxWrapper}>
              <Image
                source={require("@/../assets/wooden-view.png")}
                style={styles.statBoxBackground}
              />
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>友達の数</Text>
                <Text style={styles.statValue}>{user.forestCount}</Text>
              </View>
            </View>
            <View style={styles.statBoxWrapper}>
              <Image
                source={require("@/../assets/wooden-view.png")}
                style={styles.statBoxBackground}
              />
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>関係の数</Text>
                <Text style={styles.statValue}>{user.treeCount}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScreenBackgroundContainer>
  );
};
