import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
  },
  nextButton: {
    width: '75%',
    height: 85,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  nextButtonDisabled: {
    opacity: 0.7,
  },
  nextButtonText: {
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
  loginLink: {
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
    fontWeight: '600',
  },
});
