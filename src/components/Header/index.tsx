import type { ImageSourcePropType, StyleProp, ViewStyle } from "react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { styles } from "@/components/Header/styles";

type HeaderProps = {
  name?: string;
  userId?: string;
  avatarSource?: ImageSourcePropType;
  onPressProfile?: () => void;
  onPressSetting?: () => void;
  style?: StyleProp<ViewStyle>;
  showBackButton?: boolean;
  onPressBack?: () => void;
  title?: string;
  hideActions?: boolean;
};

export const Header = ({
  name,
  userId,
  avatarSource,
  onPressProfile,
  onPressSetting,
  style,
  showBackButton = false,
  onPressBack,
  title,
  hideActions = false,
}: HeaderProps) => {
  return (
    <View style={[styles.container, style]}>
      {showBackButton ? (
        <View style={styles.leftSection}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onPressBack}
            disabled={!onPressBack}
            activeOpacity={0.85}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          {title && <Text style={styles.titleText}>{title}</Text>}
        </View>
      ) : (
        <View style={styles.leftSection}>
          {avatarSource && (
            <View style={styles.avatarRing}>
              <Image source={avatarSource} style={styles.avatarImage} resizeMode="cover" />
            </View>
          )}
          <View style={styles.nameBlock}>
            {name && <Text style={styles.nameText}>{name}</Text>}
            {userId && <Text style={styles.userIdText}>@{userId}</Text>}
          </View>
        </View>
      )}
      {!hideActions && (
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
      )}
    </View>
  );
};
