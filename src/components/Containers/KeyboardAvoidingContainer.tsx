import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const KeyboardAvoidingContainer = ({ children, style }: Props) => (
  <KeyboardAvoidingView
    style={style}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  >
    {children}
  </KeyboardAvoidingView>
);
