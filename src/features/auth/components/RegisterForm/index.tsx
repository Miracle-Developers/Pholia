import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { styles } from '@/features/auth/components/RegisterForm/styles';
import type { AuthFormData, RegisterFormProps } from '@/features/auth/types';

export const RegisterForm = ({
  defaultValues,
  onSubmit,
  onPressLogin,
  submitLabel = '次へ',
  loginLabel = 'ログインはこちら',
}: RegisterFormProps) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<AuthFormData>({
    defaultValues: {
      email: defaultValues?.email ?? '',
      password: defaultValues?.password ?? '',
      confirmPassword: defaultValues?.confirmPassword ?? '',
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

      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          required: 'パスワードを再入力してください',
          validate: (value) =>
            value === getValues('password') ||
            'パスワードが一致しません',
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>パスワード再確認</Text>
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
            {errors.confirmPassword ? (
              <Text style={styles.errorText}>
                {errors.confirmPassword.message}
              </Text>
            ) : null}
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.nextButton}
        onPress={handleSubmit(onSubmit)}
        activeOpacity={0.8}
      >
        <Text style={styles.nextButtonText}>{submitLabel}</Text>
      </TouchableOpacity>

      {onPressLogin ? (
        <TouchableOpacity onPress={onPressLogin}>
          <Text style={styles.loginLink}>{loginLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
