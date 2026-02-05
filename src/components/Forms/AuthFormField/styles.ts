import { FONT_FAMILY } from "@/config/fontConfig";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#333333",
    fontFamily: FONT_FAMILY.light,
  },
  hint: {
    fontSize: 12,
    color: "#999999",
    fontFamily: FONT_FAMILY.light,
  },
  errorText: {
    marginTop: 6,
    fontSize: 12,
    color: "#D9534F",
    fontFamily: FONT_FAMILY.light,
  },
});
