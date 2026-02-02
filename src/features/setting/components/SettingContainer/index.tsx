import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { BackTitle } from "@/components/BackTitle";
import { ScreenBackgroundContainer } from "@/components/Containers/BackgroundContainer";
import { Header } from "@/components/Header";
import { CommonModal } from "@/features/setting/components/CommonModal";
import { EditAvatarModal } from "@/features/setting/components/EditAvatarModal";
import { EditPasswordModal } from "@/features/setting/components/EditPasswordModal";
import { styles } from "@/features/setting/components/SettingContainer/styles";
import { useProfileSettings } from "@/hooks/useProfileSettings";
import { useRouterNavigation } from "@/hooks/useRouter";

export const SettingContainer = () => {
  const { goBack, goToProfile, goToSetting } = useRouterNavigation();
  const {
    currentUserId,
    user,
    getAvatarUrl,
    handleNameSave,
    handleUserIdSave,
    handleEmailSave,
    handleAvatarSave,
    handlePasswordSave,
    handleLogout,
    handleDeleteAccount,
  } = useProfileSettings();

  const [editAvatarVisible, setEditAvatarVisible] = useState(false);
  const [editNameVisible, setEditNameVisible] = useState(false);
  const [editUserIdVisible, setEditUserIdVisible] = useState(false);
  const [editEmailVisible, setEditEmailVisible] = useState(false);
  const [editPasswordVisible, setEditPasswordVisible] = useState(false);
  const [deleteAccountVisible, setDeleteAccountVisible] = useState(false);

  return (
    <ScreenBackgroundContainer>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <Header
          name={user.name}
          userId={user.userId}
          avatarSource={
            user.avatarFileKey
              ? { uri: getAvatarUrl(user.avatarFileKey) || "" }
              : require("@/../assets/logo.png")
          }
          onPressProfile={goToProfile}
          onPressSetting={goToSetting}
        />

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <BackTitle title="ホーム" onPress={goBack} style={styles.backTitle} />
          <TouchableOpacity style={styles.avatarSection} onPress={() => setEditAvatarVisible(true)}>
            <View style={styles.avatarContainer}>
              {user.avatarFileKey ? (
                <Image
                  source={{
                    uri: getAvatarUrl(user.avatarFileKey) || "",
                  }}
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
              <View style={styles.editBadge}>
                <MaterialIcons name="edit" size={16} color="white" />
              </View>
            </View>
            <Text style={styles.avatarEditText}>画像を変更</Text>
          </TouchableOpacity>

        <View style={styles.settingSection}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>プロフィール情報</Text>
          </View>

          <TouchableOpacity style={styles.settingItem} onPress={() => setEditNameVisible(true)}>
            <View style={styles.settingItemLabel}>
              <MaterialIcons name="person" size={20} color="#8B6F47" />
              <View style={styles.settingLabelContainer}>
                <Text style={styles.settingLabel}>ユーザー名</Text>
                <Text style={styles.settingValue}>{user.name}</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#8B6F47" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={() => setEditUserIdVisible(true)}>
            <View style={styles.settingItemLabel}>
              <MaterialIcons name="tag" size={20} color="#8B6F47" />
              <View style={styles.settingLabelContainer}>
                <Text style={styles.settingLabel}>ユーザーID</Text>
                <Text style={styles.settingValue}>@{user.userId}</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#8B6F47" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={() => setEditEmailVisible(true)}>
            <View style={styles.settingItemLabel}>
              <MaterialIcons name="mail" size={20} color="#8B6F47" />
              <View style={styles.settingLabelContainer}>
                <Text style={styles.settingLabel}>メールアドレス</Text>
                <Text style={styles.settingValue}>{user.email}</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#8B6F47" />
          </TouchableOpacity>
        </View>

        <View style={styles.settingSection}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>セキュリティ</Text>
          </View>

          <TouchableOpacity style={styles.settingItem} onPress={() => setEditPasswordVisible(true)}>
            <View style={styles.settingItemLabel}>
              <MaterialIcons name="lock" size={20} color="#8B6F47" />
              <Text style={styles.settingLabel}>パスワード変更</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#8B6F47" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.settingItem, styles.settingItemLogout]}
            onPress={handleLogout}
          >
            <View style={styles.settingItemLabel}>
              <MaterialIcons name="logout" size={20} color="#8B6F47" />
              <Text style={styles.settingLabel}>ログアウト</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#8B6F47" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.settingItem, styles.settingItemDanger]}
            onPress={() => setDeleteAccountVisible(true)}
          >
            <View style={styles.settingItemLabel}>
              <MaterialIcons name="delete" size={20} color="#E74C3C" />
              <Text style={[styles.settingLabel, { color: "#E74C3C" }]}>アカウント削除</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#E74C3C" />
          </TouchableOpacity>
        </View>
        </ScrollView>

        <EditAvatarModal
        visible={editAvatarVisible}
        onClose={() => setEditAvatarVisible(false)}
        userId={String(currentUserId || "")}
        onSave={async () => {
          await handleAvatarSave();
          setEditAvatarVisible(false);
        }}
      />

      <CommonModal
        visible={editNameVisible}
        title="ユーザー名変更"
        placeholder="新しいユーザー名を入力"
        initialValue={user.name}
        onClose={() => setEditNameVisible(false)}
        onSave={async (name) => {
          await handleNameSave(name);
          setEditNameVisible(false);
        }}
      />

      <CommonModal
        visible={editUserIdVisible}
        title="ユーザーID変更"
        placeholder="新しいユーザーIDを入力（@なし）"
        initialValue={user.userId}
        onClose={() => setEditUserIdVisible(false)}
        onSave={async (userId) => {
          await handleUserIdSave(userId);
          setEditUserIdVisible(false);
        }}
      />

      <CommonModal
        visible={editEmailVisible}
        title="メールアドレス変更"
        placeholder="新しいメールアドレスを入力"
        initialValue={user.email}
        onClose={() => setEditEmailVisible(false)}
        onSave={async (email) => {
          await handleEmailSave(email);
          setEditEmailVisible(false);
        }}
      />

      <EditPasswordModal
        visible={editPasswordVisible}
        onClose={() => setEditPasswordVisible(false)}
        onSave={async (_password) => {
          await handlePasswordSave();
          setEditPasswordVisible(false);
        }}
        userId={String(currentUserId || "")}
      />

      <CommonModal
        visible={deleteAccountVisible}
        title="アカウントを削除しますか？"
        description="このアクションは取り消すことができません。すべてのデータが削除されます。"
        onClose={() => setDeleteAccountVisible(false)}
        onSave={async () => {
          await handleDeleteAccount();
          setDeleteAccountVisible(false);
        }}
        isDanger={true}
      />
      </View>
    </ScreenBackgroundContainer>
  );
};
