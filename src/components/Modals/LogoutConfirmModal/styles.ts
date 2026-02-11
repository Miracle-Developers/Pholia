import { FONT_FAMILY } from "@/config/fontConfig";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#F5F8E8",
        borderRadius: 20,
        width: "80%",
        maxWidth: 300,
        padding: 24,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    iconContainer: {
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#8B6F47",
        marginBottom: 12,
        textAlign: "center",
        fontFamily: FONT_FAMILY.medium,
    },
    modalDescription: {
        fontSize: 14,
        color: "#8B6F47",
        textAlign: "center",
        marginBottom: 24,
        lineHeight: 20,
        fontFamily: FONT_FAMILY.regular,
    },
    buttonContainer: {
        flexDirection: "row",
        width: "100%",
        gap: 12,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: "#D4C5A0",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    cancelButtonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#FFFFFF",
        fontFamily: FONT_FAMILY.regular,
    },
    logoutButton: {
        flex: 1,
        backgroundColor: "#8B6F47",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    logoutButtonText: {
        fontSize: 14,
        fontWeight: "600",
        color: "white",
        fontFamily: FONT_FAMILY.regular,
    },
});
