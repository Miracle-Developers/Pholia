import { Controller, useForm } from 'react-hook-form';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { AuthFormField } from '@/components/Forms/AuthFormField';
import { AuthTextInput } from '@/components/Forms/AuthTextInput';
import { styles } from '@/features/auth/components/LoginForm/styles';
import type { LoginFormData, LoginFormProps } from '@/features/auth/types';
import { emailOrIdRule, passwordRule } from '@/features/auth/validation/authRules';

export const LoginForm = ({
  defaultValues,
  onSubmit,
  onPressForgotPassword,
  onPressSignUp,
  submitLabel = "ログイン",
  signUpLabel = "新規登録はこちら",
}: LoginFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: defaultValues?.email ?? "",
      password: defaultValues?.password ?? "",
    },
  });

  return (
    <View style={styles.formContainer}>
      <Controller
        control={control}
        name="email"
        rules={emailOrIdRule}
        render={({ field: { onChange, onBlur, value } }) => (
          <AuthFormField label="メールアドレス / ユーザーID" errorMessage={errors.email?.message}>
            <AuthTextInput
              placeholder="user@example.com"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              autoComplete="email"
              textContentType="emailAddress"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </AuthFormField>
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={passwordRule}
        render={({ field: { onChange, onBlur, value } }) => (
          <AuthFormField
            label="パスワード"
            hint="半角英数字のみ・8文字以上"
            errorMessage={errors.password?.message}
          >
            <AuthTextInput
              placeholder="8文字以上の英数字"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
              textContentType="password"
              autoCorrect={false}
            />
          </AuthFormField>
        )}
      />

      {onPressForgotPassword ? (
        <TouchableOpacity style={styles.forgotPassword} onPress={onPressForgotPassword}>
          <Text style={styles.forgotPasswordText}>パスワードをお忘れの方</Text>
        </TouchableOpacity>
      ) : null}

      <TouchableOpacity
        style={[styles.loginButton, isSubmitting && styles.loginButtonDisabled]}
        onPress={handleSubmit(onSubmit)}
        activeOpacity={0.8}
        disabled={isSubmitting}
      >
        <Image source={require("@/../assets/wooden-btn.png")} style={styles.buttonBackground} />
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
