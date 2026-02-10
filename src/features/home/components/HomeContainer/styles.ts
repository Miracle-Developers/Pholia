import { StyleSheet } from "react-native";
import { FONT_FAMILY } from "@/config/fontConfig";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHeader: {
    marginBottom: 8,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 24,
  },
  nameplateWrapper: {
    marginTop: 70,
  },
  nameplate: {
    width: 245,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  nameplateText: {
    fontSize: 35,
    color: "#6C4A2C",
    letterSpacing: 1,
    fontFamily: FONT_FAMILY.medium,
  },
  treeArea: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  treeRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  arrowButton: {
    padding: 6,
  },
  treeWrapper: {
    width: "83%",
    aspectRatio: 1.05,
    alignItems: "center",
    justifyContent: "center",
  },
  treeImage: {
    width: "100%",
    height: "100%",
  },
  careButton: {
    marginBottom: 28,
  },
});
