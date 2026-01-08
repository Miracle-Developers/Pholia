import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { BackgroundContainer } from '@/components/Containers/BackgroundContainer';
import { KeyboardAvoidingContainer } from '@/components/Containers/KeyboardAvoidingContainer';
import { Logo } from '@/components/Icons/Logo';
import { LogoName } from '@/components/Icons/LogoName';
import { styles } from '@/features/auth/components/RegisterContainer/styles';
import { RegisterForm } from '@/features/auth/components/RegisterForm';
import type { AuthFormData } from '@/features/auth/types';
import { useRouterNavigation } from '@/hooks/useRouter';

export default function RegisterContainer() {
  const { goToRegisterProfile, goToLogin } = useRouterNavigation();

  const handleNext = (values: AuthFormData) => {
    import('@\/lib/registrationTemp').then(mod => {
      mod.setStepOne({ email: values.email, password: values.password });
      goToRegisterProfile();
    });
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
            <RegisterForm onSubmit={handleNext} onPressLogin={handleLogin} />
          </View>
        </View>
      </KeyboardAvoidingContainer>
    </BackgroundContainer>
  );
}
