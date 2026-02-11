import { FONT_FAMILY } from "@/config/fontConfig";
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
    paddingBottom: 4,
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
    fontFamily: FONT_FAMILY.regular,
  },
  treeWrapper: {
    marginTop: 16,
    marginBottom: 18,
    alignItems: "center",
  },
  treeImage: {
    width: 190,
    height: 170,
    resizeMode: "contain",
  },
  card: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E3CBA5",
    shadowColor: "#D9C2A3",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  fieldRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D5B78E",
    borderStyle: "dashed",
  },
  fieldRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 6,
  },
  iconBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  iconImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  fieldContent: {
    flex: 1,
    marginHorizontal: 10,
  },
  fieldPlaceholder: {
    fontSize: 16,
    color: "#B5906E",
    letterSpacing: 0.5,
    fontFamily: FONT_FAMILY.regular,
  },
  fieldInput: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
    color: "#7A4B2A",
    paddingVertical: 2,
    backgroundColor: "transparent",
    fontFamily: FONT_FAMILY.regular,
  },
  memberInput: {
    marginHorizontal: 0,
    paddingVertical: 4,
  },
  actionButton: {
    width: 28,
    height: 28,
    borderRadius: 9,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  memberList: {
    width: "100%",
    marginTop: 16,
    padding: 14,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderWidth: 1,
    borderColor: "#E3CBA5",
  },
  memberListTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6C4A2C",
    marginBottom: 8,
  },
  memberListEmpty: {
    fontSize: 14,
    color: "#B5906E",
  },
  memberListItem: {
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#E3CBA5",
  },
  memberListText: {
    fontSize: 14,
    color: "#7A4B2A",
  },
  submitButton: {
    marginTop: 26,
  },
});
