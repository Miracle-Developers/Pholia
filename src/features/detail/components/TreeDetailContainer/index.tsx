import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useMemo } from "react";
import { Image, ImageBackground, ScrollView, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { BackTitle } from "@/components/BackTitle";
import { WoodenButton } from "@/components/Buttons/WoodenButton";
import { ScreenBackgroundContainer } from "@/components/Containers/BackgroundContainer";
import { Header } from "@/components/Header";
import { getSelectedTree } from "@/application/selection/state/selectedTree";
import { useHeaderProfile } from "@/hooks/useHeaderProfile";
import { useRouterNavigation } from "@/hooks/useRouter";
import { useLoadTreeDetail } from "@/features/detail/hooks/useLoadTreeDetail";
import { styles } from "@/features/detail/components/TreeDetailContainer/styles";

const formatDate = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

export const TreeDetailContainer = () => {
  const { name, userId, avatarSource } = useHeaderProfile();
  const { goToList, goToProfile, goToSetting, goToTreeSelection } = useRouterNavigation();
  const params = useLocalSearchParams<{ treeId?: string }>();
  const selectedTree = getSelectedTree();

  const treeId = useMemo(() => {
    if (typeof params.treeId === "string" && params.treeId.trim() !== "") {
      const parsed = Number(params.treeId);
      return Number.isFinite(parsed) ? parsed : undefined;
    }
    return selectedTree?.id;
  }, [params.treeId, selectedTree?.id]);

  const { treeDetail } = useLoadTreeDetail(treeId);
  const treeName = treeDetail?.name ?? selectedTree?.name ?? "○○";
  const forestName = treeDetail?.forestName ?? "未設定";
  const createdAt = formatDate(treeDetail?.createdAt) || "未設定";

  const memberTags = (treeDetail?.members ?? [])
    .map((member) => {
      if (member.userHandle) return `@${member.userHandle}`;
      if (member.name) return member.name;
      if (member.userId) return `@${member.userId}`;
      return null;
    })
    .filter((value): value is string => Boolean(value));

  return (
    <ScreenBackgroundContainer>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <Header
          name={name}
          userId={userId}
          avatarSource={avatarSource}
          onPressProfile={goToProfile}
          onPressSetting={goToSetting}
        />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <BackTitle title="木一覧" style={styles.backTitle} onPress={goToTreeSelection} />

          <View style={styles.nameplateWrapper}>
            <ImageBackground
              source={require("@/../assets/nameplate.png")}
              style={styles.nameplate}
              resizeMode="stretch"
            >
              <Text style={styles.nameplateText}>{`${treeName}の木`}</Text>
            </ImageBackground>
          </View>

          <View style={styles.treeVisualWrapper}>
            <Image
              source={require("@/../assets/tree1.png")}
              style={styles.treeVisual}
              resizeMode="contain"
            />
          </View>

          <View style={styles.detailCard}>
            <View style={styles.detailRow}>
              <View style={styles.iconBadge}>
                <Image source={require("@/../assets/leaf_icon.png")} style={styles.iconImage} />
              </View>
              <Text style={styles.detailText}>{forestName}</Text>
              <View style={styles.dashLine} />
              <MaterialIcons name="edit" size={18} color="#A46B3D" />
            </View>

            <View style={styles.detailRow}>
              <View style={styles.iconBadge}>
                <MaterialIcons name="person" size={18} color="#A46B3D" />
              </View>
              <View style={styles.memberTags}>
                {memberTags.length > 0 ? (
                  memberTags.map((tag) => (
                    <View key={tag} style={styles.memberTag}>
                      <Text style={styles.memberTagText}>{tag}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.detailText}>未設定</Text>
                )}
              </View>
              <View style={styles.dashLine} />
              <MaterialIcons name="edit" size={18} color="#A46B3D" />
            </View>

            <View style={styles.detailRow}>
              <View style={styles.iconBadge}>
                <MaterialIcons name="calendar-today" size={18} color="#A46B3D" />
              </View>
              <Text style={styles.detailText}>{createdAt}</Text>
              <View style={styles.dashLine} />
            </View>
          </View>

          <WoodenButton title="葉一覧へ" onPress={goToList} style={styles.leafListButton} />
        </ScrollView>
      </View>
    </ScreenBackgroundContainer>
  );
};
