import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Logo } from '@/components/Icons/Logo';

type ForestSelectionHeaderProps = {
  userName: string;
  userId: string;
  onPressProfile: () => void;
  onPressSettings: () => void;
};

export const ForestSelectionHeader = ({
  userName,
  userId,
  onPressProfile,
  onPressSettings,
}: ForestSelectionHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.logoContainer}>
          <Logo style={styles.logo} />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userId}>@{userId}</Text>
        </View>
      </View>
      
      <View style={styles.rightSection}>
        <TouchableOpacity onPress={onPressProfile} style={styles.iconButton}>
          <Image 
            source={require('@/../assets/user_icon.png')} 
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressSettings} style={styles.iconButton}>
          <Image 
            source={require('@/../assets/setting_icon.png')} 
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
