import * as profileInfra from "@/infrastructure/profile";

export async function deleteAccount(userId: string): Promise<void> {
    await profileInfra.deleteAccount(userId);
}
