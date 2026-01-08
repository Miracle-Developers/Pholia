import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";

import { BackgroundContainer } from "@/components/Containers/BackgroundContainer";
import { WoodenButton } from "@/components/Buttons/WoodenButton";
import { Logo } from "@/components/Icons/Logo";
import { LogoName } from "@/components/Icons/LogoName";
import { styles } from "@/features/auth/components/TopContainer/styles";
import { useRouterNavigation } from "@/hooks/useRouter";

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
          <WoodenButton
            title="新規登録"
            onPress={goToRegister}
            style={styles.signUpButton}
          />
          <WoodenButton
            title="ログイン"
            onPress={goToLogin}
            style={styles.loginButton}
          />
          <Text style={styles.termsText}>
            利用規約 と プライバシーポリシーに同意して{"\n"}Pholiaを利用します。
          </Text>
        </View>
      </View>
    </BackgroundContainer>
  );
};
