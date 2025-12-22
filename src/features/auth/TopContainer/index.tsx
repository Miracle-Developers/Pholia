import { StatusBar } from "expo-status-bar";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useAuthNavigation } from "@/hooks/useRouter";
import { styles } from "./styles";

export const TopContainer = () => {
  const { goToRegister, goToLogin } = useAuthNavigation();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.topSection}>
        <View style={styles.sloganBox}>
          <Image
            source={require("../../../../assets/logo.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.middleSection}>
        <Image
          source={require("../../../../assets/Pholia.png")}
          style={styles.pholiaImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.signUpButton} onPress={goToRegister} activeOpacity={0.8}>
          <Text style={styles.signUpButtonText}>新規登録</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={goToLogin} activeOpacity={0.8}>
          <Text style={styles.loginButtonText}>ログイン</Text>
        </TouchableOpacity>
        <Text style={styles.termsText}>
          利用規約 と プライバシーポリシーに同意して{"\n"}Pholiaを利用します。
        </Text>
      </View>
    </View>
  );
};
