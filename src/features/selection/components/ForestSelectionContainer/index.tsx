import { StatusBar } from "expo-status-bar";
import type { ImageSourcePropType } from "react-native";
import { Text, View } from "react-native";

import { WoodenButton } from "@/components/Buttons/WoodenButton";
import { BackgroundContainer } from "@/components/Containers/BackgroundContainer";
import { Header } from "@/components/Header";
import { ForestCarousel } from "@/features/selection/components/ForestCarousel";
import type { Forest } from "@/features/selection/types";
import { styles } from "./styles";

type ForestSelectionContainerProps = {
  userName: string;
  userId: string;
  avatarSource?: ImageSourcePropType;
  forests: Forest[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  canConfirm?: boolean;
  onPressProfile: () => void;
  onPressSettings: () => void;
};

const ForestSelectionContainer = ({
  userName,
  userId,
  avatarSource,
  forests,
  currentIndex,
  onPrevious,
  onNext,
  onConfirm,
  isLoading = false,
  canConfirm = true,
  onPressProfile,
  onPressSettings,
}: ForestSelectionContainerProps) => {
  return (
    <BackgroundContainer>
      <View style={styles.container}>
        <StatusBar style="dark" />

        <Header
          name={userName}
          userId={userId}
          avatarSource={avatarSource ?? require("@/../assets/logo.png")}
          onPressProfile={onPressProfile}
          onPressSetting={onPressSettings}
        />

        <View style={styles.content}>
          <Text style={styles.title}>{forests[currentIndex]?.name ?? "森"}</Text>

          <ForestCarousel
            forests={forests}
            currentIndex={currentIndex}
            onPrevious={onPrevious}
            onNext={onNext}
          />

          {isLoading ? (
            <Text style={styles.emptyText}>読み込み中...</Text>
          ) : forests.length === 0 ? (
            <Text style={styles.emptyText}>選択できる森がありません</Text>
          ) : null}

          <View style={styles.buttonContainer}>
            <WoodenButton title="決定" onPress={onConfirm} disabled={!canConfirm} />
          </View>
        </View>
      </View>
    </BackgroundContainer>
  );
};

export default ForestSelectionContainer;
