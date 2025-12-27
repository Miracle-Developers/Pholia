import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { Logo } from '@/components/Icons/Logo';
import { LogoName } from '@/components/Icons/LogoName';
import { KeyboardAvoidingContainer } from '@/components/Containers/KeyboardAvoidingContainer';
import { useRouterNavigation } from '@/hooks/useRouter';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { styles } from '@/features/auth/components/LoginContainer/styles';
import type { LoginFormData } from '@/features/auth/types';

export default function LoginContainer() {
  const { goToRegister } = useRouterNavigation();

  const handleLogin = (values: LoginFormData) => {
    console.log('Login with:', values.email, values.password);
  };

  const handleSignUp = () => {
    goToRegister();
  };

  return (
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
              console.log('Navigate to forgot password');
            }}
            onPressSignUp={handleSignUp}
          />
        </View>
      </View>
    </KeyboardAvoidingContainer>
  );
}
