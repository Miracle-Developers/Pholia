import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    width: "55%",
    height: 85,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#5D3A1A",
    fontSize: 30,
    zIndex: 1,
    marginBottom: 10,
    fontFamily: "KiwiMaru_500Medium",
  },
  buttonBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
});
