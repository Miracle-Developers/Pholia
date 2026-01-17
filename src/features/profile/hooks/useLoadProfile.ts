import { loadProfile, UserProfileData } from "@/application/profile/usecases";
import { useEffect, useState } from "react";

export { UserProfileData };

export function useLoadProfile() {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<UserProfileData>({
        id: 0,
        name: "",
        userId: "",
        email: "",
        joinDate: "",
        forestCount: 0,
        treeCount: 0,
        avatarFileKey: null,
    });

    useEffect(() => {
        const loadProfileData = async () => {
            try {
                setIsLoading(true);
                const userData = await loadProfile();
                if (userData) {
                    setUser(userData);
                }
            } catch (error) {
                console.warn("プロフィールデータの読み込みに失敗:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadProfileData();
    }, []);

    return { isLoading, user };
}
