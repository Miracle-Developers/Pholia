import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
  },
  registerButton: {
    width: '75%',
    height: 85,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 40,
  },
  registerButtonDisabled: {
    opacity: 0.7,
  },
  registerButtonText: {
    color: '#5D3A1A',
    fontSize: 20,
    fontWeight: '700',
    zIndex: 1,
  },
  buttonBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
});
