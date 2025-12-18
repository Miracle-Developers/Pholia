import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { styles } from './styles';

export default function RegisterForm2() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');

  const handleRegister = () => {
    console.log('Register with:', name, userId);
    // Add your final registration logic here
    // After successful registration, navigate to login or home
    // router.push('/login');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
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
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>名前</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              value={name}
              onChangeText={setName}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>ユーザーID</Text>
            <TextInput
              style={styles.input}
              placeholder=""
              value={userId}
              onChangeText={setUserId}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            activeOpacity={0.8}
          >
            <Text style={styles.registerButtonText}>登録</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
