import { useRouterNavigation } from "@/hooks/useRouter";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { styles } from "@/features/profile/ProfileContainer/styles";
import * as auth from "@/infrastructure/auth";
import * as profile from "@/infrastructure/profile";

export const ProfileContainer = () => {
    const router = useRouter();
    const { goToSetting } = useRouterNavigation();
    const [isLoading, setIsLoading] = useState(true);

    const [user, setUser] = useState({
        name: "",
        userId: "",
        email: "",
        joinDate: "",
        bio: "",
        forestCount: 0,
        treeCount: 0,
        avatarFileKey: null as string | null,
    });

    useEffect(() => {
        const loadProfileData = async () => {
            try {
                setIsLoading(true);

                let userId = auth.getUserId();
                if (!userId) {
                    userId = await auth.restoreUserId();
                }

                if (!userId) {
                    console.warn("ユーザーIDが見つかりません");
                    return;
                }

                const userData = await profile.loadUserProfile(userId);
                if (userData) {
                    setUser({
                        name: userData.name,
                        userId: userData.userId,
                        email: userData.email,
                        joinDate: userData.joinDate || "",
                        bio: userData.bio || "",
                        forestCount: userData.forestCount || 0,
                        treeCount: userData.treeCount || 0,
                        avatarFileKey: userData.avatarFileKey,
                    });
                }
            } catch (error) {
                console.warn("プロフィールデータの読み込みに失敗:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadProfileData();
    }, []);

    const getAvatarUrl = () => {
        return profile.getAvatarUrl(user.avatarFileKey);
    };

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <MaterialIcons name="arrow-back" size={28} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>プロフィール</Text>
                <TouchableOpacity onPress={goToSetting} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <MaterialIcons name="settings" size={28} color="#333" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.avatarSection}>
                    <View style={styles.avatarContainer}>
                        {getAvatarUrl() ? (
                            <Image
                                source={{ uri: getAvatarUrl() || "" }}
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

                    <View style={styles.bioSection}>
                        <Text style={styles.bioLabel}>一言</Text>
                        <View style={styles.bioBox}>
                            <Text style={styles.bioText}>{user.bio || "まだ一言が設定されていません"}</Text>
                        </View>
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
