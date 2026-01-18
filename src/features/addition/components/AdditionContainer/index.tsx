import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

import { BackTitle } from "@/components/BackTitle";
import { WoodenButton } from "@/components/Buttons/WoodenButton";
import { KeyboardAvoidingContainer } from "@/components/Containers/KeyboardAvoidingContainer";
import { Header } from "@/components/Header";
import { useLeafUpload } from "@/features/addition/hooks/useLeafUpload";
import { useRouterNavigation } from "@/hooks/useRouter";

import { styles } from "./styles";

export const AdditionContainer = () => {
  const router = useRouter();
  const { goToProfile, goToSetting } = useRouterNavigation();
  const { selectedPhoto, isUploading, selectPhoto, upload } = useLeafUpload();

  const handleUpload = async () => {
    await upload();
  };

  return (
    <KeyboardAvoidingContainer style={styles.container}>
      <StatusBar style="dark" />
      <Header
        name="ぽっぽ"
        userId="poppo"
        avatarSource={require("@/../assets/logo.png")}
        onPressProfile={goToProfile}
        onPressSetting={goToSetting}
        style={styles.topHeader}
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View pointerEvents="none" style={[styles.cloud, styles.cloudRight]} />
        <View pointerEvents="none" style={[styles.cloud, styles.cloudLeft]} />

        <BackTitle title="木詳細" onPress={() => router.back()} style={styles.backTitle} />

        <View style={styles.bannerWrapper}>
          <ImageBackground
            source={require("@/../assets/nameplate.png")}
            style={styles.nameplate}
            resizeMode="stretch"
          >
            <Text style={styles.nameplateText}>葉追加</Text>
          </ImageBackground>
        </View>

        <View style={styles.leafWrapper}>
          <Image source={require("@/../assets/leaf.png")} style={styles.leafImage} />
        </View>

        <View style={styles.card}>
          <View style={styles.fieldRow}>
            <View style={styles.iconBadge}>
              <Image source={require("@/../assets/leaf_icon.png")} style={styles.iconImage} />
            </View>
            <View style={styles.fieldContent}>
              <Text style={styles.fieldPlaceholder}>追加する木を選択</Text>
            </View>
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
              <MaterialIcons name="add" size={18} color="#7A4B2A" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.fieldRow}
            activeOpacity={0.85}
            onPress={selectPhoto}
          >
            <View style={styles.iconBadge}>
              <Image source={require("@/../assets/album.png")} style={styles.iconImage} />
            </View>
            <View style={styles.fieldContent}>
              <Text style={styles.fieldPlaceholder}>
                {selectedPhoto ? "写真を選択済み" : "追加する写真を選択"}
              </Text>
            </View>
            <View style={styles.actionButton}>
              <MaterialIcons name="file-upload" size={18} color="#7A4B2A" />
            </View>
          </TouchableOpacity>

          <View style={styles.fieldRow}>
            <View style={styles.iconBadge}>
              <Image source={require("@/../assets/tag.png")} style={styles.iconImage} />
            </View>
            <TextInput
              placeholder="イベント名を入力(任意)"
              placeholderTextColor="#B5906E"
              style={styles.fieldInput}
            />
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
              <MaterialIcons name="create" size={18} color="#7A4B2A" />
            </TouchableOpacity>
          </View>

          <View style={[styles.fieldRow, styles.fieldRowLast]}>
            <View style={styles.memoField}>
              <TextInput
                placeholder="メモ(任意)"
                placeholderTextColor="#B5906E"
                style={[styles.fieldInput, styles.memoInput]}
                multiline
                textAlignVertical="top"
              />
              <TouchableOpacity style={styles.memoIconButton} activeOpacity={0.8}>
                <MaterialIcons name="create" size={18} color="#7A4B2A" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <WoodenButton
          title={isUploading ? "追加中..." : "追加"}
          onPress={handleUpload}
          style={styles.submitButton}
          disabled={isUploading}
        />
      </ScrollView>
    </KeyboardAvoidingContainer>
  );
};
