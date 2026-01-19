import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";

import { WoodenButton } from "@/components/Buttons/WoodenButton";
import { AuthFormField } from "@/components/Forms/AuthFormField";
import { AuthTextInput } from "@/components/Forms/AuthTextInput";
import { styles } from "@/features/auth/components/RegisterForm/styles";
import type { AuthFormData } from "@/application/auth/types";
import type { RegisterFormProps } from "@/features/auth/types";
import {
  confirmPasswordRule,
  emailOrIdRule,
  passwordRule,
} from "@/application/auth/validation/authRules";

export const RegisterForm = ({
  defaultValues,
  onSubmit,
  onPressLogin,
  submitLabel = "次へ",
  loginLabel = "ログインはこちら",
}: RegisterFormProps) => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormData>({
    defaultValues: {
      email: defaultValues?.email ?? "",
      password: defaultValues?.password ?? "",
      confirmPassword: defaultValues?.confirmPassword ?? "",
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

      <Controller
        control={control}
        name="confirmPassword"
        rules={confirmPasswordRule(() => getValues("password"))}
        render={({ field: { onChange, onBlur, value } }) => (
          <AuthFormField label="パスワード再確認" errorMessage={errors.confirmPassword?.message}>
            <AuthTextInput
              placeholder="もう一度入力してください"
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

      <WoodenButton
        title={submitLabel}
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        style={styles.nextButton}
      />

      {onPressLogin ? (
        <TouchableOpacity onPress={onPressLogin}>
          <Text style={styles.loginLink}>{loginLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
