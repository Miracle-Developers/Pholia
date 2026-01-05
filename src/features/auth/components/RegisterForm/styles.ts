import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
  },
  nextButton: {
    backgroundColor: '#E8E8E8',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  nextButtonDisabled: {
    opacity: 0.7,
  },
  nextButtonText: {
    color: '#333333',
    fontSize: 18,
    fontWeight: '600',
  },
  loginLink: {
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
    fontWeight: '600',
  },
});
