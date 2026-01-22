import { Text, TouchableOpacity } from "react-native";

import { styles } from "@/components/Buttons/BasicButton/styles";

type Props = {
  label: string;
  onPress: () => void;
};

export const BasicButton = ({ label, onPress }: Props) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{label}</Text>
  </TouchableOpacity>
);
