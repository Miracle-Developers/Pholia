import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHeader: {
    marginBottom: 8,
    marginTop: 0,
  },
  content: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 40,
    paddingHorizontal: 18,
    alignItems: "center",
  },
  backTitle: {
    alignSelf: "flex-start",
    paddingTop: 6,
  },
  bannerWrapper: {
    marginTop: 18,
  },
  nameplate: {
    width: 240,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
  },
  nameplateText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#6C4A2C",
    letterSpacing: 3,
  },
  treeWrapper: {
    marginTop: 16,
    marginBottom: 18,
    alignItems: "center",
  },
  treeImage: {
    width: 200,
    height: 170,
    resizeMode: "contain",
  },
  inputCard: {
    width: "100%",
    backgroundColor: "#FFF7E8",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#D9C2A3",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  inputIconBadge: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "#F5E4C9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  inputIcon: {
    width: 18,
    height: 18,
    resizeMode: "contain",
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    color: "#6C4A2C",
    borderBottomWidth: 1,
    borderBottomColor: "#CDAA7D",
    paddingBottom: 6,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#F1D6AE",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  submitButton: {
    marginTop: 26,
  },
});
