import {
  KiwiMaru_300Light,
  KiwiMaru_400Regular,
  KiwiMaru_500Medium,
  useFonts,
} from "@expo-google-fonts/kiwi-maru";
import { ExpoRoot } from "expo-router";
import { ctx } from "expo-router/_ctx";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useAuthBootstrap } from "@/hooks/useAuthBootstrap";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    KiwiMaru_300Light,
    KiwiMaru_400Regular,
    KiwiMaru_500Medium,
  });

  useAuthBootstrap();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <ExpoRoot context={ctx} />;
}
