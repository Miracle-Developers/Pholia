import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
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

import { BackTitle } from "@/components/BackTitle";
import { Header } from "@/components/Header";
import { ScreenBackgroundContainer } from "@/components/Containers/BackgroundContainer";
import { useRouterNavigation } from "@/hooks/useRouter";
import { styles } from "@/features/detail/components/LeafDetailContainer/styles";

export const LeafDetailContainer = () => {
  const { goBack, goToProfile, goToSetting } = useRouterNavigation();
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [memo, setMemo] = useState("六本木のオフィス見学にて");

  return (
    <ScreenBackgroundContainer>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <Header
          name="ぽっぽ"
          userId="poppo"
          avatarSource={require("@/../assets/logo.png")}
          onPressProfile={goToProfile}
          onPressSetting={goToSetting}
        />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <BackTitle title="ホーム" onPress={goBack} style={styles.backTitle} />

          <View style={styles.photoCard}>
            <Image
              source={require("@/../assets/leaf.png")}
              style={styles.leafBackground}
              resizeMode="contain"
            />
            <View style={styles.photoFrame}>
              <Image
                source={require("@/../assets/groupPhoto.png")}
                style={styles.photo}
                resizeMode="cover"
              />
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
              <Text style={styles.detailText}>ECCコン専の木</Text>
              <View style={styles.dashLine} />
            </View>

            <View style={styles.detailRow}>
              <View style={styles.iconBadge}>
                <MaterialIcons name="calendar-today" size={18} color="#A46B3D" />
              </View>
              <Text style={styles.detailText}>2025年10月19日</Text>
              <View style={styles.dashLine} />
            </View>

            <View style={styles.detailRow}>
              <View style={styles.iconBadge}>
                <MaterialIcons name="place" size={18} color="#A46B3D" />
              </View>
              <Text style={styles.detailText}>港区・六本木</Text>
              <View style={styles.dashLine} />
            </View>

            <View style={styles.detailRow}>
              <View style={styles.iconBadge}>
                <Image source={require("@/../assets/tag.png")} style={styles.iconImage} />
              </View>
              <Text style={styles.detailText}>東京遠征</Text>
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
                placeholder="メモを入力"
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
          <Image
            source={require("@/../assets/groupPhoto.png")}
            style={styles.zoomImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </ScreenBackgroundContainer>
  );
};
