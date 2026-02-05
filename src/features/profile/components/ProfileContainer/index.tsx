import { getAvatarUrl } from "@/application/profile/usecases";
import { Header } from "@/components/Header";
import { styles } from "@/features/profile/components/ProfileContainer/styles";
import { useLoadProfile } from "@/features/profile/hooks/useLoadProfile";
import { useHeaderProfile } from "@/hooks/useHeaderProfile";
import { useRouterNavigation } from "@/hooks/useRouter";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";

export const ProfileContainer = () => {
  const { goBack, goToSetting } = useRouterNavigation();
  const { user } = useLoadProfile();
  const { name, userId, avatarSource } = useHeaderProfile();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Header name={name} userId={userId} avatarSource={avatarSource} style={styles.topHeader} showBackButton={true} onPressBack={goBack} hideActions={true} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            {getAvatarUrl(user.avatarFileKey) ? (
              <Image
                source={{ uri: getAvatarUrl(user.avatarFileKey) || "" }}
                style={styles.avatarImage}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require("@/../assets/logo.png")}
                style={styles.avatarImage}
                resizeMode="contain"
              />
            )}
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
  );
};
