import type { ReactNode } from 'react';
import { Text, View } from 'react-native';

import { styles } from '@/components/Forms/AuthFormField/styles';

type Props = {
  label: string;
  hint?: string;
  errorMessage?: string;
  children: ReactNode;
};

export const AuthFormField = ({ label, hint, errorMessage, children }: Props) => (
  <View style={styles.container}>
    <View style={styles.labelRow}>
      <Text style={styles.label}>{label}</Text>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
    {children}
    {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
  </View>
);
