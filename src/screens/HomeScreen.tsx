import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const handleSignUp = () => {
    console.log('新規登録 pressed');
    navigation.navigate('Register');
  };

  const handleLogin = () => {
    console.log('ログイン pressed');
    navigation.navigate('Login');
  };
  
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Top Section - Slogan */}
      <View style={styles.topSection}>
        <View style={styles.sloganBox}>
          <Image 
            source={require('../../assets/logo.png')} 
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Middle Section - Logo */}
      <View style={styles.middleSection}>
        <Image 
          source={require('../../assets/Pholia.png')} 
          style={styles.pholiaImage}
          resizeMode="contain"
        />
      </View>

      {/* Bottom Section - Buttons */}
      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={styles.signUpButton} 
          onPress={handleSignUp}
          activeOpacity={0.8}
        >
          <Text style={styles.signUpButtonText}>新規登録</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          <Text style={styles.loginButtonText}>ログイン</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          利用規約 と プライバシーポリシーに同意して{'\n'}Pholiaを利用します。
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  sloganBox: {
    width: 280,
    height: 280,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 250,
    height: 250,
  },
  middleSection: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pholiaImage: {
    width: 300,
    height: 100,
  },
  bottomSection: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 60,
    paddingHorizontal: 40,
  },
  signUpButton: {
    width: '100%',
    backgroundColor: '#E8E8E8',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  signUpButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#E8E8E8',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 30,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  termsText: {
    fontSize: 13,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
});
