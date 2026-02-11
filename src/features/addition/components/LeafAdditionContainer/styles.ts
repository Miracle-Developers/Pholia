import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHeader: {
    marginBottom: 8,
    marginTop: 0,
  },
  content: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 32,
    paddingHorizontal: 18,
    alignItems: "center",
  },
  cloud: {
    position: "absolute",
    backgroundColor: "#F6FBFF",
    borderRadius: 999,
    shadowColor: "#C9E2F7",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
    opacity: 0.9,
  },
  cloudRight: {
    width: 120,
    height: 44,
    top: 24,
    right: 8,
  },
  cloudLeft: {
    width: 86,
    height: 32,
    top: 86,
    left: 24,
  },
  backTitle: {
    alignSelf: "flex-start",
    paddingTop: 6,
    paddingBottom: 4,
  },
  bannerWrapper: {
    marginTop: 18,
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
    letterSpacing: 3,
  },
  leafWrapper: {
    marginTop: 12,
    marginBottom: 16,
    alignItems: "center",
  },
  leafImage: {
    width: 170,
    height: 150,
    resizeMode: "contain",
    transform: [{ rotate: "-6deg" }],
  },
  previewImage: {
    width: 96,
    height: 96,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#FFF",
    resizeMode: "cover",
  },
  submitButton: {
    marginTop: 26,
  },
});
