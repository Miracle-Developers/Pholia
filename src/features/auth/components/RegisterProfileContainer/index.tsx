import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

import { BackgroundContainer } from "@/components/Containers/BackgroundContainer";
import { KeyboardAvoidingContainer } from "@/components/Containers/KeyboardAvoidingContainer";
import { Logo } from "@/components/Icons/Logo";
import { LogoName } from "@/components/Icons/LogoName";
import { styles } from "@/features/auth/components/RegisterProfileContainer/styles";
import { RegisterProfileForm } from "@/features/auth/components/RegisterProfileForm";
import { useRegisterProfile } from "@/features/auth/hooks/useRegisterProfile";

const RegisterProfileContainer = () => {
  const { handleRegister } = useRegisterProfile();

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
};

export default RegisterProfileContainer;
