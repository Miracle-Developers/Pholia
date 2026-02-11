import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 60,
  },
  headerRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  backTitle: {
    alignSelf: "flex-start",
    paddingTop: 6,
    paddingBottom: 4,
  },
  deleteButton: {
    padding: 8,
  },
  title: {
    paddingTop: 110,
    fontSize: 36,
    fontWeight: "700",
    color: "#5D3A1A",
    textAlign: "center",
    marginBottom: 20,
  },
  emptyText: {
    marginTop: 12,
    textAlign: "center",
    color: "#B5906E",
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: "auto",
  },
});
