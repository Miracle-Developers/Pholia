import { Slot } from "expo-router";

import { BackgroundContainer } from "@/components/Containers/BackgroundContainer";
import { ToastProvider } from "@/components/Toast/ToastProvider";

const RootLayout = () => {
  return (
    <ToastProvider>
      <BackgroundContainer>
        <Slot />
      </BackgroundContainer>
    </ToastProvider>
  );
};

export default RootLayout;
