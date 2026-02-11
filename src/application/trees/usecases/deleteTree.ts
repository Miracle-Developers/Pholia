import * as api from "@/infrastructure/api";
import * as auth from "@/infrastructure/auth";

export const deleteTree = async (treeId: number | string): Promise<boolean> => {
    try {
        await auth.restoreToken();
        await api.deleteTree(treeId);
        return true;
    } catch (error) {
        console.error("Failed to delete tree:", error);
        return false;
    }
};
