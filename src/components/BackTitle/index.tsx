import type { StyleProp, ViewStyle } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "./styles";

type BackTitleProps = {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export const BackTitle = ({ title, onPress, style }: BackTitleProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.85}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <MaterialIcons name="arrow-back" size={28} color="#6C4A2C" />
      <View style={styles.titleBlock}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
