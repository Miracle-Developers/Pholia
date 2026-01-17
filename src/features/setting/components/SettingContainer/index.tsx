import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { deleteAccount, getAvatarUrl, updateProfile } from "@/application/profile/usecases";
import { loadProfile } from "@/application/profile/usecases/loadProfile";
import { CommonModal } from "@/features/setting/components/CommonModal";
import { EditAvatarModal } from "@/features/setting/components/EditAvatarModal";
import { EditPasswordModal } from "@/features/setting/components/EditPasswordModal";
import { styles } from "@/features/setting/components/SettingContainer/styles";
import { useToast } from "@/hooks/useToast";
import * as auth from "@/infrastructure/auth";

export const SettingContainer = () => {
    const router = useRouter();
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);

    const [editAvatarVisible, setEditAvatarVisible] = useState(false);
    const [editNameVisible, setEditNameVisible] = useState(false);
    const [editUserIdVisible, setEditUserIdVisible] = useState(false);
    const [editEmailVisible, setEditEmailVisible] = useState(false);
    const [editPasswordVisible, setEditPasswordVisible] = useState(false);
    const [deleteAccountVisible, setDeleteAccountVisible] = useState(false);

    const [user, setUser] = useState({
        name: "",
        userId: "",
        email: "",
        avatarFileKey: null as string | null,
    });

    // ユーザーデータの読み込み
    useEffect(() => {
        const loadUserData = async () => {
            try {
                setIsLoading(true);
                const userData = await loadProfile();
                if (userData) {
                    setCurrentUserId(userData.id);
                    setUser({
                        name: userData.name,
                        userId: userData.userId,
                        email: userData.email,
                        avatarFileKey: userData.avatarFileKey,
                    });
                }
            } catch (error) {
                console.warn("ユーザーデータの読み込みに失敗:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadUserData();
    }, []);

    const handleNameSave = async (name: string) => {
        if (!currentUserId) return;
        try {
            await updateProfile(String(currentUserId), { name });
            // 最新データを取得して画面更新
            const userData = await loadProfile();
            if (userData) {
                setUser({
                    name: userData.name,
                    userId: userData.userId,
                    email: userData.email,
                    avatarFileKey: userData.avatarFileKey,
                });
            }
            setEditNameVisible(false);
        } catch (error) {
            showToast({ title: "エラー", message: "ユーザー名の更新に失敗しました" });
        }
    };

    const handleUserIdSave = async (userId: string) => {
        if (!currentUserId) return;
        try {
            await updateProfile(String(currentUserId), { user_handle: userId });
            // 最新データを取得して画面更新
            const userData = await loadProfile();
            if (userData) {
                setUser({
                    name: userData.name,
                    userId: userData.userId,
                    email: userData.email,
                    avatarFileKey: userData.avatarFileKey,
                });
            }
            setEditUserIdVisible(false);
        } catch (error) {
            showToast({ title: "エラー", message: "ユーザーIDの更新に失敗しました" });
        }
    };

    const handleEmailSave = async (email: string) => {
        if (!currentUserId) return;
        try {
            await updateProfile(String(currentUserId), { email });
            // 最新データを取得して画面更新
            const userData = await loadProfile();
            if (userData) {
                setUser({
                    name: userData.name,
                    userId: userData.userId,
                    email: userData.email,
                    avatarFileKey: userData.avatarFileKey,
                });
            }
            setEditEmailVisible(false);
        } catch (error) {
            showToast({ title: "エラー", message: "メールアドレスの更新に失敗しました" });
        }
    };

    const handleLogout = async () => {
        try {
            await auth.setToken(null);
            await auth.setUserId(null);
            router.replace("/");
        } catch (error) {
            showToast({ title: "エラー", message: "ログアウトに失敗しました" });
        }
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
                        {user.avatarFileKey ? (
                            <Image
                                source={{
                                    uri: getAvatarUrl(user.avatarFileKey) || ""
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

                    <TouchableOpacity
                        style={styles.settingItem}
                        onPress={() => setEditNameVisible(true)}
                    >
                        <View style={styles.settingItemLabel}>
                            <MaterialIcons name="person" size={20} color="#8B6F47" />
                            <View style={styles.settingLabelContainer}>
                                <Text style={styles.settingLabel}>ユーザー名</Text>
                                <Text style={styles.settingValue}>{user.name}</Text>
                            </View>
                        </View>
                        <MaterialIcons name="chevron-right" size={24} color="#8B6F47" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.settingItem}
                        onPress={() => setEditUserIdVisible(true)}
                    >
                        <View style={styles.settingItemLabel}>
                            <MaterialIcons name="tag" size={20} color="#8B6F47" />
                            <View style={styles.settingLabelContainer}>
                                <Text style={styles.settingLabel}>ユーザーID</Text>
                                <Text style={styles.settingValue}>@{user.userId}</Text>
                            </View>
                        </View>
                        <MaterialIcons name="chevron-right" size={24} color="#8B6F47" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.settingItem}
                        onPress={() => setEditEmailVisible(true)}
                    >
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

                    <TouchableOpacity
                        style={styles.settingItem}
                        onPress={() => setEditPasswordVisible(true)}
                    >
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
                userId={String(currentUserId || "")}
                onSave={async () => {
                    // 最新データを取得して画面更新
                    try {
                        const userData = await loadProfile();
                        if (userData) {
                            setUser({
                                name: userData.name,
                                userId: userData.userId,
                                email: userData.email,
                                avatarFileKey: userData.avatarFileKey,
                            });
                        }
                    } catch (error) {
                        console.error("Failed to refresh user data:", error);
                    }
                    setEditAvatarVisible(false);
                }}
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

            <EditPasswordModal
                visible={editPasswordVisible}
                onClose={() => setEditPasswordVisible(false)}
                onSave={async (password) => {
                    // 最新データを取得して画面更新
                    try {
                        const userData = await loadProfile();
                        if (userData) {
                            setUser({
                                name: userData.name,
                                userId: userData.userId,
                                email: userData.email,
                                avatarFileKey: userData.avatarFileKey,
                            });
                        }
                    } catch (error) {
                        console.error("Failed to refresh user data:", error);
                    }
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
                    try {
                        if (!currentUserId) return;
                        await deleteAccount(String(currentUserId));
                        showToast({ title: "成功", message: "アカウントが削除されました" });
                        await auth.clearToken();
                        router.push("/login");
                    } catch (error) {
                        showToast({ title: "エラー", message: "アカウント削除に失敗しました" });
                    }
                }}
                isDanger={true}
            />
        </View>
    );
};
