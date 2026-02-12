import { FONT_FAMILY } from "@/config/fontConfig";
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
    alignSelf: "flex-start",
    paddingHorizontal: 18,
    paddingTop: 6,
    paddingBottom: 4,
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
    fontFamily: FONT_FAMILY.regular,
  },
  leafGrid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  leafItem: {
    width: "30%",
    aspectRatio: 1.1,
    marginBottom: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  leafImageWrapper: {
    width: "100%",
    height: "100%",
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
  },
  leafPhotoWrapper: {
    position: "absolute",
    width: "62%",
    height: "62%",
    top: "19%",
    left: "19%",
    borderRadius: 12,
    overflow: "hidden",
    transform: [{ translateY: -2 }],
  },
  leafPhoto: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  pagerArea: {
    height: 380,
  },
  pagerText: {
    marginTop: -4,
    fontSize: 20,
    color: "#7A4B2A",
    textAlign: "center",
    fontFamily: FONT_FAMILY.medium,
  },
  swipeHint: {
    marginTop: -2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  swipeHintText: {
    fontSize: 14,
    color: "#B79066",
    fontFamily: FONT_FAMILY.medium,
  },
  confirmButton: {
    marginTop: 24,
  },
});
