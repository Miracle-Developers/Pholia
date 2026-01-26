import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingTop: 44,
    paddingBottom: 26,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    backgroundColor: "#D4A550",
    shadowColor: "#8C6A32",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarRing: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#2E7DDC",
    backgroundColor: "#F7F1E6",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  nameBlock: {
    marginLeft: 12,
  },
  nameText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#5B3A1E",
  },
  userIdText: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: "600",
    color: "#6B4A2C",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#8B6B4F",
    backgroundColor: "#F7E7CF",
    justifyContent: "center",
    alignItems: "center",
  },
  actionButtonSpacing: {
    marginLeft: 10,
  },
  actionIcon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
});
