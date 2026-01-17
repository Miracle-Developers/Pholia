import * as api from "@/infrastructure/api";

export type UserProfile = {
    name: string;
    userId: string;
    email: string;
    bio?: string;
    avatarFileKey: string | null;
    joinDate?: string;
    forestCount?: number;
    treeCount?: number;
};

/**
 * ユーザープロフィールを取得
 */
export async function loadUserProfile(userId: string): Promise<UserProfile | null> {
    try {
        // まずgetUser()でプロフィール情報を取得
        const userData = await api.getUser(userId);
        if (!userData) return null;

        // 統計情報を取得
        let stats: any = {};
        try {
            stats = await api.getUserStats(userId);
        } catch (statsError) {
            console.warn("Failed to load user stats:", statsError);
        }

        const data = userData as any;
        return {
            name: data.name || "ユーザー",
            userId: data.user_handle || userId,
            email: data.email || "",
            bio: data.bio || "",
            avatarFileKey: data.avatar_url ? extractFileKeyFromUrl(data.avatar_url) : null,
            joinDate: data.created_at
                ? `${new Date(data.created_at).getFullYear()}年${new Date(data.created_at).getMonth() + 1}月${new Date(data.created_at).getDate()}日から利用しています`
                : "取得できませんでした",
            forestCount: stats.friends_count || 0,
            treeCount: stats.tree_count || 0,
        };
    } catch (error) {
        console.error("Failed to load user profile:", error);
        return null;
    }
}

/**
 * ユーザー名を更新
 */
export async function updateUserName(userId: string, name: string): Promise<boolean> {
    try {
        await api.updateUserSettings(userId, { name });
        return true;
    } catch (error) {
        console.error("Failed to update user name:", error);
        throw error;
    }
}

/**
 * ユーザーIDを更新
 */
export async function updateUserId(userId: string, newUserId: string): Promise<boolean> {
    try {
        await api.updateUserSettings(userId, { user_handle: newUserId });
        return true;
    } catch (error) {
        console.error("Failed to update user ID:", error);
        throw error;
    }
}

/**
 * メールアドレスを更新
 */
export async function updateUserEmail(userId: string, email: string): Promise<boolean> {
    try {
        await api.updateUserSettings(userId, { email });
        return true;
    } catch (error) {
        console.error("Failed to update email:", error);
        throw error;
    }
}

/**
 * 一言（バイオ）を更新
 */
export async function updateUserBio(userId: string, bio: string): Promise<boolean> {
    try {
        await api.updateUserSettings(userId, { bio });
        return true;
    } catch (error) {
        console.error("Failed to update bio:", error);
        throw error;
    }
}

/**
 * パスワードを変更
 */
export async function changePassword(userId: string, password: string): Promise<boolean> {
    try {
        await api.updateUser(userId, { password });
        return true;
    } catch (error) {
        console.error("Failed to change password:", error);
        throw error;
    }
}

/**
 * プロフィール画像をアップロード
 */
export async function uploadProfileAvatar(file: {
    uri: string;
    name: string;
    type: string;
}): Promise<string | null> {
    try {
        const response = await api.uploadAvatar(file);
        return response.file_key || null;
    } catch (error) {
        console.error("Failed to upload avatar:", error);
        throw error;
    }
}

/**
 * アカウントを削除
 */
export async function deleteAccount(userId: string): Promise<boolean> {
    try {
        await api.deleteUser(userId);
        return true;
    } catch (error) {
        console.error("Failed to delete account:", error);
        throw error;
    }
}

/**
 * プロフィール画像のURLを取得
 */
/**
 * URLからファイルキーを抽出（R2形式）
 */
function extractFileKeyFromUrl(url: string): string | null {
    if (!url) return null;
    // URLがすでにファイルキーの場合
    if (!url.includes("/")) return url;
    // /files/keyの形式から keyを抽出
    const match = url.match(/\/files\/(.+)$/);
    return match ? match[1] : null;
}

/**
 * プロフィール画像のURLを取得
 */
export function getAvatarUrl(avatarFileKey: string | null): string | null {
    if (!avatarFileKey) return null;
    const baseUrl = process.env.EXPO_PUBLIC_API_URL || "https://pholia-back.hanpenneko.workers.dev";
    return `${baseUrl}/files/${avatarFileKey}`;
}

export default {
    loadUserProfile,
    updateUserName,
    updateUserId,
    updateUserEmail,
    updateUserBio,
    changePassword,
    uploadProfileAvatar,
    deleteAccount,
    getAvatarUrl,
};
