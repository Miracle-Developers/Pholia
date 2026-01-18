import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

import { uploadLeaf } from "@/application/leaves/usecases";
import { BackTitle } from "@/components/BackTitle";
import { WoodenButton } from "@/components/Buttons/WoodenButton";
import { KeyboardAvoidingContainer } from "@/components/Containers/KeyboardAvoidingContainer";
import { Header } from "@/components/Header";
import { useRouterNavigation } from "@/hooks/useRouter";
import { useToast } from "@/hooks/useToast";
import * as auth from "@/infrastructure/auth";

import { styles } from "./styles";

export const AdditionContainer = () => {
  const router = useRouter();
  const { goToProfile, goToSetting } = useRouterNavigation();
  const { showToast } = useToast();
  const [selectedPhoto, setSelectedPhoto] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSelectPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      showToast({
        title: "写真へのアクセスが必要です",
        message: "フォトライブラリの許可をオンにしてください。",
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.9,
    });

    if (!result.canceled && result.assets?.[0]) {
      setSelectedPhoto(result.assets[0]);
    }
  };

  const getFileName = (asset: ImagePicker.ImagePickerAsset) => {
    if (asset.fileName) return asset.fileName;
    const uriParts = asset.uri.split("/");
    const name = uriParts[uriParts.length - 1];
    if (name && name.includes(".")) return name;
    return `leaf-${Date.now()}.jpg`;
  };

  const handleUpload = async () => {
    if (!selectedPhoto) {
      showToast({
        title: "写真が未選択です",
        message: "アップロードする写真を選んでください。",
      });
      return;
    }
    if (isUploading) return;

    await auth.restoreToken();
    const token = auth.getToken();
    if (!token) {
      showToast({
        title: "ログインが必要です",
        message: "再ログインしてからアップロードしてください。",
      });
      return;
    }

    const name = getFileName(selectedPhoto);
    const type = selectedPhoto.mimeType || "image/jpeg";

    setIsUploading(true);
    try {
      await uploadLeaf({
        uri: selectedPhoto.uri,
        name,
        type,
      });
      showToast({ title: "アップロード完了", message: "写真を追加しました。" });
      setSelectedPhoto(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (message.includes("401")) {
        showToast({ title: "認証エラー", message: "ログインが切れています。" });
      } else {
        showToast({ title: "アップロード失敗", message: "時間をおいて再度お試しください。" });
      }
      console.warn("Leaf upload failed:", error);
    } finally {
      setIsUploading(false);
    }
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
            onPress={handleSelectPhoto}
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
