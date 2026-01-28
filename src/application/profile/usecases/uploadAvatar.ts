import * as api from "@/infrastructure/api";

export type AvatarFile = {
    uri: string;
    name: string;
    type: string;
};

export const uploadAvatar = async (
    userId: string,
    file: AvatarFile,
): Promise<{ file_key: string } | null> => {
    try {
        const response = await api.uploadAvatar(userId, file);
        return response;
    } catch (error) {
        throw error;
    }
};
