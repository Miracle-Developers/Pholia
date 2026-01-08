import { Slot } from "expo-router";

import { BackgroundContainer } from "@/components/Containers/BackgroundContainer";
import { ToastProvider } from "@/components/Toast/ToastProvider";

export default function RootLayout() {
  return (
    <ToastProvider>
      <BackgroundContainer>
        <Slot />
      </BackgroundContainer>
    </ToastProvider>
  );
}
