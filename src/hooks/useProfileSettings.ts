import { useCallback, useEffect, useState } from "react";

import { deleteAccount, getAvatarUrl, updateProfile } from "@/application/profile/usecases";
import { loadProfile } from "@/application/profile/usecases/loadProfile";
import { useRouterNavigation } from "@/hooks/useRouter";
import { useToast } from "@/hooks/useToast";
import * as auth from "@/infrastructure/auth";

interface UserProfile {
  name: string;
  userId: string;
  email: string;
  avatarFileKey: string | null;
}

export const useProfileSettings = () => {
  const { goToHome, goToLogin } = useRouterNavigation();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [user, setUser] = useState<UserProfile>({
    name: "",
    userId: "",
    email: "",
    avatarFileKey: null,
  });

  // ユーザーデータの読み込み
  const loadUserData = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  // ユーザー情報を再取得して画面更新
  const refreshUserData = async () => {
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
    } catch (_error) {
      console.error("Failed to refresh user data:", _error);
    }
  };

  const handleNameSave = async (name: string) => {
    if (!currentUserId) return;
    try {
      await updateProfile(String(currentUserId), { name });
      await refreshUserData();
      return true;
    } catch (_error) {
      showToast({ title: "エラー", message: "ユーザー名の更新に失敗しました" });
      return false;
    }
  };

  const handleUserIdSave = async (userId: string) => {
    if (!currentUserId) return;
    try {
      await updateProfile(String(currentUserId), { user_handle: userId });
      await refreshUserData();
      return true;
    } catch (_error) {
      showToast({ title: "エラー", message: "ユーザーIDの更新に失敗しました" });
      return false;
    }
  };

  const handleEmailSave = async (email: string) => {
    if (!currentUserId) return;
    try {
      await updateProfile(String(currentUserId), { email });
      await refreshUserData();
      return true;
    } catch (_error) {
      showToast({ title: "エラー", message: "メールアドレスの更新に失敗しました" });
      return false;
    }
  };

  const handleAvatarSave = async () => {
    try {
      await refreshUserData();
      return true;
    } catch (_error) {
      console.error("Failed to refresh user data:", _error);
      return false;
    }
  };

  const handlePasswordSave = async () => {
    try {
      await refreshUserData();
      return true;
    } catch (_error) {
      console.error("Failed to refresh user data:", _error);
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await auth.setToken(null);
      await auth.setUserId(null);
      goToHome();
    } catch (_error) {
      showToast({ title: "エラー", message: "ログアウトに失敗しました" });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      if (!currentUserId) return;
      await deleteAccount(String(currentUserId));
      showToast({ title: "成功", message: "アカウントが削除されました" });
      await auth.clearToken();
      goToLogin();
    } catch (_error) {
      showToast({ title: "エラー", message: "アカウント削除に失敗しました" });
    }
  };

  return {
    isLoading,
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
  };
};
