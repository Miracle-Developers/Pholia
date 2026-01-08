import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

import { BackgroundContainer } from '@/components/Containers/BackgroundContainer';
import { KeyboardAvoidingContainer } from '@/components/Containers/KeyboardAvoidingContainer';
import { Logo } from '@/components/Icons/Logo';
import { LogoName } from '@/components/Icons/LogoName';
import { styles } from '@/features/auth/components/RegisterProfileContainer/styles';
import { RegisterProfileForm } from '@/features/auth/components/RegisterProfileForm';
import type { RegisterProfileFormData } from '@/features/auth/types';
import { useRouterNavigation } from '@/hooks/useRouter';

export default function RegisterProfileContainer() {
  const { goToLogin, goToRegister, goToHome } = useRouterNavigation();

  const handleRegister = async (values: RegisterProfileFormData) => {
    try {
      const tempMod = await import('@/lib/registrationTemp');
      const api = await import('@/lib/api');
      const registration = tempMod.getTemp();
      if (!registration.email || !registration.password) {
        const { missingRegistrationStep1 } = await import('@/features/auth/validation/authRules');
        missingRegistrationStep1(() => goToRegister());
        return;
      }
      const idValue = values.userId?.startsWith('@') ? values.userId.slice(1) : values.userId;

      await api.registerUser({ id: idValue, name: values.name, email: registration.email ?? '', password: registration.password ?? '' });

      try {
        const auth = await import('@/lib/auth');
        const loginRes = await api.login({ email: registration.email, password: registration.password });
        if (loginRes?.token) {
          auth.setToken(loginRes.token);
          tempMod.clearTemp();
          const { loginSuccess } = await import('@/features/auth/validation/authRules');
          
          loginSuccess(() => goToHome());
          return;
        }
      } catch (loginErr: any) {
        console.warn('Auto-login failed after registration', loginErr);
      }

      tempMod.clearTemp();
      const { registerFailed } = await import('@/features/auth/validation/authRules');
      registerFailed('登録は完了しましたが、自動ログインできませんでした。ログインしてください。');
      goToLogin();
    } catch (err: any) {
      console.error('Register failed', err);
      const { registerFailed } = await import('@/features/auth/validation/authRules');
      registerFailed(err?.message || String(err));
    }
  };

  return (
    <BackgroundContainer>
      <KeyboardAvoidingContainer style={styles.container}>
        <StatusBar style="dark" />

        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Logo style={styles.logoImage} />
            <LogoName style={styles.pholiaImage} />
          </View>

          <View style={styles.formWrapper}>
            <RegisterProfileForm onSubmit={handleRegister} />
          </View>
        </View>
      </KeyboardAvoidingContainer>
    </BackgroundContainer>
  );
}
