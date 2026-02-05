import { FONT_FAMILY } from "@/config/fontConfig";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 120,
    paddingBottom: 60,
  },
  title: {
    fontSize: 36,
    color: "#5D3A1A",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: FONT_FAMILY.medium,
  },
  emptyText: {
    marginTop: 12,
    textAlign: "center",
    color: "#B5906E",
    fontSize: 14,
    fontFamily: FONT_FAMILY.regular,
  },
  buttonContainer: {
    marginTop: "auto",
  },
});
