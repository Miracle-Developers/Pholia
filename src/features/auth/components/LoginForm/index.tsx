import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { styles } from '@/features/auth/components/LoginForm/styles';
import type { LoginFormData, LoginFormProps } from '@/features/auth/types';

export const LoginForm = ({
  defaultValues,
  onSubmit,
  onPressForgotPassword,
  onPressSignUp,
  submitLabel = 'ログイン',
  signUpLabel = '新規登録はこちら',
}: LoginFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: defaultValues?.email ?? '',
      password: defaultValues?.password ?? '',
    },
  });

  return (
    <View style={styles.formContainer}>
      <Controller
        control={control}
        name="email"
        rules={{ required: 'メールアドレスを入力してください' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>メールアドレス / ユーザーID</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder=""
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.email ? (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            ) : null}
          </View>
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{ required: 'パスワードを入力してください' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>パスワード</Text>
              <Text style={styles.passwordHint}>半角英数字のみ・8文字以上</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder=""
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
              autoCapitalize="none"
            />
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            ) : null}
          </View>
        )}
      />

      {onPressForgotPassword ? (
        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={onPressForgotPassword}
        >
          <Text style={styles.forgotPasswordText}>パスワードをお忘れの方</Text>
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleSubmit(onSubmit)}
        activeOpacity={0.8}
      >
        <Text style={styles.loginButtonText}>{submitLabel}</Text>
      </TouchableOpacity>

      {onPressSignUp ? (
        <TouchableOpacity onPress={onPressSignUp}>
          <Text style={styles.signupLink}>{signUpLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
