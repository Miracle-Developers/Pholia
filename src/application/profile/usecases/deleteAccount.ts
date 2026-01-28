import * as profileInfra from "@/infrastructure/profile";

export const deleteAccount = async (userId: string): Promise<void> => {
    await profileInfra.deleteAccount(userId);
};
