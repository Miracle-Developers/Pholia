import React from 'react';
import { View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { KeyboardAvoidingContainer } from '@/components/Containers/KeyboardAvoidingContainer';
import RegisterForm from '../RegisterForm';
import { AuthFormData } from '../../types';
import { styles } from './styles';

export default function RegisterContainer() {
  const router = useRouter();

  const handleNext = (values: AuthFormData) => {
    console.log('Register with:', values.email, values.password);
    router.push('/register2');
  };

  const handleLogin = () => {
    console.log('Navigate to login');
    router.push('/login');
  };

  return (
    <KeyboardAvoidingContainer style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../../../assets/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
          <Image
            source={require('../../../../../assets/Pholia.png')}
            style={styles.pholiaImage}
            resizeMode="contain"
          />
        </View>

        {/* Form Section */}
        <View style={styles.formWrapper}>
          <RegisterForm
            onSubmit={handleNext}
            onPressLogin={handleLogin}
          />
        </View>
      </View>
    </KeyboardAvoidingContainer>
  );
}
