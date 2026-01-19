import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHeader: {
    marginBottom: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  backTitle: {
    marginBottom: 24,
  },
  forestImageContainer: {
    alignItems: 'center',
    marginBottom: 40,
    height: 200,
    justifyContent: 'center',
  },
  forestImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#90EE90',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 40,
  },
  inputLabel: {
    fontSize: 16,
    color: '#8B6F47',
    marginBottom: 12,
    fontWeight: '500',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D4A574',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#FFF9F0',
  },
  buttonContainer: {
    marginTop: 'auto',
    marginBottom: 40,
  },
});
