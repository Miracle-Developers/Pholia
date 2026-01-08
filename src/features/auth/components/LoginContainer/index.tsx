import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { BackgroundContainer } from '@/components/Containers/BackgroundContainer';
import { KeyboardAvoidingContainer } from '@/components/Containers/KeyboardAvoidingContainer';
import { Logo } from '@/components/Icons/Logo';
import { LogoName } from '@/components/Icons/LogoName';
import { styles } from '@/features/auth/components/LoginContainer/styles';
import { LoginForm } from '@/features/auth/components/LoginForm';
import type { LoginFormData } from '@/features/auth/types';
import { useRouterNavigation } from '@/hooks/useRouter';

export default function LoginContainer() {
  const { goToRegister, goToHome } = useRouterNavigation();

  const handleLogin = async (values: LoginFormData) => {
    try {
      const api = await import('@\/lib/api');
      const auth = await import('@\/lib/auth');
      const { email, password } = values;
      const payload: any = { password };
      const { isEmail } = await import('@/features/auth/validation/authRules');
      if (isEmail(email)) {
        payload.email = email;
      } else {
        const normalizedId = email?.startsWith('@') ? email.slice(1) : email;
        payload.id = normalizedId;
      }

      const res = await api.login(payload);
      if (res?.token) {
        auth.setToken(res.token);
        const { loginSuccess } = await import('@/features/auth/validation/authRules');
        loginSuccess(() => goToHome());
      } else {
        console.warn('Login response missing token', res);
      }
    } catch (err: any) {
      console.error('Login failed', err);
      const { loginFailed } = await import('@/features/auth/validation/authRules');
      loginFailed(err?.message || String(err));
    }
  };

  const handleSignUp = () => {
    goToRegister();
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
            <LoginForm
              onSubmit={handleLogin}
              onPressForgotPassword={() => {
                console.log("Navigate to forgot password");
              }}
              onPressSignUp={handleSignUp}
            />
          </View>
        </View>
      </KeyboardAvoidingContainer>
    </BackgroundContainer>
  );
}
