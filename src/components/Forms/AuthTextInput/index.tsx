import { MaterialIcons } from "@expo/vector-icons";
import React, { forwardRef, useState } from "react";
import { TextInput, TouchableOpacity, View, type TextInputProps } from "react-native";

import { styles } from "@/components/Forms/AuthTextInput/styles";

type Props = TextInputProps & { showPasswordToggle?: boolean };

export const AuthTextInput = forwardRef<TextInput, Props>(
  ({ style, autoCapitalize = "none", autoCorrect = false, secureTextEntry, showPasswordToggle = false, ...rest }, ref) => {
    const [isSecure, setIsSecure] = useState<boolean>(secureTextEntry ?? false);

    return (
      <View style={styles.wrapper}>
        <TextInput
          ref={ref}
          style={[styles.input, style]}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          secureTextEntry={isSecure}
          {...rest}
        />
        {showPasswordToggle ? (
          <TouchableOpacity onPress={() => setIsSecure(s => !s)} style={styles.toggle}>
            <MaterialIcons name={!isSecure ? "visibility" : "visibility-off"} size={20} color="#B89B89" />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  },
);

AuthTextInput.displayName = "AuthTextInput";