import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  topSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
  sloganBox: {
    width: 280,
    height: 280,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 250,
    height: 250,
  },
  middleSection: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  pholiaImage: {
    width: 300,
    height: 100,
  },
  bottomSection: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 60,
    paddingHorizontal: 40,
  },
  signUpButton: {
    width: "100%",
    backgroundColor: "#E8E8E8",
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 20,
  },
  signUpButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#E8E8E8",
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 30,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  },
  termsText: {
    fontSize: 13,
    color: "#666666",
    textAlign: "center",
    lineHeight: 20,
  },
});
