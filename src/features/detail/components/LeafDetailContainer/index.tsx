import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import {
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

import { BackTitle } from "@/components/BackTitle";
import { Header } from "@/components/Header";
import { ScreenBackgroundContainer } from "@/components/Containers/BackgroundContainer";
import { useRouterNavigation } from "@/hooks/useRouter";
import { styles } from "@/features/detail/components/LeafDetailContainer/styles";
import { useHeaderProfile } from "@/hooks/useHeaderProfile";
import { useLoadLeaves } from "@/features/list/hooks/useLoadLeaves";

const formatDate = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

export const LeafDetailContainer = () => {
  const { goToList, goToProfile, goToSetting } = useRouterNavigation();
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [memo, setMemo] = useState("");
  const { name, userId, avatarSource } = useHeaderProfile();
  const params = useLocalSearchParams<{ leafId?: string }>();
  const leafIds = useMemo(() => Array.from({ length: 9 }, (_, index) => index + 1), []);
  const { leavesById } = useLoadLeaves(leafIds);
  const selectedLeafId =
    typeof params.leafId === "string" && params.leafId.trim() !== ""
      ? Number(params.leafId)
      : null;
  const leafData =
    selectedLeafId && Number.isFinite(selectedLeafId)
      ? Object.values(leavesById).find((leaf) => leaf.id === selectedLeafId)
      : null;

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
          <BackTitle title="葉の一覧" onPress={goToList} style={styles.backTitle} />

          <View style={styles.photoCard}>
            <Image
              source={require("@/../assets/leaf.png")}
              style={styles.leafBackground}
              resizeMode="contain"
            />
            <View style={styles.photoFrame}>
              {leafData?.imageUrl ? (
                <View style={styles.leafPhotoWrapper}>
                  <Image source={{ uri: leafData.imageUrl }} style={styles.leafPhoto} />
                </View>
              ) : null}
            </View>
            <TouchableOpacity
              style={styles.zoomButton}
              activeOpacity={0.85}
              onPress={() => setIsZoomOpen(true)}
            >
              <MaterialIcons name="zoom-in" size={18} color="#6B4A2C" />
            </TouchableOpacity>
          </View>

          <ImageBackground
            source={require("@/../assets/wooden_border.png")}
            style={styles.detailBorder}
            imageStyle={styles.detailBorderImage}
            resizeMode="stretch"
          >
            <View style={styles.detailCard}>
            <View style={styles.detailRow}>
              <View style={styles.iconBadge}>
                <Image source={require("@/../assets/leaf_icon.png")} style={styles.iconImage} />
              </View>
              <Text style={styles.detailText}>{leafData?.treeName ?? "未設定"}</Text>
              <View style={styles.dashLine} />
            </View>

            <View style={styles.detailRow}>
              <View style={styles.iconBadge}>
                <MaterialIcons name="calendar-today" size={18} color="#A46B3D" />
              </View>
              <Text style={styles.detailText}>
                {formatDate(leafData?.takenAt || leafData?.createdAt) || "未設定"}
              </Text>
              <View style={styles.dashLine} />
            </View>

            <View style={styles.detailRow}>
              <View style={styles.iconBadge}>
                <MaterialIcons name="place" size={18} color="#A46B3D" />
              </View>
              <Text style={styles.detailText}>{leafData?.locationText || "未設定"}</Text>
              <View style={styles.dashLine} />
            </View>

            <View style={styles.detailRow}>
              <View style={styles.iconBadge}>
                <Image source={require("@/../assets/tag.png")} style={styles.iconImage} />
              </View>
              <Text style={styles.detailText}></Text>
              <View style={styles.dashLine} />
              <TouchableOpacity style={styles.addTagButton} activeOpacity={0.85}>
                <MaterialIcons name="add" size={18} color="#A46B3D" />
              </TouchableOpacity>
            </View>

            <View style={styles.memoRow}>
              <TextInput
                style={styles.memoInput}
                value={memo}
                onChangeText={setMemo}
                placeholderTextColor="#B5906E"
                multiline
                textAlignVertical="top"
              />
              <TouchableOpacity style={styles.memoIconButton} activeOpacity={0.85}>
                <MaterialIcons name="edit" size={18} color="#A46B3D" />
              </TouchableOpacity>
            </View>
            </View>
          </ImageBackground>

        </ScrollView>
      </View>

      <Modal
        visible={isZoomOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsZoomOpen(false)}
      >
        <View style={styles.zoomOverlay}>
          <TouchableOpacity
            style={styles.zoomClose}
            onPress={() => setIsZoomOpen(false)}
            activeOpacity={0.85}
          >
            <MaterialIcons name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          {leafData?.imageUrl ? (
            <Image source={{ uri: leafData.imageUrl }} style={styles.zoomImage} resizeMode="contain" />
          ) : null}
        </View>
      </Modal>
    </ScreenBackgroundContainer>
  );
};
