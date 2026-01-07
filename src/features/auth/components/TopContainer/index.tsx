import { StatusBar } from "expo-status-bar";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { BackgroundContainer } from "@/components/Containers/BackgroundContainer";
import { Logo } from "@/components/Icons/Logo";
import { styles } from "@/features/auth/components/TopContainer/styles";
import { useRouterNavigation } from "@/hooks/useRouter";
import { LogoName } from "@/components/Icons/LogoName";

export const TopContainer = () => {
  const { goToRegister, goToLogin } = useRouterNavigation();
  return (
    <BackgroundContainer>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.topSection}>
          <View style={styles.sloganBox}>
            <Logo style={styles.logoImage} />
          </View>
        </View>
        <View style={styles.middleSection}>
          <LogoName style={styles.pholiaImage} />
        </View>
        <View style={styles.bottomSection}>
          <Image source={require("@/../assets/fox.png")} style={styles.foxImage} />
          <Image source={require("@/../assets/bear.png")} style={styles.bearImage} />
          <TouchableOpacity style={styles.signUpButton} onPress={goToRegister} activeOpacity={0.8}>
            <Image source={require("@/../assets/wooden-btn.png")} style={styles.buttonBackground} />
            <Text style={styles.signUpButtonText}>新規登録</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={goToLogin} activeOpacity={0.8}>
            <Image source={require("@/../assets/wooden-btn.png")} style={styles.buttonBackground} />
            <Text style={styles.loginButtonText}>ログイン</Text>
          </TouchableOpacity>
          <Text style={styles.termsText}>
            利用規約 と プライバシーポリシーに同意して{"\n"}Pholiaを利用します。
          </Text>
        </View>
      </View>
    </BackgroundContainer>
  );
};
