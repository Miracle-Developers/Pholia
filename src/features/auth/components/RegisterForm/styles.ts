import { FONT_FAMILY } from "@/config/fontConfig";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
  },
  nextButton: {
    marginTop: 20,
    marginBottom: 24,
  },
  loginLink: {
    fontSize: 14,
    color: "#333333",
    textAlign: "center",
    fontFamily: FONT_FAMILY.regular,
  },
});
