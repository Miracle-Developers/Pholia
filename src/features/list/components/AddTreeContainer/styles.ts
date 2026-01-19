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
    paddingHorizontal: 20,
  },
  backTitle: {
    marginBottom: 20,
  },
  treeImageContainer: {
    alignItems: 'center',
    marginBottom: 40,
    height: 150,
    justifyContent: 'center',
  },
  treeImage: {
    width: 120,
    height: 120,
  },
  formContainer: {
    backgroundColor: '#FFFBF7',
    borderRadius: 20,
    padding: 20,
    marginBottom: 40,
  },
  formSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  sectionIcon: {
    fontSize: 24,
  },
  sectionContent: {
    flex: 1,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  sectionButton: {
    fontSize: 20,
    color: '#8B6F47',
    fontWeight: '600',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D4A574',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#FFF9F0',
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0D5C8',
    marginVertical: 12,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
});
