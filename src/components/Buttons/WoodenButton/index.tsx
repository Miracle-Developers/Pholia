import { Image, Text, TouchableOpacity, type StyleProp, type ViewStyle } from 'react-native';

import { styles } from './styles';

type WoodenButtonProps = {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const WoodenButton = ({
  onPress,
  title,
  disabled = false,
  style,
}: WoodenButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled, style]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Image
        source={require('@/../assets/wooden-btn.png')}
        style={styles.buttonBackground}
      />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};
