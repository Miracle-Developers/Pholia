import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
  },
  sloganBox: {
    width: 280,
    height: 280,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 230,
    height: 230,
  },
  middleSection: {
    flex: 0.3,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: -60,
  },
  pholiaImage: {
    width: 200,
    height: 100,
  },
  bottomSection: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 85,
    paddingHorizontal: 40,
  },
  foxImage: {
    position: "absolute",
    left: 20,
    bottom: 320,
    width: 55,
    height: 55,
    resizeMode: "contain",
  },
  bearImage: {
    position: "absolute",
    right: 10,
    bottom: 320,
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  signUpButton: {
    width: "75%",
    height: 90,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  signUpButtonText: {
    fontSize: 25,
    fontWeight: "700",
    color: "#5D3A1A",
    zIndex: 1,
  },
  loginButton: {
    width: "75%",
    height: 85,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  loginButtonText: {
    fontSize: 25,
    fontWeight: "700",
    color: "#5D3A1A",
    zIndex: 1,
  },
  buttonBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  termsText: {
    fontSize: 13,
    color: "#666666",
    textAlign: "center",
    lineHeight: 20,
  },
});
