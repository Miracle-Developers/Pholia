import * as api from "@/infrastructure/api";
import * as auth from "@/infrastructure/auth";

export const deleteForest = async (forestId: number | string): Promise<boolean> => {
    try {
        await auth.restoreToken();
        await api.deleteForest(forestId);
        return true;
    } catch (error) {
        console.error("Failed to delete forest:", error);
        return false;
    }
};
