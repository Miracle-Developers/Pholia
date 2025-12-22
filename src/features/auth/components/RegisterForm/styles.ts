import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 24,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  passwordHint: {
    fontSize: 12,
    color: '#999999',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#D0D0D0',
  },
  nextButton: {
    backgroundColor: '#E8E8E8',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
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
  errorText: {
    marginTop: 6,
    fontSize: 12,
    color: '#D9534F',
  },
});
