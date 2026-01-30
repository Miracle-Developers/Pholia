import type { ImageSourcePropType, StyleProp, ViewStyle } from "react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { styles } from "@/components/Header/styles";

type HeaderProps = {
  name: string;
  userId: string;
  avatarSource: ImageSourcePropType;
  onPressProfile?: () => void;
  onPressSetting?: () => void;
  style?: StyleProp<ViewStyle>;
};

export const Header = ({
  name,
  userId,
  avatarSource,
  onPressProfile,
  onPressSetting,
  style,
}: HeaderProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftSection}>
        <View style={styles.avatarRing}>
          <Image source={avatarSource} style={styles.avatarImage} resizeMode="cover" />
        </View>
        <View style={styles.nameBlock}>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.userIdText}>@{userId}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onPressProfile}
          disabled={!onPressProfile}
          activeOpacity={0.85}
        >
          <Image source={require("@/../assets/profile.png")} style={styles.actionIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.actionButtonSpacing]}
          onPress={onPressSetting}
          disabled={!onPressSetting}
          activeOpacity={0.85}
        >
          <Image source={require("@/../assets/setting.png")} style={styles.actionIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
