import React from 'react';
import { View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { KeyboardAvoidingContainer } from '@/components/Containers/KeyboardAvoidingContainer';
import LoginForm from '../LoginForm';
import { LoginFormData } from '../../types';
import { styles } from './styles';

export default function LoginContainer() {
  const router = useRouter();

  const handleLogin = (values: LoginFormData) => {
    console.log('Login with:', values.email, values.password);
    // Add your login logic here
  };

  const handleSignUp = () => {
    console.log('Navigate to sign up');
    router.push('/register');
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
