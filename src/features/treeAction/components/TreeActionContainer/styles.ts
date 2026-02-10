import { StyleSheet } from "react-native";
import { FONT_FAMILY } from "@/config/fontConfig";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHeader: {
    marginBottom: 8,
  },
  content: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 30,
    justifyContent: "space-between",
  },
  backTitle: {
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  card: {
    marginTop: 0,
    alignSelf: "center",
    width: "86%",
    backgroundColor: "#f7fbffb5",
    borderRadius: 16,
    paddingVertical: 38,
    paddingHorizontal: 20,
    shadowColor: "#6C4A2C",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardAccent: {
    marginTop: 0,
    alignSelf: "center",
    width: "86%",
    backgroundColor: "#f7fbffb5",
    borderRadius: 16,
    paddingVertical: 36,
    paddingHorizontal: 20,
    shadowColor: "#6C4A2C",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cardIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
    marginLeft: -20,
    resizeMode: "contain",
  },
  cardText: {
    fontSize: 30,
    color: "#6C4A2C",
    fontFamily: FONT_FAMILY.medium,
  },
  confirmButton: {
    marginTop: 0,
    marginBottom: 20,
    width: "50%",
    height: 80,
  },
});
