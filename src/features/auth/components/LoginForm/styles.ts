import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 30,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#333333",
    textDecorationLine: "underline",
  },
  loginButton: {
    backgroundColor: "#E8E8E8",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 24,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: "#333333",
    fontSize: 18,
    fontWeight: "600",
  },
  signupLink: {
    fontSize: 14,
    color: "#333333",
    textAlign: "center",
    fontWeight: "600",
  },
});
