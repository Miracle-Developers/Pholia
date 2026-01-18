import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 15,
    backgroundColor: '#D4A574',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  logo: {
    width: 40,
    height: 40,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF',
    borderWidth: 3,
    borderColor: '#5D3A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    gap: 2,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#5D3A1A',
  },
  userId: {
    fontSize: 14,
    fontWeight: '500',
    color: '#5D3A1A',
  },
  rightSection: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    width: 44,
    height: 44,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#5D3A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
});
