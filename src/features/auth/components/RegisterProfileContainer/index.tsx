import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { BackgroundContainer } from '@/components/Containers/BackgroundContainer';
import { KeyboardAvoidingContainer } from '@/components/Containers/KeyboardAvoidingContainer';
import { Logo } from '@/components/Icons/Logo';
import { LogoName } from '@/components/Icons/LogoName';
import { styles } from '@/features/auth/components/RegisterProfileContainer/styles';
import { RegisterProfileForm } from '@/features/auth/components/RegisterProfileForm';
import type { RegisterProfileFormData } from '@/features/auth/types';

export default function RegisterProfileContainer() {
  const handleRegister = (values: RegisterProfileFormData) => {
    console.log('Register profile with:', values);
    // After successful registration, navigate to login or home
    // router.push('/login');
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
