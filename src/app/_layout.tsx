import { Slot } from "expo-router";
import { useFonts, KiwiMaru_300Light, KiwiMaru_400Regular, KiwiMaru_500Medium } from "@expo-google-fonts/kiwi-maru";

import { BackgroundContainer } from "@/components/Containers/BackgroundContainer";
import { ToastProvider } from "@/components/Toast/ToastProvider";

const RootLayout = () => {
  const [fontsLoaded] = useFonts({
    KiwiMaru_300Light,
    KiwiMaru_400Regular,
    KiwiMaru_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ToastProvider>
      <BackgroundContainer>
        <Slot />
      </BackgroundContainer>
    </ToastProvider>
  );
};

export default RootLayout;
