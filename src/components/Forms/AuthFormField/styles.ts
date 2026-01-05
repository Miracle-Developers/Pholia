import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
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
  hint: {
    fontSize: 12,
    color: '#999999',
  },
  errorText: {
    marginTop: 6,
    fontSize: 12,
    color: '#D9534F',
  },
});
