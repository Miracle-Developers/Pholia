import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerTitleWrapper: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#6C4A2C",
  },
  headerUnderline: {
    marginTop: 6,
    width: 64,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#3B8DFF",
  },
  headerSpacer: {
    width: 28,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    justifyContent: "space-between",
  },
  contentTop: {
    width: "100%",
    alignItems: "center",
  },
  nameplateWrapper: {
    marginTop: 20,
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
    marginTop: 28,
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
    marginTop: 8,
  },
});
