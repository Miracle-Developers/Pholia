import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { KeyboardAvoidingContainer } from '@/components/Containers/KeyboardAvoidingContainer';
import { Logo } from '@/components/Icons/Logo';
import { LogoName } from '@/components/Icons/LogoName';
import { BackgroundContainer } from '@/components/Containers/BackgroundContainer';
import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { styles } from '@/features/auth/components/RegisterContainer/styles';
import { useRouterNavigation } from '@/hooks/useRouter';
import type { AuthFormData } from '@/features/auth/types';

export default function RegisterContainer() {
  const { goToRegisterProfile, goToLogin } = useRouterNavigation();

  const handleNext = (values: AuthFormData) => {
    console.log('Register with:', values.email, values.password);
    goToRegisterProfile();
  };

  const handleLogin = () => {
    goToLogin();
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
            <RegisterForm
              onSubmit={handleNext}
              onPressLogin={handleLogin}
            />
          </View>
        </View>
      </KeyboardAvoidingContainer>
    </BackgroundContainer>
  );
}
