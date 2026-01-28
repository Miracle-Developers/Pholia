import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

import { KeyboardAvoidingContainer } from "@/components/Containers/KeyboardAvoidingContainer";
import { Logo } from "@/components/Icons/Logo";
import { LogoName } from "@/components/Icons/LogoName";
import { styles } from "@/features/auth/components/RegisterContainer/styles";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { useRegisterStepOne } from "@/features/auth/hooks/useRegisterStepOne";
import { useRouterNavigation } from "@/hooks/useRouter";

const RegisterContainer = () => {
  const { goToLogin } = useRouterNavigation();
  const { handleNext } = useRegisterStepOne();

  const handleLogin = () => {
    goToLogin();
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
          <RegisterForm onSubmit={handleNext} onPressLogin={handleLogin} />
        </View>
      </View>
    </KeyboardAvoidingContainer>
  );
};

export default RegisterContainer;
