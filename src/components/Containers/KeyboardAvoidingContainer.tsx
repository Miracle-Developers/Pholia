import type { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, type StyleProp, type ViewStyle } from "react-native";

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const KeyboardAvoidingContainer = ({ children, style }: Props) => (
  <KeyboardAvoidingView style={style} behavior={Platform.OS === "ios" ? "padding" : "height"}>
    {children}
  </KeyboardAvoidingView>
);
