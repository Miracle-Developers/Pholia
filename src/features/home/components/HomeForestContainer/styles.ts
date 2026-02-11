import { StyleSheet } from "react-native";
import { styles as homeStyles } from "@/features/home/components/HomeContainer/styles";
import { FONT_FAMILY } from "@/config/fontConfig";

export const styles = StyleSheet.create({
  ...homeStyles,
  backTitle: {
    alignSelf: "flex-start",
    paddingLeft: 18,
    paddingTop: 8,
    marginBottom: 16,
  },
  cardsWrapper: {
    width: "100%",
    alignItems: "center",
    marginTop: 64,
  },
  card: {
    width: "86%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 14,
    paddingVertical: 50,
    paddingHorizontal: 22,
    marginBottom: 38,
    shadowColor: "#8BB49D",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  cardAccent: {
    width: "86%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 14,
    paddingVertical: 50,
    paddingHorizontal: 22,
    marginBottom: 40,
    shadowColor: "#9BB38A",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  cardIcon: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  cardText: {
    fontSize: 28,
    color: "#7A4B2A",
    fontFamily: FONT_FAMILY.medium,
    letterSpacing: 1,
  },
  confirmButton: {
    marginTop: 12,
    marginBottom: 36,
  },
});
