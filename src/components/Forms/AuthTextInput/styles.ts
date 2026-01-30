import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    width: "100%",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#D0D0D0",
    paddingRight: 44,
  },
  toggle: {
    position: "absolute",
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  toggleText: {
    color: "#007AFF",
    fontSize: 14,
  },
});
