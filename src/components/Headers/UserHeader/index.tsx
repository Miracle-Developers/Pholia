import { Image, Text, TouchableOpacity, View } from 'react-native';

import { Logo } from '@/components/Icons/Logo';
import { styles } from './styles';

type UserHeaderProps = {
  userName: string;
  userId: string;
  onPressProfile: () => void;
  onPressSettings: () => void;
};

export const UserHeader = ({
  userName,
  userId,
  onPressProfile,
  onPressSettings,
}: UserHeaderProps) => {
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
