import { useEffect, useState } from "react";
import type { ImageSourcePropType } from "react-native";

import { getAvatarUrl } from "@/application/profile/usecases";
import { loadProfile } from "@/application/profile/usecases/loadProfile";

type HeaderProfile = {
  name: string;
  userId: string;
  avatarSource: ImageSourcePropType;
  isLoading: boolean;
};

export const useHeaderProfile = () => {
  const [profile, setProfile] = useState<HeaderProfile>({
    name: "",
    userId: "",
    avatarSource: require("@/../assets/logo.png"),
    isLoading: true,
  });

  useEffect(() => {
    const loadHeaderProfile = async () => {
      try {
        const userData = await loadProfile();
        if (userData) {
          const avatarUrl = userData.avatarFileKey ? getAvatarUrl(userData.avatarFileKey) : null;
          setProfile({
            name: userData.name,
            userId: userData.userId,
            avatarSource: avatarUrl ? { uri: avatarUrl } : require("@/../assets/logo.png"),
            isLoading: false,
          });
        } else {
          setProfile((prev) => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.warn("ヘッダープロファイルの読み込みに失敗:", error);
        setProfile((prev) => ({ ...prev, isLoading: false }));
      }
    };

    loadHeaderProfile();
  }, []);

  return profile;
};
