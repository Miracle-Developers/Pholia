import { FONT_FAMILY } from "@/config/fontConfig";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleBlock: {
    marginLeft: 8,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#6C4A2C",
    fontFamily: FONT_FAMILY.regular,
  },
  underline: {
    marginTop: 6,
    width: 64,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#3B8DFF",
  },
});
