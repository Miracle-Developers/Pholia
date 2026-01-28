import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  modalContent: {
    width: "100%",
    maxWidth: 360,
    maxHeight: "70%",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#E3CBA5",
    shadowColor: "#B89B68",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#6C4A2C",
    textAlign: "center",
    marginBottom: 10,
  },
  modalList: {
    maxHeight: 280,
  },
  modalItem: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E6D3B3",
  },
  modalItemText: {
    fontSize: 16,
    color: "#7A4B2A",
  },
  modalEmpty: {
    textAlign: "center",
    color: "#B5906E",
    paddingVertical: 18,
  },
  modalFooter: {
    marginTop: 12,
    alignItems: "center",
  },
  modalCloseButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#F0E3CF",
  },
  modalCloseText: {
    color: "#7A4B2A",
    fontWeight: "600",
  },
});
