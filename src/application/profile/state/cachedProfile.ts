import type { UserProfileData } from "../types";

let cachedProfile: UserProfileData | null = null;

export const setCachedProfile = (profile: UserProfileData | null) => {
    cachedProfile = profile;
};

export const getCachedProfile = (): UserProfileData | null => {
    return cachedProfile;
};

export const clearCachedProfile = () => {
    cachedProfile = null;
};
