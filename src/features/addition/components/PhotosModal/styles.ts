import { Dimensions, StyleSheet } from "react-native";

const MODAL_H_PADDING = 32;
const CONTENT_H_PADDING = 32;
const GAP = 8;
const COLUMNS = 3;
const AVAILABLE_WIDTH = Dimensions.get("window").width - MODAL_H_PADDING - CONTENT_H_PADDING;
const PHOTO_SIZE = Math.floor((AVAILABLE_WIDTH - (GAP * (COLUMNS - 1))) / COLUMNS);

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 32,
    },
    modalContainer: {
        backgroundColor: "#FDFCF8",
        borderRadius: 12,
        width: "100%",
        maxHeight: "80%",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
    },
    header: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#E3CBA5",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "#6C4A2C",
    },
    closeButton: {
        padding: 4,
    },
    scrollContent: {
        padding: 16,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },
    photoWrapper: {
        width: PHOTO_SIZE,
        height: PHOTO_SIZE,
        borderRadius: 8,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#E3CBA5",
    },
    photo: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
});
