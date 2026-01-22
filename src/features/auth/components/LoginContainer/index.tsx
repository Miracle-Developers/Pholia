import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

import { BackgroundContainer } from "@/components/Containers/BackgroundContainer";
import { KeyboardAvoidingContainer } from "@/components/Containers/KeyboardAvoidingContainer";
import { Logo } from "@/components/Icons/Logo";
import { LogoName } from "@/components/Icons/LogoName";
import { styles } from "@/features/auth/components/LoginContainer/styles";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { useRouterNavigation } from "@/hooks/useRouter";

export default function LoginContainer() {
  const { goToRegister } = useRouterNavigation();
  const { handleLogin } = useLogin();

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
