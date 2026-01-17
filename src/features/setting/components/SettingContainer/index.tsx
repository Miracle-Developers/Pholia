import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { CommonModal } from "@/features/setting/components/CommonModal";
import { EditAvatarModal } from "@/features/setting/components/EditAvatarModal";
import { EditPasswordModal } from "@/features/setting/components/EditPasswordModal";
import { styles } from "@/features/setting/components/SettingContainer/styles";

export const SettingContainer = () => {
  const router = useRouter();

  const [editAvatarVisible, setEditAvatarVisible] = useState(false);
  const [editNameVisible, setEditNameVisible] = useState(false);
  const [editUserIdVisible, setEditUserIdVisible] = useState(false);
  const [editEmailVisible, setEditEmailVisible] = useState(false);
  const [editBioVisible, setEditBioVisible] = useState(false);
  const [editPasswordVisible, setEditPasswordVisible] = useState(false);
  const [deleteAccountVisible, setDeleteAccountVisible] = useState(false);

  // TODO: 実際のユーザーデータはAPI/ストレージから取得する
  const [user, setUser] = useState({
    name: "ぽっぽ",
    userId: "poppo_123",
    email: "poppo@example.com",
    bio: "",
  });

  const handleNameSave = (name: string) => {
    setUser({ ...user, name });
    setEditNameVisible(false);
  };

  const handleUserIdSave = (userId: string) => {
    setUser({ ...user, userId });
    setEditUserIdVisible(false);
  };

  const handleEmailSave = (email: string) => {
    setUser({ ...user, email });
    setEditEmailVisible(false);
  };

  const handleBioSave = (bio: string) => {
    setUser({ ...user, bio });
    setEditBioVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <MaterialIcons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>設定</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.avatarSection}
          onPress={() => setEditAvatarVisible(true)}
        >
          <View style={styles.avatarContainer}>
            <MaterialIcons name="account-circle" size={80} color="#CCC" />
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

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => setEditNameVisible(true)}
          >
            <View style={styles.settingItemLabel}>
              <MaterialIcons name="person" size={20} color="#333" />
              <View style={styles.settingLabelContainer}>
                <Text style={styles.settingLabel}>ユーザー名</Text>
                <Text style={styles.settingValue}>{user.name}</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => setEditUserIdVisible(true)}
          >
            <View style={styles.settingItemLabel}>
              <MaterialIcons name="tag" size={20} color="#333" />
              <View style={styles.settingLabelContainer}>
                <Text style={styles.settingLabel}>ユーザーID</Text>
                <Text style={styles.settingValue}>@{user.userId}</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => setEditEmailVisible(true)}
          >
            <View style={styles.settingItemLabel}>
              <MaterialIcons name="mail" size={20} color="#333" />
              <View style={styles.settingLabelContainer}>
                <Text style={styles.settingLabel}>メールアドレス</Text>
                <Text style={styles.settingValue}>{user.email}</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => setEditBioVisible(true)}
          >
            <View style={styles.settingItemLabel}>
              <MaterialIcons name="subject" size={20} color="#333" />
              <View style={styles.settingLabelContainer}>
                <Text style={styles.settingLabel}>一言</Text>
                <Text style={styles.settingValue} numberOfLines={1}>
                  {user.bio || "未設定"}
                </Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.settingSection}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>セキュリティ</Text>
          </View>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => setEditPasswordVisible(true)}
          >
            <View style={styles.settingItemLabel}>
              <MaterialIcons name="lock" size={20} color="#333" />
              <Text style={styles.settingLabel}>パスワード変更</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.settingSection}>
          <TouchableOpacity
            style={[styles.settingItem, styles.settingItemDanger]}
            onPress={() => setDeleteAccountVisible(true)}
          >
            <View style={styles.settingItemLabel}>
              <MaterialIcons name="delete" size={20} color="#E74C3C" />
              <Text style={[styles.settingLabel, { color: "#E74C3C" }]}>
                アカウント削除
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#E74C3C" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <EditAvatarModal
        visible={editAvatarVisible}
        onClose={() => setEditAvatarVisible(false)}
        onSave={() => setEditAvatarVisible(false)}
      />

      <CommonModal
        visible={editNameVisible}
        title="ユーザー名変更"
        placeholder="新しいユーザー名を入力"
        initialValue={user.name}
        onClose={() => setEditNameVisible(false)}
        onSave={handleNameSave}
      />

      <CommonModal
        visible={editUserIdVisible}
        title="ユーザーID変更"
        placeholder="新しいユーザーIDを入力（@なし）"
        initialValue={user.userId}
        onClose={() => setEditUserIdVisible(false)}
        onSave={handleUserIdSave}
      />

      <CommonModal
        visible={editEmailVisible}
        title="メールアドレス変更"
        placeholder="新しいメールアドレスを入力"
        initialValue={user.email}
        onClose={() => setEditEmailVisible(false)}
        onSave={handleEmailSave}
      />

      <CommonModal
        visible={editBioVisible}
        title="一言変更"
        placeholder="140文字以内で入力"
        initialValue={user.bio}
        multiline={true}
        maxLength={100}
        onClose={() => setEditBioVisible(false)}
        onSave={handleBioSave}
      />

      <EditPasswordModal
        visible={editPasswordVisible}
        onClose={() => setEditPasswordVisible(false)}
        onSave={(password) => {
          console.log("Password updated");
          setEditPasswordVisible(false);
        }}
      />

      <CommonModal
        visible={deleteAccountVisible}
        title="アカウントを削除しますか？"
        description="このアクションは取り消すことができません。すべてのデータが削除されます。"
        onClose={() => setDeleteAccountVisible(false)}
        onSave={() => {
          console.log("Account deleted");
          router.push("/login");
        }}
        isDanger={true}
      />
    </View>
  );
};
