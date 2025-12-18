import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 130,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  pholiaImage: {
    width: 200,
    height: 60,
  },
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
    marginBottom: 14,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#333333',
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#E8E8E8',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    color: '#333333',
    fontSize: 18,
    fontWeight: '600',
  },
  signupLink: {
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
    fontWeight: '600',
  },
});
