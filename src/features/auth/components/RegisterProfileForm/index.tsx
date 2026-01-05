import { Controller, useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';

import { AuthFormField } from '@/components/Forms/AuthFormField';
import { AuthTextInput } from '@/components/Forms/AuthTextInput';
import { styles } from '@/features/auth/components/RegisterProfileForm/styles';
import { nameRule, userIdRule } from '@/features/auth/validation/authRules';
import type { RegisterProfileFormData, RegisterProfileFormProps } from '@/features/auth/types';

export const RegisterProfileForm = ({
  defaultValues,
  onSubmit,
  submitLabel = '登録',
}: RegisterProfileFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterProfileFormData>({
    defaultValues: {
      name: defaultValues?.name ?? '',
      userId: defaultValues?.userId ?? '',
    },
  });

  return (
    <View style={styles.formContainer}>
      <Controller
        control={control}
        name="name"
        rules={nameRule}
        render={({ field: { onChange, onBlur, value } }) => (
          <AuthFormField
            label="名前"
            errorMessage={errors.name?.message}
          >
            <AuthTextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </AuthFormField>
        )}
      />

      <Controller
        control={control}
        name="userId"
        rules={userIdRule}
        render={({ field: { onChange, onBlur, value } }) => (
          <AuthFormField
            label="ユーザーID"
            errorMessage={errors.userId?.message}
          >
            <AuthTextInput
              placeholder="user_id"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </AuthFormField>
        )}
      />

      <TouchableOpacity
        style={[styles.registerButton, isSubmitting && styles.registerButtonDisabled]}
        onPress={handleSubmit(onSubmit)}
        activeOpacity={0.8}
        disabled={isSubmitting}
      >
        <Text style={styles.registerButtonText}>{submitLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};
