import { Controller, useForm } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

import { styles } from '@/features/auth/components/RegisterProfileForm/styles';
import type { RegisterProfileFormData, RegisterProfileFormProps } from '@/features/auth/types';

export const RegisterProfileForm = ({
  defaultValues,
  onSubmit,
  submitLabel = '登録',
}: RegisterProfileFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
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
        rules={{ required: '名前を入力してください' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>名前</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder=""
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.name ? (
              <Text style={styles.errorText}>{errors.name.message}</Text>
            ) : null}
          </View>
        )}
      />

      <Controller
        control={control}
        name="userId"
        rules={{ required: 'ユーザーIDを入力してください' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>ユーザーID</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder=""
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.userId ? (
              <Text style={styles.errorText}>{errors.userId.message}</Text>
            ) : null}
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleSubmit(onSubmit)}
        activeOpacity={0.8}
      >
        <Text style={styles.registerButtonText}>{submitLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};
