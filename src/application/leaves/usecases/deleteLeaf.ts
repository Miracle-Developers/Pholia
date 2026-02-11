import * as api from "@/infrastructure/api";
import * as auth from "@/infrastructure/auth";

export const deleteLeaf = async (leafId: number | string): Promise<boolean> => {
    try {
        await auth.restoreToken();
        await api.deleteLeaf(leafId);
        return true;
    } catch (error) {
        console.error("Failed to delete leaf:", error);
        return false;
    }
};
