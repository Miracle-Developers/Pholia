import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { BackTitle } from "@/components/BackTitle";
import { WoodenButton } from "@/components/Buttons/WoodenButton";
import { ScreenBackgroundContainer } from "@/components/Containers/BackgroundContainer";
import { KeyboardAvoidingContainer } from "@/components/Containers/KeyboardAvoidingContainer";
import { Header } from "@/components/Header";
import { styles } from "@/features/addition/components/TreeAdditionContainer/styles";
import { useHeaderProfile } from "@/hooks/useHeaderProfile";
import { useRouterNavigation } from "@/hooks/useRouter";

export const TreeAdditionContainer = () => {
  const { name, userId, avatarSource } = useHeaderProfile();
  const { goBack, goToProfile, goToSetting } = useRouterNavigation();

  return (
    <ScreenBackgroundContainer>
      <KeyboardAvoidingContainer style={styles.container}>
        <StatusBar style="dark" />
        <Header
          name={name}
          userId={userId}
          avatarSource={avatarSource}
          onPressProfile={goToProfile}
          onPressSetting={goToSetting}
          style={styles.topHeader}
        />

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <BackTitle title="ホーム" onPress={goBack} style={styles.backTitle} />

          <View style={styles.bannerWrapper}>
            <ImageBackground
              source={require("@/../assets/nameplate.png")}
              style={styles.nameplate}
              resizeMode="stretch"
            >
              <Text style={styles.nameplateText}>新規木作成</Text>
            </ImageBackground>
          </View>

          <View style={styles.treeWrapper}>
            <Image source={require("@/../assets/tree2.png")} style={styles.treeImage} />
          </View>

          <View style={styles.card}>
            <TouchableOpacity style={styles.fieldRow} activeOpacity={0.85}>
              <View style={styles.iconBadge}>
                <Image source={require("@/../assets/leaf_icon.png")} style={styles.iconImage} />
              </View>
              <View style={styles.fieldContent}>
                <Text style={styles.fieldPlaceholder}>追加する森を選択</Text>
              </View>
              <View style={styles.actionButton}>
                <MaterialIcons name="add" size={18} color="#7A4B2A" />
              </View>
            </TouchableOpacity>

            <View style={styles.fieldRow}>
              <View style={styles.iconBadge}>
                <Image source={require("@/../assets/tag.png")} style={styles.iconImage} />
              </View>
              <TextInput
                placeholder="木の名前を入力"
                placeholderTextColor="#B5906E"
                style={styles.fieldInput}
              />
              <TouchableOpacity style={styles.actionButton} activeOpacity={0.85}>
                <MaterialIcons name="create" size={18} color="#7A4B2A" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.fieldRow, styles.fieldRowLast]} activeOpacity={0.85}>
              <View style={styles.iconBadge}>
                <Image source={require("@/../assets/user_icon.png")} style={styles.iconImage} />
              </View>
              <View style={styles.fieldContent}>
                <Text style={styles.fieldPlaceholder}>関連するユーザーを追加</Text>
              </View>
              <View style={styles.actionButton}>
                <MaterialIcons name="add" size={18} color="#7A4B2A" />
              </View>
            </TouchableOpacity>
          </View>

          <WoodenButton title="作成" onPress={() => {}} style={styles.submitButton} />
        </ScrollView>
      </KeyboardAvoidingContainer>
    </ScreenBackgroundContainer>
  );
};
