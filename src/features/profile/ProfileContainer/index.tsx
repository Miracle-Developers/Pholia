import { useRouterNavigation } from "@/hooks/useRouter";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { styles } from "@/features/profile/ProfileContainer/styles";


export const ProfileContainer = () => {
    const router = useRouter();
    const { goToSetting } = useRouterNavigation();

    // TODO: 実際のユーザーデータはAPI/ストレージから取得する
    const user = {
        name: "ぽっぽ",
        userId: "poppo_123",
        email: "poppo@example.com",
        joinDate: "2025年11月28日から利用しています",
        bio: "",
        friendCount: 25,
        relationCount: 40,
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
                        <MaterialIcons name="account-circle" size={100} color="#CCC" />
                    </View>
                </View>

                <View style={styles.profileInfo}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userId}>@{user.userId}</Text>

                    <View style={styles.infoItem}>
                        <MaterialIcons name="mail" size={16} color="#666" />
                        <Text style={styles.infoText}>{user.email}</Text>
                    </View>

                    <View style={styles.infoItem}>
                        <MaterialIcons name="calendar-today" size={16} color="#666" />
                        <Text style={styles.infoText}>{user.joinDate}</Text>
                    </View>
                </View>

                <View style={styles.bioSection}>
                    <Text style={styles.bioLabel}>一言</Text>
                    <View style={styles.bioBox}>
                        <Text style={styles.bioText}>{user.bio || "まだ一言が設定されていません"}</Text>
                    </View>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statLabel}>友達</Text>
                        <Text style={styles.statValue}>{user.friendCount}</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statLabel}>関係</Text>
                        <Text style={styles.statValue}>{user.relationCount}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
