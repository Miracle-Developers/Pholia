import { forwardRef } from "react";
import { TextInput, type TextInputProps } from "react-native";

import { styles } from "@/components/Forms/AuthTextInput/styles";

type Props = TextInputProps;

export const AuthTextInput = forwardRef<TextInput, Props>(
  ({ style, autoCapitalize = "none", autoCorrect = false, ...rest }, ref) => (
    <TextInput
      ref={ref}
      style={[styles.input, style]}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
      {...rest}
    />
  ),
);

AuthTextInput.displayName = "AuthTextInput";
