import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHeader: {
    marginBottom: 8,
    marginTop: 0,
  },
  backTitle: {
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  content: {
    flexGrow: 1,
    paddingTop: 14,
    paddingBottom: 12,
    justifyContent: "flex-start",
  },
  contentTop: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  nameplateWrapper: {
    marginTop: 16,
  },
  nameplate: {
    width: 220,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  nameplateText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#6C4A2C",
    letterSpacing: 1,
  },
  leafGrid: {
    width: "100%",
    marginTop: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  leafItem: {
    width: "30%",
    aspectRatio: 1.1,
    marginBottom: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  leafItemSelected: {
    transform: [{ scale: 1.05 }],
    shadowColor: "#5D3A1A",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  leafImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  confirmButton: {
    marginTop: 24,
  },
});
